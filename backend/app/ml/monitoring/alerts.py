"""Performance alerts – triggered when metrics drop below thresholds."""
import logging
from typing import Dict

logger = logging.getLogger(__name__)


def check_accuracy_alert(current: float, baseline: float, threshold_pct: float = 10.0) -> Dict:
    drop = (baseline - current) / baseline * 100 if baseline > 0 else 0
    if drop > threshold_pct:
        logger.warning("⚠️  Accuracy dropped %.1f%% (%.3f → %.3f)", drop, baseline, current)
        return {"alert": True, "type": "accuracy_drop", "drop_pct": round(drop, 1),
                "current": current, "baseline": baseline}
    return {"alert": False}


def check_latency_alert(avg_ms: float, max_ms: float = 500.0) -> Dict:
    if avg_ms > max_ms:
        logger.warning("⚠️  Average latency %.1fms exceeds threshold %.1fms", avg_ms, max_ms)
        return {"alert": True, "type": "high_latency", "avg_ms": avg_ms, "threshold_ms": max_ms}
    return {"alert": False}
