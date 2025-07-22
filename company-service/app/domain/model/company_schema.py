# company-service/app/domain/model/company_schema.py

from pydantic import BaseModel, Field
from typing import Optional
from datetime import date

class CompanyBase(BaseModel):
    """
    모든 회사 스키마의 기본 필드를 정의합니다.
    프론트엔드에서 넘어오는 데이터와 일치해야 합니다.
    """
    company_name: str = Field(..., description="회사명", max_length=255)
    ceo_name: Optional[str] = Field(None, description="CEO 이름", max_length=100)
    establishment_date: Optional[date] = Field(None, description="설립일")
    employee_count: Optional[int] = Field(None, description="직원 수")
    company_add: Optional[str] = Field(None, description="회사 주소")
    company_num: Optional[str] = Field(None, description="회사 번호", max_length=50)
    company_hp: Optional[str] = Field(None, description="회사 홈페이지")
    domestic_business: Optional[str] = Field(None, description="국내 사업")
    overseas_business: Optional[str] = Field(None, description="해외 사업") # 컬럼명 확인

    class Config:
        # Pydantic V2에서는 orm_mode 대신 from_attributes를 사용
        from_attributes = True

class CompanyCreate(CompanyBase):
    """회사 생성을 위한 스키마"""
    pass

class CompanyRead(CompanyBase):
    """회사 정보를 읽을 때 응답으로 사용할 스키마"""
    id: str = Field(..., description="고유 ID")