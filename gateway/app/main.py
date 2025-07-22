import os
import logging
import sys
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import APIRouter, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from dotenv import load_dotenv
import httpx

# lifespan에서 DB 관련 import가 더 이상 필요 없습니다.
from app.domain.model.service_proxy_factory import ServiceProxyFactory
from app.domain.model.service_type import ServiceType
from app.api.auth_router import router as auth_router

# --- 1. 로깅 및 환경설정 ---
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("gateway_api")

env_path = Path(__file__).resolve().parent.parent / '.env'
if env_path.exists():
    load_dotenv(dotenv_path=env_path, verbose=True)
    logger.info(f".env 파일 로드 완료: {env_path}")
else:
    logger.warning(f".env 파일을 찾을 수 없습니다: {env_path}")

# --- 2. FastAPI 앱 생명주기 및 설정 (수정된 부분) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    """애플리케이션 시작과 종료 시 실행되는 로직"""
    logger.info("🚀 Gateway API 서비스 시작")
    
    # PgBouncer와의 충돌을 피하기 위해 시작 시 DB 관련 로직은 모두 제거합니다.
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

# --- 3. 라우터 정의 ---
proxy_router = APIRouter(prefix="/e/v2", tags=["Service Proxy"])


# --- 5. 프록시 엔드포인트 (모든 메서드 포함) ---
@proxy_router.get("/health", summary="헬스 체크 엔드포인트")
async def health_check():
    return {"status": "healthy!"}

@proxy_router.get("/{service}/{path:path}", summary="GET 프록시")
async def proxy_get(service: ServiceType, path: str, request: Request):
    factory = ServiceProxyFactory(service_type=service)
    response = await factory.request(method="GET", path=path, headers=dict(request.headers))
    return Response(content=response.content, status_code=response.status_code, headers=dict(response.headers))

@proxy_router.post("/{service}/{path:path}", summary="POST 프록시")
async def proxy_post(service: ServiceType, path: str, request: Request):
    factory = ServiceProxyFactory(service_type=service)
    body = await request.body()
    headers = dict(request.headers)
    headers.pop('host', None)
    response = await factory.request(method="POST", path=path, headers=headers, body=body)
    return Response(content=response.content, status_code=response.status_code, headers=dict(response.headers))

# ✨ [추가] 빠졌던 PUT, DELETE, PATCH 프록시 엔드포인트
@proxy_router.put("/{service}/{path:path}", summary="PUT 프록시")
async def proxy_put(service: ServiceType, path: str, request: Request):
    factory = ServiceProxyFactory(service_type=service)
    body = await request.body()
    headers = dict(request.headers)
    headers.pop('host', None)
    response = await factory.request(method="PUT", path=path, headers=headers, body=body)
    return Response(content=response.content, status_code=response.status_code, headers=dict(response.headers))

@proxy_router.delete("/{service}/{path:path}", summary="DELETE 프록시")
async def proxy_delete(service: ServiceType, path: str, request: Request):
    factory = ServiceProxyFactory(service_type=service)
    body = await request.body()
    headers = dict(request.headers)
    headers.pop('host', None)
    response = await factory.request(method="DELETE", path=path, headers=headers, body=body)
    return Response(content=response.content, status_code=response.status_code, headers=dict(response.headers))

@proxy_router.patch("/{service}/{path:path}", summary="PATCH 프록시")
async def proxy_patch(service: ServiceType, path: str, request: Request):
    factory = ServiceProxyFactory(service_type=service)
    body = await request.body()
    headers = dict(request.headers)
    headers.pop('host', None)
    response = await factory.request(method="PATCH", path=path, headers=headers, body=body)
    return Response(content=response.content, status_code=response.status_code, headers=dict(response.headers))

# --- 6. 라우터 등록 ---
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(proxy_router)

# --- 7. 루트 엔드포인트 ---
@app.get("/", tags=["Root"])
async def root():
    return {"message": "Welcome to the LIF Gateway API"}

# --- 8. 서버 실행 ---
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8080))
    logger.info(f"로컬 개발 서버를 시작합니다. http://localhost:{port}")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)