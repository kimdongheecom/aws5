# C:\Users\edh48\Documents\aws5\gateway\app\main.py

# [핵심 수정] 모든 import 보다 먼저, 여기서 단 한번만 .env 파일을 로드합니다.
from dotenv import load_dotenv
load_dotenv()

# --- 이제 다른 import 들을 시작합니다 ---
import os
import logging
import sys
from contextlib import asynccontextmanager

from fastapi import APIRouter, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response

from app.domain.model.service_proxy_factory import ServiceProxyFactory
from app.domain.model.service_type import ServiceType
from app.api.auth_router import router as auth_router

# --- 1. 로깅 설정 ---
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("gateway_api")

# --- 2. FastAPI 앱 생명주기 및 설정 ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    """애플리케이션 시작과 종료 시 실행되는 로직"""
    logger.info("🚀 Gateway API 서비스 시작")
    yield
    logger.info("🛑 Gateway API 서비스 종료")

app = FastAPI(
    title="LIF Gateway API",
    description="모든 백엔드 서비스를 위한 통합 게이트웨이",
    version="0.2.1",
    lifespan=lifespan
)

# CORS 미들웨어 설정
origins = [
    "https://aws5-git-feature-supabase-gateway-kimdongheecoms-projects.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 3. 프록시 라우터 정의 ---
proxy_router = APIRouter(prefix="/e/v2", tags=["Service Proxy"])

@proxy_router.api_route("/{service}/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
async def proxy_all(service: ServiceType, path: str, request: Request):
    factory = ServiceProxyFactory(service_type=service)
    body = await request.body()
    headers = dict(request.headers)
    
    # Host 헤더는 내부 서비스로 전달하지 않는 것이 일반적입니다.
    headers.pop('host', None)
    
    response = await factory.request(
        method=request.method,
        path=path,
        headers=headers,
        body=body,
        params=dict(request.query_params)
    )
    return Response(content=response.content, status_code=response.status_code, headers=dict(response.headers))

# --- 4. 라우터 등록 ---
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(proxy_router)

# --- 5. 루트 엔드포인트 ---
@app.get("/", tags=["Root"])
async def root():
    return {"message": "Welcome to the LIF Gateway API"}

# --- 6. 서버 실행 ---
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8080))
    logger.info(f"로컬 개발 서버를 시작합니다. http://localhost:{port}")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)