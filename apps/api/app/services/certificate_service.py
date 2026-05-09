from sqlalchemy.orm import Session
from app.models.certificate import Certificate
from app.schemas.certificate_schema import CertificateCreate


def create_certificate(db: Session, data: CertificateCreate) -> Certificate:
    cert = Certificate(**data.model_dump())
    db.add(cert)
    db.commit()
    db.refresh(cert)
    return cert


def get_certificates(db: Session, intern_id: int | None = None) -> list[Certificate]:
    query = db.query(Certificate)
    if intern_id:
        query = query.filter(Certificate.intern_id == intern_id)
    return query.order_by(Certificate.created_at.desc()).all()


def get_certificate_by_id(db: Session, cert_id: int) -> Certificate | None:
    return db.query(Certificate).filter(Certificate.id == cert_id).first()