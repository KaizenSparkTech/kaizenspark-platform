from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.schemas.project_schema import ProjectCreate, ProjectUpdate, ProjectResponse
from app.services.project_service import create_project, get_projects, get_project_by_id, update_project, delete_project
from app.database.connection import get_db
from app.auth_dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("/", response_model=list[ProjectResponse])
def list_projects(
    client_id: int | None = Query(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Clients can only see their own projects
    if current_user.role == "client":
        return get_projects(db, client_id=current_user.id)
    return get_projects(db, client_id=client_id)


@router.get("/{project_id}", response_model=ProjectResponse)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    _current_user: User = Depends(get_current_user),
):
    project = get_project_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("/", response_model=ProjectResponse)
def create_project_endpoint(
    data: ProjectCreate,
    db: Session = Depends(get_db),
    _current_user: User = Depends(get_current_user),
):
    return create_project(db, data)


@router.put("/{project_id}", response_model=ProjectResponse)
def update_project_endpoint(
    project_id: int,
    data: ProjectUpdate,
    db: Session = Depends(get_db),
    _current_user: User = Depends(get_current_user),
):
    project = update_project(db, project_id, data)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.delete("/{project_id}")
def delete_project_endpoint(
    project_id: int,
    db: Session = Depends(get_db),
    _current_user: User = Depends(get_current_user),
):
    if not delete_project(db, project_id):
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted"}