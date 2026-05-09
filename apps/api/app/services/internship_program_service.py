from sqlalchemy.orm import Session
from app.models.internship_program import InternshipProgram
from app.schemas.internship_program_schema import InternshipProgramCreate


def create_program(db: Session, data: InternshipProgramCreate) -> InternshipProgram:
    program = InternshipProgram(**data.model_dump())
    db.add(program)
    db.commit()
    db.refresh(program)
    return program


def get_programs(db: Session) -> list[InternshipProgram]:
    return db.query(InternshipProgram).order_by(InternshipProgram.created_at.desc()).all()


def get_program_by_id(db: Session, program_id: int) -> InternshipProgram | None:
    return db.query(InternshipProgram).filter(InternshipProgram.id == program_id).first()