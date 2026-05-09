from sqlalchemy.orm import Session
from app.models.intern_task import InternTask
from app.schemas.intern_task_schema import InternTaskCreate, InternTaskUpdate


def create_intern_task(db: Session, data: InternTaskCreate) -> InternTask:
    task = InternTask(**data.model_dump())
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def get_intern_tasks(db: Session, intern_id: int | None = None) -> list[InternTask]:
    query = db.query(InternTask)
    if intern_id:
        query = query.filter(InternTask.intern_id == intern_id)
    return query.order_by(InternTask.created_at.desc()).all()


def get_intern_task_by_id(db: Session, task_id: int) -> InternTask | None:
    return db.query(InternTask).filter(InternTask.id == task_id).first()


def update_intern_task(db: Session, task_id: int, data: InternTaskUpdate) -> InternTask | None:
    task = get_intern_task_by_id(db, task_id)
    if not task:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task