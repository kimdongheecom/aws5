from typing import Optional, List, Dict
import asyncpg
from datetime import datetime
import os

from app.domain.model.login_model import LoginEntity


class LoginRepository:
    """Login 데이터 관리를 위한 레포지토리 클래스"""
    
    def __init__(self, pool: Optional[asyncpg.Pool] = None):
        """레포지토리 초기화
        
        Args:
            pool: 데이터베이스 연결 풀
        """
        self.pool: Optional[asyncpg.Pool] = pool
        self._entities: Dict[str, LoginEntity] = {}  # 메모리 캐시 (개발용)
    
    async def _get_connection(self) -> asyncpg.Connection:
        """데이터베이스 연결을 가져옵니다."""
        if not self.pool:
            # 환경 변수에서 DB 연결 정보 가져오기
            db_host = os.getenv('DB_HOST', 'db.supabase.co')
            db_port = int(os.getenv('DB_PORT', '5432'))
            db_name = os.getenv('DB_NAME', 'postgres')
            db_user = os.getenv('DB_USER', 'postgres')
            db_pass = os.getenv('DB_PASS', 'postgres')
            
            # 연결 풀 생성
            self.pool = await asyncpg.create_pool(
                host=db_host,
                port=db_port,
                database=db_name,
                user=db_user,
                password=db_pass
            )
            
        if not self.pool:
            raise RuntimeError("데이터베이스 연결 풀을 생성할 수 없습니다.")
            
        return await self.pool.acquire()
    
    async def _release_connection(self, conn: Optional[asyncpg.Connection]) -> None:
        """데이터베이스 연결을 반환합니다."""
        if self.pool and conn:
            await self.pool.release(conn)

    async def init_table(self):
        """Login 테이블을 초기화합니다."""
        conn = None
        try:
            conn = await self._get_connection()
            await conn.execute('''
                CREATE TABLE IF NOT EXISTS login_entities (
                    id VARCHAR(50) PRIMARY KEY,
                    provider VARCHAR(50) NOT NULL,
                    access_token TEXT NOT NULL,
                    refresh_token TEXT,
                    expires_at TIMESTAMP,
                    created_at TIMESTAMP NOT NULL DEFAULT NOW()
                )
            ''')
        finally:
            if conn:
                await self._release_connection(conn)

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
        print(f"레파지토리에 넘어온 정보: {user_name} ({user_email})")

      
        # 실제로는 upsert된 프로필 객체를 반환해야 합니다.
        return {}



    async def save_login(self, login: LoginEntity) -> LoginEntity:
        """Login 정보를 저장합니다"""
        conn = None
        try:
            # 개발환경에서는 메모리에 저장
            self._entities[login.id] = login
            
            # 데이터베이스에 저장
            if self.pool:
                conn = await self._get_connection()
                try:
                    await conn.execute('''
                        INSERT INTO login_entities(id, provider, access_token, refresh_token, expires_at, created_at)
                        VALUES($1, $2, $3, $4, $5, $6)
                        ON CONFLICT (id) DO UPDATE 
                        SET provider = $2, 
                            access_token = $3, 
                            refresh_token = $4,
                            expires_at = $5
                    ''', login.id, login.provider, login.access_token, login.refresh_token, 
                    login.expires_at, login.created_at)
                finally:
                    await self._release_connection(conn)
            
            return login
        except Exception as e:
            print(f"Error saving Login: {e}")
            raise
        finally:
            if conn:
                await self._release_connection(conn)

    async def find_login_by_id(self, id: str) -> Optional[LoginEntity]:
        """ID로 Login 정보를 조회합니다"""
        conn = None
        try:
            # 개발환경에서는 메모리에서 조회
            if id in self._entities:
                return self._entities[id]
            
            # 데이터베이스에서 조회
            if self.pool:
                conn = await self._get_connection()
                try:
                    row = await conn.fetchrow(
                        'SELECT * FROM login_entities WHERE id = $1', id
                    )
                    
                    if row:
                        return LoginEntity(
                            id=row['id'],
                            provider=row['provider'],
                            access_token=row['access_token'],
                            refresh_token=row['refresh_token'],
                            expires_at=row['expires_at'],
                            created_at=row['created_at']
                        )
                finally:
                    await self._release_connection(conn)
            
            return None
        except Exception as e:
            print(f"Error finding Login by ID: {e}")
            return None
        finally:
            if conn:
                await self._release_connection(conn)
        
    async def find_login_by_provider(self, provider: str) -> List[LoginEntity]:
        """제공자별로 Login 정보를 조회합니다"""
        conn = None
        try:
            # 개발환경에서는 메모리에서 조회
            result = [
                entity for entity in self._entities.values()
                if entity.provider == provider
            ]
            
            # 데이터베이스에서 조회
            if self.pool and not result:
                conn = await self._get_connection()
                try:
                    rows = await conn.fetch(
                        'SELECT * FROM login_entities WHERE provider = $1', provider
                    )
                    
                    for row in rows:
                        result.append(LoginEntity(
                            id=row['id'],
                            provider=row['provider'],
                            access_token=row['access_token'],
                            refresh_token=row['refresh_token'],
                            expires_at=row['expires_at'],
                            created_at=row['created_at']
                        ))
                finally:
                    await self._release_connection(conn)
            
            return result
        except Exception as e:
            print(f"Error finding Login by provider: {e}")
            return []
        finally:
            if conn:
                await self._release_connection(conn)
        
    async def delete_login(self, id: str) -> bool:
        """Login 정보를 삭제합니다"""
        conn = None
        try:
            # 개발환경에서는 메모리에서 삭제
            if id in self._entities:
                del self._entities[id]
            
            # 데이터베이스에서 삭제
            if self.pool:
                conn = await self._get_connection()
                try:
                    result = await conn.execute(
                        'DELETE FROM login_entities WHERE id = $1', id
                    )
                    return "DELETE" in result
                finally:
                    await self._release_connection(conn)
            
            return True
        except Exception as e:
            print(f"Error deleting Login: {e}")
            return False
        finally:
            if conn:
                await self._release_connection(conn) 