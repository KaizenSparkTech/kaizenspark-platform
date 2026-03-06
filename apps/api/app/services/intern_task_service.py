from sqlalchemy.orm import Session
from app.models.intern_task import InternTask
from app.schemas.intern_task_schema import InternTaskCreate
from datetime import datetime

def create_intern_task(db: Session, task_data: InternTaskCreate):
    new_task = InternTask(
        task_name=task_data.task_name,
        description=task_data.description,
        intern_id=task_data.intern_id,
        due_date=task_data.due_date,
        created_at=datetime.utcnow()
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

def get_intern_tasks(db: Session):
    return db.query(InternTask).all()