"""Service layer for Designation CRUD operations."""

from sqlalchemy.orm import Session
from app.models.designation import Designation
from app.schemas.designation_schema import DesignationCreate, DesignationUpdate


def get_designations(db: Session, department_id: int | None = None):
    query = db.query(Designation)
    if department_id:
        query = query.filter(Designation.department_id == department_id)
    return query.all()


def get_designation_by_id(db: Session, designation_id: int):
    return db.query(Designation).filter(Designation.id == designation_id).first()


def create_designation(db: Session, data: DesignationCreate):
    designation = Designation(**data.model_dump())
    db.add(designation)
    db.commit()
    db.refresh(designation)
    return designation


def update_designation(db: Session, designation_id: int, data: DesignationUpdate):
    designation = get_designation_by_id(db, designation_id)
    if not designation:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(designation, key, value)
    db.commit()
    db.refresh(designation)
    return designation


def delete_designation(db: Session, designation_id: int) -> bool:
    designation = get_designation_by_id(db, designation_id)
    if not designation:
        return False
    db.delete(designation)
    db.commit()
    return True
