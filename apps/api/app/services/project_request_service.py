"""Service layer for ProjectRequest operations."""

from sqlalchemy.orm import Session
from app.models.project_request import ProjectRequest
from app.models.project import Project
from app.schemas.project_request_schema import ProjectRequestCreate, ProjectRequestReview


def create_project_request(db: Session, data: ProjectRequestCreate, client_id: int):
    request = ProjectRequest(**data.model_dump(), client_id=client_id)
    db.add(request)
    db.commit()
    db.refresh(request)
    return request


def get_project_requests(db: Session, client_id: int | None = None, status: str | None = None):
    query = db.query(ProjectRequest)
    if client_id:
        query = query.filter(ProjectRequest.client_id == client_id)
    if status:
        query = query.filter(ProjectRequest.status == status)
    return query.order_by(ProjectRequest.created_at.desc()).all()


def get_project_request_by_id(db: Session, request_id: int):
    return db.query(ProjectRequest).filter(ProjectRequest.id == request_id).first()


def review_project_request(db: Session, request_id: int, data: ProjectRequestReview, reviewer_id: int):
    request = get_project_request_by_id(db, request_id)
    if not request:
        return None
    request.status = data.status
    if data.status == "rejected":
        request.rejection_reason = data.rejection_reason
    if data.status == "under_review":
        request.reviewed_by = reviewer_id
    if data.status == "approved":
        request.approved_by = reviewer_id
    db.commit()
    db.refresh(request)
    return request


def convert_to_project(db: Session, request_id: int, pm_id: int | None = None):
    request = get_project_request_by_id(db, request_id)
    if not request or request.status != "approved":
        return None
    project = Project(
        client_id=request.client_id,
        title=request.title,
        description=request.description,
        project_request_id=request.id,
        project_manager_id=pm_id,
        budget=request.proposed_budget,
        currency=request.currency,
        end_date=request.expected_deadline,
        priority=request.priority,
        status="pending",
    )
    db.add(project)
    request.status = "converted"
    db.commit()
    db.refresh(project)
    return project
