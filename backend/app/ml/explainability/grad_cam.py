"""Grad-CAM visualization for CNN explainability."""
import logging
import numpy as np
from typing import Optional

logger = logging.getLogger(__name__)


def generate_gradcam(model, image: np.ndarray, class_idx: int) -> Optional[np.ndarray]:
    """Generate Grad-CAM heatmap for a given class prediction."""
    try:
        import tensorflow as tf

        # Find last conv layer
        last_conv = None
        for layer in reversed(model.layers):
            if isinstance(layer, tf.keras.layers.Conv2D):
                last_conv = layer
                break
        if last_conv is None:
            return None

        grad_model = tf.keras.models.Model(
            inputs=model.inputs, outputs=[last_conv.output, model.output]
        )

        if image.ndim == 3:
            image = np.expand_dims(image, 0)
        image_tensor = tf.cast(image, tf.float32)

        with tf.GradientTape() as tape:
            conv_out, predictions = grad_model(image_tensor)
            class_output = predictions[:, class_idx]

        grads = tape.gradient(class_output, conv_out)
        pooled = tf.reduce_mean(grads, axis=(0, 1, 2))
        conv_out = conv_out[0]
        heatmap = conv_out @ pooled[..., tf.newaxis]
        heatmap = tf.squeeze(heatmap)
        heatmap = tf.maximum(heatmap, 0) / (tf.math.reduce_max(heatmap) + 1e-8)
        return heatmap.numpy()
    except Exception as exc:
        logger.error("Grad-CAM failed: %s", exc)
        return None


def overlay_heatmap(image: np.ndarray, heatmap: np.ndarray, alpha: float = 0.4) -> np.ndarray:
    try:
        import cv2
        heatmap_resized = cv2.resize(heatmap, (image.shape[1], image.shape[0]))
        heatmap_colored = cv2.applyColorMap(np.uint8(255 * heatmap_resized), cv2.COLORMAP_JET)
        heatmap_colored = heatmap_colored.astype(np.float32) / 255.0
        img = image if image.max() <= 1 else image / 255.0
        overlay = alpha * heatmap_colored + (1 - alpha) * img
        return np.clip(overlay, 0, 1)
    except ImportError:
        return image
