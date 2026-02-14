"""Input validators."""
from fastapi import HTTPException


def validate_image_file(content_type: str) -> None:
    allowed = {"image/jpeg", "image/png", "image/webp", "image/bmp"}
    if content_type not in allowed:
        raise HTTPException(status_code=400, detail=f"Invalid image type: {content_type}. Allowed: {allowed}")


def validate_positive_int(value: int, name: str = "value") -> None:
    if value <= 0:
        raise HTTPException(status_code=400, detail=f"{name} must be positive")
