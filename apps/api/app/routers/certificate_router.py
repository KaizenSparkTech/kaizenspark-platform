from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.schemas.certificate_schema import CertificateCreate, CertificateResponse
from app.services.certificate_service import create_certificate, get_certificates
from app.database.connection import get_db
from app.auth_dependencies import get_current_user

router = APIRouter(prefix="/certificates", tags=["Certificates"])


@router.get("/", response_model=list[CertificateResponse])
def list_certificates(intern_id: int | None = Query(None), db: Session = Depends(get_db), _=Depends(get_current_user)):
    return get_certificates(db, intern_id=intern_id)


@router.post("/", response_model=CertificateResponse)
def create_certificate_endpoint(data: CertificateCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    return create_certificate(db, data)