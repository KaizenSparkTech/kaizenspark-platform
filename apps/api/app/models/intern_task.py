from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from app.database.connection import Base


class InternTask(Base):
    __tablename__ = "intern_tasks"

    id = Column(Integer, primary_key=True, index=True)
    program_id = Column(Integer, ForeignKey("internship_programs.id"))
    title = Column(String)
    description = Column(String)
    deadline = Column(DateTime)