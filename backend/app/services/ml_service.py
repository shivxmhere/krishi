"""ML Orchestration Service."""
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session

from app.ml.inference.predictor import UnifiedPredictor
from app.ml.inference.batch_predictor import BatchPredictor
from app.ml.monitoring.performance_tracker import PerformanceTracker
from app.ml.monitoring.drift_detector import DriftDetector
from app.schemas.ml_schemas import ComprehensiveAnalysis


class MLService:
    def __init__(self):
        self.predictor = UnifiedPredictor()
        self.batch_predictor = BatchPredictor()
        self.tracker = PerformanceTracker()
        self.drift_detector = DriftDetector()

    async def predict_single(
        self,
        db: Session,
        image_bytes: bytes,
        user_id: int,
        models: List[str] = None,
        save_log: bool = True
    ) -> Dict[str, Any]:
        # Run inference
        result = await self.predictor.predict(
            image_bytes, models=models or ["disease", "ensemble"]
        )

        # Log to DB
        if save_log:
            # Extract top disease prediction for logging
            disease_pred = result.get("disease", {}).get("top_prediction", {})
            pred_class = disease_pred.get("class", "unknown")
            confidence = disease_pred.get("confidence", 0.0)
            
            self.tracker.log_prediction(
                db=db,
                model_type="disease_cnn",
                model_version=result.get("disease", {}).get("model_version", "unknown"),
                prediction=pred_class,
                confidence=confidence,
                user_id=user_id,
                processing_time_ms=result.get("processing_time_ms", 0.0)
            )

        return result

    async def predict_batch(
        self,
        db: Session,
        images: List[bytes],
        user_id: int,
        models: List[str] = None
    ) -> List[Dict[str, Any]]:
        results = await self.batch_predictor.predict_batch(images, models)
        # Logging skipped for batch to avoid DB spam, can be added if needed
        return results

    def check_drift(self, new_data_batch) -> Dict[str, Any]:
        return self.drift_detector.detect_drift(new_data_batch)
