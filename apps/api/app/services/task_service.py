from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task_schema import TaskCreate
from datetime import datetime

def create_task(db: Session, task_data: TaskCreate):
    new_task = Task(
        name=task_data.name,
        description=task_data.description,
        project_id=task_data.project_id,
        due_date=task_data.due_date,
        created_at=datetime.utcnow()
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

def get_tasks(db: Session):
    return db.query(Task).all()