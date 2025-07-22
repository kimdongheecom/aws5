"""
데이터베이스 연결 및 세션 관리
(최종 수정: 불필요한 전역 인스턴스 및 클래스 제거)
"""
from datetime import datetime
import os
from typing import Optional, AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, Text, DateTime, func, text
from dotenv import load_dotenv

# --- 1. 환경 변수 로드 ---
load_dotenv()

# --- 2. SQLAlchemy 모델 정의 ---

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

# --- 3. 데이터베이스 연결 설정 ---

def get_database_url() -> str:
    """환경 변수를 기반으로 데이터베이스 연결 URL을 생성합니다."""
    db_host = os.getenv('DB_HOST')
    db_port = os.getenv('DB_PORT', '6543') # PgBouncer 포트를 기본값으로 설정
    db_name = os.getenv('DB_NAME', 'postgres')
    db_user = os.getenv('DB_USER', 'postgres')
    db_pass = os.getenv('DB_PASS')

    if not all([db_host, db_pass, db_user, db_name, db_port]):
        raise ValueError("데이터베이스 연결을 위한 환경 변수가 충분하지 않습니다.")

    print(f"🚀 Supabase 데이터베이스 연결을 시도합니다. (포트: {db_port})")
    return f"postgresql+asyncpg://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

def get_connect_args() -> dict:
    """Pgbouncer 호환성을 위해 Prepared Statement 캐시를 비활성화합니다."""
    return {"statement_cache_size": 0}

# 데이터베이스 엔진 및 세션 메이커 생성
DATABASE_URL = get_database_url()

# Supabase PgBouncer는 transaction pooling을 사용하므로, prepared statement cache가 문제를 일으킬 수 있음
# statement_cache_size=0 으로 설정하여 비활성화
# source: https://github.com/supabase/supabase/discussions/3698
# 에러 로그: sqlalchemy.dialects.postgresql.asyncpg.ProgrammingError: <class 'asyncpg.exceptions._base.DuplicatePreparedStatementError'>: prepared statement "__asyncpg_stmt_1__" already exists
connect_args = {"statement_cache_size": 0}
engine = create_async_engine(DATABASE_URL, echo=False, connect_args=connect_args)

print("✅✅✅ [진단] 최종 수정된 database.py 코드가 실행됩니다. connect_args가 적용되었습니다. ✅✅✅")


# 비동기 세션 생성
# autocommit=False, autoflush=False는 기본값이지만 명시적으로 설정
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

print("✅ 데이터베이스 엔진 및 세션 메이커가 생성되었습니다.")

# --- 4. FastAPI 의존성 주입 함수 ---

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    FastAPI의 Depends()를 통해 각 API 요청에 독립적인 DB 세션을 제공하고,
    요청이 끝나면 자동으로 세션을 닫아주는 의존성 함수입니다.
    이것이 DB 세션을 얻는 유일하고 올바른 방법입니다.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


# --- 5. 개발 및 테스트용 헬퍼 함수 ---

async def create_tables():
    """데이터베이스 테이블을 생성합니다. (개발 환경에서만 사용)"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✅ 데이터베이스 테이블 생성을 시도했습니다.")


async def test_connection():
    """데이터베이스 연결을 테스트합니다."""
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        print("✅ 데이터베이스 연결 테스트 성공")
        return True
    except Exception as e:
        print(f"❌ 데이터베이스 연결 테스트 실패: {e}")
        return False

# --- 6. ⛔️ [핵심 수정] 불필요한 전역 인스턴스 및 클래스 완전 제거 ---
# 이전에 있던 Database 클래스와 db = Database() 인스턴스를 모두 삭제했습니다.
# 이로써 모든 잠재적인 충돌의 원인을 제거했습니다.