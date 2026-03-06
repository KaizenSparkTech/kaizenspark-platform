from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.intern_application_schema import InternApplicationCreate, InternApplicationResponse
from app.services.intern_application_service import create_intern_application, get_intern_applications
from app.database.connection import get_db

router = APIRouter(prefix="/intern-applications", tags=["Intern Applications"])

@router.post("/", response_model=InternApplicationResponse)
def create_intern_app_endpoint(app_data: InternApplicationCreate, db: Session = Depends(get_db)):
    return create_intern_application(db, app_data)

@router.get("/", response_model=list[InternApplicationResponse])
def get_intern_apps_endpoint(db: Session = Depends(get_db)):
    return get_intern_applications(db)