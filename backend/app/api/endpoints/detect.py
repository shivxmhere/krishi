"""Detection and analysis endpoints."""
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, get_current_user
from app.services.ml_service import MLService
from app.models.user import User
from app.schemas.scan import ScanOut
from app.models.scan import Scan

router = APIRouter()
ml_service = MLService()


@router.post("/", response_model=Any)
async def analyze_image(
    *,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    file: UploadFile = File(...),
) -> Any:
    """Analyze an image for diseases, pests, and other factors."""
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, "File must be an image")
        
    contents = await file.read()
    
    # Run ML Service
    result = await ml_service.predict_single(
        db=db,
        image_bytes=contents,
        user_id=current_user.id,
        models=["disease", "ensemble"]
    )
    
    # Save Scan Record
    disease_info = result.get("disease", {}).get("top_prediction", {})
    scan = Scan(
        user_id=current_user.id,
        image_path=f"uploads/{file.filename}",  # Simplified
        prediction=disease_info.get("class", "unknown"),
        confidence=disease_info.get("confidence", 0.0),
        result_json=result
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)
    
    return result


@router.get("/history", response_model=List[ScanOut])
def get_scan_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """Get user's scan history."""
    return db.query(Scan).filter(Scan.user_id == current_user.id).offset(skip).limit(limit).all()


@router.get("/{scan_id}", response_model=ScanOut)
def get_scan(
    scan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """Get specific scan result."""
    scan = db.query(Scan).filter(Scan.id == scan_id, Scan.user_id == current_user.id).first()
    if not scan:
        raise HTTPException(404, "Scan not found")
    return scan
