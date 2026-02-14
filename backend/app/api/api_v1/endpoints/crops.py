from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Crop])
def read_crops(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve crops for current user.
    """
    crops = db.query(models.Crop).filter(models.Crop.owner_id == current_user.id).offset(skip).limit(limit).all()
    return crops

@router.post("/", response_model=schemas.Crop)
def create_crop(
    *,
    db: Session = Depends(deps.get_db),
    crop_in: schemas.CropCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new crop.
    """
    crop = models.Crop(**crop_in.model_dump(), owner_id=current_user.id)
    db.add(crop)
    db.commit()
    db.refresh(crop)
    return crop

@router.get("/{id}", response_model=schemas.Crop)
def read_crop(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get crop by ID.
    """
    crop = db.query(models.Crop).filter(models.Crop.id == id, models.Crop.owner_id == current_user.id).first()
    if not crop:
        raise HTTPException(status_code=404, detail="Crop not found")
    return crop

@router.put("/{id}", response_model=schemas.Crop)
def update_crop(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    crop_in: schemas.CropUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a crop.
    """
    crop = db.query(models.Crop).filter(models.Crop.id == id, models.Crop.owner_id == current_user.id).first()
    if not crop:
        raise HTTPException(status_code=404, detail="Crop not found")
    
    update_data = crop_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(crop, field, value)
    
    db.add(crop)
    db.commit()
    db.refresh(crop)
    return crop

@router.delete("/{id}", response_model=schemas.Crop)
def delete_crop(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete a crop.
    """
    crop = db.query(models.Crop).filter(models.Crop.id == id, models.Crop.owner_id == current_user.id).first()
    if not crop:
        raise HTTPException(status_code=404, detail="Crop not found")
    
    db.delete(crop)
    db.commit()
    return crop
