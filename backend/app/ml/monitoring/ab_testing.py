"""A/B testing framework for model versions."""
import hashlib, logging
from typing import Dict, Any
logger = logging.getLogger(__name__)


class ABTestManager:
    def __init__(self):
        self.experiments: Dict[str, Dict] = {}

    def create_experiment(self, name: str, model_a: str, model_b: str, split: float = 0.5):
        self.experiments[name] = {"model_a": model_a, "model_b": model_b, "split": split,
                                   "metrics_a": [], "metrics_b": []}
        logger.info("A/B experiment '%s' created.", name)

    def route_traffic(self, experiment: str, user_id: str) -> str:
        exp = self.experiments.get(experiment)
        if not exp:
            return "default"
        h = int(hashlib.md5(user_id.encode()).hexdigest(), 16) % 100
        return exp["model_a"] if h < exp["split"] * 100 else exp["model_b"]

    def record_metric(self, experiment: str, model: str, accuracy: float):
        exp = self.experiments.get(experiment)
        if not exp:
            return
        if model == exp["model_a"]:
            exp["metrics_a"].append(accuracy)
        else:
            exp["metrics_b"].append(accuracy)

    def get_results(self, experiment: str) -> Dict[str, Any]:
        exp = self.experiments.get(experiment)
        if not exp:
            return {"error": "Experiment not found"}
        import numpy as np
        a, b = exp["metrics_a"], exp["metrics_b"]
        return {
            "model_a": {"name": exp["model_a"], "count": len(a), "avg": float(np.mean(a)) if a else None},
            "model_b": {"name": exp["model_b"], "count": len(b), "avg": float(np.mean(b)) if b else None},
            "winner": exp["model_a"] if (np.mean(a) if a else 0) > (np.mean(b) if b else 0) else exp["model_b"],
        }
