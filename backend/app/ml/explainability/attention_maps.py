"""Attention map visualization for attention-based models."""
import logging
import numpy as np
from typing import Optional

logger = logging.getLogger(__name__)


def visualize_attention(model, image: np.ndarray) -> Optional[np.ndarray]:
    """Extract and return attention weights if the model has an attention layer."""
    try:
        import tensorflow as tf
        for layer in model.layers:
            if "attention" in layer.name.lower():
                attn_model = tf.keras.Model(inputs=model.input, outputs=layer.output)
                if image.ndim == 3:
                    image = np.expand_dims(image, 0)
                attn_weights = attn_model.predict(image, verbose=0)
                return attn_weights
        logger.info("No attention layer found in model.")
        return None
    except Exception as exc:
        logger.error("Attention visualization failed: %s", exc)
        return None
