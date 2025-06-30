from typing import Dict, List, Optional
from datetime import datetime
from app.domain.model.token_model import TokenModel

class TokenRepository:
    """토큰 저장소 클래스"""
    
    def __init__(self):
        """저장소 초기화"""
        self._tokens: Dict[str, TokenModel] = {}
        self._user_tokens: Dict[str, List[str]] = {}
    
    async def save(self, token: TokenModel) -> TokenModel:
        """토큰 저장"""
        self._tokens[token.token] = token
        
        if token.user_id not in self._user_tokens:
            self._user_tokens[token.user_id] = []
        
        self._user_tokens[token.user_id].append(token.token)
        return token
    
    async def find_by_token(self, token: str) -> Optional[TokenModel]:
        """토큰으로 조회"""
        return self._tokens.get(token)
    
    async def find_by_user_id(self, user_id: str) -> List[TokenModel]:
        """사용자 ID로 토큰 조회"""
        token_ids = self._user_tokens.get(user_id, [])
        return [self._tokens[token_id] for token_id in token_ids if token_id in self._tokens]
    
    async def revoke(self, token: str) -> Optional[TokenModel]:
        """토큰 폐기"""
        token_model = self._tokens.get(token)
        if token_model:
            token_model.is_revoked = True
            self._tokens[token] = token_model
        return token_model
    
    async def revoke_all_for_user(self, user_id: str) -> List[TokenModel]:
        """사용자의 모든 토큰 폐기"""
        revoked_tokens = []
        token_ids = self._user_tokens.get(user_id, [])
        
        for token_id in token_ids:
            if token_id in self._tokens:
                token_model = self._tokens[token_id]
                token_model.is_revoked = True
                self._tokens[token_id] = token_model
                revoked_tokens.append(token_model)
                
        return revoked_tokens