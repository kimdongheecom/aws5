#!/usr/bin/env python3
# test_model_loader.py

import sys
import os
import traceback
import json
import time
from datetime import datetime
# tests 폴더에서 상위 폴더(gri-service)를 경로에 추가
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.domain.service.model_loader_service import model_loader_service

def load_previous_feedback(question):
    """이전 피드백을 불러와서 컨텍스트로 활용합니다."""
    log_file = "feedback_log.json"
    if not os.path.exists(log_file):
        return ""
    
    try:
        with open(log_file, 'r', encoding='utf-8') as f:
            logs = json.load(f)
    except:
        return ""
    
    # 유사한 질문의 피드백 찾기
    relevant_feedback = []
    question_lower = question.lower()
    
    for log in logs:
        if log.get("feedback_type") == "틀린_답변" and log.get("correct_answer"):
            log_question = log.get("question", "").lower()
            # ESG 관련 질문들 매칭
            if any(keyword in question_lower and keyword in log_question 
                   for keyword in ["esg", "경영", "환경", "사회", "지배구조"]):
                relevant_feedback.append(log)
    
    if not relevant_feedback:
        return ""
    
    # 피드백 컨텍스트 생성
    feedback_context = "\n[이전 피드백 참고사항]\n"
    for feedback in relevant_feedback[-3:]:  # 최근 3개만
        feedback_context += f"질문: {feedback['question']}\n"
        feedback_context += f"틀린답변: {feedback['ai_answer'][:100]}...\n"
        feedback_context += f"올바른답변: {feedback['correct_answer']}\n\n"
    
    return feedback_context

def save_feedback_log(question, ai_answer, feedback_type, correct_answer=None, generation_time=None):
    """피드백을 JSON 파일에 저장합니다."""
    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "question": question,
        "ai_answer": ai_answer,
        "feedback_type": feedback_type,
        "correct_answer": correct_answer,
        "generation_time_seconds": generation_time
    }
    
    log_file = "feedback_log.json"
    
    # 기존 로그 파일 읽기
    if os.path.exists(log_file):
        try:
            with open(log_file, 'r', encoding='utf-8') as f:
                logs = json.load(f)
        except:
            logs = []
    else:
        logs = []
    
    # 새 로그 추가
    logs.append(log_entry)
    
    # 파일에 저장
    with open(log_file, 'w', encoding='utf-8') as f:
        json.dump(logs, f, ensure_ascii=False, indent=2)
    
    print(f"📄 피드백이 {log_file}에 저장되었습니다.")

