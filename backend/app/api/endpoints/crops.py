"""Crop management endpoints."""
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user, get_current_admin_user
from app.models.crop import Crop
from app.schemas.crop import CropCreate, CropUpdate, CropOut
from app.models.user import User

router = APIRouter()


@router.get("/", response_model=List[CropOut])
def read_crops(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user),
) -> Any:
    """Retrieve crops."""
    return db.query(Crop).offset(skip).limit(limit).all()


@router.post("/", response_model=CropOut)
def create_crop(
    *,
    db: Session = Depends(get_db),
    crop_in: CropCreate,
    current_user: User = Depends(get_current_admin_user),
) -> Any:
    """Create new crop (Admin only)."""
    crop = Crop(**crop_in.dict())
    db.add(crop)
    db.commit()
    db.refresh(crop)
    return crop


@router.put("/{crop_id}", response_model=CropOut)
def update_crop(
    *,
    db: Session = Depends(get_db),
    crop_id: int,
    crop_in: CropUpdate,
    current_user: User = Depends(get_current_admin_user),
) -> Any:
    """Update a crop (Admin only)."""
    crop = db.query(Crop).filter(Crop.id == crop_id).first()
    if not crop:
        raise HTTPException(404, "Crop not found")
    for field, value in crop_in.dict(exclude_unset=True).items():
        setattr(crop, field, value)
    db.add(crop)
    db.commit()
    db.refresh(crop)
    return crop
