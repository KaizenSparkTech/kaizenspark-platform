"""PerformanceReview model — employee performance evaluations."""

from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class PerformanceReview(Base):
    __tablename__ = "performance_reviews"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    reviewer_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    review_period = Column(String(50), nullable=False)  # e.g. "Q1 2026", "H1 2026"
    rating = Column(Integer, nullable=True)  # 1–5
    strengths = Column(Text, nullable=True)
    areas_of_improvement = Column(Text, nullable=True)
    goals = Column(Text, nullable=True)
    status = Column(String(20), default="draft")  # draft, submitted, acknowledged
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    employee = relationship("User", foreign_keys=[employee_id])
    reviewer = relationship("User", foreign_keys=[reviewer_id])
