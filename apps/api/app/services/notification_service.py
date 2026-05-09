"""Service layer for Notification operations."""

from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models.notification import Notification
from app.schemas.notification_schema import NotificationCreate


def create_notification(db: Session, data: NotificationCreate):
    notification = Notification(**data.model_dump())
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification


def get_notifications(db: Session, user_id: int, unread_only: bool = False, limit: int = 50):
    query = db.query(Notification).filter(Notification.user_id == user_id)
    if unread_only:
        query = query.filter(Notification.is_read == False)  # noqa: E712
    return query.order_by(Notification.created_at.desc()).limit(limit).all()


def mark_as_read(db: Session, notification_id: int, user_id: int):
    notification = db.query(Notification).filter(
        Notification.id == notification_id, Notification.user_id == user_id
    ).first()
    if not notification:
        return None
    notification.is_read = True
    notification.read_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(notification)
    return notification


def mark_all_as_read(db: Session, user_id: int):
    db.query(Notification).filter(
        Notification.user_id == user_id, Notification.is_read == False  # noqa: E712
    ).update({"is_read": True, "read_at": datetime.now(timezone.utc)})
    db.commit()


def get_unread_count(db: Session, user_id: int) -> int:
    return db.query(Notification).filter(
        Notification.user_id == user_id, Notification.is_read == False  # noqa: E712
    ).count()
