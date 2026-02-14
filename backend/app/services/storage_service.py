"""Storage Service (Local / S3 / Cloudinary)."""
import os
import shutil
import uuid
import logging
from typing import Optional

logger = logging.getLogger(__name__)
UPLOAD_DIR = "data/uploads"


class StorageService:
    def __init__(self):
        os.makedirs(UPLOAD_DIR, exist_ok=True)

    async def save_file(self, file_obj, filename: Optional[str] = None) -> str:
        """Save file locally and return path. In prod, upload to S3."""
        ext = filename.split(".")[-1] if filename and "." in filename else "bin"
        unique_name = f"{uuid.uuid4()}.{ext}"
        file_path = os.path.join(UPLOAD_DIR, unique_name)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file_obj.file, buffer)
            
        return file_path
