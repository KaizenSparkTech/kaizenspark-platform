from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.connection import get_db
from ..models.task import Task

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.get("/")
def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()

@router.post("/")
def create_task(title: str, project_id: int, db: Session = Depends(get_db)):
    new_task = Task(title=title, project_id=project_id)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@router.put("/{task_id}")
def update_task(task_id: int, status: str, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    task.status = status
    db.commit()
    return {"message": "Task updated successfully"}