"""Training augmentation pipeline wrapper."""
from app.ml.preprocessing.image_augmentation import get_training_augmentation, get_validation_augmentation

# Re-export for convenience
training_transform = get_training_augmentation
validation_transform = get_validation_augmentation
