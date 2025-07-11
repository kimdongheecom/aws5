import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
import os
import sys

# config.py에서 모델 ID 가져오기
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app.foundation.config import MODEL_ID

def check_cuda():
    print("=== CUDA 상태 확인 ===")
    print(f"CUDA available: {torch.cuda.is_available()}")
    if torch.cuda.is_available():
        print(f"CUDA device count: {torch.cuda.device_count()}")
        print(f"Current device: {torch.cuda.current_device()}")
        print(f"Device name: {torch.cuda.get_device_name(0)}")
        print("✅ CUDA를 사용할 수 있습니다!")
    else:
        print("CUDA가 사용 불가능합니다.")
    print()

def download_koalpaca_model():
    print(f"=== {MODEL_ID} 모델 다운로드 ===")
    model_name = MODEL_ID
    
    try:
        print(f"모델 다운로드 시작: {model_name}")
        
        # 토크나이저 다운로드
        print("토크나이저 다운로드 중...")
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        print("토크나이저 다운로드 완료!")
        
        # 모델 다운로드 (GPU 사용 가능하면 GPU로, 아니면 CPU로)
        print("모델 다운로드 중...")
        device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"사용할 디바이스: {device}")
        
        model = AutoModelForCausalLM.from_pretrained(
            model_name,
            torch_dtype=torch.float16 if device == "cuda" else torch.float32,
            device_map="auto" if device == "cuda" else None
        )
        
        print("모델 다운로드 완료!")
        print(f"모델이 {device}에 로드되었습니다.")
        
        # 간단한 테스트
        print("\n=== 간단한 테스트 ===")
        test_input = "안녕하세요, 저는"
        inputs = tokenizer(test_input, return_tensors="pt")
        
        # token_type_ids 제거 (일부 모델에서 지원하지 않음)
        if 'token_type_ids' in inputs:
            del inputs['token_type_ids']
        
        if device == "cuda":
            inputs = {k: v.to(device) for k, v in inputs.items()}
        
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_length=50,
                do_sample=True,
                temperature=0.7,
                pad_token_id=tokenizer.eos_token_id
            )
        
        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        print(f"입력: {test_input}")
        print(f"생성된 텍스트: {generated_text}")
        
    except Exception as e:
        print(f"오류 발생: {e}")
        return False
    
    return True

if __name__ == "__main__":
    check_cuda()
    success = download_koalpaca_model()
    
    if success:
        print("\n✅ KoAlpaca 모델 다운로드 및 테스트 완료!")
    else:
        print("\n❌ 모델 다운로드 중 문제가 발생했습니다.") 