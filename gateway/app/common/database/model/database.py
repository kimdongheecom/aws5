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

# ✅ [수정] pgbouncer와의 호환성을 위한 connect_args 함수를 간결하게 정리합니다.
# 가장 핵심적인 설정은 statement_cache_size=0 입니다.
def get_connect_args() -> dict:
    """
    Pgbouncer 호환성을 위해 Prepared Statement 캐시를 비활성화하는
    연결 옵션을 반환합니다.
    """
    return {"statement_cache_size": 0}

# 데이터베이스 연결 URL 생성
DATABASE_URL = get_database_url()

# 로그 출력 (비밀번호 마스킹) - 더 안전한 방식으로 수정
masked_url = DATABASE_URL
if '@' in masked_url and ':' in masked_url.split('@')[0]:
    user_pass_part, host_part = masked_url.split('://')[1].split('@')
    user, _ = user_pass_part.split(':')
    masked_url = f"postgresql+asyncpg://{user}:***@{host_part}"
print(f"🔗 데이터베이스 연결 시도: {masked_url}")


# ✅ [핵심 수정] SQLAlchemy 비동기 엔진 생성 시, 위에서 정의한 get_connect_args() 함수를 사용하도록 변경합니다.
engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    pool_size=5,
    max_overflow=10,
    pool_timeout=30,
    pool_recycle=3600,
    connect_args=get_connect_args()  # 하드코딩 대신 함수 호출로 변경
)

# 비동기 세션 메이커 생성
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

print("✅ 데이터베이스 엔진이 생성되었습니다.")

# --- 나머지 코드는 변경할 필요 없습니다 ---

async def get_session() -> AsyncSession:
    """새로운 데이터베이스 세션을 반환합니다."""
    return AsyncSessionLocal()

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    비동기 데이터베이스 세션을 생성하고 반환하는 의존성 함수.
    FastAPI의 Depends와 함께 사용됩니다.
    
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
            # 이 부분이 이제 에러 없이 실행될 것입니다.
            await conn.run_sync(Base.metadata.create_all)
        print("✅ 데이터베이스 테이블이 성공적으로 생성되었습니다.")
    except Exception as e:
        print(f"❌ 테이블 생성 실패: {e}")
        # raise # 애플리케이션 시작이 중단되지 않도록 raise는 주석 처리하는 것이 좋을 수 있습니다.

async def test_connection():
    """
    데이터베이스 연결을 테스트합니다.
    """
    try:
        # test_connection은 engine.connect()를 사용하는 것이 더 안정적입니다.
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        print("✅ 데이터베이스 연결 테스트 성공")
        return True
    except Exception as e:
        print(f"❌ 데이터베이스 연결 테스트 실패: {e}")
        return False

# ... (하위 호환성 클래스와 인스턴스는 그대로 유지) ...
def get_database_url_for_display() -> str:
    return DATABASE_URL

class Database:
    def __init__(self):
        self.engine = engine
        self.async_session_maker = AsyncSessionLocal
    
    async def get_session(self) -> AsyncSession:
        return await get_session()
    
    async def create_tables(self):
        return await create_tables()
    
    async def test_connection(self):
        return await test_connection()

db = Database()