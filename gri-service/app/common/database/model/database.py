# app/common/database/model/database.py

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
    db_port = os.getenv('DB_PORT', '6543')
    db_name = os.getenv('DB_NAME', 'postgres')
    db_user = os.getenv('DB_USER')
    db_pass = os.getenv('DB_PASS')

    if not all([db_host, db_pass, db_user, db_name, db_port]):
        raise ValueError("데이터베이스 연결을 위한 환경 변수가 충분하지 않습니다. (DB_HOST, DB_USER, DB_PASS 등)")
    
    return f"postgresql+asyncpg://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

DATABASE_URL = get_database_url()

connect_args = {
    "server_settings": {
        "application_name": os.getenv("SERVICE_NAME", "gri-service"),
        "statement_timeout": "0",
        "lock_timeout": "0"
    }
}

engine = create_async_engine(
    DATABASE_URL,
    echo=True,
    connect_args=connect_args,
    pool_size=5,
    max_overflow=10,
    pool_pre_ping=True,
    pool_recycle=300,
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()