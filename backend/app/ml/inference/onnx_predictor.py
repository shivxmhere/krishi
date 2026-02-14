"""ONNX Runtime predictor for optimized edge inference."""
import logging, os
from typing import Dict, Any, Optional
import numpy as np

logger = logging.getLogger(__name__)


class ONNXPredictor:
    def __init__(self, model_path: str):
        self.model_path = model_path
        self.session = None
        self._load()

    def _load(self):
        if not os.path.exists(self.model_path):
            logger.warning("ONNX model not found: %s", self.model_path)
            return
        try:
            import onnxruntime as ort
            self.session = ort.InferenceSession(
                self.model_path,
                providers=["CUDAExecutionProvider", "CPUExecutionProvider"],
            )
            logger.info("ONNX model loaded: %s", self.model_path)
        except ImportError:
            logger.warning("onnxruntime not installed.")

    def predict(self, image: np.ndarray) -> Optional[np.ndarray]:
        if self.session is None:
            return None
        inp_name = self.session.get_inputs()[0].name
        out_name = self.session.get_outputs()[0].name
        if image.ndim == 3:
            image = np.expand_dims(image, 0)
        return self.session.run([out_name], {inp_name: image.astype(np.float32)})[0]
