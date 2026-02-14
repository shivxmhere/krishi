"""Transfer learning / fine-tuning pipeline."""
import logging, os
from typing import Optional

logger = logging.getLogger(__name__)


def fine_tune_model(
    base_model_path: str,
    train_data_path: str,
    val_data_path: str,
    num_classes: int,
    epochs: int = 30,
    learning_rate: float = 1e-4,
    unfreeze_layers: int = 20,
    save_path: Optional[str] = None,
):
    """Load a pre-trained model and fine-tune on new data."""
    try:
        import tensorflow as tf
        from app.ml.training.callbacks import get_default_callbacks
        import uuid

        if not os.path.exists(base_model_path):
            return {"status": "failed", "error": f"Base model not found: {base_model_path}"}

        model = tf.keras.models.load_model(base_model_path, compile=False)

        # Unfreeze top layers
        for layer in model.layers[-unfreeze_layers:]:
            layer.trainable = True

        # Replace final layer if class count changed
        if model.output_shape[-1] != num_classes:
            x = model.layers[-2].output
            new_output = tf.keras.layers.Dense(num_classes, activation="softmax", name="fine_tune_head")(x)
            model = tf.keras.Model(inputs=model.input, outputs=new_output)

        model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate),
            loss="categorical_crossentropy",
            metrics=["accuracy"],
        )

        train_ds = tf.keras.utils.image_dataset_from_directory(train_data_path, image_size=(256, 256), batch_size=32)
        val_ds = tf.keras.utils.image_dataset_from_directory(val_data_path, image_size=(256, 256), batch_size=32)

        job_id = str(uuid.uuid4())
        history = model.fit(train_ds, validation_data=val_ds, epochs=epochs, callbacks=get_default_callbacks(job_id, save_path))

        if save_path:
            model.save(save_path)

        return {"status": "completed", "history": {k: [float(v) for v in vs] for k, vs in history.history.items()}}
    except Exception as exc:
        return {"status": "failed", "error": str(exc)}
