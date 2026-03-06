from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from ..database.connection import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    status = Column(String, default="active") # active, completed, etc.

    tasks = relationship("Task", back_populates="project")