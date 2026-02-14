"""Authentication service."""
from datetime import timedelta
from typing import Optional

from sqlalchemy.orm import Session
from app.core import security
from app.models.user import User
from app.schemas.auth import UserCreate, Token
from app.config import settings


class AuthService:
    def authenticate_user(self, db: Session, email: str, password: str) -> Optional[User]:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            return None
        if not security.verify_password(password, user.hashed_password):
            return None
        return user

    def create_user(self, db: Session, user_in: UserCreate) -> User:
        hashed_password = security.get_password_hash(user_in.password)
        db_user = User(
            email=user_in.email,
            hashed_password=hashed_password,
            full_name=user_in.full_name,
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user

    def create_token(self, user_id: int) -> Token:
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = security.create_access_token(
            subject=user_id, expires_delta=access_token_expires
        )
        return Token(access_token=access_token, token_type="bearer")
