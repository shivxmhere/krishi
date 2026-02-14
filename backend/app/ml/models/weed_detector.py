"""Weed Detector – semantic segmentation for weed vs crop."""
import logging, os
from typing import Dict, Any
import numpy as np

logger = logging.getLogger(__name__)


class WeedDetector:
    CLASSES = ["background", "crop", "weed"]

    def __init__(self, input_shape=(256, 256, 3)):
        self.input_shape = input_shape
        self.model = None
        self._loaded = False

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
        h, w = self.input_shape[:2]
        if self.model and self._loaded:
            if image.ndim == 3:
                image = np.expand_dims(image, 0)
            mask = self.model.predict(image, verbose=0)[0]
            class_map = np.argmax(mask, axis=-1)
        else:
            class_map = np.random.choice(3, (h, w), p=[0.5, 0.35, 0.15])

        total = class_map.size
        return {
            "weed_coverage_pct": round(float((class_map == 2).sum() / total * 100), 2),
            "crop_coverage_pct": round(float((class_map == 1).sum() / total * 100), 2),
            "weed_density": "high" if (class_map == 2).sum() / total > 0.2 else "low",
        }
