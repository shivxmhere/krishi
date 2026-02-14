"""Image noise reduction filters."""
import numpy as np
import logging

logger = logging.getLogger(__name__)

try:
    import cv2
    HAS_CV2 = True
except ImportError:
    HAS_CV2 = False


def gaussian_filter(image: np.ndarray, ksize: int = 5) -> np.ndarray:
    if not HAS_CV2:
        return image
    return cv2.GaussianBlur(image, (ksize, ksize), 0)


def bilateral_filter(image: np.ndarray, d: int = 9, sigma_color: float = 75, sigma_space: float = 75) -> np.ndarray:
    if not HAS_CV2:
        return image
    img_uint8 = (image * 255).astype(np.uint8) if image.max() <= 1 else image.astype(np.uint8)
    filtered = cv2.bilateralFilter(img_uint8, d, sigma_color, sigma_space)
    return filtered.astype(np.float32) / 255.0


def median_filter(image: np.ndarray, ksize: int = 5) -> np.ndarray:
    if not HAS_CV2:
        return image
    img_uint8 = (image * 255).astype(np.uint8) if image.max() <= 1 else image.astype(np.uint8)
    filtered = cv2.medianBlur(img_uint8, ksize)
    return filtered.astype(np.float32) / 255.0


def non_local_means(image: np.ndarray) -> np.ndarray:
    if not HAS_CV2:
        return image
    img_uint8 = (image * 255).astype(np.uint8) if image.max() <= 1 else image.astype(np.uint8)
    filtered = cv2.fastNlMeansDenoisingColored(img_uint8, None, 10, 10, 7, 21)
    return filtered.astype(np.float32) / 255.0
