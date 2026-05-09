from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.system_setting_schema import SystemSettingCreate, SystemSettingUpdate, SystemSettingResponse
from app.services.system_setting_service import get_all_settings, get_setting, set_setting, update_setting
from app.database.connection import get_db
from app.auth_dependencies import get_current_user, require_role

router = APIRouter(prefix="/settings", tags=["Settings"])

@router.get("/", response_model=list[SystemSettingResponse])
def list_settings(db: Session = Depends(get_db), _current_user=Depends(get_current_user)):
    """Any logged in user can view settings (like business contacts)."""
    return get_all_settings(db)

@router.get("/{key}", response_model=SystemSettingResponse)
def get_setting_by_key(key: str, db: Session = Depends(get_db), _current_user=Depends(get_current_user)):
    setting = get_setting(db, key)
    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")
    return setting

@router.post("/", response_model=SystemSettingResponse)
def create_setting(data: SystemSettingCreate, db: Session = Depends(get_db), _current_user=Depends(require_role("super_admin"))):
    return set_setting(db, data)

@router.put("/{setting_id}", response_model=SystemSettingResponse)
def update_setting_endpoint(setting_id: int, data: SystemSettingUpdate, db: Session = Depends(get_db), _current_user=Depends(require_role("super_admin"))):
    setting = update_setting(db, setting_id, data)
    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")
    return setting
