"""Service layer for Payroll operations."""

from sqlalchemy.orm import Session
from app.models.payroll import Payroll
from app.schemas.payroll_schema import PayrollCreate, PayrollUpdate


def create_payroll(db: Session, data: PayrollCreate):
    net = data.basic_salary + data.allowances - data.deductions
    entry = Payroll(**data.model_dump(), net_salary=net)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


def get_payroll(db: Session, user_id: int | None = None, month: int | None = None,
                year: int | None = None):
    query = db.query(Payroll)
    if user_id:
        query = query.filter(Payroll.user_id == user_id)
    if month:
        query = query.filter(Payroll.month == month)
    if year:
        query = query.filter(Payroll.year == year)
    return query.order_by(Payroll.year.desc(), Payroll.month.desc()).all()


def update_payroll(db: Session, payroll_id: int, data: PayrollUpdate):
    entry = db.query(Payroll).filter(Payroll.id == payroll_id).first()
    if not entry:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(entry, key, value)
    # Recalculate net salary
    entry.net_salary = entry.basic_salary + entry.allowances - entry.deductions
    db.commit()
    db.refresh(entry)
    return entry
