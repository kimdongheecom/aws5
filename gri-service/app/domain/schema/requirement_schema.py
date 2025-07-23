# schemas/requirement_schema.py

from pydantic import BaseModel, Field
from typing import Optional
from .disclosure_schema import DisclosureResponse # 부모 스키마 임포트

class RequirementRequest(BaseModel):
    """요구사항 생성/수정 요청 스키마"""
    id: str = Field(..., max_length=10, description="요구사항 고유 ID")
    question: str = Field(..., description="요구사항 질문 (1000자 이내)")
    disclosure_id: Optional[str] = Field(None, max_length=6, description="상위 공시 ID")

class RequirementResponse(BaseModel):
    """요구사항 조회 응답 스키마"""
    id: str
    question: str

    # 부모 객체 정보 포함
    disclosure: Optional[DisclosureResponse] = None

    class Config:
        from_attributes = True