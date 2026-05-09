from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.internship_program_schema import InternshipProgramCreate, InternshipProgramResponse
from app.services.internship_program_service import create_program, get_programs, get_program_by_id
from app.database.connection import get_db
from app.auth_dependencies import get_current_user

router = APIRouter(prefix="/internship-programs", tags=["Internship Programs"])


@router.get("/", response_model=list[InternshipProgramResponse])
def list_programs(db: Session = Depends(get_db), _=Depends(get_current_user)):
    return get_programs(db)


@router.get("/{program_id}", response_model=InternshipProgramResponse)
def get_program(program_id: int, db: Session = Depends(get_db), _=Depends(get_current_user)):
    p = get_program_by_id(db, program_id)
    if not p:
        raise HTTPException(status_code=404, detail="Program not found")
    return p


@router.post("/", response_model=InternshipProgramResponse)
def create_program_endpoint(data: InternshipProgramCreate, db: Session = Depends(get_db), _=Depends(get_current_user)):
    return create_program(db, data)