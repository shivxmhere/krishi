"""Training callbacks for model checkpointing, early stopping, etc."""
import logging
from typing import Optional, List

logger = logging.getLogger(__name__)


def get_default_callbacks(job_id: str, save_path: Optional[str] = None) -> list:
    try:
        import tensorflow as tf

        cbs: List[tf.keras.callbacks.Callback] = [
            tf.keras.callbacks.EarlyStopping(
                monitor="val_loss", patience=10, restore_best_weights=True, verbose=1
            ),
            tf.keras.callbacks.ReduceLROnPlateau(
                monitor="val_loss", factor=0.5, patience=5, min_lr=1e-7, verbose=1
            ),
        ]
        if save_path:
            cbs.append(tf.keras.callbacks.ModelCheckpoint(
                filepath=save_path, save_best_only=True, monitor="val_accuracy", verbose=1
            ))
        # TensorBoard
        cbs.append(tf.keras.callbacks.TensorBoard(
            log_dir=f"./logs/tensorboard/{job_id}", histogram_freq=1
        ))
        return cbs
    except ImportError:
        return []
