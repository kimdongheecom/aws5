from app.domain.repository.login_repository import LoginRepository
from app.domain.model.login_model import LoginEntity
from app.domain.schema.login_schema import LoginResponseSchema, LoginSchema
import httpx
import os
import shortuuid
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
from urllib.parse import urlencode


class LoginService:
    """Login 인증 서비스 클래스"""
    
    def __init__(self):
        """서비스 초기화"""
        self.repository = LoginRepository()
        
    async def initialize(self):
        """서비스 초기화 작업"""
        # 테이블 초기화
        await self.repository.init_table()

    async def google_user_profile(self, user_info: Optional[dict]) -> Optional[dict]:
        # 1. 함수 시작 부분에서 user_info가 None인지 확인 (가드 클로즈 패턴)
        if user_info is None:
            # user_info가 없으면 아무 작업도 하지 않고 None(또는 빈 dict)을 반환
            # 로직에 따라 결정하면 됩니다. 여기서는 None을 반환하는 것이 더 명확합니다.
            return None

        # 2. 이 지점부터는 user_info가 None이 아니라고 확신할 수 있습니다.
        #    따라서 user_info를 안전하게 딕셔너리로 다룰 수 있습니다.
        #    (실제로는 여기에 DB에 저장하거나 업데이트하는 로직이 들어가겠죠)
    
        # 예시: user_info에서 값을 추출하는 로직
        user_name = user_info.get("name")
        user_email = user_info.get("email")
        print(f"서비스에 넘어온 정보보: {user_name} ({user_email})")

        # 임시로 빈 딕셔셔리를 반환하는 기존 코드는 그대로 둡니다.
        # 실제로는 upsert된 프로필 객체를 반환해야 합니다.
        return {}  
  
    
    async def get_google_auth_url(self, redirect_uri: str) -> str:
        """Google OAuth 인증 URL을 생성합니다"""
        client_id = os.getenv('GOOGLE_CLIENT_ID', '')
        if not client_id:
            raise ValueError("GOOGLE_CLIENT_ID not configured")
        
        callback_uri = f"{os.getenv('GATEWAY_URL', 'http://localhost:8080')}/auth/google/callback"
        
        params = {
            'client_id': client_id,
            'redirect_uri': callback_uri,
            'response_type': 'code',
            'scope': 'email profile',
            'access_type': 'offline',
            'prompt': 'consent',
            'state': redirect_uri  # 최종 리다이렉트 URI를 state로 전달
        }
        
        auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?{urlencode(params)}"
        return auth_url
    
    async def handle_google_callback(self, code: str, state: str) -> Dict[str, Any]:
        """Google OAuth 콜백을 처리합니다"""
        try:
            # 토큰 교환
            token_response = await self._exchange_code_for_token('google', code)
            
            if not token_response or 'access_token' not in token_response:
                raise Exception("Failed to get token from Google")
            
            # 사용자 정보 조회
            user_info = await self._get_google_user_info(token_response['access_token'])
            
            if not user_info:
                raise Exception("Failed to get user info from Google")
            
            # Login 정보 저장
            login_entity = LoginEntity(
                id=shortuuid.uuid(),
                provider='google',
                access_token=token_response['access_token'],
                refresh_token=token_response.get('refresh_token'),
                expires_at=datetime.now() + timedelta(seconds=token_response.get('expires_in', 3600)),
                created_at=datetime.now()
            )
            
            await self.repository.save_login(login_entity)
            
            return {
                'access_token': login_entity.access_token,
                'user_info': user_info,
                'redirect_uri': state
            }
            
        except Exception as e:
            print(f"Error handling Google callback: {e}")
            raise e

    async def get_user_profile(self, access_token: str) -> Dict[str, Any]:
        """액세스 토큰으로 사용자 프로필을 조회합니다"""
        try:
            user_info = await self._get_google_user_info(access_token)
            if not user_info:
                raise Exception("Failed to get user info")
            return user_info
        except Exception as e:
            print(f"Error getting user profile: {e}")
            raise e
    
    async def _get_google_user_info(self, access_token: str) -> dict:
        """Google 사용자 정보를 조회합니다"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    'https://www.googleapis.com/oauth2/v2/userinfo',
                    headers={'Authorization': f'Bearer {access_token}'}
                )
                
                if response.status_code != 200:
                    print(f"Error getting user info: {response.text}")
                    return {}
                
                return response.json()


                
        except Exception as e:
            print(f"Error getting user info: {e}")
            return {}
    
    async def get_login_by_id(self, id: str) -> Optional[LoginEntity]:
        """ID로 Login 정보를 조회합니다"""
        return await self.repository.find_login_by_id(id)
    
    async def get_login_by_provider(self, provider: str) -> List[LoginEntity]:
        """제공자별 Login 정보를 조회합니다"""
        return await self.repository.find_login_by_provider(provider)
    
    async def create_login(self, login_data: LoginSchema) -> LoginResponseSchema:
        """Login 인증 정보를 생성합니다"""
        provider = login_data.provider
        code = login_data.code
        redirect_uri = login_data.redirect_uri
        
        # 외부 Login 서비스에 토큰 요청
        token_response = await self._exchange_code_for_token(provider, code, redirect_uri)
        
        if not token_response or 'access_token' not in token_response:
            raise Exception(f"Failed to get token from {provider}")
        
        # 토큰 정보 저장
        login_entity = LoginEntity(
            id=shortuuid.uuid(),
            provider=provider,
            access_token=token_response['access_token'],
            refresh_token=token_response.get('refresh_token'),
            expires_at=datetime.now() + timedelta(seconds=token_response.get('expires_in', 3600)),
            created_at=datetime.now()
        )
        
        # 저장
        await self.repository.save_login(login_entity)
        
        # 응답 생성
        return LoginResponseSchema(
            access_token=login_entity.access_token,
            token_type="Bearer",
            expires_in=token_response.get('expires_in', 3600),
            refresh_token=login_entity.refresh_token,
            scope=token_response.get('scope'),
            created_at=login_entity.created_at
        )
    
    async def refresh_login_token(self, id: str) -> Optional[LoginResponseSchema]:
        """토큰을 갱신합니다"""
        # 기존 토큰 조회
        login_entity = await self.repository.find_login_by_id(id)
        
        if not login_entity or not login_entity.refresh_token:
            return None
        
        # 리프레시 토큰으로 새 토큰 요청
        token_response = await self._refresh_token(
            login_entity.provider, 
            login_entity.refresh_token
        )
        
        if not token_response or 'access_token' not in token_response:
            return None
        
        # 토큰 정보 업데이트
        login_entity.access_token = token_response['access_token']
        if 'refresh_token' in token_response:
            login_entity.refresh_token = token_response['refresh_token']
        
        login_entity.expires_at = datetime.now() + timedelta(seconds=token_response.get('expires_in', 3600))
        
        # 저장
        await self.repository.save_login(login_entity)
        
        # 응답 생성
        return LoginResponseSchema(
            access_token=login_entity.access_token,
            token_type="Bearer",
            expires_in=token_response.get('expires_in', 3600),
            refresh_token=login_entity.refresh_token,
            scope=token_response.get('scope'),
            created_at=login_entity.created_at
        )
    
    async def delete_login(self, id: str) -> bool:
        """Login 정보를 삭제합니다"""
        return await self.repository.delete_login(id)
    
    async def _exchange_code_for_token(self, provider: str, code: str, redirect_uri: Optional[str] = None) -> dict:
        """인증 코드를 토큰으로 교환합니다"""
        try:
            # 제공자별 토큰 엔드포인트 및 클라이언트 정보
            token_url, client_id, client_secret = self._get_provider_config(provider)
            
            # 토큰 요청 데이터
            data = {
                'client_id': client_id,
                'client_secret': client_secret,
                'code': code,
                'grant_type': 'authorization_code'
            }
            
            if redirect_uri:
                data['redirect_uri'] = redirect_uri
            else:
                # Google OAuth의 경우 기본 콜백 URI 설정
                data['redirect_uri'] = f"{os.getenv('GATEWAY_URL', 'http://localhost:8080')}/auth/google/callback"
            
            # 토큰 요청
            async with httpx.AsyncClient() as client:
                response = await client.post(token_url, data=data)
                
                if response.status_code != 200:
                    print(f"Error exchanging code for token: {response.text}")
                    return {}
                
                return response.json()
                
        except Exception as e:
            print(f"Error exchanging code for token: {e}")
            return {}
    
    async def _refresh_token(self, provider: str, refresh_token: str) -> dict:
        """리프레시 토큰으로 새 토큰을 요청합니다"""
        try:
            # 제공자별 토큰 엔드포인트 및 클라이언트 정보
            token_url, client_id, client_secret = self._get_provider_config(provider)
            
            # 토큰 갱신 요청 데이터
            data = {
                'client_id': client_id,
                'client_secret': client_secret,
                'refresh_token': refresh_token,
                'grant_type': 'refresh_token'
            }
            
            # 토큰 요청
            async with httpx.AsyncClient() as client:
                response = await client.post(token_url, data=data)
                
                if response.status_code != 200:
                    print(f"Error refreshing token: {response.text}")
                    return {}
                
                return response.json()
                
        except Exception as e:
            print(f"Error refreshing token: {e}")
            return {}
    
    def _get_provider_config(self, provider: str) -> tuple:
        """Login 제공자별 설정 정보를 가져옵니다"""
        if provider.lower() == 'google':
            return (
                'https://oauth2.googleapis.com/token',
                os.getenv('GOOGLE_CLIENT_ID', ''),
                os.getenv('GOOGLE_CLIENT_SECRET', '')
            )
        elif provider.lower() == 'facebook':
            return (
                'https://graph.facebook.com/v16.0/oauth/access_token',
                os.getenv('FACEBOOK_CLIENT_ID', ''),
                os.getenv('FACEBOOK_CLIENT_SECRET', '')
            )
        elif provider.lower() == 'github':
            return (
                'https://github.com/login/oauth/access_token',
                os.getenv('GITHUB_CLIENT_ID', ''),
                os.getenv('GITHUB_CLIENT_SECRET', '')
            )
        else:
            raise ValueError(f"Unsupported provider: {provider}")