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

    # postgresql+asyncpg 드라이버를 사용
    return f"postgresql+asyncpg://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

# Supabase PgBouncer는 transaction pooling을 사용하므로, prepared statement cache가 문제를 일으킬 수 있음
# statement_cache_size=0 으로 설정하여 비활성화
connect_args = {"statement_cache_size": 0}

# 데이터베이스 엔진 생성
engine = create_async_engine(
    get_database_url(),
    echo=False, # 운영 환경에서는 False로 유지
    pool_size=5,
    max_overflow=10,
    connect_args=connect_args # ✅ 핵심 설정 적용
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