# gri-service/app/main.py
import uvicorn
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path
from dotenv import load_dotenv

# 수정된 경로에서 import
from app.api.gri_router import router as gri_router
from app.domain.service.model_loader_service import model_loader_service
from app.foundation.config import API_HOST, API_PORT

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# .env 파일 경로 설정 및 로드
env_path = Path(__file__).resolve().parent.parent.parent / '.env'
logger.info(f"🔍 [GRI-Service] .env 파일 경로: {env_path}")
load_dotenv(dotenv_path=env_path)

# 환경 변수 로드 확인
logger.info(f"🔍 [GRI-Service] 현재 작업 디렉토리: {os.getcwd()}")
logger.info(f"🔍 [GRI-Service] API_HOST: {API_HOST}")
logger.info(f"🔍 [GRI-Service] API_PORT: {API_PORT}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 [GRI-Service] API 서버 시작...")
    logger.info("🧠 [GRI-Service] AI 모델을 메모리에 로드합니다...")
    model_loader_service.load_model()
    logger.info("✅ [GRI-Service] 모델 로딩 완료, 서버가 준비되었습니다.")
    yield
    logger.info("🌙 [GRI-Service] API 서버 종료.")

app = FastAPI(
    title="GRI Service API",
    description="GRI 문서 질의응답을 위한 AI 서비스",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

# 분리된 라우터를 앱에 포함
logger.info("📡 [GRI-Service] GRI 라우터를 등록합니다...")
app.include_router(gri_router)
logger.info("✅ [GRI-Service] GRI 라우터 등록 완료")

@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "ok", "model_loaded": model_loader_service.model is not None}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host=API_HOST, port=API_PORT, reload=True)