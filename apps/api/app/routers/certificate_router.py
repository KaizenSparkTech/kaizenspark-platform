from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.certificate_schema import CertificateCreate, CertificateResponse
from app.services.certificate_service import create_certificate, get_certificates
from app.database.connection import get_db

router = APIRouter(prefix="/certificates", tags=["Certificates"])

@router.post("/", response_model=CertificateResponse)
def create_cert_endpoint(cert: CertificateCreate, db: Session = Depends(get_db)):
    return create_certificate(db, cert)

@router.get("/", response_model=list[CertificateResponse])
def get_certs_endpoint(db: Session = Depends(get_db)):
    return get_certificates(db)