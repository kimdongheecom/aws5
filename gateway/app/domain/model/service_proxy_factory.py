import httpx
import logging
import traceback
from typing import Optional, Dict

from fastapi import HTTPException

from app.domain.model.service_type import SERVICE_URLS, ServiceType

logger = logging.getLogger("gateway_api")

class ServiceProxyFactory:
    def __init__(self, service_type: ServiceType):
        self.service_type = service_type
        self.base_url = SERVICE_URLS.get(service_type)
        if not self.base_url:
            logger.error(f"❌ 서비스 '{service_type.value}'에 대한 URL이 .env에 정의되지 않았습니다.")
            raise HTTPException(status_code=500, detail=f"Service URL for '{service_type.value}' not configured.")
        
        logger.info(f"🎟️  Service Proxy Created for '{service_type.value}' -> {self.base_url}")

    async def request(
        self,
        method: str,
        path: str,
        headers: Optional[Dict[str, str]] = None,
        body: Optional[bytes] = None,
        params: Optional[Dict[str, str]] = None
    ) -> httpx.Response:
        """
        백엔드 서비스로 실제 요청을 보내는 메소드.
        서비스별 내부 경로(prefix)를 여기서 관리합니다.
        """
        
        # ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
        # 🚨 [핵심 수정] 이 부분이 수정/추가된 로직입니다.
        # 서비스 종류에 따라 최종 경로를 다르게 조립합니다.
        # -------------------------------------------------------------------
        final_path = f"/{path}" # 기본 경로는 /path

        if self.service_type == ServiceType.REPORT:
            # report-service는 내부적으로 /report prefix를 사용하므로 붙여줍니다.
            final_path = f"/report/{path}"
        
        # 예시: 만약 다른 서비스도 내부 prefix가 있다면 여기에 추가할 수 있습니다.
        # elif self.service_type == ServiceType.COMPANY:
        #     final_path = f"/company-api/{path}"
        # -------------------------------------------------------------------
        # ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

        # 최종 URL 조합 (path 대신 final_path 사용)
        url = f"{self.base_url}{final_path}"
        logger.info(f"🎯  Forwarding request: {method} {url}")

        # 전달된 헤더가 Content-Type을 포함하지 않을 경우, 기본값을 application/json으로 설정
        headers_to_send = headers.copy() if headers else {}
        if 'content-type' not in (key.lower() for key in headers_to_send.keys()):
            headers_to_send['Content-Type'] = 'application/json'

        try:
            async with httpx.AsyncClient(timeout=300.0) as client: # AI 모델 추론을 위해 타임아웃 5분으로 증가
                response = await client.request(
                    method=method.upper(),
                    url=url, # 수정된 경로가 포함된 url 사용
                    headers=headers_to_send,
                    content=body,
                    params=params
                )
                
                logger.info(f"✅  Response from {url}: {response.status_code}")
                return response

        except httpx.RequestError as e:
            error_traceback = traceback.format_exc()
            logger.error(f"❌  Proxy request to {url} failed: {e}\n{error_traceback}")
            raise HTTPException(status_code=503, detail=f"Service unavailable: {self.service_type.value}")
        except Exception as e:
            error_traceback = traceback.format_exc()
            logger.error(f"❌  An unexpected error occurred during proxying:\n{error_traceback}")
            raise HTTPException(status_code=500, detail=f"Internal proxy error: {str(e)}")