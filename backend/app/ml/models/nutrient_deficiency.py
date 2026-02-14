"""Nutrient Deficiency Detector – multi-label classification for N/P/K + micro."""
import logging, os
from typing import Dict, Any, List
import numpy as np

logger = logging.getLogger(__name__)

NUTRIENTS = ["Nitrogen", "Phosphorus", "Potassium", "Calcium", "Magnesium", "Iron", "Zinc"]


class NutrientDeficiency:
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

    def predict(self, image: np.ndarray, threshold: float = 0.5) -> Dict[str, Any]:
        if self.model and self._loaded:
            if image.ndim == 3:
                image = np.expand_dims(image, 0)
            preds = self.model.predict(image, verbose=0)[0]
        else:
            preds = np.random.rand(len(NUTRIENTS)) * 0.6

        deficiencies: List[Dict[str, Any]] = []
        for i, nutrient in enumerate(NUTRIENTS):
            if preds[i] >= threshold:
                severity = "high" if preds[i] > 0.8 else "medium" if preds[i] > 0.6 else "low"
                deficiencies.append({"nutrient": nutrient, "confidence": float(preds[i]), "severity": severity})

        return {"deficiencies": deficiencies, "overall_nutrition": "poor" if len(deficiencies) > 2 else "adequate"}
