from sqlalchemy.orm import Session
from app.models.system_setting import SystemSetting
from app.schemas.system_setting_schema import SystemSettingCreate, SystemSettingUpdate

def get_setting(db: Session, key: str) -> SystemSetting | None:
    return db.query(SystemSetting).filter(SystemSetting.key == key).first()

def get_all_settings(db: Session) -> list[SystemSetting]:
    return db.query(SystemSetting).all()

def set_setting(db: Session, data: SystemSettingCreate) -> SystemSetting:
    setting = get_setting(db, data.key)
    if setting:
        setting.value = data.value
        if data.description:
            setting.description = data.description
    else:
        setting = SystemSetting(**data.model_dump())
        db.add(setting)
    db.commit()
    db.refresh(setting)
    return setting

def update_setting(db: Session, setting_id: int, data: SystemSettingUpdate) -> SystemSetting | None:
    setting = db.query(SystemSetting).filter(SystemSetting.id == setting_id).first()
    if not setting:
        return None
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(setting, key, value)
    db.commit()
    db.refresh(setting)
    return setting
