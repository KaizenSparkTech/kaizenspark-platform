"""ProjectRequest model — client project intake and approval workflow."""

from sqlalchemy import Column, Integer, String, Text, Numeric, Date, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class ProjectRequest(Base):
    __tablename__ = "project_requests"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    requirements_doc_url = Column(String(500), nullable=True)
    proposed_budget = Column(Numeric(12, 2), nullable=True)
    currency = Column(String(3), default="INR")
    expected_deadline = Column(Date, nullable=True)
    priority = Column(String(20), default="medium")  # low, medium, high, critical
    status = Column(String(30), default="submitted")  # submitted, under_review, approved, rejected, converted
    reviewed_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    approved_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    allocated_department_id = Column(Integer, ForeignKey("departments.id", ondelete="SET NULL"), nullable=True)
    rejection_reason = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    client = relationship("User", foreign_keys=[client_id])
    reviewer = relationship("User", foreign_keys=[reviewed_by])
    approver = relationship("User", foreign_keys=[approved_by])
    allocated_department = relationship("Department", foreign_keys=[allocated_department_id])
    project = relationship("Project", back_populates="project_request", uselist=False)