def test_model_loader():
    print("🚀 ModelLoaderService 테스트 시작...")
    
    try:
        # 모델 로드
        print("📥 모델 로딩 중...")
        model_loader_service.load_model()
        print("✅ 모델 로딩 완료!")
        
        # 대화형 질문 루프
        print("\n" + "="*50)
        print("💬 AI와 대화를 시작합니다!")
        print("종료하려면 'quit', 'exit', '종료' 중 하나를 입력하세요.")
        print("="*50)
        
        while True:
            try:
                # 사용자 질문 입력받기
                user_question = input("\n🤔 질문을 입력하세요: ").strip()
                
                # 종료 명령어 확인
                if user_question.lower() in ['quit', 'exit', '종료', 'q']:
                    print("👋 대화를 종료합니다. 안녕히 가세요!")
                    break
                
                # 빈 입력 처리
                if not user_question:
                    print("⚠️ 질문을 입력해주세요.")
                    continue
                
                print(f"\n🤖 AI가 답변을 생성 중입니다...")
                
                # 이전 피드백 불러오기
                feedback_context = load_previous_feedback(user_question)
                
                # 피드백을 포함한 프롬프트 생성
                if feedback_context:
                    enhanced_question = f"{feedback_context}\n\n현재 질문: {user_question}\n위의 피드백을 참고하여 정확한 답변을 해주세요."
                    print("📚 이전 피드백을 참고하여 답변합니다...")
                else:
                    enhanced_question = user_question
                
                # 답변 생성 (기본 설정) - 시간 측정
                print("⏱️ 답변 생성 시작...")
                start_time = time.time()
                response = model_loader_service.generate(enhanced_question, max_new_tokens=200)
                end_time = time.time()
                generation_time = end_time - start_time
                
                print(f"\n💡 AI 답변")
                print(f"⏱️ 생성시간: {generation_time:.2f}초")
                print("=" * 60)
                print(response)
                print("=" * 60)
                
                # 답변 평가 및 수정 옵션
                while True:
                    feedback = input("\n📝 이 답변에 대한 평가를 해주세요:\n"
                                   "  1️⃣ 좋은 답변 (다음 질문으로)\n"
                                   "  2️⃣ 나쁜 답변 - 다시 생성\n"
                                   "  3️⃣ 더 긴 답변으로 재생성\n"
                                   "  4️⃣ 더 짧은 답변으로 재생성\n"
                                   "  5️⃣ 올바른 답변 직접 입력\n"
                                   "선택 (1-5): ").strip()
                    
                    if feedback == "1":
                        print("✅ 피드백 감사합니다!")
                        save_feedback_log(user_question, response, "좋은_답변", generation_time=generation_time)
                        break
                    elif feedback == "2":
                        print("\n🔄 답변을 다시 생성합니다...")
                        save_feedback_log(user_question, response, "나쁜_답변_재생성", generation_time=generation_time)
                        
                        # 피드백 활용한 재생성
                        if feedback_context:
                            enhanced_question = f"{feedback_context}\n\n현재 질문: {user_question}\n위의 피드백을 참고하여 정확한 답변을 해주세요."
                            print("📚 이전 피드백을 참고하여 재생성합니다...")
                        else:
                            enhanced_question = user_question
                        
                        print("⏱️ 답변 생성 시작...")
                        start_time = time.time()
                        response = model_loader_service.generate(enhanced_question, max_new_tokens=200)
                        end_time = time.time()
                        new_generation_time = end_time - start_time
                        
                        print(f"\n🔄 재생성된 답변")
                        print(f"⏱️ 생성시간: {new_generation_time:.2f}초")
                        print("=" * 60)
                        print(response)
                        print("=" * 60)
                    elif feedback == "3":
                        print("\n📝 더 자세한 답변을 생성합니다...")
                        save_feedback_log(user_question, response, "너무_짧음_긴답변요청", generation_time=generation_time)
                        
                        # 피드백 활용한 긴 답변 생성
                        if feedback_context:
                            enhanced_question = f"{feedback_context}\n\n현재 질문: {user_question}\n위의 피드백을 참고하여 정확하고 자세한 답변을 해주세요."
                            print("📚 이전 피드백을 참고하여 자세한 답변을 생성합니다...")
                        else:
                            enhanced_question = user_question
                        
                        print("⏱️ 긴 답변 생성 시작...")
                        start_time = time.time()
                        response = model_loader_service.generate(enhanced_question, max_new_tokens=400)
                        end_time = time.time()
                        new_generation_time = end_time - start_time
                        
                        print(f"\n📝 긴 답변")
                        print(f"⏱️ 생성시간: {new_generation_time:.2f}초")
                        print("=" * 60)
                        print(response)
                        print("=" * 60)
                    elif feedback == "4":
                        print("\n⚡ 더 간단한 답변을 생성합니다...")
                        save_feedback_log(user_question, response, "너무_김_짧은답변요청", generation_time=generation_time)
                        
                        # 피드백 활용한 짧은 답변 생성
                        if feedback_context:
                            enhanced_question = f"{feedback_context}\n\n현재 질문: {user_question}\n위의 피드백을 참고하여 정확하고 간단한 답변을 해주세요."
                            print("📚 이전 피드백을 참고하여 간단한 답변을 생성합니다...")
                        else:
                            enhanced_question = user_question
                        
                        print("⏱️ 짧은 답변 생성 시작...")
                        start_time = time.time()
                        response = model_loader_service.generate(enhanced_question, max_new_tokens=100)
                        end_time = time.time()
                        new_generation_time = end_time - start_time
                        
                        print(f"\n⚡ 짧은 답변")
                        print(f"⏱️ 생성시간: {new_generation_time:.2f}초")
                        print("=" * 60)
                        print(response)
                        print("=" * 60)
                    elif feedback == "5":
                        correct_answer = input("\n✏️ 올바른 답변을 입력해주세요: ").strip()
                        if correct_answer:
                            print(f"\n✅ 올바른 답변이 기록되었습니다:")
                            print("-" * 40)
                            print(correct_answer)
                            print("-" * 40)
                            print("📚 향후 모델 개선에 활용하겠습니다.")
                            save_feedback_log(user_question, response, "틀린_답변", correct_answer, generation_time)
                        break
                    else:
                        print("⚠️ 1-5 중에서 선택해주세요.")
                
            except KeyboardInterrupt:
                print("\n\n👋 Ctrl+C로 프로그램을 종료합니다.")
                break
            except Exception as e:
                print(f"❌ 답변 생성 중 오류 발생: {e}")
                traceback.print_exc()
        
    except Exception as e:
        print(f"❌ 모델 로딩 실패: {e}")
        traceback.print_exc()

if __name__ == "__main__":
    test_model_loader() 