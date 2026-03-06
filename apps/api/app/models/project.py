from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from datetime import datetime
from sqlalchemy.orm import relationship
from app.database.connection import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    client_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default="active")
    created_at = Column(DateTime, default=datetime.utcnow)

    tasks = relationship("Task", back_populates="project")
