#!/usr/bin/env python3
# test_model_loader.py

import sys
import os
# tests 폴더에서 상위 폴더(gri-service)를 경로에 추가
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.domain.service.model_loader_service import model_loader_service

def test_model_loader():
    print("🚀 ModelLoaderService 테스트 시작...")
    
    try:
        # 모델 로드
        print("📥 모델 로딩 중...")
        model_loader_service.load_model()
        
        # 간단한 테스트 질문
        test_prompt = "안녕하세요. 오늘 날씨는 어떤가요?"
        print(f"🤔 테스트 질문: {test_prompt}")
        
        # 답변 생성
        response = model_loader_service.generate(test_prompt, max_new_tokens=100)
        print(f"🤖 AI 답변: {response}")
        
        print("✅ 테스트 완료!")
        
    except Exception as e:
        print(f"❌ 테스트 실패: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_model_loader() 