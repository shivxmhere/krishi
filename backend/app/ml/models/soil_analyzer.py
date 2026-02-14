"""Soil Analyzer – estimates soil properties from leaf/soil images."""
import logging, os
from typing import Dict, Any
import numpy as np

logger = logging.getLogger(__name__)


class SoilAnalyzer:
    PROPERTIES = ["pH", "Moisture", "Nitrogen", "Phosphorus", "Potassium"]

    def __init__(self, input_shape=(256, 256, 3)):
        self.input_shape = input_shape
        self.model = None
        self._loaded = False

    def build_model(self):
        try:
            import tensorflow as tf
            from tensorflow.keras.layers import GlobalAveragePooling2D, Dense, Dropout
            from tensorflow.keras.models import Model
            base = tf.keras.applications.MobileNetV3Small(
                include_top=False, weights="imagenet", input_shape=self.input_shape,
            )
            base.trainable = False
            x = GlobalAveragePooling2D()(base.output)
            x = Dense(128, activation="relu")(x)
            outputs = Dense(len(self.PROPERTIES), activation="linear")(x)  # regression
            self.model = Model(inputs=base.input, outputs=outputs)
            return self.model
        except ImportError:
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
        if self.model and self._loaded:
            if image.ndim == 3:
                image = np.expand_dims(image, 0)
            vals = self.model.predict(image, verbose=0)[0]
        else:
            vals = [6.5, 45.0, 80.0, 40.0, 60.0]
        return {prop: round(float(vals[i]), 2) for i, prop in enumerate(self.PROPERTIES)}
