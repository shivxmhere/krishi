"""Unified Prediction Interface – single entry-point for all model predictions."""
import logging, time
from typing import Dict, Any, List, Optional
import numpy as np

from app.config import settings
from app.ml.models.disease_cnn import DiseaseCNN
from app.ml.models.ensemble_model import EnsemblePredictor
from app.utils.image_processing import load_image_from_bytes

logger = logging.getLogger(__name__)


class UnifiedPredictor:
    """Loads models on first use, provides predict interface."""

    def __init__(self):
        self._disease = DiseaseCNN()
        self._ensemble = EnsemblePredictor()
        self._initialized = False

    def _init_models(self):
        if self._initialized:
            return
        self._disease.load_weights(settings.DISEASE_MODEL_PATH)
        self._initialized = True

    async def predict(
        self,
        image_bytes: bytes,
        models: List[str] = None,
        return_explanations: bool = False,
    ) -> Dict[str, Any]:
        self._init_models()
        start = time.perf_counter()
        image = load_image_from_bytes(image_bytes)

        if models and "ensemble" in models:
            result = self._ensemble.predict_comprehensive(image)
        else:
            result = {"disease": self._disease.predict_with_confidence(image)}

        elapsed_ms = (time.perf_counter() - start) * 1000
        result["processing_time_ms"] = round(elapsed_ms, 2)
        return result
