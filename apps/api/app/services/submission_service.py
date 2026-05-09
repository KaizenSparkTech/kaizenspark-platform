from sqlalchemy.orm import Session
from app.models.submission import Submission
from app.schemas.submission_schema import SubmissionCreate, SubmissionUpdate


def create_submission(db: Session, data: SubmissionCreate) -> Submission:
    sub = Submission(**data.model_dump())
    db.add(sub)
    db.commit()
    db.refresh(sub)
    return sub


def get_submissions(db: Session, intern_task_id: int | None = None) -> list[Submission]:
    query = db.query(Submission)
    if intern_task_id:
        query = query.filter(Submission.intern_task_id == intern_task_id)
    return query.order_by(Submission.created_at.desc()).all()


def get_submission_by_id(db: Session, sub_id: int) -> Submission | None:
    return db.query(Submission).filter(Submission.id == sub_id).first()


def update_submission(db: Session, sub_id: int, data: SubmissionUpdate) -> Submission | None:
    sub = get_submission_by_id(db, sub_id)
    if not sub:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(sub, key, value)
    db.commit()
    db.refresh(sub)
    return sub