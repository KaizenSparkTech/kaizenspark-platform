from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.connection import Base


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("intern_tasks.id"))
    intern_id = Column(Integer, ForeignKey("users.id"))
    github_link = Column(String)
    score = Column(Integer)
    feedback = Column(String)