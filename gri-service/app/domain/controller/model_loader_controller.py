# gri-service/app/controller/gri_controller.py
import logging

from app.domain.service.model_loader_service import ModelLoaderService

logger = logging.getLogger(__name__)

class ModelLoaderController:

    def __init__(self):
        self.model_loader_service = ModelLoaderService()

    def generate_text_from_prompt(self, prompt: str) -> str:
        """
        프롬프트를 받아 서비스 계층에 전달하고 결과를 반환합니다.
        Args:
            prompt (str): 사용자가 입력한 프롬프트

        Returns:
            str: AI 모델이 생성한 답변
        """
        if not prompt:
            raise ValueError("프롬프트는 비워둘 수 없습니다.")
        
        logger.info(f"Controller: 생성 요청 수신 - '{prompt[:30]}...'")
        answer = self.model_loader_service.generate(prompt)
        logger.info(f"Controller: 생성 완료 - '{answer[:30]}...'")
        return answer

        