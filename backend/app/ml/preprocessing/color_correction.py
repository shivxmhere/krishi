"""Automatic color correction & white-balance utilities."""
import numpy as np
import logging

logger = logging.getLogger(__name__)

try:
    import cv2
    HAS_CV2 = True
except ImportError:
    HAS_CV2 = False


def histogram_equalization(image: np.ndarray) -> np.ndarray:
    if not HAS_CV2:
        return image
    img = (image * 255).astype(np.uint8) if image.max() <= 1 else image.astype(np.uint8)
    lab = cv2.cvtColor(img, cv2.COLOR_RGB2LAB)
    l, a, b = cv2.split(lab)
    l = cv2.equalizeHist(l)
    lab = cv2.merge([l, a, b])
    result = cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)
    return result.astype(np.float32) / 255.0


def adaptive_gamma(image: np.ndarray, gamma: float = 1.0) -> np.ndarray:
    if gamma == 1.0:
        mean_val = np.mean(image)
        gamma = np.log(0.5) / np.log(mean_val + 1e-8)
        gamma = np.clip(gamma, 0.5, 2.5)
    table = np.array([((i / 255.0) ** (1.0 / gamma)) * 255 for i in range(256)]).astype(np.uint8)
    img = (image * 255).astype(np.uint8) if image.max() <= 1 else image.astype(np.uint8)
    if not HAS_CV2:
        return image
    corrected = cv2.LUT(img, table)
    return corrected.astype(np.float32) / 255.0


def white_balance(image: np.ndarray) -> np.ndarray:
    result = image.copy()
    for i in range(3):
        channel = result[:, :, i]
        result[:, :, i] = (channel - channel.min()) / (channel.max() - channel.min() + 1e-8)
    return result
