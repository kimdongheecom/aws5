from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


# ✅ Finance 요청용 Pydantic 모델
class FinanceRequest(BaseModel):
    company_name: str = Field(..., description="회사명", example="샘플전자")
    