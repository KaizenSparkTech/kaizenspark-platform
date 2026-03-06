from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.invoice_schema import InvoiceCreate, InvoiceResponse
from app.services.invoice_service import create_invoice, get_invoices
from app.database.connection import get_db

router = APIRouter(prefix="/invoices", tags=["Invoices"])

@router.post("/", response_model=InvoiceResponse)
def create_invoice_endpoint(invoice_data: InvoiceCreate, db: Session = Depends(get_db)):
    return create_invoice(db, invoice_data)

@router.get("/", response_model=list[InvoiceResponse])
def get_invoices_endpoint(db: Session = Depends(get_db)):
    return get_invoices(db)