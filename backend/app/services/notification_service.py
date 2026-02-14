"""Notification Service."""
from typing import List
from sqlalchemy.orm import Session
from app.models.notification import Notification


class NotificationService:
    def create_notification(self, db: Session, user_id: int, title: str, message: str, type: str = "info"):
        notif = Notification(
            user_id=user_id,
            title=title,
            message=message,
            notification_type=type
        )
        db.add(notif)
        db.commit()
        db.refresh(notif)
        return notif

    def get_user_notifications(self, db: Session, user_id: int, unread_only: bool = False) -> List[Notification]:
        query = db.query(Notification).filter(Notification.user_id == user_id)
        if unread_only:
            query = query.filter(Notification.is_read == False)
        return query.order_by(Notification.created_at.desc()).all()

    def mark_as_read(self, db: Session, notification_id: int):
        notif = db.query(Notification).filter(Notification.id == notification_id).first()
        if notif:
            notif.is_read = True
            db.commit()
