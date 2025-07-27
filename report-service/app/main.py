import os
import logging
import sys
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# --- 1. 로깅 및 환경설정 ---
load_dotenv()

from app.api import report_router
from app.common.database.model.database import test_connection

logging.basicConfig(level=logging.INFO, stream=sys.stdout)
logger = logging.getLogger("report_service")

# --- 2. FastAPI 앱 생명주기 ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 Report-Service 시작")
    if await test_connection():
        logger.info("✅ 데이터베이스 연결 성공")
    else:
        logger.error("❌ 데이터베이스 연결 실패. .env 설정을 확인하세요.")
    yield
    logger.info("🛑 Report-Service 종료")

app = FastAPI(
    title="Report Service API",
    description="리포트 데이터 조회 및 관리를 위한 마이크로서비스",
    version="1.0.0",
    lifespan=lifespan
)

# --- 3. CORS 미들웨어 설정 ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 4. 라우터 등록 ---
# 게이트웨이를 통해 /e/v2/report/qual-data 로 요청이 들어옵니다.
app.include_router(report_router.router, prefix="/report", tags=["Reports"])

# --- 5. 헬스 체크 엔드포인트 ---
@app.get("/health", tags=["Monitoring"])
async def health_check():
    db_ok = await test_connection()
    status = "healthy" if db_ok else "unhealthy"
    return {"status": status, "service": "report-service", "database_connected": db_ok}

# --- 6. 서버 실행 (로컬 테스트용) ---
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8006))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)