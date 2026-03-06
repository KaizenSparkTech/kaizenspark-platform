from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.document_schema import DocumentCreate, DocumentResponse
from app.services.document_service import create_document, get_documents
from app.database.connection import get_db

router = APIRouter(prefix="/documents", tags=["Documents"])

@router.post("/", response_model=DocumentResponse)
def create_doc_endpoint(doc: DocumentCreate, db: Session = Depends(get_db)):
    return create_document(db, doc)

@router.get("/", response_model=list[DocumentResponse])
def get_docs_endpoint(db: Session = Depends(get_db)):
    return get_documents(db)