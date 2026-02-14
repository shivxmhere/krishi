"""Advanced image augmentation pipeline using Albumentations."""
import logging
import numpy as np

logger = logging.getLogger(__name__)

try:
    import albumentations as A
    HAS_ALBUMENTATIONS = True
except ImportError:
    HAS_ALBUMENTATIONS = False


def get_training_augmentation(image_size: int = 256) -> "A.Compose":
    if not HAS_ALBUMENTATIONS:
        logger.warning("Albumentations not installed – augmentation disabled.")
        return None
    return A.Compose([
        A.RandomResizedCrop(image_size, image_size, scale=(0.8, 1.0)),
        A.HorizontalFlip(p=0.5),
        A.VerticalFlip(p=0.3),
        A.RandomBrightnessContrast(brightness_limit=0.2, contrast_limit=0.2, p=0.5),
        A.HueSaturationValue(hue_shift_limit=10, sat_shift_limit=20, val_shift_limit=10, p=0.3),
        A.GaussianBlur(blur_limit=(3, 7), p=0.2),
        A.GaussNoise(var_limit=(10, 50), p=0.2),
        A.CLAHE(p=0.3),
        A.ElasticTransform(alpha=50, sigma=50 * 0.05, p=0.1),
        A.GridDistortion(p=0.1),
        A.OpticalDistortion(distort_limit=0.1, p=0.1),
        A.CoarseDropout(max_holes=8, max_height=32, max_width=32, p=0.2),
        A.Normalize(mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225)),
    ])


def get_validation_augmentation(image_size: int = 256):
    if not HAS_ALBUMENTATIONS:
        return None
    return A.Compose([
        A.Resize(image_size, image_size),
        A.Normalize(mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225)),
    ])


def augment_image(image: np.ndarray, transform) -> np.ndarray:
    if transform is None:
        return image
    return transform(image=image)["image"]
