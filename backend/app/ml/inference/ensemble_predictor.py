"""Ensemble predictor – multi-version model voting."""
import logging
from typing import List, Dict, Any
import numpy as np

logger = logging.getLogger(__name__)


class MultiVersionEnsemble:
    """Run multiple versions of same model and vote."""

    def __init__(self):
        self.models = []

    def load_versions(self, paths: List[str]):
        try:
            import tensorflow as tf
            for p in paths:
                try:
                    m = tf.keras.models.load_model(p, compile=False)
                    self.models.append(m)
                except Exception:
                    continue
        except ImportError:
            pass

    def predict_ensemble(self, image: np.ndarray) -> Dict[str, Any]:
        if not self.models:
            return {"error": "No models loaded"}
        if image.ndim == 3:
            image = np.expand_dims(image, 0)
        preds = [m.predict(image, verbose=0)[0] for m in self.models]
        avg = np.mean(preds, axis=0)
        idx = int(np.argmax(avg))
        return {"class_index": idx, "confidence": float(avg[idx]), "method": "average", "num_models": len(self.models)}
