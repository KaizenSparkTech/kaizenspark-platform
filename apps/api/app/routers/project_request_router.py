"""ProjectRequest router — Client submits, BA reviews, Manager/Super Admin approves."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.schemas.project_request_schema import ProjectRequestCreate, ProjectRequestReview, ProjectRequestResponse
from app.services.project_request_service import create_project_request, get_project_requests, get_project_request_by_id, review_project_request, convert_to_project
from app.database.connection import get_db
from app.auth_dependencies import get_current_user, require_role
from app.models.user import User

router = APIRouter(prefix="/project-requests", tags=["Project Requests"])


@router.get("/", response_model=list[ProjectRequestResponse])
def list_requests(status: str | None = Query(None), db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role == "client":
        return get_project_requests(db, client_id=current_user.id, status=status)
    if current_user.role in ("super_admin", "manager", "business_analyst"):
        return get_project_requests(db, status=status)
    raise HTTPException(status_code=403, detail="Access denied")


@router.get("/{request_id}", response_model=ProjectRequestResponse)
def get_request(request_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    result = get_project_request_by_id(db, request_id)
    if not result:
        raise HTTPException(status_code=404, detail="Project request not found")
    return result


@router.post("/", response_model=ProjectRequestResponse)
def submit_request(data: ProjectRequestCreate, db: Session = Depends(get_db), current_user: User = Depends(require_role("super_admin", "client"))):
    return create_project_request(db, data, client_id=current_user.id)


@router.put("/{request_id}/review", response_model=ProjectRequestResponse)
def review_request(request_id: int, data: ProjectRequestReview, db: Session = Depends(get_db), current_user: User = Depends(require_role("super_admin", "manager", "business_analyst"))):
    result = review_project_request(db, request_id, data, reviewer_id=current_user.id)
    if not result:
        raise HTTPException(status_code=404, detail="Project request not found")
    return result


@router.post("/{request_id}/convert")
def convert_request(request_id: int, pm_id: int | None = Query(None), db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "manager"))):
    result = convert_to_project(db, request_id, pm_id)
    if not result:
        raise HTTPException(status_code=400, detail="Cannot convert — request must be approved")
    return {"message": "Project created", "project_id": result.id}
