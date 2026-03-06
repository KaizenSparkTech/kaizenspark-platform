from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
from app.database.connection import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    client_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)