import os
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv

load_dotenv()

# 모든 엔티티가 상속받을 Base 클래스
Base = declarative_base()

def get_database_url() -> str:
    db_host = os.getenv('DB_HOST')
    # ✅ [수정] 직접 연결 기본 포트 5432로 변경
    db_port = os.getenv('DB_PORT', '5432')
    db_name = os.getenv('DB_NAME', 'postgres')
    db_user = os.getenv('DB_USER')
    db_pass = os.getenv('DB_PASS')

    if not all([db_host, db_pass, db_user]):
        raise ValueError("데이터베이스 연결을 위한 환경 변수가 충분하지 않습니다. (DB_HOST, DB_USER, DB_PASS 등)")
    
    # ✅ [수정] 비동기 드라이버 asyncpg 사용
    return f"postgresql+asyncpg://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

DATABASE_URL = get_database_url()

# ✅ [핵심 수정] 직접 연결을 위해 SQLAlchemy의 표준 연결 풀(QueuePool)을 사용하도록 변경
# Transaction Pooler를 위한 모든 복잡한 옵션을 제거하고 단순화합니다.
engine = create_async_engine(
    DATABASE_URL,
    echo=True, # 개발 중에는 True, 프로덕션에서는 False로 변경 권장
    pool_size=5,  # 애플리케이션 부하에 맞게 조절
    max_overflow=10 # 애플리케이션 부하에 맞게 조절
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()