"""Model Training Orchestrator – manages the end-to-end training loop."""
import logging, os, json, uuid
from datetime import datetime
from typing import Optional, Dict, Any

logger = logging.getLogger(__name__)


class ModelTrainer:
    """Trains a specified model type with configurable hyper-parameters."""

    def __init__(self, model_type: str):
        self.model_type = model_type
        self.job_id = str(uuid.uuid4())
        self.status = "queued"
        self.progress = 0.0
        self.current_epoch = 0
        self.total_epochs = 0
        self.best_accuracy = 0.0
        self.history: Dict[str, Any] = {}

    def _get_model(self):
        from app.ml.models.disease_cnn import DiseaseCNN
        from app.ml.models.pest_detector import PestDetector
        from app.ml.models.growth_stage_classifier import GrowthStageClassifier
        model_map = {
            "disease": DiseaseCNN,
            "pest": PestDetector,
            "growth_stage": GrowthStageClassifier,
        }
        cls = model_map.get(self.model_type)
        if cls is None:
            raise ValueError(f"Unknown model type: {self.model_type}")
        instance = cls()
        instance.build_model()
        return instance

    def train(
        self,
        train_data_path: str,
        val_data_path: str,
        epochs: int = 100,
        batch_size: int = 32,
        learning_rate: float = 0.001,
        save_path: Optional[str] = None,
    ) -> Dict[str, Any]:
        self.total_epochs = epochs
        self.status = "training"
        logger.info("Training job %s started for %s", self.job_id, self.model_type)

        try:
            model_instance = self._get_model()
            if model_instance.model is None:
                self.status = "failed"
                return {"status": "failed", "error": "TensorFlow not available"}

            model_instance.compile_model(learning_rate)

            import tensorflow as tf
            from app.ml.training.callbacks import get_default_callbacks

            train_ds = tf.keras.utils.image_dataset_from_directory(
                train_data_path, image_size=(256, 256), batch_size=batch_size,
            ) if os.path.isdir(train_data_path) else None

            val_ds = tf.keras.utils.image_dataset_from_directory(
                val_data_path, image_size=(256, 256), batch_size=batch_size,
            ) if os.path.isdir(val_data_path) else None

            if train_ds is None:
                self.status = "failed"
                return {"status": "failed", "error": "Training data not found"}

            callbacks = get_default_callbacks(self.job_id, save_path)
            history = model_instance.model.fit(
                train_ds, validation_data=val_ds, epochs=epochs, callbacks=callbacks,
            )
            self.history = {k: [float(v) for v in vals] for k, vals in history.history.items()}
            self.best_accuracy = max(self.history.get("val_accuracy", [0]))
            self.status = "completed"

            if save_path:
                model_instance.model.save(save_path)

            return {"status": "completed", "job_id": self.job_id, "best_accuracy": self.best_accuracy,
                    "history": self.history, "model_path": save_path}

        except Exception as exc:
            logger.error("Training failed: %s", exc)
            self.status = "failed"
            return {"status": "failed", "error": str(exc)}

    def get_status(self) -> Dict[str, Any]:
        return {
            "job_id": self.job_id, "model_type": self.model_type, "status": self.status,
            "progress": self.progress, "current_epoch": self.current_epoch,
            "total_epochs": self.total_epochs, "best_accuracy": self.best_accuracy,
        }
