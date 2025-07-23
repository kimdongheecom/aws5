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
    """
    pass

# --- 2. 데이터베이스 연결 설정 (직접 연결 방식으로 수정) ---

def get_database_url() -> str:
    """환경 변수를 기반으로 데이터베이스 연결 URL을 생성합니다."""
    db_host = os.getenv('DB_HOST')
    # ✅ [수정] 직접 연결 기본 포트 5432로 변경
    db_port = os.getenv('DB_PORT', '5432') 
    db_name = os.getenv('DB_NAME', 'postgres')
    db_user = os.getenv('DB_USER', 'postgres')
    db_pass = os.getenv('DB_PASS')

    if not all([db_host, db_pass]):
        raise ValueError("데이터베이스 연결 정보(.env)가 올바르게 설정되지 않았습니다: DB_HOST, DB_PASS")
    
    return f"postgresql+asyncpg://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

DATABASE_URL = get_database_url()

# ✅ [핵심 수정] 직접 연결을 위해 SQLAlchemy의 기본 연결 풀(QueuePool)을 사용하도록 변경
# Transaction Pooler를 위한 모든 복잡한 옵션을 제거하고 단순화합니다.
engine = create_async_engine(
    DATABASE_URL,
    echo=True, # 개발 중에는 True, 프로덕션에서는 False로 변경 권장
    pool_size=5,  # 애플리케이션 부하에 맞게 조절
    max_overflow=10 # 애플리케이션 부하에 맞게 조절
)

# 비동기 세션 메이커 생성 (변경 없음)
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
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