# gri-service/app/domain/model/answer_schema.py

from pydantic import BaseModel, Field
from typing import Optional, List

# --- 개별 답변을 위한 스키마 ---
class AnswerCreate(BaseModel):
    """개별 답변 생성을 위한 스키마 (요청의 일부)"""
    requirement_id: str = Field(..., max_length=10, description="요구사항 ID")
    quant_data: str = Field(..., description="정량적 답변 데이터")

# --- 프론트엔드에서 보낼 전체 요청을 위한 스키마 ---
class AnswerBulkCreateRequest(BaseModel):
    """여러 답변을 한번에 생성/수정하기 위한 요청 스키마"""
    user_id: str = Field(..., description="답변을 작성한 사용자 ID") # 인증 통해 얻는 것이 이상적
    answers: List[AnswerCreate]

# --- 응답을 위한 스키마 ---
class AnswerResponse(BaseModel):
    """답변 조회 응답 스키마"""
    id: int
    quant_data: str
    requirement_id: str
    user_id: Optional[str] = None

    class Config:
        from_attributes = True

class BulkUpsertResponse(BaseModel):
    """대량 처리 후 응답 스키마"""
    message: str
    processed_count: int