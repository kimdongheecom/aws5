# schemas/sample_schema.py

from pydantic import BaseModel, Field
from typing import Optional
from .company_schema import CompanyResponse # 부모 스키마 임포트
from .disclosure_schema import DisclosureResponse # 1:1 관계 스키마 임포트

class SampleRequest(BaseModel):
    """샘플 데이터 생성/수정 요청 스키마"""
    qual_data: str = Field(..., description="정성적 샘플 데이터 (3000자 이내)")
    company_id: Optional[str] = Field(None, max_length=20, description="회사 ID")
    disclosure_id: str = Field(..., max_length=6, description="공시 ID")

class SampleResponse(BaseModel):
    """샘플 데이터 조회 응답 스키마"""
    id: int # DB에서 자동 생성된 PK
    qual_data: str

    # 부모/관계 객체 정보 포함
    company: Optional[CompanyResponse] = None
    disclosure: Optional[DisclosureResponse] = None

    class Config:
        from_attributes = True