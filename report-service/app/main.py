# report-service/app/main.py
import uvicorn
import logging
import traceback
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from pathlib import Path
from dotenv import load_dotenv

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- .env 파일 경로 설정 및 로드 (먼저 실행) ---
BASE_DIR = Path(__file__).resolve().parent.parent
env_path = BASE_DIR / '.env'
logger.info(f"🔍 [Report-Service] .env 파일 경로 탐색: {env_path}")
logger.info(f"🔍 [Report-Service] .env 파일 존재 여부: {env_path.exists()}")
load_dotenv(dotenv_path=env_path)

# 환경 변수 로드 확인
logger.info(f"🔍 [Report-Service] 현재 작업 디렉토리: {os.getcwd()}")
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
logger.info(f"🔍 [Report-Service] SUPABASE_URL: {'설정됨' if supabase_url else '없음'}")
logger.info(f"🔍 [Report-Service] SUPABASE_KEY: {'설정됨' if supabase_key else '없음'}")

# 실제 값 확인 (디버깅용 - 처음 20자만)
if supabase_url:
    logger.info(f"🔍 [Report-Service] SUPABASE_URL 값: {supabase_url[:30]}...")
if supabase_key:
    logger.info(f"🔍 [Report-Service] SUPABASE_KEY 값: {supabase_key[:30]}...")

# 추가 디버깅: 모든 환경 변수 중 SUPABASE로 시작하는 것들 확인
supabase_vars = {k: v for k, v in os.environ.items() if k.startswith('SUPABASE')}
logger.info(f"🔍 [Report-Service] SUPABASE 관련 환경 변수들: {list(supabase_vars.keys())}")

# --- Supabase 클라이언트 임포트 (환경 변수 로드 후 실행) ---
try:
    from app.db import supabase
    SUPABASE_ENABLED = True
    logger.info("✅ [Report-Service] Supabase 클라이언트 임포트 성공")
except ImportError as e:
    supabase = None
    SUPABASE_ENABLED = False
    logger.warning(f"⚠️ [Report-Service] Supabase 클라이언트 임포트 실패: {e}")
except Exception as e:
    supabase = None
    SUPABASE_ENABLED = False
    logger.error(f"❌ [Report-Service] Supabase 클라이언트 초기화 실패: {e}")

from app.api.report_router import router as report_router

# --- 백그라운드 작업 함수 (핵심 로직) ---
async def fetch_and_process_new_reports():
    if not SUPABASE_ENABLED or supabase is None:
        return  # Supabase가 활성화되지 않았으면 아무것도 하지 않음

    logger.info("🔄 [Report-Service] 새로운 보고서를 확인합니다...")
    try:
        # 1. 아직 게시되지 않은(is_published=false) 보고서를 하나 가져옴
        response = supabase.table("completed_reports") \
                           .select("*") \
                           .eq("is_published", False) \
                           .limit(1) \
                           .execute()

        # 처리할 데이터가 없으면 종료
        if not response.data:
            logger.info("✅ [Report-Service] 처리할 새로운 보고서가 없습니다.")
            return

        new_report = response.data[0]
        report_id = new_report['id']
        logger.info(f"🚚 [Report-Service] 새로운 보고서({report_id})를 발견하여 처리 시작.")

        # 2. (여기에 실제 비즈니스 로직 추가)
        # 예: 가져온 데이터를 report-service의 자체 DB에 저장하거나,
        # 웹소켓으로 클라이언트에 알림을 보내는 등의 작업 수행
        # report_content = new_report['report_content']
        # process_report_data(report_content)

        # 3. 처리가 완료되었음을 Supabase에 표시 (매우 중요!)
        supabase.table("completed_reports") \
                .update({"is_published": True}) \
                .eq("id", report_id) \
                .execute()

        logger.info(f"👍 [Report-Service] 보고서({report_id}) 처리 완료 및 '게시됨'으로 상태 변경.")

    except Exception as e:
        logger.error(f"❌ [Report-Service] 보고서 처리 중 오류 발생: {str(e)}")
        logger.error(traceback.format_exc())

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 [Report-Service] API 서버 시작...")
    
    # Supabase 연결 확인
    if SUPABASE_ENABLED and supabase is not None:
        logger.info("📡 [Report-Service] Supabase 연결을 확인합니다...")
        try:
            supabase.table('completed_reports').select('id').limit(1).execute()
            logger.info("✅ [Report-Service] Supabase 연결 성공.")
        except Exception as e:
            logger.error(f"❌ [Report-Service] Supabase 연결 실패: {e}")
    else:
        logger.warning("⚠️ [Report-Service] Supabase 클라이언트가 비활성화되었거나 임포트되지 않았습니다.")

    # 백그라운드 스케줄러 시작
    scheduler = AsyncIOScheduler(timezone="Asia/Seoul") # 타임존 설정
    scheduler.add_job(fetch_and_process_new_reports, 'interval', seconds=30, id="report_fetch_job")
    scheduler.start()
    logger.info("⏰ [Report-Service] 백그라운드 스케줄러가 30초 간격으로 시작되었습니다.")
    
    yield
    
    logger.info("🌙 [Report-Service] API 서버 종료.")

# FastAPI 앱 생성 및 lifespan 이벤트 핸들러 등록
app = FastAPI(
    title="REPORT Service API",
    description="REPORT 서비스",
    version="1.0.0",
    lifespan=lifespan # lifespan 이벤트 핸들러 등록
)

# CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 예외 처리 미들웨어 (기존 코드 유지)
@app.middleware("http")
async def log_requests(request: Request, call_next):
    client_host = request.client.host if request.client else "unknown"
    logger.info(f"📥 요청: {request.method} {request.url.path} (클라이언트: {client_host})")
    try:
        response = await call_next(request)
        logger.info(f"📤 응답: {response.status_code}")
        return response
    except Exception as e:
        logger.error(f"❌ 요청 처리 중 오류: {str(e)}")
        logger.error(traceback.format_exc())
        raise

# 라우터 등록
app.include_router(report_router, prefix="/report", tags=["REPORT 서비스"])

# Health Check API 추가
@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "ok", "service": "Report Service", "supabase_connected": SUPABASE_ENABLED}

# 직접 실행 시 (개발 환경)
if __name__ == "__main__":
    port = int(os.getenv("PORT", 8006))
    logger.info(f"💻 개발 모드로 실행 - 포트: {port}")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    ) 





































