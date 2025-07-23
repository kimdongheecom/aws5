# schemas/category_schema.py

from pydantic import BaseModel, Field
from typing import Optional

class CategoryRequest(BaseModel):
    """카테고리 생성/수정 요청 스키마"""
    id: str = Field(..., max_length=6, description="카테고리 고유 ID")
    title: str = Field(..., max_length=50, description="카테고리 제목")
    year: Optional[str] = Field(None, max_length=4, description="연도")

class CategoryResponse(BaseModel):
    """카테고리 조회 응답 스키마"""
    id: str
    title: str
    year: Optional[str] = None

    class Config:
        from_attributes = True