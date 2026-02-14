"""SHAP explainer for deep learning models."""
import logging
import numpy as np
from typing import Optional

logger = logging.getLogger(__name__)


class SHAPExplainer:
    def __init__(self, model, background_data: Optional[np.ndarray] = None):
        self.model = model
        self.explainer = None
        try:
            import shap
            if background_data is not None:
                self.explainer = shap.DeepExplainer(model, background_data)
        except ImportError:
            logger.warning("SHAP not installed.")

    def explain(self, image: np.ndarray):
        if self.explainer is None:
            return None
        import shap
        if image.ndim == 3:
            image = np.expand_dims(image, 0)
        return self.explainer.shap_values(image)
