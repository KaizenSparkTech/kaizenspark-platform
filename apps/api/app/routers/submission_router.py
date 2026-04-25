from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.submission_schema import SubmissionCreate, SubmissionResponse
from app.services.submission_service import create_submission, get_submissions
from app.database.connection import get_db

router = APIRouter(prefix="/submissions", tags=["Submissions"])

@router.post("/", response_model=SubmissionResponse)
def create_submission_endpoint(sub_data: SubmissionCreate, db: Session = Depends(get_db)):
    return create_submission(db, sub_data)

@router.get("/", response_model=list[SubmissionResponse])
def get_submissions_endpoint(db: Session = Depends(get_db)):
    return get_submissions(db)