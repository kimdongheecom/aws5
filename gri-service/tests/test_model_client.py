# api_client.py

import requests
import json
import time
import sys

# 실행 중인 FastAPI 서버의 주소
# Docker 내부에서 실행하는 것이 아니라, 로컬에서 서버에 요청을 보낼 때 사용합니다.
API_BASE_URL = "http://localhost:8010"

def test_api_connection():
    """API 서버 연결 테스트"""
    try:
        response = requests.get(f"{API_BASE_URL}/health", timeout=5)
        response.raise_for_status()
        print("✅ API 서버 연결 성공!")
        print(f"   서버 상태: {response.json()}")
        return True
    except requests.exceptions.RequestException as e:
        print("❌ API 서버에 연결할 수 없습니다.")
        print("   에러: ", e)
        print("\n💡 해결 방법:")
        print("   1. 별도의 터미널에서 'python -m app.main' 또는 uvicorn 명령어로 API 서버를 먼저 실행했는지 확인하세요.")
        print("   2. 포트 번호(8010)가 올바른지 확인하세요.")
        return False

def run_interactive_chat():
    """API 서버와 상호작용하는 대화형 챗봇 모드"""
    print("\n🤖 API 기반 챗봇 시작!")
    print("💡 'quit' 또는 'exit'를 입력하면 종료됩니다.")
    print("="*60)

    while True:
        try:
            user_input = input("\n👤 You: ").strip()
            if user_input.lower() in ['quit', 'exit', '종료']:
                print("👋 챗봇을 종료합니다.")
                break
            if not user_input:
                continue

            print("🤖 Bot: (요청 중...)", end="\r", flush=True)
            start_time = time.time()
            
            # API에 POST 요청 보내기
            response = requests.post(
                f"{API_BASE_URL}/generate",
                json={"prompt": user_input}
            )
            response.raise_for_status() # 오류가 있으면 예외 발생

            end_time = time.time()
            generation_time = end_time - start_time

            answer = response.json().get("answer", "오류: 응답 형식이 올바르지 않습니다.")
            
            # 줄바꿈을 포함하여 깔끔하게 출력
            print("🤖 Bot: " + " " * 20) # "요청 중..." 메시지 덮어쓰기
            print(answer)
            print(f"⏱️  생성 시간: {generation_time:.2f}초")

        except requests.exceptions.HTTPError as e:
            print(f"\n❌ API 오류: {e.response.status_code} {e.response.text}")
        except requests.exceptions.RequestException as e:
            print(f"\n❌ 연결 오류: {e}")
        except KeyboardInterrupt:
            print("\n\n👋 사용자가 중단했습니다.")
            break

def run_benchmark():
    """API 서버 성능 벤치마크"""
    print("\n📊 API 서버 성능 벤치마크 시작!")
    print("="*60)

    test_cases = [
        ("짧은 질문", "안녕하세요!"),
        ("중간 질문", "기후 변화가 경제에 미치는 영향을 설명해주세요."),
        ("긴 질문", "TCFD 보고서 작성 시 고려해야 할 주요 요소들과 각각의 중요성에 대해 자세히 설명해주세요.")
    ]
    
    total_time = 0
    total_requests = len(test_cases)

    for i, (test_name, prompt) in enumerate(test_cases, 1):
        print(f"\n🧪 테스트 {i}/{total_requests}: {test_name}")
        print(f"   프롬프트: {prompt[:30]}...")
        
        start_time = time.time()
        try:
            response = requests.post(f"{API_BASE_URL}/generate", json={"prompt": prompt})
            response.raise_for_status()
            answer = response.json().get('answer')
            end_time = time.time()
            
            elapsed = end_time - start_time
            total_time += elapsed
            
            print(f"   응답: {answer[:50]}{'...' if len(answer) > 50 else ''}")
            print(f"   ⏱️  시간: {elapsed:.2f}초")

        except requests.exceptions.RequestException as e:
            print(f"   ❌ 테스트 실패: {e}")
            
    avg_time = total_time / total_requests if total_requests > 0 else 0
    print("\n📈 벤치마크 결과:")
    print(f"   총 요청: {total_requests}개")
    print(f"   총 시간: {total_time:.2f}초")
    print(f"   평균 응답 시간: {avg_time:.2f}초/요청")

def main():
    """메인 실행 함수"""
    if not test_api_connection():
        return

    print("\n실행할 작업을 선택하세요:")
    print("1. 대화형 챗봇 (Interactive Chat)")
    print("2. 성능 벤치마크 (Benchmark)")
    choice = input("\n선택 (1-2, 기본값: 1): ").strip()

    if choice == "2":
        run_benchmark()
    else:
        run_interactive_chat()

if __name__ == "__main__":
    main()