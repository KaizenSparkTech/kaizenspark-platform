from sqlalchemy.orm import Session
from app.models.document import Document
from app.schemas.document_schema import DocumentCreate


def create_document(db: Session, data: DocumentCreate) -> Document:
    doc = Document(**data.model_dump())
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc


def get_documents(db: Session, project_id: int | None = None) -> list[Document]:
    query = db.query(Document)
    if project_id:
        query = query.filter(Document.project_id == project_id)
    return query.order_by(Document.created_at.desc()).all()


def get_document_by_id(db: Session, doc_id: int) -> Document | None:
    return db.query(Document).filter(Document.id == doc_id).first()


def delete_document(db: Session, doc_id: int) -> bool:
    doc = get_document_by_id(db, doc_id)
    if not doc:
        return False
    db.delete(doc)
    db.commit()
    return True