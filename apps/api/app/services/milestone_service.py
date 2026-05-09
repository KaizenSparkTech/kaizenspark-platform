from sqlalchemy.orm import Session
from app.models.milestone import Milestone
from app.schemas.milestone_schema import MilestoneCreate, MilestoneUpdate


def create_milestone(db: Session, data: MilestoneCreate) -> Milestone:
    milestone = Milestone(**data.model_dump())
    db.add(milestone)
    db.commit()
    db.refresh(milestone)
    return milestone


def get_milestones(db: Session, project_id: int | None = None) -> list[Milestone]:
    query = db.query(Milestone)
    if project_id:
        query = query.filter(Milestone.project_id == project_id)
    return query.order_by(Milestone.created_at.desc()).all()


def get_milestone_by_id(db: Session, milestone_id: int) -> Milestone | None:
    return db.query(Milestone).filter(Milestone.id == milestone_id).first()


def update_milestone(db: Session, milestone_id: int, data: MilestoneUpdate) -> Milestone | None:
    milestone = get_milestone_by_id(db, milestone_id)
    if not milestone:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(milestone, key, value)
    db.commit()
    db.refresh(milestone)
    return milestone


def delete_milestone(db: Session, milestone_id: int) -> bool:
    milestone = get_milestone_by_id(db, milestone_id)
    if not milestone:
        return False
    db.delete(milestone)
    db.commit()
    return True