from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.connection import get_db
from ..models.project import Project

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("/")
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()

@router.post("/")
def create_project(title: str, description: str, db: Session = Depends(get_db)):
    new_project = Project(title=title, description=description)
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project