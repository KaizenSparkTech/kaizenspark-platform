"""Service layer for OfferLetter operations."""

from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models.offer_letter import OfferLetter
from app.schemas.offer_letter_schema import OfferLetterCreate, OfferLetterUpdate


def get_offer_letters(db: Session, status: str | None = None):
    query = db.query(OfferLetter)
    if status:
        query = query.filter(OfferLetter.status == status)
    return query.order_by(OfferLetter.created_at.desc()).all()


def get_offer_letter_by_id(db: Session, offer_id: int):
    return db.query(OfferLetter).filter(OfferLetter.id == offer_id).first()


def get_offer_letter_by_email(db: Session, email: str):
    return db.query(OfferLetter).filter(
        OfferLetter.candidate_email == email,
        OfferLetter.status.in_(["sent", "draft"]),
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


def send_offer_letter(db: Session, offer_id: int):
    offer = get_offer_letter_by_id(db, offer_id)
    if not offer or offer.status != "draft":
        return None
    offer.status = "sent"
    db.commit()
    db.refresh(offer)
    return offer


def accept_offer_letter(db: Session, offer_id: int, signature_text: str):
    offer = get_offer_letter_by_id(db, offer_id)
    if not offer or offer.status != "sent":
        return None
    offer.status = "accepted"
    offer.accepted_at = datetime.now(timezone.utc)
    offer.signature_text = signature_text
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
