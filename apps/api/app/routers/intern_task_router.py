from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.schemas.intern_task_schema import InternTaskCreate, InternTaskUpdate, InternTaskResponse
from app.services.intern_task_service import create_intern_task, get_intern_tasks, get_intern_task_by_id, update_intern_task
from app.database.connection import get_db
from app.auth_dependencies import get_current_user

router = APIRouter(prefix="/intern-tasks", tags=["Intern Tasks"])


@router.get("/", response_model=list[InternTaskResponse])
def list_intern_tasks(intern_id: int | None = Query(None), db: Session = Depends(get_db), _=Depends(get_current_user)):
    return get_intern_tasks(db, intern_id=intern_id)


@router.get("/{task_id}", response_model=InternTaskResponse)
def get_intern_task(task_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    t = get_intern_task_by_id(db, task_id)
    if not t:
        raise HTTPException(status_code=404, detail="Intern task not found")
    return t


@router.post("/", response_model=InternTaskResponse)
def create_intern_task_endpoint(data: InternTaskCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    return create_intern_task(db, data)


@router.put("/{task_id}", response_model=InternTaskResponse)
def update_intern_task_endpoint(task_id: int, data: InternTaskUpdate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    t = update_intern_task(db, task_id, data)
    if not t:
        raise HTTPException(status_code=404, detail="Intern task not found")
    return t