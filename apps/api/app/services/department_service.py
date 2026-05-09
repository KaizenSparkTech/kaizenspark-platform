"""Service layer for Department CRUD operations."""

from sqlalchemy.orm import Session
from app.models.department import Department
from app.schemas.department_schema import DepartmentCreate, DepartmentUpdate


def get_departments(db: Session):
    return db.query(Department).all()


def get_department_by_id(db: Session, department_id: int):
    return db.query(Department).filter(Department.id == department_id).first()


def create_department(db: Session, data: DepartmentCreate):
    department = Department(**data.model_dump())
    db.add(department)
    db.commit()
    db.refresh(department)
    return department


def update_department(db: Session, department_id: int, data: DepartmentUpdate):
    department = get_department_by_id(db, department_id)
    if not department:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(department, key, value)
    db.commit()
    db.refresh(department)
    return department


def delete_department(db: Session, department_id: int) -> bool:
    department = get_department_by_id(db, department_id)
    if not department:
        return False
    db.delete(department)
    db.commit()
    return True
