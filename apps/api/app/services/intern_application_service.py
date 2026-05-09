from sqlalchemy.orm import Session
from app.models.intern_application import InternApplication
from app.schemas.intern_application_schema import InternApplicationCreate, InternApplicationUpdate


def create_application(db: Session, data: InternApplicationCreate) -> InternApplication:
    app = InternApplication(**data.model_dump())
    db.add(app)
    db.commit()
    db.refresh(app)
    return app


def get_applications(db: Session, user_id: int | None = None, program_id: int | None = None) -> list[InternApplication]:
    query = db.query(InternApplication)
    if user_id:
        query = query.filter(InternApplication.user_id == user_id)
    if program_id:
        query = query.filter(InternApplication.program_id == program_id)
    return query.order_by(InternApplication.applied_at.desc()).all()


def get_application_by_id(db: Session, app_id: int) -> InternApplication | None:
    return db.query(InternApplication).filter(InternApplication.id == app_id).first()


def update_application(db: Session, app_id: int, data: InternApplicationUpdate) -> InternApplication | None:
    application = get_application_by_id(db, app_id)
    if not application:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(application, key, value)
    db.commit()
    db.refresh(application)
    return application