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

# --- 3. CORS 미들웨어 설정 ---
# 허용할 출처(프론트엔드 주소) 목록
origins = [
    "https://www.kimdonghee.com",       # 실제 프로덕션 도메인
    "https://kimdongheecom.vercel.app",  # Vercel 기본 프로덕션 도메인
    "http://localhost:3000",             # 로컬 개발 환경 (프론트엔드)
    "http://127.0.0.1:3000",            # 로컬 개발 환경 (프론트엔드)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,             # 쿠키 기반 인증에 필수
    allow_methods=["*"],                # 모든 HTTP 메소드 허용
    allow_headers=["*"],                # 모든 HTTP 헤더 허용
)


# --- ▼▼▼▼▼ [요청사항 반영] 프록시 라우터 수정 ▼▼▼▼▼ ---
proxy_router = APIRouter(prefix="/e/v2", tags=["Service Proxy"])

@proxy_router.get("/health", summary="헬스 체크 엔드포인트")
async def health_check():
    """서비스가 정상적으로 실행 중인지 확인하는 간단한 엔드포인트입니다."""
    logger.info("헬스 체크 요청 수신")
    return {"status": "healthy!"}

@proxy_router.get("/{service}/{path:path}", summary="GET 프록시")
async def proxy_get(service: ServiceType, path: str, request: Request):
    """GET 요청을 내부 서비스로 프록시합니다."""
    logger.info(f"[PROXY >>] Method: GET, Service: {service.value}, Path: /{path}, Params: {request.query_params}")
    
    factory = ServiceProxyFactory(service_type=service)
    headers = dict(request.headers)
    headers.pop('host', None)

    response = await factory.request(
        method="GET",
        path=path,
        headers=headers,
        params=dict(request.query_params)
    )
    
    logger.info(f"[PROXY <<] Status: {response.status_code}, Service: {service.value}, Path: /{path}")
    return Response(content=response.content, status_code=response.status_code, headers=dict(response.headers))

@proxy_router.post("/{service}/{path:path}", summary="POST 프록시")
async def proxy_post(service: ServiceType, path: str, request: Request):
    """POST 요청을 내부 서비스로 프록시합니다."""
    logger.info(f"[PROXY >>] Method: POST, Service: {service.value}, Path: /{path}, Params: {request.query_params}")
    
    factory = ServiceProxyFactory(service_type=service)
    body = await request.body()
    headers = dict(request.headers)
    headers.pop('host', None)

    response = await factory.request(
        method="POST",
        path=path,
        headers=headers,
        body=body,
        params=dict(request.query_params)
    )
    
    logger.info(f"[PROXY <<] Status: {response.status_code}, Service: {service.value}, Path: /{path}")
    return Response(content=response.content, status_code=response.status_code, headers=dict(response.headers))

@proxy_router.put("/{service}/{path:path}", summary="PUT 프록시")
async def proxy_put(service: ServiceType, path: str, request: Request):
    """PUT 요청을 내부 서비스로 프록시합니다."""
    logger.info(f"[PROXY >>] Method: PUT, Service: {service.value}, Path: /{path}, Params: {request.query_params}")
    
    factory = ServiceProxyFactory(service_type=service)
    body = await request.body()
    headers = dict(request.headers)
    headers.pop('host', None)

    response = await factory.request(
        method="PUT",
        path=path,
        headers=headers,
        body=body,
        params=dict(request.query_params)
    )
    
    logger.info(f"[PROXY <<] Status: {response.status_code}, Service: {service.value}, Path: /{path}")
    return Response(content=response.content, status_code=response.status_code, headers=dict(response.headers))

@proxy_router.delete("/{service}/{path:path}", summary="DELETE 프록시")
async def proxy_delete(service: ServiceType, path: str, request: Request):
    """DELETE 요청을 내부 서비스로 프록시합니다."""
    logger.info(f"[PROXY >>] Method: DELETE, Service: {service.value}, Path: /{path}, Params: {request.query_params}")
    
    factory = ServiceProxyFactory(service_type=service)
    body = await request.body()
    headers = dict(request.headers)
    headers.pop('host', None)

    response = await factory.request(
        method="DELETE",
        path=path,
        headers=headers,
        body=body,
        params=dict(request.query_params)
    )
    
    logger.info(f"[PROXY <<] Status: {response.status_code}, Service: {service.value}, Path: /{path}")
    return Response(content=response.content, status_code=response.status_code, headers=dict(response.headers))

@proxy_router.patch("/{service}/{path:path}", summary="PATCH 프록시")
async def proxy_patch(service: ServiceType, path: str, request: Request):
    """PATCH 요청을 내부 서비스로 프록시합니다."""
    logger.info(f"[PROXY >>] Method: PATCH, Service: {service.value}, Path: /{path}, Params: {request.query_params}")
    
    factory = ServiceProxyFactory(service_type=service)
    body = await request.body()
    headers = dict(request.headers)
    headers.pop('host', None)
    
    response = await factory.request(
        method="PATCH",
        path=path,
        headers=headers,
        body=body,
        params=dict(request.query_params)
    )
    
    logger.info(f"[PROXY <<] Status: {response.status_code}, Service: {service.value}, Path: /{path}")
    return Response(content=response.content, status_code=response.status_code, headers=dict(response.headers))
# --- ▲▲▲▲▲ 여기까지 수정 ▲▲▲▲▲ ---






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