"""Custom training metrics."""
import logging
logger = logging.getLogger(__name__)

try:
    import tensorflow as tf
    import numpy as np

    class F1Score(tf.keras.metrics.Metric):
        def __init__(self, name="f1_score", **kwargs):
            super().__init__(name=name, **kwargs)
            self.precision = tf.keras.metrics.Precision()
            self.recall = tf.keras.metrics.Recall()

        def update_state(self, y_true, y_pred, sample_weight=None):
            self.precision.update_state(y_true, y_pred, sample_weight)
            self.recall.update_state(y_true, y_pred, sample_weight)

        def result(self):
            p = self.precision.result()
            r = self.recall.result()
            return 2 * ((p * r) / (p + r + 1e-7))

        def reset_state(self):
            self.precision.reset_state()
            self.recall.reset_state()

    class TopKAccuracy(tf.keras.metrics.TopKCategoricalAccuracy):
        pass

except ImportError:
    F1Score = None
    TopKAccuracy = None
