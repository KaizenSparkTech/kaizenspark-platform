from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.task_schema import TaskCreate, TaskResponse
from app.services.task_service import create_task, get_tasks
from app.database.connection import get_db

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("/", response_model=TaskResponse)
def create_task_endpoint(task_data: TaskCreate, db: Session = Depends(get_db)):
    return create_task(db, task_data)

@router.get("/", response_model=list[TaskResponse])
def get_tasks_endpoint(db: Session = Depends(get_db)):
    return get_tasks(db)