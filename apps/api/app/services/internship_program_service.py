from sqlalchemy.orm import Session
from app.models.internship_program import InternshipProgram
from app.schemas.internship_program_schema import InternshipProgramCreate

def create_internship_program(db: Session, prog_data: InternshipProgramCreate):
    new_prog = InternshipProgram(
        title=prog_data.title,
        description=prog_data.description,
        start_date=prog_data.start_date,
        end_date=prog_data.end_date
    )
    db.add(new_prog)
    db.commit()
    db.refresh(new_prog)
    return new_prog

def get_internship_programs(db: Session):
    return db.query(InternshipProgram).all()