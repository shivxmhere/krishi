"""Post-training quantization (TFLite float16)."""
import logging, os
from typing import Dict, Any
logger = logging.getLogger(__name__)


def quantize_model(model_path: str, output_path: str) -> Dict[str, Any]:
    try:
        import tensorflow as tf
        model = tf.keras.models.load_model(model_path, compile=False)
        converter = tf.lite.TFLiteConverter.from_keras_model(model)
        converter.optimizations = [tf.lite.Optimize.DEFAULT]
        converter.target_spec.supported_types = [tf.float16]
        tflite = converter.convert()
        with open(output_path, "wb") as f:
            f.write(tflite)
        orig = os.path.getsize(model_path)
        quant = os.path.getsize(output_path)
        return {"status": "success", "original_kb": orig // 1024, "quantized_kb": quant // 1024,
                "reduction_pct": round((1 - quant / orig) * 100, 1)}
    except Exception as exc:
        return {"status": "failed", "error": str(exc)}
