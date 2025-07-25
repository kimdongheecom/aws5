"""
SASB 서비스 메인 애플리케이션 진입점
"""
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.api.sasb_router import router as sasb_router

import uvicorn
import logging
import traceback
import os

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("sasb_main")

# 환경 변수 설정
load_dotenv()

# FastAPI 앱 생성
app = FastAPI(
    title="SASB Service API",
    description="SASB 서비스",
    version="1.0.0",
)

# CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sasb_router, prefix="/sasb",tags=["SASB 서비스"])

# 예외 처리 미들웨어 추가
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


# 직접 실행 시 (개발 환경)
if __name__ == "__main__":
    logger.info(f"💻 개발 모드로 실행 - 포트: 8004")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8004,
        reload=True,
        log_level="info"
    ) 





































