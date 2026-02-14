"""Custom data loaders for training pipeline."""
import os, logging
from typing import Tuple, Optional
import numpy as np

logger = logging.getLogger(__name__)


class DataLoader:
    """Load training data from directory structure (class_name/images)."""

    def __init__(self, image_size: Tuple[int, int] = (256, 256)):
        self.image_size = image_size

    def load_directory(self, path: str) -> Tuple[Optional[np.ndarray], Optional[np.ndarray]]:
        if not os.path.isdir(path):
            logger.warning("Data directory not found: %s", path)
            return None, None

        from PIL import Image
        images, labels = [], []
        class_names = sorted(d for d in os.listdir(path) if os.path.isdir(os.path.join(path, d)))
        for label_idx, cls in enumerate(class_names):
            cls_dir = os.path.join(path, cls)
            for fname in os.listdir(cls_dir):
                fpath = os.path.join(cls_dir, fname)
                try:
                    img = Image.open(fpath).convert("RGB").resize(self.image_size)
                    images.append(np.array(img, dtype=np.float32) / 255.0)
                    labels.append(label_idx)
                except Exception:
                    continue

        if not images:
            return None, None
        return np.array(images), np.array(labels)

    def get_class_names(self, path: str):
        if not os.path.isdir(path):
            return []
        return sorted(d for d in os.listdir(path) if os.path.isdir(os.path.join(path, d)))
