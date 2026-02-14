import os
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import logging

logger = logging.getLogger(__name__)

MODEL_PATH = "ai-models/disease_model.h5"
CLASSES = ["Early Blight", "Late Blight", "Healthy"] # Example classes, should verify real model classes

class DiseaseDetectionService:
    def __init__(self):
        self.model = None
        self._load_model()

    def _load_model(self):
        if os.path.exists(MODEL_PATH):
            try:
                self.model = tf.keras.models.load_model(MODEL_PATH)
                logger.info(f"Loaded model from {MODEL_PATH}")
            except Exception as e:
                logger.error(f"Failed to load model: {e}")
        else:
            logger.warning(f"Model not found at {MODEL_PATH}. Using mock predictions.")

    def predict(self, image_bytes: bytes):
        if not self.model:
            # Mock prediction if model missing
            return {"disease": "Model Not Found", "confidence": 0.0}
        
        try:
            image = Image.open(io.BytesIO(image_bytes))
            image = image.resize((256, 256)) # Verify input size
            image_array = tf.keras.preprocessing.image.img_to_array(image)
            image_array = tf.expand_dims(image_array, 0)
            
            predictions = self.model.predict(image_array)
            predicted_class = CLASSES[np.argmax(predictions[0])]
            confidence = float(np.max(predictions[0]))
            
            return {"disease": predicted_class, "confidence": confidence}
        except Exception as e:
            logger.error(f"Prediction error: {e}")
            raise e

disease_service = DiseaseDetectionService()
