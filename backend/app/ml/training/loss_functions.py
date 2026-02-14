"""Custom loss functions for agricultural ML models."""
import logging
logger = logging.getLogger(__name__)

try:
    import tensorflow as tf

    def focal_loss(gamma: float = 2.0, alpha: float = 0.25):
        """Focal loss for class-imbalanced datasets."""
        def loss_fn(y_true, y_pred):
            y_pred = tf.clip_by_value(y_pred, 1e-7, 1 - 1e-7)
            cross_entropy = -y_true * tf.math.log(y_pred)
            weight = alpha * y_true * tf.pow(1 - y_pred, gamma)
            return tf.reduce_sum(weight * cross_entropy, axis=-1)
        return loss_fn

    def label_smoothing_ce(smoothing: float = 0.1):
        """Cross-entropy with label smoothing."""
        def loss_fn(y_true, y_pred):
            n_classes = tf.shape(y_true)[-1]
            y_smooth = y_true * (1 - smoothing) + smoothing / tf.cast(n_classes, tf.float32)
            return tf.keras.losses.categorical_crossentropy(y_smooth, y_pred)
        return loss_fn

    def weighted_cross_entropy(class_weights):
        """Weighted cross-entropy with per-class weights."""
        weights = tf.constant(class_weights, dtype=tf.float32)
        def loss_fn(y_true, y_pred):
            y_pred = tf.clip_by_value(y_pred, 1e-7, 1 - 1e-7)
            ce = -y_true * tf.math.log(y_pred)
            weighted = ce * weights
            return tf.reduce_sum(weighted, axis=-1)
        return loss_fn

except ImportError:
    logger.warning("TensorFlow unavailable – custom losses not loaded.")
    focal_loss = None
    label_smoothing_ce = None
    weighted_cross_entropy = None
