"""Classical computer-vision feature extraction (SIFT, ORB, HOG, LBP)."""
import numpy as np
import logging
from typing import Dict, Any

logger = logging.getLogger(__name__)

try:
    import cv2
    HAS_CV2 = True
except ImportError:
    HAS_CV2 = False


def extract_orb(image: np.ndarray, n_features: int = 500) -> Dict[str, Any]:
    if not HAS_CV2:
        return {"keypoints": 0}
    img = (image * 255).astype(np.uint8) if image.max() <= 1 else image.astype(np.uint8)
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    orb = cv2.ORB_create(nfeatures=n_features)
    kp, des = orb.detectAndCompute(gray, None)
    return {"keypoints": len(kp), "descriptor_shape": des.shape if des is not None else None}


def extract_color_histogram(image: np.ndarray, bins: int = 64) -> np.ndarray:
    if not HAS_CV2:
        return np.zeros(bins * 3)
    img = (image * 255).astype(np.uint8) if image.max() <= 1 else image.astype(np.uint8)
    features = []
    for i in range(3):
        hist = cv2.calcHist([img], [i], None, [bins], [0, 256])
        features.extend(hist.flatten())
    arr = np.array(features, dtype=np.float32)
    return arr / (arr.sum() + 1e-8)


def extract_hog(image: np.ndarray) -> np.ndarray:
    try:
        from skimage.feature import hog as skimage_hog
        gray = np.mean(image, axis=2) if image.ndim == 3 else image
        feat = skimage_hog(gray, orientations=9, pixels_per_cell=(8, 8), cells_per_block=(2, 2))
        return feat
    except ImportError:
        return np.zeros(1)
