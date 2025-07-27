# report-service/app/common/database/model/database.py

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
    pass

# --- 2. 데이터베이스 연결 설정 (직접 연결 방식) ---
def get_database_url() -> str:
    """환경 변수를 기반으로 데이터베이스 연결 URL을 생성합니다."""
    db_host = os.getenv('DB_HOST')
    db_port = os.getenv('DB_PORT', '5432')
    db_name = os.getenv('DB_NAME', 'postgres')
    db_user = os.getenv('DB_USER', 'postgres')
    db_pass = os.getenv('DB_PASS')

    if not all([db_host, db_pass]):
        raise ValueError("데이터베이스 연결 정보(.env)가 올바르게 설정되지 않았습니다: DB_HOST, DB_PASS")
    
    return f"postgresql+asyncpg://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

DATABASE_URL = get_database_url()

# 직접 연결을 위한 SQLAlchemy 엔진 생성
engine = create_async_engine(
    DATABASE_URL,
    echo=True, # 개발 중에는 True, 프로덕션에서는 False 권장
    pool_size=5,
    max_overflow=10
)

# 비동기 세션 메이커 생성
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# --- 3. FastAPI 의존성 주입 함수 ---
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    각 API 요청에 독립적인 DB 세션을 제공하는 의존성 함수입니다.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

# --- 4. 개발 및 테스트용 헬퍼 함수 ---
async def create_tables():
    """Base에 등록된 모든 테이블을 데이터베이스에 생성합니다."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✅ [Report-Service] 데이터베이스 테이블 생성을 시도했습니다.")


async def test_connection():
    """데이터베이스 연결을 테스트합니다."""
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        print("✅ [Report-Service] 데이터베이스 연결 테스트 성공")
        return True
    except Exception as e:
        print(f"❌ [Report-Service] 데이터베이스 연결 테스트 실패: {e}")
        return False