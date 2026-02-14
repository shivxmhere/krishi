"""Knowledge distillation – train a smaller student from a larger teacher."""
import logging
from typing import Dict, Any
logger = logging.getLogger(__name__)


def distill(teacher_path: str, student_builder, train_ds, val_ds, epochs: int = 30, temperature: float = 3.0) -> Dict[str, Any]:
    try:
        import tensorflow as tf
        teacher = tf.keras.models.load_model(teacher_path, compile=False)
        student = student_builder()

        optimizer = tf.keras.optimizers.Adam(1e-3)
        for epoch in range(epochs):
            for x, y in train_ds:
                with tf.GradientTape() as tape:
                    t_logits = teacher(x, training=False) / temperature
                    s_logits = student(x, training=True) / temperature
                    loss = tf.keras.losses.KLDivergence()(tf.nn.softmax(t_logits), tf.nn.softmax(s_logits))
                grads = tape.gradient(loss, student.trainable_variables)
                optimizer.apply_gradients(zip(grads, student.trainable_variables))
        return {"status": "completed", "epochs": epochs}
    except Exception as exc:
        return {"status": "failed", "error": str(exc)}
