"""OfferLetter router with RBAC — Super Admin/HR creates/sends, candidates accept/reject."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.offer_letter_schema import (
    OfferLetterCreate, OfferLetterUpdate, OfferLetterAccept,
    OfferLetterResponse, SendOfferResponse,
)
from app.services.offer_letter_service import (
    get_offer_letters, get_offer_letter_by_id, create_offer_letter,
    update_offer_letter, send_offer_letter, accept_offer_letter, reject_offer_letter,
)
from app.database.connection import get_db
from app.auth_dependencies import get_current_user, require_role
from app.models.user import User

router = APIRouter(prefix="/offer-letters", tags=["Offer Letters"])


@router.get("/", response_model=list[OfferLetterResponse])
def list_offer_letters(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Super Admin/HR see all; other users see only offers linked to them
    if current_user.role in ("super_admin", "hr"):
        return get_offer_letters(db)
    from app.services.offer_letter_service import get_offer_letter_by_email
    return get_offer_letter_by_email(db, current_user.email)


@router.get("/{offer_id}", response_model=OfferLetterResponse)
def get_offer(offer_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    offer = get_offer_letter_by_id(db, offer_id)
    if not offer:
        raise HTTPException(status_code=404, detail="Offer letter not found")
    return offer


@router.post("/", response_model=OfferLetterResponse)
def create_offer(data: OfferLetterCreate, db: Session = Depends(get_db), current_user: User = Depends(require_role("super_admin", "hr"))):
    return create_offer_letter(db, data, sent_by=current_user.id)


@router.put("/{offer_id}", response_model=OfferLetterResponse)
def update_offer(offer_id: int, data: OfferLetterUpdate, db: Session = Depends(get_db), _: User = Depends(require_role("super_admin", "hr"))):
    result = update_offer_letter(db, offer_id, data)
    if not result:
        raise HTTPException(status_code=404, detail="Offer letter not found")
    return result


@router.post("/{offer_id}/send")
def send_offer(offer_id: int, db: Session = Depends(get_db), current_user: User = Depends(require_role("super_admin", "hr"))):
    """Send offer — auto-creates a user account. Returns generated credentials (shown once)."""
    result = send_offer_letter(db, offer_id, sent_by_user_id=current_user.id)
    if not result:
        raise HTTPException(status_code=400, detail="Cannot send — offer must be in draft status")
    return {
        "offer": OfferLetterResponse.model_validate(result["offer"]),
        "generated_email": result["generated_email"],
        "generated_password": result["generated_password"],
        "message": f"Offer sent! User account created. Share these credentials with {result['offer'].candidate_name}:",
    }


@router.post("/{offer_id}/accept", response_model=OfferLetterResponse)
def accept_offer(offer_id: int, data: OfferLetterAccept, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    result = accept_offer_letter(db, offer_id, data.signature_text)
    if not result:
        raise HTTPException(status_code=400, detail="Cannot accept — offer must be in sent status")
    return result


@router.post("/{offer_id}/reject", response_model=OfferLetterResponse)
def reject_offer(offer_id: int, db: Session = Depends(get_db), _: User = Depends(get_current_user)):
    result = reject_offer_letter(db, offer_id)
    if not result:
        raise HTTPException(status_code=400, detail="Cannot reject — offer must be in sent status")
    return result
