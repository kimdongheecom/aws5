from typing import Dict, Any
from fastapi import HTTPException, status

from app.domain.service.token_service import TokenService
from app.domain.schema.token_schema import TokenSchema, TokenResponseSchema, TokenVerifyResponseSchema

class TokenController:
    """토큰 컨트롤러"""
    
    def __init__(self):
        """컨트롤러 초기화"""
        self.service = TokenService()
    
    async def create_token(self, user_id: str) -> TokenResponseSchema:
        """새 토큰 생성"""
        try:
            return await self.service.create_token(user_id)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"토큰 생성 중 오류 발생: {str(e)}"
            )
    
    async def verify_token(self, token_schema: TokenSchema) -> TokenVerifyResponseSchema:
        """토큰 검증"""
        try:
            return await self.service.verify_token(token_schema)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"토큰 검증 중 오류 발생: {str(e)}"
            )
    
    async def revoke_token(self, token: str) -> Dict[str, Any]:
        """토큰 폐기"""
        try:
            return await self.service.revoke_token(token)
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"토큰 폐기 중 오류 발생: {str(e)}"
            )
    
    async def test_dummy_token(self, user_id: str = "test-user") -> TokenResponseSchema:
        """테스트용 더미 토큰 생성"""
        try:
            return await self.service.test_dummy_token(user_id)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"더미 토큰 생성 중 오류 발생: {str(e)}"
            )