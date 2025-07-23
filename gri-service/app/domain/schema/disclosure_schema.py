# schemas/disclosure_schema.py

from pydantic import BaseModel, Field
from typing import Optional
from .category_schema import CategoryResponse # 부모 스키마 임포트

class DisclosureRequest(BaseModel):
    """공시 생성/수정 요청 스키마"""
    id: str = Field(..., max_length=6, description="공시 고유 ID")
    title: str = Field(..., max_length=70, description="공시 제목")
    category_id: Optional[str] = Field(None, max_length=6, description="상위 카테고리 ID")

class DisclosureResponse(BaseModel):
    """공시 조회 응답 스키마"""
    id: str
    title: str
    
    # 부모 객체 정보 포함
    category: Optional[CategoryResponse] = None

    class Config:
        from_attributes = True