# C:\Users\edh48\Documents\aws5\company-service\app\common\database\model\database.py

"""
데이터베이스 연결 및 세션 관리 (company-service 전용)
"""
import os
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

# --- 1. SQLAlchemy 기본 설정 ---

class Base(DeclarativeBase):
    """
    모든 SQLAlchemy 모델이 상속받을 기본 클래스입니다.
    company_entity.py의 Company 모델이 이 Base를 사용하게 됩니다.
    """
    pass

# [제거] Profile, LoginEntityDB 모델은 company-service의 책임이 아니므로 제거합니다.

# --- 2. 데이터베이스 연결 설정 (게이트웨이와 동일한 핵심 로직) ---

def get_database_url() -> str:
    """환경 변수를 기반으로 데이터베이스 연결 URL을 생성합니다."""
    db_host = os.getenv('DB_HOST')
    db_port = os.getenv('DB_PORT', '6543') # .env 파일과 일치
    db_name = os.getenv('DB_NAME', 'postgres')
    db_user = os.getenv('DB_USER', 'postgres')
    db_pass = os.getenv('DB_PASS')

    if not all([db_host, db_pass, db_user, db_name, db_port]):
        raise ValueError("데이터베이스 연결을 위한 환경 변수가 충분하지 않습니다. (DB_HOST, DB_PASS 등)")

    # 🔧 [수정] URL 파라미터 제거, connect_args로 처리
    return f"postgresql+asyncpg://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

DATABASE_URL = get_database_url()

# 🔧 [핵심 수정] connect_args에 정수 값으로 전달
connect_args = {
    "prepared_statement_cache_size": 0,  # 정수로 전달
    "statement_cache_size": 0,          # 정수로 전달
    "server_settings": {
        "application_name": "company_service",
        "jit": "off",
        "statement_timeout": "0",  # 추가: statement timeout 비활성화
        "lock_timeout": "0"        # 추가: lock timeout 비활성화
    }
}

# 데이터베이스 엔진 생성
engine = create_async_engine(
    DATABASE_URL, 
    echo=True,
    connect_args=connect_args,  # 정수 값으로 전달
    pool_size=1,
    max_overflow=0,
    pool_pre_ping=False,
    pool_recycle=60,
    # 🔧 [추가] DuplicatePreparedStatementError 완전 방지
    pool_reset_on_return="commit",  # 연결 반환 시 커밋으로 리셋
    isolation_level="AUTOCOMMIT"    # 자동 커밋 모드
)

# 비동기 세션 메이커 생성
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)


# --- 3. FastAPI 의존성 주입 함수 ---

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    FastAPI의 Depends()를 통해 각 API 요청에 독립적인 DB 세션을 제공하고,
    요청이 끝나면 자동으로 세션을 닫아주는 의존성 함수입니다.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


# --- 4. 개발 및 테스트용 헬퍼 함수 ---

async def create_tables():
    """
    Base에 등록된 모든 테이블을 데이터베이스에 생성합니다. (개발 초기 단계용)
    이제 company-service에 정의된 테이블(예: Company)만 생성합니다.
    """
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

# [제거] 불필요한 Database 클래스와 db 인스턴스를 제거하여 코드를 단순화합니다.
# get_db, test_connection 등의 함수를 직접 가져다 쓰는 것이 더 현대적인 FastAPI 패턴입니다.