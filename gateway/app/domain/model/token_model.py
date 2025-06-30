from datetime import datetime, UTC
from pydantic import BaseModel, Field

class TokenModel(BaseModel):
    """토큰 모델"""
    token: str
    user_id: str
    expires_at: datetime
    is_revoked: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(UTC))