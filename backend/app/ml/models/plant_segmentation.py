"""
Plant Segmentation – U-Net architecture for leaf segmentation.
Segments: healthy / diseased / background.
"""
import logging
import os
from typing import Dict, Any, Optional
import numpy as np

logger = logging.getLogger(__name__)


class PlantSegmentation:
    """U-Net-based 3-class segmentation (healthy/diseased/background)."""

    CLASSES = ["background", "healthy", "diseased"]

    def __init__(self, input_shape=(256, 256, 3)):
        self.input_shape = input_shape
        self.model = None
        self._loaded = False

    def build_model(self):
        try:
            import tensorflow as tf
            from tensorflow.keras.layers import (
                Conv2D, MaxPooling2D, UpSampling2D, concatenate, Input, BatchNormalization, Activation
            )
            from tensorflow.keras.models import Model

            inputs = Input(shape=self.input_shape)
            # Encoder
            c1 = Conv2D(64, 3, padding="same", activation="relu")(inputs)
            c1 = BatchNormalization()(c1)
            p1 = MaxPooling2D(2)(c1)

            c2 = Conv2D(128, 3, padding="same", activation="relu")(p1)
            c2 = BatchNormalization()(c2)
            p2 = MaxPooling2D(2)(c2)

            c3 = Conv2D(256, 3, padding="same", activation="relu")(p2)
            c3 = BatchNormalization()(c3)

            # Decoder
            u1 = UpSampling2D(2)(c3)
            u1 = concatenate([u1, c2])
            c4 = Conv2D(128, 3, padding="same", activation="relu")(u1)

            u2 = UpSampling2D(2)(c4)
            u2 = concatenate([u2, c1])
            c5 = Conv2D(64, 3, padding="same", activation="relu")(u2)

            outputs = Conv2D(len(self.CLASSES), 1, activation="softmax")(c5)
            self.model = Model(inputs=inputs, outputs=outputs)
            logger.info("PlantSegmentation U-Net built.")
            return self.model
        except ImportError:
            logger.warning("TensorFlow unavailable – PlantSegmentation mock mode.")
            return None

    def load_weights(self, path: str) -> bool:
        if not os.path.exists(path):
            return False
        try:
            import tensorflow as tf
            self.model = tf.keras.models.load_model(path, compile=False)
            self._loaded = True
            return True
        except Exception:
            return False

    def predict(self, image: np.ndarray) -> Dict[str, Any]:
        h, w = self.input_shape[0], self.input_shape[1]
        if self.model and self._loaded:
            if image.ndim == 3:
                image = np.expand_dims(image, 0)
            mask = self.model.predict(image, verbose=0)[0]
        else:
            mask = np.random.rand(h, w, len(self.CLASSES))
            mask = mask / mask.sum(axis=-1, keepdims=True)

        class_map = np.argmax(mask, axis=-1)
        total = class_map.size
        return {
            "segmentation_shape": list(class_map.shape),
            "background_pct": float((class_map == 0).sum() / total * 100),
            "healthy_pct": float((class_map == 1).sum() / total * 100),
            "diseased_pct": float((class_map == 2).sum() / total * 100),
        }
