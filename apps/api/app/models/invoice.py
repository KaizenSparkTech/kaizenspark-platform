from sqlalchemy import Column, Integer, ForeignKey, Float, DateTime, String
from datetime import datetime
from app.database.connection import Base


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    amount = Column(Float)
    status = Column(String)
    issued_date = Column(DateTime, default=datetime.utcnow)
    due_date = Column(DateTime)