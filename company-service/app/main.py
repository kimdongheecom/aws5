# company-service/app/main.py

import os
import logging
import sys
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.api import company_router
from app.common.database.model.database import create_tables, test_connection

# --- 1. 로깅 및 환경설정 ---
logging.basicConfig(level=logging.INFO, stream=sys.stdout)
logger = logging.getLogger("company_service")

load_dotenv()

# --- 2. FastAPI 앱 생명주기 ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 Company-Service 시작")
    if await test_connection():
        # 테이블이 없을 경우에만 생성하도록 하는 것이 더 안전합니다.
        # create_tables()는 개발 초기에만 유용합니다.
        # await create_tables() 
        logger.info("✅ 데이터베이스 연결 성공")
    else:
        logger.error("❌ 데이터베이스 연결 실패. 설정을 확인하세요.")
    yield
    logger.info("🛑 Company-Service 종료")

app = FastAPI(
    title="Company Service API",
    description="회사 정보 관리를 위한 마이크로서비스",
    version="1.0.0",
    lifespan=lifespan
)

# --- 3. CORS 미들웨어 설정 ---
# 게이트웨이를 통해 요청이 오므로, 게이트웨이 주소를 허용하거나
# 개발 환경의 프론트엔드 주소를 직접 허용할 수 있습니다.
# 여기서는 모든 출처를 허용하는 것으로 간단하게 설정합니다.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 보안을 위해 실제 프로덕션에서는 특정 도메인만 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 4. 라우터 등록 ---
# 게이트웨이에서 /e/v2/company-service 로 라우팅되므로, 
# 여기서는 /companies 로 prefix를 설정합니다.
# 최종 URL: /e/v2/company-service/companies
app.include_router(company_router.router, prefix="/companies", tags=["Companies"])

# --- 5. 헬스 체크 엔드포인트 ---
@app.get("/health", tags=["Monitoring"])
async def health_check():
    return {"status": "healthy", "service": "company-service"}

# --- 6. 서버 실행 (Dockerfile에서 uvicorn을 직접 실행하므로 이 부분은 로컬 테스트용) ---
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8011))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)