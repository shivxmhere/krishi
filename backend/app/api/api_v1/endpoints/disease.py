from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app import models, schemas
from app.api import deps
from app.services.disease_detection import disease_service

from app.api import deps
from app.services.disease_detection import disease_service
from app.core.limiter import limiter
from fastapi import Request

router = APIRouter()

@router.post("/detect", response_model=schemas.Disease)
@limiter.limit("10/minute")
async def detect_disease(
    request: Request,
    *,
    db: Session = Depends(deps.get_db),
    file: UploadFile = File(...),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Detect disease from uploaded image.
    """
    contents = await file.read()
    
    # Predict
    result = disease_service.predict(contents)
    
    # Save result
    disease_detection = models.DiseaseDetection(
        image_path=file.filename, # In real app, save file to S3/Disk and store path
        detected_disease=result["disease"],
        confidence=str(result["confidence"]),
        user_id=current_user.id
    )
    db.add(disease_detection)
    db.commit()
    db.refresh(disease_detection)
    return disease_detection

@router.get("/", response_model=List[schemas.Disease])
def read_detections(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve disease detection history.
    """
    detections = db.query(models.DiseaseDetection).filter(
        models.DiseaseDetection.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return detections
