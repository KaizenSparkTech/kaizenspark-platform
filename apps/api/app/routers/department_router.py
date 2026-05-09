"""Department router with RBAC — super_admin, hr, manager have access."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.department_schema import DepartmentCreate, DepartmentUpdate, DepartmentResponse
from app.services.department_service import get_departments, get_department_by_id, create_department, update_department, delete_department
from app.database.connection import get_db
from app.auth_dependencies import require_role
from app.models.user import User

router = APIRouter(prefix="/departments", tags=["Departments"])


@router.get("/", response_model=list[DepartmentResponse])
def list_departments(db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr", "manager"))):
    return get_departments(db)


@router.get("/{department_id}", response_model=DepartmentResponse)
def get_department(department_id: int, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr", "manager"))):
    dept = get_department_by_id(db, department_id)
    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")
    return dept


@router.post("/", response_model=DepartmentResponse)
def create_department_endpoint(data: DepartmentCreate, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr"))):
    return create_department(db, data)


@router.put("/{department_id}", response_model=DepartmentResponse)
def update_department_endpoint(department_id: int, data: DepartmentUpdate, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr"))):
    dept = update_department(db, department_id, data)
    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")
    return dept


@router.delete("/{department_id}")
def delete_department_endpoint(department_id: int, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin"))):
    if not delete_department(db, department_id):
        raise HTTPException(status_code=404, detail="Department not found")
    return {"message": "Department deleted"}
