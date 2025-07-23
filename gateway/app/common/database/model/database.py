import os
from typing import AsyncGenerator, Optional
from datetime import datetime
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, Text, DateTime, func

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

# --- 데이터베이스 연결 설정 (수정) ---
def get_database_url() -> str:
    """환경 변수를 사용하여 완전한 데이터베이스 URL을 생성합니다."""
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
# NullPool과 Pooler를 위한 각종 비활성화 옵션을 모두 제거합니다.
engine = create_async_engine(
    DATABASE_URL,
    echo=True, # 개발 중에는 True, 프로덕션에서는 False로 변경 권장
    pool_size=5,  # 애플리케이션 부하에 맞게 조절
    max_overflow=10 # 애플리케이션 부하에 맞게 조절
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine, 
    class_=AsyncSession, 
    expire_on_commit=False
)

# --- FastAPI 의존성 주입 함수 (변경 없음) ---
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """각 API 요청에 독립적인 DB 세션을 제공하는 의존성 함수입니다."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()