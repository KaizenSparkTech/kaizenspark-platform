"""OnboardingChecklist model — tasks for new employee onboarding."""

from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Date, func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class OnboardingChecklist(Base):
    __tablename__ = "onboarding_checklists"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    task_title = Column(String(255), nullable=False)
    task_description = Column(Text, nullable=True)
    assigned_by = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    status = Column(String(20), default="pending")  # pending, completed
    due_date = Column(Date, nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", foreign_keys=[user_id])
    assigner = relationship("User", foreign_keys=[assigned_by])
