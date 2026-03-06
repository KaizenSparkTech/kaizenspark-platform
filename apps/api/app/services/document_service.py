from sqlalchemy.orm import Session
from app.models.document import Document
from app.schemas.document_schema import DocumentCreate

def create_document(db: Session, doc: DocumentCreate):
    new_doc = Document(
        name=doc.name,
        file_path=doc.file_path,
        description=doc.description
    )
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)
    return new_doc

def get_documents(db: Session):
    return db.query(Document).all()