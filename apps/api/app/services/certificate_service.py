from sqlalchemy.orm import Session
from app.models.certificate import Certificate
from app.schemas.certificate_schema import CertificateCreate

def create_certificate(db: Session, cert: CertificateCreate):
    new_cert = Certificate(
        title=cert.title,
        description=cert.description,
        issued_date=cert.issued_date
    )
    db.add(new_cert)
    db.commit()
    db.refresh(new_cert)
    return new_cert

def get_certificates(db: Session):
    return db.query(Certificate).all()