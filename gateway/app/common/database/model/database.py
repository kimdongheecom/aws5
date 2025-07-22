

import os
from typing import AsyncGenerator, Optional
from datetime import datetime
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, Text, DateTime, func, text
from sqlalchemy.pool import NullPool

# main.py에서 .env를 로드하므로 여기서는 실행하지 않습니다.

# --- 모델 정의 (변경 없음) ---
class Base(DeclarativeBase):
    pass

class Profile(Base):
    __tablename__ = "profiles"
    id: Mapped[str] = mapped_column(String(50), primary_key=True)
    name: Mapped[Optional[str]] = mapped_column(String(100))
    picture: Mapped[Optional[str]] = mapped_column(Text)
    email: Mapped[Optional[str]] = mapped_column(String(100))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class LoginEntityDB(Base):
    __tablename__ = "login_entities"
    id: Mapped[str] = mapped_column(String(50), primary_key=True)
    provider: Mapped[str] = mapped_column(String(50), nullable=False)
    access_token: Mapped[str] = mapped_column(Text, nullable=False)
    refresh_token: Mapped[Optional[str]] = mapped_column(Text)
    expires_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

# --- 데이터베이스 연결 설정 (최종 수정본) ---
def get_database_url() -> str:
    """환경 변수를 사용하여 완전한 데이터베이스 URL을 생성합니다."""
    db_host = os.getenv('DB_HOST')
    db_port = os.getenv('DB_PORT', '6543')
    db_name = os.getenv('DB_NAME', 'postgres')
    db_user = os.getenv('DB_USER', 'postgres')
    db_pass = os.getenv('DB_PASS')
    
    return f"postgresql+asyncpg://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

DATABASE_URL = get_database_url()

# [최종 결전] NullPool을 사용하여 연결 풀링 완전 비활성화
engine = create_async_engine(
    DATABASE_URL,
    echo=True,
    connect_args={
        "statement_cache_size": 0,
        "prepared_statement_cache_size": 0
    },
    # ✅ [핵심] NullPool 사용으로 연결 풀링 완전 비활성화
    poolclass=NullPool
)

AsyncSessionLocal = async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

# --- FastAPI 의존성 주입 함수 (변경 없음) ---
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """각 API 요청에 독립적인 DB 세션을 제공하는 의존성 함수입니다."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()