from sqlalchemy.orm import Session
from app.models.invoice import Invoice
from app.schemas.invoice_schema import InvoiceCreate, InvoiceUpdate


def create_invoice(db: Session, data: InvoiceCreate) -> Invoice:
    invoice = Invoice(**data.model_dump())
    db.add(invoice)
    db.commit()
    db.refresh(invoice)
    return invoice


def get_invoices(db: Session, project_id: int | None = None) -> list[Invoice]:
    query = db.query(Invoice)
    if project_id:
        query = query.filter(Invoice.project_id == project_id)
    return query.order_by(Invoice.created_at.desc()).all()


def get_invoice_by_id(db: Session, invoice_id: int) -> Invoice | None:
    return db.query(Invoice).filter(Invoice.id == invoice_id).first()


def update_invoice(db: Session, invoice_id: int, data: InvoiceUpdate) -> Invoice | None:
    invoice = get_invoice_by_id(db, invoice_id)
    if not invoice:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(invoice, key, value)
    db.commit()
    db.refresh(invoice)
    return invoice


def delete_invoice(db: Session, invoice_id: int) -> bool:
    invoice = get_invoice_by_id(db, invoice_id)
    if not invoice:
        return False
    db.delete(invoice)
    db.commit()
    return True