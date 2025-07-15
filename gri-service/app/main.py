# gri-service/app/main.py
import uvicorn
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path
from dotenv import load_dotenv

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- .env 파일 경로 설정 및 로드 (먼저 실행) ---
BASE_DIR = Path(__file__).resolve().parent.parent
env_path = BASE_DIR / '.env'
logger.info(f"🔍 [GRI-Service] .env 파일 경로 탐색: {env_path}")
load_dotenv(dotenv_path=env_path)

# 환경 변수 로드 확인
logger.info(f"🔍 [GRI-Service] 현재 작업 디렉토리: {os.getcwd()}")
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
logger.info(f"🔍 [GRI-Service] SUPABASE_URL: {'설정됨' if supabase_url else '없음'}")
logger.info(f"🔍 [GRI-Service] SUPABASE_KEY: {'설정됨' if supabase_key else '없음'}")

# 실제 값 확인 (디버깅용 - 처음 20자만)
if supabase_url:
    logger.info(f"🔍 [GRI-Service] SUPABASE_URL 값: {supabase_url[:30]}...")
if supabase_key:
    logger.info(f"🔍 [GRI-Service] SUPABASE_KEY 값: {supabase_key[:30]}...")

# 추가 디버깅: 모든 환경 변수 중 SUPABASE로 시작하는 것들 확인
supabase_vars = {k: v for k, v in os.environ.items() if k.startswith('SUPABASE')}
logger.info(f"🔍 [GRI-Service] SUPABASE 관련 환경 변수들: {list(supabase_vars.keys())}")

# --- Supabase 클라이언트 임포트 (환경 변수 로드 후 실행) ---
try:
    from app.db import supabase
    SUPABASE_ENABLED = True
    logger.info("✅ [GRI-Service] Supabase 클라이언트 임포트 성공")
except ImportError as e:
    supabase = None
    SUPABASE_ENABLED = False
    logger.warning(f"⚠️ [GRI-Service] Supabase 클라이언트 임포트 실패: {e}")
except Exception as e:
    supabase = None
    SUPABASE_ENABLED = False
    logger.error(f"❌ [GRI-Service] Supabase 클라이언트 초기화 실패: {e}")

# 수정된 경로에서 import
from app.api.gri_router import router as gri_router
from app.domain.service.model_loader_service import model_loader_service
from app.foundation.config import API_HOST, API_PORT

logger.info(f"🔍 [GRI-Service] API_HOST: {API_HOST}")
logger.info(f"🔍 [GRI-Service] API_PORT: {API_PORT}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- 애플리케이션 시작 시 실행 ---
    logger.info("🚀 [GRI-Service] API 서버 시작...")

    # 1. AI 모델 로딩
    logger.info("🧠 [GRI-Service] AI 모델을 메모리에 로드합니다...")
    model_loader_service.load_model()
    logger.info("✅ [GRI-Service] 모델 로딩 완료.")

    # 2. Supabase 연결 확인 (새로 추가)
    if SUPABASE_ENABLED and supabase is not None:
        logger.info("📡 [GRI-Service] Supabase 클라이언트 연결을 확인합니다...")
        try:
            # 간단한 쿼리를 보내 연결 상태를 테스트합니다.
            supabase.table('completed_reports').select('id').limit(1).execute()
            logger.info("✅ [GRI-Service] Supabase 연결 성공.")
        except Exception as e:
            logger.error(f"❌ [GRI-Service] Supabase 연결 실패: {e}")
            # 여기서 서버를 중단시킬 수도 있지만, 일단 경고만 로깅합니다.
    else:
        logger.warning("⚠️ [GRI-Service] Supabase 클라이언트가 비활성화되었거나 임포트되지 않았습니다.")

    logger.info("👍 [GRI-Service] 모든 준비 완료, 서버가 요청을 받을 준비가 되었습니다.")
    yield
    # --- 애플리케이션 종료 시 실행 ---
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
logger.info("🛰️ [GRI-Service] GRI 라우터를 등록합니다...")
app.include_router(gri_router)
logger.info("✅ [GRI-Service] GRI 라우터 등록 완료.")

@app.get("/health", tags=["System"])
async def health_check():
    # health_check에 Supabase 연결 상태도 포함
    return {
        "status": "ok",
        "model_loaded": model_loader_service.model is not None,
        "supabase_connected": SUPABASE_ENABLED and supabase is not None
    }

if __name__ == "__main__":
    uvicorn.run("app.main:app", host=API_HOST, port=API_PORT, reload=True)