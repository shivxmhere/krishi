"""Image processing utilities shared across ML pipeline."""
import io
import logging
from typing import Tuple
import numpy as np
from PIL import Image

logger = logging.getLogger(__name__)

DEFAULT_SIZE = (256, 256)


def load_image_from_bytes(data: bytes, target_size: Tuple[int, int] = DEFAULT_SIZE) -> np.ndarray:
    image = Image.open(io.BytesIO(data)).convert("RGB")
    image = image.resize(target_size)
    return np.array(image, dtype=np.float32) / 255.0


def image_to_batch(image: np.ndarray) -> np.ndarray:
    if image.ndim == 3:
        return np.expand_dims(image, axis=0)
    return image
