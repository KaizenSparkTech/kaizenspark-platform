"""Service layer for OfferLetter operations.

Key behavior: When an offer is SENT, the system auto-creates a User account
with a generated platform email and temp password.
"""

import secrets
import re
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models.offer_letter import OfferLetter
from app.models.user import User
from app.models.onboarding_checklist import OnboardingChecklist
from app.schemas.offer_letter_schema import OfferLetterCreate, OfferLetterUpdate
from app.services.user_service import hash_password


def get_offer_letters(db: Session, status: str | None = None):
    query = db.query(OfferLetter)
    if status:
        query = query.filter(OfferLetter.status == status)
    return query.order_by(OfferLetter.created_at.desc()).all()


def get_offer_letter_by_id(db: Session, offer_id: int):
    return db.query(OfferLetter).filter(OfferLetter.id == offer_id).first()


def get_offer_letter_by_email(db: Session, email: str):
    """Get offers matching candidate_email OR generated_email."""
    return db.query(OfferLetter).filter(
        (OfferLetter.candidate_email == email) | (OfferLetter.generated_email == email),
        OfferLetter.status.in_(["sent", "accepted"]),
    ).all()


def create_offer_letter(db: Session, data: OfferLetterCreate, sent_by: int):
    offer = OfferLetter(**data.model_dump(), sent_by=sent_by)
    db.add(offer)
    db.commit()
    db.refresh(offer)
    return offer


def update_offer_letter(db: Session, offer_id: int, data: OfferLetterUpdate):
    offer = get_offer_letter_by_id(db, offer_id)
    if not offer:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(offer, key, value)
    db.commit()
    db.refresh(offer)
    return offer


def _generate_platform_email(db: Session, candidate_name: str) -> str:
    """Generate a unique platform email like firstname@kaizenspark.com."""
    # Clean name: take first name, lowercase, remove special chars
    clean = re.sub(r"[^a-zA-Z]", "", candidate_name.split()[0]).lower()
    if not clean:
        clean = "user"

    base_email = f"{clean}@kaizenspark.com"
    # Check for duplicates
    if not db.query(User).filter(User.email == base_email).first():
        return base_email

    # Add incrementing suffix
    counter = 1
    while True:
        email = f"{clean}{counter}@kaizenspark.com"
        if not db.query(User).filter(User.email == email).first():
            return email
        counter += 1


def _generate_temp_password() -> str:
    """Generate a readable temp password."""
    return secrets.token_urlsafe(10)  # ~13 chars, URL-safe


def _create_default_onboarding_tasks(db: Session, user_id: int, assigned_by: int):
    """Create standard onboarding checklist for a new hire."""
    tasks = [
        ("Change temporary password", "Change your temporary password to a secure one"),
        ("Complete personal profile", "Fill in your personal details — phone, address, GitHub, LinkedIn"),
        ("Review and accept offer letter", "Read your offer letter carefully and accept it with your e-signature"),
        ("Introduce yourself", "Post a brief introduction in the team channel"),
    ]
    for title, description in tasks:
        item = OnboardingChecklist(
            user_id=user_id,
            task_title=title,
            task_description=description,
            assigned_by=assigned_by,
            status="pending",
        )
        db.add(item)
    db.commit()


def send_offer_letter(db: Session, offer_id: int, sent_by_user_id: int):
    """
    Send an offer letter — this auto-creates a User account.
    Returns (offer, generated_email, plain_password) or None on failure.
    """
    offer = get_offer_letter_by_id(db, offer_id)
    if not offer or offer.status != "draft":
        return None

    # 1. Generate platform email and temp password
    generated_email = _generate_platform_email(db, offer.candidate_name)
    plain_password = _generate_temp_password()

    # 2. Create the user account
    new_user = User(
        name=offer.candidate_name,
        email=generated_email,
        password=hash_password(plain_password),
        role=offer.role_offered,
        status="onboarding",
        is_verified=False,
        personal_email=offer.candidate_email,
        onboarding_status="pending",
        temp_password_changed=False,
        department_id=offer.department_id,
        designation_id=offer.designation_id,
        date_of_joining=offer.joining_date,
    )
    db.add(new_user)
    db.flush()  # Get the user ID without committing

    # 3. Update the offer with generated info
    offer.status = "sent"
    offer.generated_user_id = new_user.id
    offer.generated_email = generated_email

    db.commit()
    db.refresh(offer)

    # 4. Create default onboarding tasks
    _create_default_onboarding_tasks(db, new_user.id, sent_by_user_id)

    return {
        "offer": offer,
        "generated_email": generated_email,
        "generated_password": plain_password,
    }


def accept_offer_letter(db: Session, offer_id: int, signature_text: str):
    offer = get_offer_letter_by_id(db, offer_id)
    if not offer or offer.status != "sent":
        return None
    offer.status = "accepted"
    offer.accepted_at = datetime.now(timezone.utc)
    offer.signature_text = signature_text

    # Update user onboarding status if linked
    if offer.generated_user_id:
        user = db.query(User).filter(User.id == offer.generated_user_id).first()
        if user and user.onboarding_status in ("pending", "in_progress"):
            user.onboarding_status = "completed"

    db.commit()
    db.refresh(offer)
    return offer


def reject_offer_letter(db: Session, offer_id: int):
    offer = get_offer_letter_by_id(db, offer_id)
    if not offer or offer.status != "sent":
        return None
    offer.status = "rejected"
    db.commit()
    db.refresh(offer)
    return offer
