"""Disease reference ORM model."""
from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    scientific_name = Column(String)
    description = Column(Text)
    symptoms = Column(Text)
    treatment = Column(Text)
    prevention = Column(Text)
    severity = Column(String)  # low / medium / high / critical
