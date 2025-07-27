from pydantic import BaseModel, Field
from typing import Optional

class SampleRead(BaseModel):
    """
    [수정] Sample 데이터 조회를 위한 응답(Response) 스키마입니다.
    이름을 더 명확하게 변경했습니다.
    """
    qual_data: Optional[str] = Field(None, description="조회된 질적 데이터")

    class Config:
        # SQLAlchemy 모델 인스턴스를 Pydantic 모델로 변환할 수 있도록 설정
        from_attributes = True