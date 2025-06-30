from typing import Optional, Dict
from fastapi import HTTPException
import httpx
import logging
import traceback

from app.domain.model.service_type import SERVICE_URLS, ServiceType

logger = logging.getLogger("gateway_api")

class ServiceProxyFactory:
    def __init__(self, service_type: ServiceType):
        self.service_type = service_type
        self.base_url = SERVICE_URLS[service_type]
        print(f"🎟🎁🎀🎄 Service URL: {self.base_url}")

    async def request(
        self,
        method: str,
        path: str,
        headers: Optional[Dict[str, str]] = None,
        body: Optional[bytes] = None
    ) -> httpx.Response:
        url = f"{self.base_url}/{self.service_type.value}/{path}"
        print(f"🎯🎯🎯 Requesting URL: {url}")

        # ✅ 기본 헤더 구성
        headers_dict = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }

        # ✅ 전달된 헤더 병합 (기존 헤더가 우선)
        if headers:
            headers_dict.update(headers)

        try:
            async with httpx.AsyncClient() as client:
                response = await client.request(
                    method=method.upper(),
                    url=url,
                    headers=headers_dict,
                    content=body  # JSON 바이트로 전달
                )
                print(f"✅ Response status: {response.status_code}")
                print(f"✅ Response text: {response.text}")
                return response

        except Exception as e:
            error_traceback = traceback.format_exc()
            logger.error(f"❌ 요청 실패:\n{error_traceback}") # <--- 수정
            raise HTTPException(status_code=500, detail=f"Proxy 요청 실패: {str(e)}") 
          
