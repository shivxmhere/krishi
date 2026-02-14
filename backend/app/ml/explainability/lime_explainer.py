"""LIME-based image explanation."""
import logging
import numpy as np
from typing import Any, Optional

logger = logging.getLogger(__name__)


class LIMEExplainer:
    def __init__(self, predict_fn):
        self.predict_fn = predict_fn
        self.explainer = None
        self._init()

    def _init(self):
        try:
            from lime import lime_image
            self.explainer = lime_image.LimeImageExplainer()
        except ImportError:
            logger.warning("LIME not installed.")

    def explain(self, image: np.ndarray, top_labels: int = 5, num_samples: int = 500) -> Optional[Any]:
        if self.explainer is None:
            return None
        explanation = self.explainer.explain_instance(
            image, self.predict_fn, top_labels=top_labels, hide_color=0, num_samples=num_samples,
        )
        return explanation
