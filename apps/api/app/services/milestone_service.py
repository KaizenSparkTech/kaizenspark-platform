from sqlalchemy.orm import Session
from app.models.milestone import Milestone
from app.schemas.milestone_schema import MilestoneCreate
from datetime import datetime

def create_milestone(db: Session, ms_data: MilestoneCreate):
    new_ms = Milestone(
        project_id=ms_data.project_id,
        title=ms_data.title,
        description=ms_data.description,
        due_date=ms_data.due_date,
        created_at=datetime.utcnow()
    )
    db.add(new_ms)
    db.commit()
    db.refresh(new_ms)
    return new_ms

def get_milestones(db: Session):
    return db.query(Milestone).all()