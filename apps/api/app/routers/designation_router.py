"""Designation router with RBAC."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.schemas.designation_schema import DesignationCreate, DesignationUpdate, DesignationResponse
from app.services.designation_service import get_designations, get_designation_by_id, create_designation, update_designation, delete_designation
from app.database.connection import get_db
from app.auth_dependencies import require_role
from app.models.user import User

router = APIRouter(prefix="/designations", tags=["Designations"])


@router.get("/", response_model=list[DesignationResponse])
def list_designations(department_id: int | None = Query(None), db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr", "manager"))):
    return get_designations(db, department_id)


@router.post("/", response_model=DesignationResponse)
def create_designation_endpoint(data: DesignationCreate, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr"))):
    return create_designation(db, data)


@router.put("/{designation_id}", response_model=DesignationResponse)
def update_designation_endpoint(designation_id: int, data: DesignationUpdate, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr"))):
    result = update_designation(db, designation_id, data)
    if not result:
        raise HTTPException(status_code=404, detail="Designation not found")
    return result


@router.delete("/{designation_id}")
def delete_designation_endpoint(designation_id: int, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin"))):
    if not delete_designation(db, designation_id):
        raise HTTPException(status_code=404, detail="Designation not found")
    return {"message": "Designation deleted"}
