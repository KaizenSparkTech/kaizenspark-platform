from sqlalchemy import Column, Integer, String
from app.database.connection import Base


class InternshipProgram(Base):
    __tablename__ = "internship_programs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    domain = Column(String)
    duration = Column(String)
    description = Column(String)