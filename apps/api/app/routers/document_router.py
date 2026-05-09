from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.schemas.document_schema import DocumentCreate, DocumentResponse
from app.services.document_service import create_document, get_documents, delete_document
from app.database.connection import get_db
from app.auth_dependencies import get_current_user

router = APIRouter(prefix="/documents", tags=["Documents"])


@router.get("/", response_model=list[DocumentResponse])
def list_documents(project_id: int | None = Query(None), db: Session = Depends(get_db), _=Depends(get_current_user)):
    return get_documents(db, project_id=project_id)


@router.post("/", response_model=DocumentResponse)
def create_document_endpoint(data: DocumentCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    return create_document(db, data)


@router.delete("/{doc_id}")
def delete_document_endpoint(doc_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    if not delete_document(db, doc_id):
        raise HTTPException(status_code=404, detail="Document not found")
    return {"message": "Document deleted"}