from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.project_schema import ProjectCreate, ProjectResponse
from app.services.project_service import create_project, get_projects
from app.database.connection import get_db

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.post("/", response_model=ProjectResponse)
def create_project_endpoint(proj_data: ProjectCreate, db: Session = Depends(get_db)):
    return create_project(db, proj_data)

@router.get("/", response_model=list[ProjectResponse])
def get_projects_endpoint(db: Session = Depends(get_db)):
    return get_projects(db)