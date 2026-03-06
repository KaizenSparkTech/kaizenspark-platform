from sqlalchemy.orm import Session
from app.models.intern_application import InternApplication
from app.schemas.intern_application_schema import InternApplicationCreate
from datetime import datetime

def create_intern_application(db: Session, app_data: InternApplicationCreate):
    new_app = InternApplication(
        intern_name=app_data.intern_name,
        email=app_data.email,
        program_id=app_data.program_id,
        resume_path=app_data.resume_path,
        created_at=datetime.utcnow()
    )
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return new_app

def get_intern_applications(db: Session):
    return db.query(InternApplication).all()