from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.schemas.submission_schema import SubmissionCreate, SubmissionUpdate, SubmissionResponse
from app.services.submission_service import create_submission, get_submissions, update_submission
from app.database.connection import get_db
from app.auth_dependencies import get_current_user

router = APIRouter(prefix="/submissions", tags=["Submissions"])


@router.get("/", response_model=list[SubmissionResponse])
def list_submissions(intern_task_id: int | None = Query(None), db: Session = Depends(get_db), _=Depends(get_current_user)):
    return get_submissions(db, intern_task_id=intern_task_id)


@router.post("/", response_model=SubmissionResponse)
def create_submission_endpoint(data: SubmissionCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    return create_submission(db, data)


@router.put("/{sub_id}", response_model=SubmissionResponse)
def update_submission_endpoint(sub_id: int, data: SubmissionUpdate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    s = update_submission(db, sub_id, data)
    if not s:
        raise HTTPException(status_code=404, detail="Submission not found")
    return s