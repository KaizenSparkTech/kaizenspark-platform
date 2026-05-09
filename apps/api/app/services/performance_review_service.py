"""Service layer for PerformanceReview operations."""

from sqlalchemy.orm import Session
from app.models.performance_review import PerformanceReview
from app.schemas.performance_review_schema import PerformanceReviewCreate, PerformanceReviewUpdate


def create_review(db: Session, data: PerformanceReviewCreate, reviewer_id: int):
    review = PerformanceReview(**data.model_dump(), reviewer_id=reviewer_id)
    db.add(review)
    db.commit()
    db.refresh(review)
    return review


def get_reviews(db: Session, employee_id: int | None = None, reviewer_id: int | None = None):
    query = db.query(PerformanceReview)
    if employee_id:
        query = query.filter(PerformanceReview.employee_id == employee_id)
    if reviewer_id:
        query = query.filter(PerformanceReview.reviewer_id == reviewer_id)
    return query.order_by(PerformanceReview.created_at.desc()).all()


def update_review(db: Session, review_id: int, data: PerformanceReviewUpdate):
    review = db.query(PerformanceReview).filter(PerformanceReview.id == review_id).first()
    if not review:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(review, key, value)
    db.commit()
    db.refresh(review)
    return review
