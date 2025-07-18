"""
데이터베이스 연결 및 세션 관리
"""
from datetime import datetime
import os
from typing import Optional, AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, Text, DateTime, func, text
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

class Base(DeclarativeBase):
    """SQLAlchemy 모델의 기본 클래스"""
    pass

class Profile(Base):
    """사용자 프로필 테이블"""
    __tablename__ = "profiles"

    id: Mapped[str] = mapped_column(String(50), primary_key=True)
    name: Mapped[Optional[str]] = mapped_column(String(100))
    picture: Mapped[Optional[str]] = mapped_column(Text)
    email: Mapped[Optional[str]] = mapped_column(String(100))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class LoginEntityDB(Base):
    """로그인 정보 테이블"""
    __tablename__ = "login_entities"

    id: Mapped[str] = mapped_column(String(50), primary_key=True)
    provider: Mapped[str] = mapped_column(String(50), nullable=False)
    access_token: Mapped[str] = mapped_column(Text, nullable=False)
    refresh_token: Mapped[Optional[str]] = mapped_column(Text)
    expires_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

def get_database_url() -> str:
    """
    환경 변수를 기반으로 데이터베이스 연결 URL을 생성합니다.
    """
    db_host = os.getenv('DB_HOST')
    db_port = os.getenv('DB_PORT', '5432')
    db_name = os.getenv('DB_NAME', 'postgres')
    db_user = os.getenv('DB_USER', 'postgres')
    db_pass = os.getenv('DB_PASS')

    if not all([db_host, db_pass, db_user, db_name, db_port]):
        raise ValueError("데이터베이스 연결을 위한 환경 변수가 충분하지 않습니다. (DB_HOST, DB_PASS 등)")

    print("🚀 Supabase 데이터베이스 연결을 시도합니다.")
    return f"postgresql+asyncpg://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

# ✅ [변경] pgbouncer(Connection Pooler)와 호환되도록 connect_args 함수를 다시 추가합니다.
def get_connect_args() -> dict:
    """
    데이터베이스 연결 옵션을 반환합니다.
    pgbouncer는 prepared statement를 지원하지 않으므로 비활성화합니다.
    """
    return {"server_settings": {"statement_cache_size": "0"}}

# 데이터베이스 연결 URL 생성
DATABASE_URL = get_database_url()

# 로그 출력 (비밀번호 마스킹)
masked_url = DATABASE_URL
for keyword in ['password', 'pass']:
    if '@' in masked_url:
        parts = masked_url.split('@')
        if ':' in parts[0]:
            user_pass = parts[0].split(':')
            if len(user_pass) >= 3:
                user_pass[-1] = '***'
                parts[0] = ':'.join(user_pass)
                masked_url = '@'.join(parts)
print(f"🔗 데이터베이스 연결 시도: {masked_url}")

# ✅ [변경] SQLAlchemy 비동기 엔진 생성 시 connect_args를 다시 추가합니다.
engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    pool_size=5,
    max_overflow=10,
    pool_timeout=30,
    pool_recycle=3600,
    connect_args=get_connect_args()
)

# 비동기 세션 메이커 생성
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

print("✅ 데이터베이스 엔진이 생성되었습니다.")

async def get_session() -> AsyncSession:
    """새로운 데이터베이스 세션을 반환합니다."""
    return AsyncSessionLocal()

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    비동기 데이터베이스 세션을 생성하고 반환하는 의존성 함수
    FastAPI의 Depends와 함께 사용됨
    
    Yields:
        AsyncSession: 비동기 데이터베이스 세션
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def create_tables():
    """데이터베이스 테이블을 생성합니다. (개발 환경에서만 사용)"""
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("✅ 데이터베이스 테이블이 성공적으로 생성되었습니다.")
    except Exception as e:
        print(f"❌ 테이블 생성 실패: {e}")
        raise

async def test_connection():
    """
    데이터베이스 연결을 테스트합니다.
    
    Returns:
        bool: 연결 성공 여부
    """
    try:
        async with AsyncSessionLocal() as session:
            result = await session.execute(text("SELECT 1"))
            result.scalar()
        print("✅ 데이터베이스 연결 테스트 성공")
        return True
    except Exception as e:
        print(f"❌ 데이터베이스 연결 테스트 실패: {e}")
        return False

def get_database_url_for_display() -> str:
    """
    현재 데이터베이스 URL 반환 (로깅용)
    
    Returns:
        str: 데이터베이스 연결 URL
    """
    return DATABASE_URL

# 하위 호환성을 위한 Database 클래스 (기존 코드와의 호환성 유지)
class Database:
    """하위 호환성을 위한 Database 클래스"""
    
    def __init__(self):
        self.engine = engine
        self.async_session_maker = AsyncSessionLocal
    
    async def get_session(self) -> AsyncSession:
        """새로운 데이터베이스 세션을 반환합니다."""
        return await get_session()
    
    async def create_tables(self):
        """데이터베이스 테이블을 생성합니다."""
        return await create_tables()
    
    async def test_connection(self):
        """데이터베이스 연결을 테스트합니다."""
        return await test_connection()

# 전역 데이터베이스 인스턴스 생성 (하위 호환성)
db = Database()