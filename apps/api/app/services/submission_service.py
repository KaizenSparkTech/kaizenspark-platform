from sqlalchemy.orm import Session
from app.models.submission import Submission
from app.schemas.submission_schema import SubmissionCreate
from datetime import datetime

def create_submission(db: Session, sub_data: SubmissionCreate):
    new_sub = Submission(
        intern_id=sub_data.intern_id,
        task_id=sub_data.task_id,
        file_path=sub_data.file_path,
        remarks=sub_data.remarks,
        submitted_at=datetime.utcnow()
    )
    db.add(new_sub)
    db.commit()
    db.refresh(new_sub)
    return new_sub

def get_submissions(db: Session):
    return db.query(Submission).all()