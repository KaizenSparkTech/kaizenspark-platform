from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.schemas.invoice_schema import InvoiceCreate, InvoiceUpdate, InvoiceResponse
from app.services.invoice_service import create_invoice, get_invoices, get_invoice_by_id, update_invoice, delete_invoice
from app.database.connection import get_db
from app.auth_dependencies import get_current_user

router = APIRouter(prefix="/invoices", tags=["Invoices"])


@router.get("/", response_model=list[InvoiceResponse])
def list_invoices(project_id: int | None = Query(None), db: Session = Depends(get_db), _=Depends(get_current_user)):
    return get_invoices(db, project_id=project_id)


@router.get("/{invoice_id}", response_model=InvoiceResponse)
def get_invoice(invoice_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    inv = get_invoice_by_id(db, invoice_id)
    if not inv:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return inv


@router.post("/", response_model=InvoiceResponse)
def create_invoice_endpoint(data: InvoiceCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    return create_invoice(db, data)


@router.put("/{invoice_id}", response_model=InvoiceResponse)
def update_invoice_endpoint(invoice_id: int, data: InvoiceUpdate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    inv = update_invoice(db, invoice_id, data)
    if not inv:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return inv


@router.delete("/{invoice_id}")
def delete_invoice_endpoint(invoice_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    if not delete_invoice(db, invoice_id):
        raise HTTPException(status_code=404, detail="Invoice not found")
    return {"message": "Invoice deleted"}