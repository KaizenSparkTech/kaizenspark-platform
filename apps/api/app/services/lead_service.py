from sqlalchemy.orm import Session
from app.models.lead import Lead
from app.schemas.lead_schema import LeadCreate


def create_lead(db: Session, data: LeadCreate) -> Lead:
    lead = Lead(**data.model_dump())
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead


def get_leads(db: Session) -> list[Lead]:
    return db.query(Lead).order_by(Lead.created_at.desc()).all()


def get_lead_by_id(db: Session, lead_id: int) -> Lead | None:
    return db.query(Lead).filter(Lead.id == lead_id).first()


def invite_lead(db: Session, lead_id: int) -> dict | None:
    from app.services.offer_letter_service import _generate_temp_password
    from app.services.user_service import hash_password, get_user_by_email
    from app.models.user import User
    from app.models.project_request import ProjectRequest

    lead = get_lead_by_id(db, lead_id)
    if not lead or lead.status != "pending":
        return None

    # Check if user email already exists
    email = lead.email
    if get_user_by_email(db, email):
        return {"error": "User with this email already exists"}

    # Generate password
    plain_password = _generate_temp_password()

    # Create client user
    new_user = User(
        name=lead.name,
        email=email,
        password=hash_password(plain_password),
        role="client",
        status="active",
        is_verified=True,
    )
    db.add(new_user)
    db.flush()

    # Create project request using lead's message
    req = ProjectRequest(
        client_id=new_user.id,
        title=f"Project Inquiry from {lead.name}",
        description=lead.message,
    )
    db.add(req)

    # Update lead status
    lead.status = "invited"

    db.commit()
    db.refresh(lead)

    return {
        "lead": lead,
        "generated_email": email,
        "generated_password": plain_password,
        "message": "Client account and project request created.",
    }