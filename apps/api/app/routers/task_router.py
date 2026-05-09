from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.schemas.task_schema import TaskCreate, TaskUpdate, TaskResponse
from app.services.task_service import create_task, get_tasks, get_task_by_id, update_task, delete_task
from app.database.connection import get_db
from app.auth_dependencies import get_current_user

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.get("/", response_model=list[TaskResponse])
def list_tasks(milestone_id: int | None = Query(None), db: Session = Depends(get_db), _=Depends(get_current_user)):
    return get_tasks(db, milestone_id=milestone_id)


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    t = get_task_by_id(db, task_id)
    if not t:
        raise HTTPException(status_code=404, detail="Task not found")
    return t


@router.post("/", response_model=TaskResponse)
def create_task_endpoint(data: TaskCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    return create_task(db, data)


@router.put("/{task_id}", response_model=TaskResponse)
def update_task_endpoint(task_id: int, data: TaskUpdate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    t = update_task(db, task_id, data)
    if not t:
        raise HTTPException(status_code=404, detail="Task not found")
    return t


@router.delete("/{task_id}")
def delete_task_endpoint(task_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    if not delete_task(db, task_id):
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted"}