from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.internship_program_schema import InternshipProgramCreate, InternshipProgramResponse
from app.services.internship_program_service import create_internship_program, get_internship_programs
from app.database.connection import get_db

router = APIRouter(prefix="/internship-programs", tags=["Internship Programs"])

@router.post("/", response_model=InternshipProgramResponse)
def create_prog_endpoint(prog_data: InternshipProgramCreate, db: Session = Depends(get_db)):
    return create_internship_program(db, prog_data)

@router.get("/", response_model=list[InternshipProgramResponse])
def get_programs_endpoint(db: Session = Depends(get_db)):
    return get_internship_programs(db)