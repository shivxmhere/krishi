"""Streaming predictor for real-time inference."""
import logging, time
from typing import AsyncGenerator, Dict, Any
from app.ml.inference.predictor import UnifiedPredictor

logger = logging.getLogger(__name__)


class StreamingPredictor:
    def __init__(self):
        self.predictor = UnifiedPredictor()

    async def predict_stream(self, image_bytes: bytes) -> AsyncGenerator[Dict[str, Any], None]:
        """Yield incremental results as each model completes."""
        from app.utils.image_processing import load_image_from_bytes
        image = load_image_from_bytes(image_bytes)

        # Disease
        disease_result = self.predictor._disease.predict_with_confidence(image)
        yield {"stage": "disease", "result": disease_result}

        # Ensemble components
        pest_result = self.predictor._ensemble.pest_model.predict(image)
        yield {"stage": "pest", "result": pest_result}

        seg_result = self.predictor._ensemble.segmentation_model.predict(image)
        yield {"stage": "segmentation", "result": seg_result}

        yield {"stage": "complete", "result": "All models processed"}
