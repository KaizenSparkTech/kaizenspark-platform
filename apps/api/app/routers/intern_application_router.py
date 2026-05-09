from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.schemas.intern_application_schema import InternApplicationCreate, InternApplicationUpdate, InternApplicationResponse
from app.services.intern_application_service import create_application, get_applications, update_application
from app.database.connection import get_db
from app.auth_dependencies import get_current_user

router = APIRouter(prefix="/intern-applications", tags=["Intern Applications"])


@router.get("/", response_model=list[InternApplicationResponse])
def list_applications(
    user_id: int | None = Query(None),
    program_id: int | None = Query(None),
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    return get_applications(db, user_id=user_id, program_id=program_id)


@router.post("/", response_model=InternApplicationResponse)
def create_application_endpoint(data: InternApplicationCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    return create_application(db, data)


@router.put("/{app_id}", response_model=InternApplicationResponse)
def update_application_endpoint(app_id: int, data: InternApplicationUpdate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    a = update_application(db, app_id, data)
    if not a:
        raise HTTPException(status_code=404, detail="Application not found")
    return a