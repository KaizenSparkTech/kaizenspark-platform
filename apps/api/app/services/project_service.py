from sqlalchemy.orm import Session
from app.models.project import Project
from app.schemas.project_schema import ProjectCreate, ProjectUpdate


def create_project(db: Session, data: ProjectCreate) -> Project:
    project = Project(
        title=data.title,
        description=data.description,
        client_id=data.client_id,
        status=data.status,
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


def get_projects(db: Session, client_id: int | None = None) -> list[Project]:
    query = db.query(Project)
    if client_id:
        query = query.filter(Project.client_id == client_id)
    return query.order_by(Project.created_at.desc()).all()


def get_project_by_id(db: Session, project_id: int) -> Project | None:
    return db.query(Project).filter(Project.id == project_id).first()


def update_project(db: Session, project_id: int, data: ProjectUpdate) -> Project | None:
    project = get_project_by_id(db, project_id)
    if not project:
        return None
    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(project, key, value)
    db.commit()
    db.refresh(project)
    return project


def delete_project(db: Session, project_id: int) -> bool:
    project = get_project_by_id(db, project_id)
    if not project:
        return False
    db.delete(project)
    db.commit()
    return True