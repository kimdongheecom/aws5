import json
import os
import logging
import sys
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import APIRouter, FastAPI, Request, HTTPException, Body, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response, RedirectResponse
from dotenv import load_dotenv
from httpx import Response as HTTPXResponse
import httpx

# ✅ [추가] database.py에서 create_tables 함수를 import 합니다.
from app.common.database.model.database import create_tables
from app.domain.model.service_proxy_factory import ServiceProxyFactory
from app.domain.model.service_type import ServiceType
from app.api.auth_router import router as auth_router

# --- 1. 로깅 및 환경설정 ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', handlers=[logging.StreamHandler(sys.stdout)])
logger = logging.getLogger("gateway_api")
env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path, verbose=True)

# --- 2. FastAPI 앱 생명주기 및 설정 ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 Gateway API 서비스 시작")
    
    # ✅ [추가] 애플리케이션 시작 시 테이블 생성 함수를 호출합니다.
    logger.info("🔍 데이터베이스 테이블 생성을 시도합니다...")
    await create_tables()
    
    yield
    
    logger.info("🛑 Gateway API 서비스 종료")

app = FastAPI(title="Gateway API", description="Gateway API for all services", version="0.1.0", lifespan=lifespan)

# ✅ CORS 설정 - Docker 환경 고려
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # 로컬 접근
        "http://127.0.0.1:3000",  # 로컬 IP 접근
        "http://frontend:3000",   # Docker 내부 네트워크
    ],
    allow_credentials=True,  # 쿠키 전송을 위해 필수
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 3. 라우터 분리 ---
proxy_router = APIRouter(prefix="/e/v2", tags=["Proxy API"])

# --- 5. 기존 프록시 엔드포인트 ---
@proxy_router.get("/health", summary="헬스 체크 엔드포인트")
async def health_check():
    return {"status": "healthy!"}

@proxy_router.get("/{service}/{path:path}", summary="GET 프록시")
async def proxy_get(service: ServiceType, path: str, request: Request):
    factory = ServiceProxyFactory(service_type=service)
    response = await factory.request(method="GET", path=path, headers=dict(request.headers))
    return Response(content=response.content, status_code=response.status_code, headers=response.headers)

@proxy_router.post("/{service}/{path:path}", summary="POST 프록시")
async def proxy_post(service: ServiceType, path: str, request: Request):
    factory = ServiceProxyFactory(service_type=service)
    body = await request.body()
    headers = dict(request.headers)
    headers.pop('host', None)
    response = await factory.request(method="POST", path=path, headers=headers, body=body)
    return Response(content=response.content, status_code=response.status_code, headers=response.headers)

@proxy_router.put("/{service}/{path:path}", summary="PUT 프록시")
async def proxy_put(service: ServiceType, path: str, request: Request):
    factory = ServiceProxyFactory(service_type=service)
    body = await request.body()
    headers = dict(request.headers)
    headers.pop('host', None)
    response = await factory.request(method="PUT", path=path, headers=headers, body=body)
    return Response(content=response.content, status_code=response.status_code, headers=response.headers)

@proxy_router.delete("/{service}/{path:path}", summary="DELETE 프록시")
async def proxy_delete(service: ServiceType, path: str, request: Request):
    factory = ServiceProxyFactory(service_type=service)
    body = await request.body()
    headers = dict(request.headers)
    headers.pop('host', None)
    response = await factory.request(method="DELETE", path=path, headers=headers, body=body)
    return Response(content=response.content, status_code=response.status_code, headers=response.headers)

@proxy_router.patch("/{service}/{path:path}", summary="PATCH 프록시")
async def proxy_patch(service: ServiceType, path: str, request: Request):
    factory = ServiceProxyFactory(service_type=service)
    body = await request.body()
    headers = dict(request.headers)
    headers.pop('host', None)
    response = await factory.request(method="PATCH", path=path, headers=headers, body=body)
    return Response(content=response.content, status_code=response.status_code, headers=response.headers)

# --- 6. 라우터 등록 ---
app.include_router(auth_router, prefix="/auth")
app.include_router(proxy_router)

# --- 7. 서버 실행 ---
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8080))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)