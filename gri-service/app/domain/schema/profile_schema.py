# schemas/profile_schema.py

from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from .company_schema import CompanyResponse # 부모 스키마 임포트

class ProfileRequest(BaseModel):
    """프로필 생성/수정 요청 스키마"""
    id: str = Field(..., max_length=30, description="프로필 고유 ID")
    name: Optional[str] = Field(None, max_length=30)
    picture: Optional[str] = Field(None, max_length=70)
    email: Optional[EmailStr] = Field(None, max_length=70)
    locale: Optional[str] = Field(None, max_length=10)
    department: Optional[str] = Field(None, max_length=20)
    role: Optional[str] = Field(None, max_length=20)
    company_id: Optional[str] = Field(None, max_length=30, description="소속 회사 ID")

class ProfileResponse(BaseModel):
    """프로필 조회 응답 스키마"""
    id: str
    name: Optional[str] = None
    picture: Optional[str] = None
    email: Optional[EmailStr] = None
    email_verified: bool
    locale: Optional[str] = None
    department: Optional[str] = None
    role: Optional[str] = None
    
    # 부모 객체 정보 포함
    company: Optional[CompanyResponse] = None

    class Config:
        from_attributes = True