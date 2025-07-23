# schemas/company_schema.py

from pydantic import BaseModel, Field
from typing import Optional

class CompanyRequest(BaseModel):
    """회사 생성/수정 시 요청으로 받는 스키마"""
    id: str = Field(..., max_length=20, description="회사 고유 ID")
    company_add: Optional[str] = Field(None, max_length=50, description="회사 주소")
    company_num: Optional[str] = Field(None, max_length=20, description="회사 번호")
    company_hp: Optional[str] = Field(None, max_length=40, description="회사 홈페이지")

class CompanyResponse(BaseModel):
    """회사 정보 조회 시 응답으로 보내는 스키마"""
    id: str
    company_add: Optional[str] = None
    company_num: Optional[str] = None
    company_hp: Optional[str] = None

    class Config:
        from_attributes = True