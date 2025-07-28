"""
News 서비스 메인 애플리케이션 진입점
"""
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.api.news_router import router as news_router

import uvicorn
import logging
import traceback
import os

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger("news_main")

# 환경 변수 설정
load_dotenv()

# FastAPI 앱 생성
app = FastAPI(
    title="News Service API",
    description="News 서비스",
    version="1.0.0",
)

# CORS 미들웨어 설정
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

app.include_router(news_router, prefix="/news",tags=["News 서비스"])

# 예외 처리 미들웨어 추가
@app.middleware("http")
async def log_requests(request: Request, call_next):
    client_host = request.headers.get("x-forwarded-for") or (request.client.host if request.client else "unknown")
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
    logger.info(f"💻 개발 모드로 실행 - 포트: 8003")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8003,
        reload=True,
        log_level="info"
    ) 





































