"""Service layer for OnboardingChecklist operations."""

from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models.onboarding_checklist import OnboardingChecklist
from app.schemas.onboarding_schema import OnboardingChecklistCreate, OnboardingChecklistUpdate


def get_checklists_for_user(db: Session, user_id: int):
    return db.query(OnboardingChecklist).filter(OnboardingChecklist.user_id == user_id).all()


def create_checklist_item(db: Session, data: OnboardingChecklistCreate, assigned_by: int):
    item = OnboardingChecklist(**data.model_dump(), assigned_by=assigned_by)
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


def update_checklist_item(db: Session, item_id: int, data: OnboardingChecklistUpdate):
    item = db.query(OnboardingChecklist).filter(OnboardingChecklist.id == item_id).first()
    if not item:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    if data.status == "completed" and not item.completed_at:
        item.completed_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(item)
    return item


def delete_checklist_item(db: Session, item_id: int) -> bool:
    item = db.query(OnboardingChecklist).filter(OnboardingChecklist.id == item_id).first()
    if not item:
        return False
    db.delete(item)
    db.commit()
    return True
