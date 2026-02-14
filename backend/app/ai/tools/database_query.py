"""Database query tool for agents."""
from sqlalchemy.orm import Session


def query_crop_info(db: Session, crop_name: str):
    from app.models.crop import Crop
    return db.query(Crop).filter(Crop.name.ilike(f"%{crop_name}%")).all()


def query_disease_info(db: Session, disease_name: str):
    from app.models.disease import Disease
    return db.query(Disease).filter(Disease.name.ilike(f"%{disease_name}%")).all()
