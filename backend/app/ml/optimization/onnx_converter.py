"""TensorFlow → ONNX converter."""
import logging
from typing import Dict, Any
logger = logging.getLogger(__name__)


def convert_to_onnx(model_path: str, output_path: str) -> Dict[str, Any]:
    try:
        import tensorflow as tf
        import tf2onnx
        model = tf.keras.models.load_model(model_path, compile=False)
        onnx_model, _ = tf2onnx.convert.from_keras(model, opset=13)
        with open(output_path, "wb") as f:
            f.write(onnx_model.SerializeToString())
        import onnx
        loaded = onnx.load(output_path)
        onnx.checker.check_model(loaded)
        return {"status": "success", "output": output_path}
    except Exception as exc:
        return {"status": "failed", "error": str(exc)}
