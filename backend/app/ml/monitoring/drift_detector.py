"""Data & concept drift detector using statistical tests."""
import logging
from typing import Dict, Any, Optional
import numpy as np

logger = logging.getLogger(__name__)


class DriftDetector:
    def __init__(self):
        self.baseline_mean: Optional[np.ndarray] = None
        self.baseline_std: Optional[np.ndarray] = None
        self.baseline_data: Optional[np.ndarray] = None

    def set_baseline(self, data: np.ndarray):
        self.baseline_data = data
        self.baseline_mean = np.mean(data, axis=0)
        self.baseline_std = np.std(data, axis=0)
        logger.info("Drift baseline set with %d samples.", len(data))

    def detect_drift(self, new_data: np.ndarray, threshold: float = 0.05) -> Dict[str, Any]:
        if self.baseline_data is None:
            return {"drift_detected": False, "reason": "No baseline set"}
        try:
            from scipy import stats
            drifted_features = []
            for i in range(min(new_data.shape[1] if new_data.ndim > 1 else 1,
                               self.baseline_data.shape[1] if self.baseline_data.ndim > 1 else 1)):
                col_base = self.baseline_data[:, i] if self.baseline_data.ndim > 1 else self.baseline_data
                col_new = new_data[:, i] if new_data.ndim > 1 else new_data
                stat, p = stats.ks_2samp(col_base, col_new)
                if p < threshold:
                    drifted_features.append({"feature": i, "p_value": float(p), "statistic": float(stat)})
            return {"drift_detected": len(drifted_features) > 0, "drifted_features": drifted_features,
                    "total_features": new_data.shape[1] if new_data.ndim > 1 else 1}
        except ImportError:
            return {"drift_detected": False, "reason": "scipy not installed"}
