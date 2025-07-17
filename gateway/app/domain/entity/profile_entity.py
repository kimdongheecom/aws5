# entities/profile_entity.py

from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
# from uuid import UUID # 더 이상 필요하지 않습니다.

# Pydantic 모델을 사용하여 테이블 스키마를 클래스로 정의합니다.
class ProfileEntity(BaseModel):
    # id와 company_id를 DB 스키마에 맞춰 'str' 타입으로 변경합니다.
    id: str
    
    name: Optional[str] = None
    picture: Optional[str] = None
    
    updated_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    
    email: Optional[EmailStr] = None
    
    department: Optional[str] = None
    role: str = 'user'
    
    # company_id도 'str' 타입으로 변경합니다.
    company_id: Optional[str] = None

    class Config:
        orm_mode = True