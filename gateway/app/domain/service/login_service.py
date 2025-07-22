# gateway/app/domain/service/login_service.py

import httpx
import os
from datetime import datetime, timedelta
from typing import Dict, Any
from urllib.parse import urlencode

from app.domain.repository.login_repository import LoginRepository
from app.domain.repository.profile_repository import ProfileRepository

class LoginService:
    """Login 인증 서비스 클래스 (수정됨)"""
    
    def __init__(self, login_repo: LoginRepository, profile_repo: ProfileRepository):
        """서비스 초기화 시 리포지토리를 주입받음"""
        self.login_repo = login_repo
        self.profile_repo = profile_repo
        
    async def handle_google_callback(self, code: str) -> Dict[str, Any]:
        """Google OAuth 콜백을 처리하고 DB에 사용자 정보를 저장합니다"""
        
        token_response = await self._exchange_code_for_token(code)
        print(f"🔍 Token response: {token_response}")
        access_token = token_response.get('access_token')
        if not access_token:
            raise Exception("Google로부터 토큰을 받아오지 못했습니다.")
        
        user_info = await self._get_google_user_info(access_token)
        print("🔍 Google로부터 받은 사용자 정보:", user_info)
        
        if not user_info or 'id' not in user_info:
            raise Exception("Google로부터 사용자 정보를 받아오지 못했습니다. ('id' 필드 누락)")
        
        user_id = user_info['id']
        print(f"🔍 User ID type: {type(user_id)}, value: {user_id}")

        # 🔧 [수정] Google ID를 문자열로 확실히 변환
        user_id = str(user_id)
        print(f"🔍 Converted User ID type: {type(user_id)}, value: {user_id}")

        expires_in = token_response.get('expires_in', 3600)
        print(f"🔍 Expires_in type: {type(expires_in)}, value: {expires_in}")
        expires_in_int = int(expires_in)
        print(f"🔍 Converted expires_in type: {type(expires_in_int)}, value: {expires_in_int}")

        login_data = {
            'id': user_id,
            'provider': 'google',
            'access_token': access_token,
            'refresh_token': token_response.get('refresh_token'),
            'expires_at': datetime.now() + timedelta(seconds=expires_in_int),
            'created_at': datetime.now()
        }
        
        profile_data = {
            'id': user_id,
            'name': user_info.get('name'),
            'email': user_info.get('email'),
            'picture': user_info.get('picture')
        }
        
        # 5. 두 테이블에 정보 저장 (UPSERT)
        await self.login_repo.upsert_login_entity(login_data)
        await self.profile_repo.upsert_profile(profile_data)
        
        # ✨ [핵심 수정] 서비스 계층에서 모든 DB 작업이 끝난 후 트랜잭션을 한번에 커밋합니다.
        await self.login_repo.session.commit()
        
        print(f"✅ DB 저장 완료: {profile_data.get('email')}")

        # 6. 컨트롤러에 전달할 결과 반환
        return {
            'access_token': access_token,
            'user_info': user_info
        }

    async def get_user_profile(self, access_token: str) -> Dict[str, Any]:
        """액세스 토큰으로 사용자 프로필을 조회합니다"""
        user_info = await self._get_google_user_info(access_token)
        if not user_info:
            raise Exception("유효하지 않은 토큰 또는 사용자 정보 조회 실패")
        return user_info
    
    async def _exchange_code_for_token(self, code: str) -> dict:
        """인증 코드를 토큰으로 교환합니다"""
        token_url = 'https://oauth2.googleapis.com/token'
        callback_uri = f"{os.getenv('GATEWAY_URL', 'http://localhost:8080')}/auth/google/callback"
        
        data = {
            'client_id': os.getenv('GOOGLE_CLIENT_ID'),
            'client_secret': os.getenv('GOOGLE_CLIENT_SECRET'),
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': callback_uri
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(token_url, data=data)
            response.raise_for_status()
            return response.json()

    async def _get_google_user_info(self, access_token: str) -> dict:
        """Google 사용자 정보를 조회합니다"""
        user_info_url = 'https://www.googleapis.com/oauth2/v2/userinfo'
        headers = {'Authorization': f'Bearer {access_token}'}
        
        async with httpx.AsyncClient() as client:
            response = await client.get(user_info_url, headers=headers)
            response.raise_for_status()
            return response.json()