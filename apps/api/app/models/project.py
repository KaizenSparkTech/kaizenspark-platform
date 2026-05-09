"""Project model — expanded for full lifecycle management."""

from sqlalchemy import Column, Integer, String, Text, Numeric, Date, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(50), default="pending")  # pending, in_progress, completed, on_hold, cancelled

    # Lifecycle fields
    project_request_id = Column(Integer, ForeignKey("project_requests.id", ondelete="SET NULL"), nullable=True)
    project_manager_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    team_id = Column(Integer, ForeignKey("teams.id", ondelete="SET NULL"), nullable=True)
    budget = Column(Numeric(12, 2), nullable=True)
    currency = Column(String(3), default="INR")
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    actual_end_date = Column(Date, nullable=True)
    priority = Column(String(20), default="medium")  # low, medium, high, critical
    completion_percentage = Column(Integer, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    client = relationship("User", back_populates="projects", foreign_keys=[client_id])
    project_manager = relationship("User", back_populates="managed_projects", foreign_keys=[project_manager_id])
    team = relationship("Team", back_populates="projects", foreign_keys=[team_id])
    milestones = relationship("Milestone", back_populates="project", cascade="all, delete-orphan")
    invoices = relationship("Invoice", back_populates="project", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="project", cascade="all, delete-orphan")
    project_request = relationship("ProjectRequest", back_populates="project", foreign_keys=[project_request_id])
