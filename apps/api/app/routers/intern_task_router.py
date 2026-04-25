from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.intern_task_schema import InternTaskCreate, InternTaskResponse
from app.services.intern_task_service import create_intern_task, get_intern_tasks
from app.database.connection import get_db

router = APIRouter(prefix="/intern-tasks", tags=["Intern Tasks"])

@router.post("/", response_model=InternTaskResponse)
def create_task_endpoint(task_data: InternTaskCreate, db: Session = Depends(get_db)):
    return create_intern_task(db, task_data)

@router.get("/", response_model=list[InternTaskResponse])
def get_tasks_endpoint(db: Session = Depends(get_db)):
    return get_intern_tasks(db)