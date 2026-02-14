"""Background removal & segmentation preprocessing."""
import numpy as np
import logging

logger = logging.getLogger(__name__)

try:
    import cv2
    HAS_CV2 = True
except ImportError:
    HAS_CV2 = False


def remove_background_grabcut(image: np.ndarray) -> np.ndarray:
    if not HAS_CV2:
        return image
    img = (image * 255).astype(np.uint8) if image.max() <= 1 else image.astype(np.uint8)
    mask = np.zeros(img.shape[:2], np.uint8)
    bgd = np.zeros((1, 65), np.float64)
    fgd = np.zeros((1, 65), np.float64)
    h, w = img.shape[:2]
    rect = (int(w * 0.05), int(h * 0.05), int(w * 0.9), int(h * 0.9))
    cv2.grabCut(img, mask, rect, bgd, fgd, 5, cv2.GC_INIT_WITH_RECT)
    mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype(np.uint8)
    result = img * mask2[:, :, np.newaxis]
    return result.astype(np.float32) / 255.0


def canny_edges(image: np.ndarray, low: int = 50, high: int = 150) -> np.ndarray:
    if not HAS_CV2:
        return np.zeros(image.shape[:2])
    img = (image * 255).astype(np.uint8) if image.max() <= 1 else image.astype(np.uint8)
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    return cv2.Canny(gray, low, high)
