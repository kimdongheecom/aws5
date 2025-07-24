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
        URL을 base_url + path 형태로 구성합니다.
        """
        # 🚨 수정된 부분: base_url과 path를 직접 결합하여 최종 URL 생성
        # 예: (base_url: http://localhost:8010, path: generate) -> http://localhost:8010/generate
        url = f"{self.base_url}/{path}"
        logger.info(f"🎯  Forwarding request: {method} {url}")

        # 전달된 헤더가 Content-Type을 포함하지 않을 경우, 기본값을 application/json으로 설정
        headers_to_send = headers.copy() if headers else {}
        if 'content-type' not in (key.lower() for key in headers_to_send.keys()):
            headers_to_send['Content-Type'] = 'application/json'

        try:
            async with httpx.AsyncClient(timeout=300.0) as client: # AI 모델 추론을 위해 타임아웃 5분으로 증가
                response = await client.request(
                    method=method.upper(),
                    url=url,
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