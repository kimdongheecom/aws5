# app/main.py

import uvicorn
import logging
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from sqlalchemy import text # 이 부분은 SQLAlchemy 라이브러리에서 직접 가져오므로 변경 없습니다.

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

load_dotenv()

from app.api.gri_router import router as gri_router
from app.domain.service.model_loader_service import model_loader_service

# [경로 수정] database.py의 새 경로에서 engine과 Base를 임포트합니다.
from app.common.database.model.database import engine, Base

# SQLAlchemy 엔티티들을 명시적으로 import하여 순환 참조 문제를 해결합니다.
from app.domain.entity import (
    AnswerEntity,
    ProfileEntity,
    RequirementEntity,
    SampleEntity,
    Company,
    DisclosureEntity,
    CategoryEntity
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 [GRI-Service] API 서버 시작...")

    logger.info("🧠 [GRI-Service] AI 모델을 메모리에 로드합니다...")
    model_loader_service.load_model()
    logger.info("✅ [GRI-Service] 모델 로딩 완료.")

    logger.info("📡 [GRI-Service] SQLAlchemy 데이터베이스 연결을 확인합니다...")
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        logger.info("✅ [GRI-Service] SQLAlchemy 데이터베이스 연결 성공.")
    except Exception as e:
        logger.error(f"❌ [GRI-Service] SQLAlchemy 데이터베이스 연결 실패: {e}", exc_info=True)

    logger.info("👍 [GRI-Service] 모든 준비 완료, 서버가 요청을 받을 준비가 되었습니다.")
    yield
    logger.info("🌙 [GRI-Service] API 서버 종료.")
    await engine.dispose()
    logger.info("🔌 [GRI-Service] 데이터베이스 연결 풀이 종료되었습니다.")


app = FastAPI(
    title="GRI Service API",
    description="GRI 문서 질의응답을 위한 AI 서비스 (SQLAlchemy ORM 사용)",
    version="1.1.0",
    lifespan=lifespan
)

# 게이트웨이를 통한 요청이므로 게이트웨이 주소를 허용
origins = [
    "http://localhost:8080",             # 로컬 게이트웨이
    "http://gateway:8080",               # Docker 내부 게이트웨이
    "https://aws5-production.up.railway.app",  # 프로덕션 게이트웨이
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info("🛰️ [GRI-Service] GRI 라우터를 등록합니다...")
app.include_router(gri_router)
logger.info("✅ [GRI-Service] GRI 라우터 등록 완료.")

@app.get("/health", tags=["System"])
async def health_check():
    db_connected = False
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        db_connected = True
    except Exception:
        db_connected = False
        
    return {
        "status": "ok",
        "model_loaded": model_loader_service.model is not None,
        "database_connected": db_connected
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8010))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)