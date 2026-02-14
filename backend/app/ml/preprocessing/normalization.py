"""Advanced image normalization utilities."""
import numpy as np

IMAGENET_MEAN = np.array([0.485, 0.456, 0.406])
IMAGENET_STD = np.array([0.229, 0.224, 0.225])


def imagenet_normalize(image: np.ndarray) -> np.ndarray:
    return (image - IMAGENET_MEAN) / IMAGENET_STD


def imagenet_denormalize(image: np.ndarray) -> np.ndarray:
    return image * IMAGENET_STD + IMAGENET_MEAN


def min_max_normalize(image: np.ndarray) -> np.ndarray:
    mn, mx = image.min(), image.max()
    return (image - mn) / (mx - mn + 1e-8)


def z_score_normalize(image: np.ndarray) -> np.ndarray:
    return (image - image.mean()) / (image.std() + 1e-8)
