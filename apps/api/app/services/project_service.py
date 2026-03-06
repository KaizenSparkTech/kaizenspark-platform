from sqlalchemy.orm import Session
from app.models.project import Project
from app.schemas.project_schema import ProjectCreate
from datetime import datetime

def create_project(db: Session, proj_data: ProjectCreate):
    new_proj = Project(
        name=proj_data.name,
        description=proj_data.description,
        start_date=proj_data.start_date,
        end_date=proj_data.end_date,
        created_at=datetime.utcnow()
    )
    db.add(new_proj)
    db.commit()
    db.refresh(new_proj)
    return new_proj

def get_projects(db: Session):
    return db.query(Project).all()