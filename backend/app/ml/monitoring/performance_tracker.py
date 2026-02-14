"""Model performance tracking over time."""
import logging
from datetime import datetime, timedelta
from typing import Dict, Any, List
from sqlalchemy.orm import Session

from app.models.inference_log import InferenceLog
from app.models.model_performance import ModelPerformance

logger = logging.getLogger(__name__)


class PerformanceTracker:
    def log_prediction(self, db: Session, model_type: str, model_version: str,
                       prediction: str, confidence: float, user_id: int = None,
                       processing_time_ms: float = 0, ground_truth: str = None):
        entry = InferenceLog(
            user_id=user_id, model_type=model_type, model_version=model_version,
            prediction=prediction, confidence=confidence, ground_truth=ground_truth,
            processing_time_ms=processing_time_ms,
        )
        db.add(entry)
        db.commit()

    def get_metrics(self, db: Session, model_type: str, days: int = 7) -> Dict[str, Any]:
        since = datetime.utcnow() - timedelta(days=days)
        logs = db.query(InferenceLog).filter(
            InferenceLog.model_type == model_type,
            InferenceLog.created_at >= since,
        ).all()

        if not logs:
            return {"prediction_count": 0}

        confidences = [l.confidence for l in logs if l.confidence]
        times = [l.processing_time_ms for l in logs if l.processing_time_ms]
        correct = sum(1 for l in logs if l.ground_truth and l.prediction == l.ground_truth)
        total_gt = sum(1 for l in logs if l.ground_truth)

        return {
            "prediction_count": len(logs),
            "avg_confidence": round(sum(confidences) / len(confidences), 4) if confidences else None,
            "avg_processing_ms": round(sum(times) / len(times), 2) if times else None,
            "accuracy": round(correct / total_gt, 4) if total_gt > 0 else None,
            "period_days": days,
        }
