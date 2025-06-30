from typing import Dict, Optional, Any
from datetime import datetime, timedelta, UTC
import uuid
from jose import jwt, JWTError
from fastapi import HTTPException, status

from app.domain.repository.token_repository import TokenRepository
from app.domain.model.token_model import TokenModel
from app.domain.schema.token_schema import TokenSchema, TokenResponseSchema, TokenVerifyResponseSchema

# 토큰 설정
SECRET_KEY = "your-secret-key-for-testing-only-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class TokenService:
    """토큰 서비스"""
    
    def __init__(self):
        """서비스 초기화"""
        self.repository = TokenRepository()
    
    async def create_token(self, user_id: str) -> TokenResponseSchema:
        """새 토큰 생성"""
        expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        expires = datetime.now(UTC) + expires_delta
        
        # 토큰 페이로드
        payload = {
            "sub": user_id,
            "exp": expires,
            "iat": datetime.now(UTC),
            "jti": str(uuid.uuid4())
        }
        
        # JWT 토큰 생성
        access_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        
        # 토큰 저장
        token_model = TokenModel(
            token=access_token,
            user_id=user_id,
            expires_at=expires
        )
        
        await self.repository.save(token_model)
        
        return TokenResponseSchema(
            access_token=access_token,
            token_type="bearer",
            expires_in=int(expires_delta.total_seconds())
        )
    
    async def verify_token(self, token_schema: TokenSchema) -> TokenVerifyResponseSchema:
        """토큰 검증"""
        token = token_schema.token
        
        # 토큰 모델 조회
        token_model = await self.repository.find_by_token(token)
        
        # 토큰이 저장소에 없거나 폐기된 경우
        if not token_model or token_model.is_revoked:
            return TokenVerifyResponseSchema(
                is_valid=False,
                user_id=None,
                payload=None
            )
        
        try:
            # JWT 토큰 검증
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id = payload.get("sub")
            
            # 토큰이 만료되었는지 확인
            if datetime.now(UTC) > token_model.expires_at:
                return TokenVerifyResponseSchema(
                    is_valid=False,
                    user_id=user_id,
                    payload=None
                )
            
            return TokenVerifyResponseSchema(
                is_valid=True,
                user_id=user_id,
                payload=payload
            )
            
        except JWTError:
            return TokenVerifyResponseSchema(
                is_valid=False,
                user_id=None,
                payload=None
            )
    
    async def revoke_token(self, token: str) -> Dict[str, Any]:
        """토큰 폐기"""
        token_model = await self.repository.revoke(token)
        
        if not token_model:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="토큰을 찾을 수 없습니다."
            )
        
        return {"message": "토큰이 폐기되었습니다."}
    
    async def test_dummy_token(self, user_id: str = "test-user") -> TokenResponseSchema:
        """테스트용 더미 토큰 생성"""
        return await self.create_token(user_id)