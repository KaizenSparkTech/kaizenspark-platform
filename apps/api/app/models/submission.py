from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean, func
from sqlalchemy.orm import relationship

from app.database.connection import Base


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    intern_task_id = Column(Integer, ForeignKey("intern_tasks.id", ondelete="CASCADE"), nullable=False)
    github_link = Column(Text, nullable=False)
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())
    reviewed = Column(Boolean, default=False)
    feedback = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    intern_task = relationship("InternTask", back_populates="submissions")