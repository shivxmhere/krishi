"""Batch inference for processing multiple images."""
import asyncio, logging
from typing import List, Dict, Any
from app.ml.inference.predictor import UnifiedPredictor

logger = logging.getLogger(__name__)


class BatchPredictor:
    def __init__(self, batch_size: int = 32):
        self.batch_size = batch_size
        self.predictor = UnifiedPredictor()

    async def predict_batch(self, images: List[bytes], models: List[str] = None) -> List[Dict[str, Any]]:
        results = []
        for i in range(0, len(images), self.batch_size):
            batch = images[i: i + self.batch_size]
            batch_results = await asyncio.gather(
                *[self.predictor.predict(img, models=models) for img in batch]
            )
            results.extend(batch_results)
        return results
