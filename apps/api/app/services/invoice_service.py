from sqlalchemy.orm import Session
from app.models.invoice import Invoice
from app.schemas.invoice_schema import InvoiceCreate
from datetime import datetime

def create_invoice(db: Session, invoice_data: InvoiceCreate):
    new_invoice = Invoice(
        project_id=invoice_data.project_id,
        amount=invoice_data.amount,
        status=invoice_data.status,
        issued_date=invoice_data.issued_date or datetime.utcnow()
    )
    db.add(new_invoice)
    db.commit()
    db.refresh(new_invoice)
    return new_invoice

def get_invoices(db: Session):
    return db.query(Invoice).all()