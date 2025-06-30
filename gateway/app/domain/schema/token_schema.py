from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

class TokenSchema(BaseModel):
    """클라이언트로부터 받은 토큰을 검증하기 위한 스키마"""
    token: str = Field(..., description="클라이언트에서 전송한 인증 토큰")

class TokenResponseSchema(BaseModel):
    """토큰 발급 응답 스키마"""
    access_token: str = Field(..., description="액세스 토큰")
    token_type: str = Field("bearer", description="토큰 타입")
    expires_in: int = Field(..., description="토큰 만료 시간(초)")

class TokenVerifyResponseSchema(BaseModel):
    """토큰 검증 결과 스키마"""
    is_valid: bool = Field(..., description="토큰 유효성")
    user_id: Optional[str] = Field(None, description="사용자 ID")
    payload: Optional[Dict[str, Any]] = Field(None, description="토큰 페이로드")