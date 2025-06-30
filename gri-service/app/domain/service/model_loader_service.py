# gri-service/app/domain/service/model_loader_service.py

import torch
import logging
import os
from transformers import AutoTokenizer, AutoModelForCausalLM
from transformers.utils.quantization_config import BitsAndBytesConfig
from huggingface_hub import snapshot_download
from app.foundation.config import MODEL_ID, MODEL_PATH

# RTX 5060 (Ada Lovelace) 호환성 설정
os.environ["TORCH_CUDA_ARCH_LIST"] = "9.0"
os.environ["CUDA_LAUNCH_BLOCKING"] = "1"
os.environ["TORCH_ALLOW_TF32_CUBLAS_OVERRIDE"] = "1"


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ModelLoaderService:
    """AI 모델 로딩, 다운로드, 추론을 담당하는 서비스 (싱글톤 패턴)"""
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelLoaderService, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self.model = None
        self.tokenizer = None
        # RTX 5060을 강제로 사용
        self.device = "cuda"
        self._initialized = True
        logger.info(f"ModelLoaderService 초기화 (Device: {self.device})")
        
    def _download_model_if_not_exists(self):
        """지정된 경로에 모델이 없으면 다운로드합니다."""
        # config.json 파일이 있는지 확인하여 다운로드 여부 결정
        model_config_path = MODEL_PATH / "config.json"
        if not MODEL_PATH.exists() or not list(MODEL_PATH.glob("*.json")): # 폴더 내에 json 파일이 하나도 없다면
            logger.info(f"'{MODEL_PATH}'에 모델 파일이 없습니다. '{MODEL_ID}' 다운로드를 시작합니다...")
            snapshot_download(
                repo_id=MODEL_ID,
                local_dir=MODEL_PATH,
                local_dir_use_symlinks=False,
            )
            logger.info("✅ 모델 다운로드 완료!")
        else:
            logger.info(f"'{MODEL_PATH}'에서 기존 모델을 사용합니다.")

    def load_model(self):
        """앱 시작 시 모델을 메모리에 로드합니다."""
        if self.model:
            logger.info("모델이 이미 로드되어 있습니다.")
            return

        self._download_model_if_not_exists()
        
        try:
            logger.info(f"🧠 모델 로딩 시작: {MODEL_ID} (GPU 직접 로딩)")
            
            # Windows bitsandbytes 문제로 인해 4비트 양자화 비활성화
            # quantization_config = BitsAndBytesConfig(
            #     load_in_4bit=True,
            #     bnb_4bit_quant_type="nf4",
            #     bnb_4bit_compute_dtype=torch.float16,
            #     bnb_4bit_use_double_quant=True,
            # )
            
            self.model = AutoModelForCausalLM.from_pretrained(
                MODEL_PATH, 
                # quantization_config=quantization_config,
                device_map="auto",
                torch_dtype=torch.float16,
                trust_remote_code=True,
                low_cpu_mem_usage=True,
                use_safetensors=True,
                # RTX 5060 호환성을 위한 추가 설정
                attn_implementation="eager",  # Flash Attention 비활성화
            )
            # --- 💡 수정된 부분 끝 💡 ---
            
            self.tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
            
            if self.tokenizer.pad_token is None:
                self.tokenizer.pad_token = self.tokenizer.eos_token
                
            logger.info("✅ 모델 및 토크나이저 로딩 완료!")
            
        except Exception as e:
            logger.error(f"❌ 모델 로딩 실패: {e}", exc_info=True)
            raise

    def generate(self, prompt: str, max_new_tokens: int = 256) -> str:
        """프롬프트로 텍스트를 생성합니다."""
        if not self.model or not self.tokenizer:
            raise RuntimeError("모델이 로드되지 않았습니다.")
            
        # KoAlpaca 대화형 프롬프트 템플릿 구성
        conversation_prompt = f"""### 질문: {prompt}

### 답변:"""
        
        inputs = self.tokenizer(conversation_prompt, return_tensors="pt", add_special_tokens=True)
        # token_type_ids 제거 (GPT 계열 모델에서는 불필요)
        if 'token_type_ids' in inputs:
            del inputs['token_type_ids']
        inputs = inputs.to(self.device)
        
        with torch.no_grad():
            # RTX 5060 호환성을 위한 안전한 생성 설정
            try:
                outputs = self.model.generate(
                    **inputs, 
                    max_new_tokens=max_new_tokens,
                    do_sample=True,
                    temperature=0.7,
                    top_p=0.9,
                    repetition_penalty=1.1,
                    pad_token_id=self.tokenizer.eos_token_id,
                    eos_token_id=self.tokenizer.eos_token_id,
                    use_cache=True,
                    output_attentions=False,
                    output_hidden_states=False,
                )
            except RuntimeError as e:
                if "no kernel image is available" in str(e):
                    logger.warning("CUDA 커널 호환성 문제 감지. 대체 방법으로 시도합니다...")
                    # 더 안전한 설정으로 재시도
                    outputs = self.model.generate(
                        **inputs, 
                        max_new_tokens=min(max_new_tokens, 50),  # 토큰 수 제한
                        do_sample=False,  # 그리디 디코딩
                        pad_token_id=self.tokenizer.eos_token_id,
                        eos_token_id=self.tokenizer.eos_token_id,
                        use_cache=False,
                    )
                else:
                    raise
        
        response_text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        # 프롬프트 부분을 제외하고 답변만 반환
        answer_start = response_text.find("### 답변:") + len("### 답변:")
        answer = response_text[answer_start:].strip()
        
        # 다음 질문이 시작되면 그 전까지만 반환
        if "### 질문:" in answer:
            answer = answer.split("### 질문:")[0].strip()
            
        return answer


model_loader_service = ModelLoaderService()

# --- 아래 테스트 코드를 파일 맨 끝에 추가하세요 ---
if __name__ == "__main__":
    try:
        print("="*50)
        print("모델 로더 서비스 단독 실행 테스트를 시작합니다...")
        print("="*50)
        
        # 위에서 생성된 서비스 인스턴스의 load_model 함수를 호출합니다.
        model_loader_service.load_model()
        
        print("\n🎉🎉🎉 테스트 성공! 모델이 정상적으로 로드되었습니다. 🎉🎉🎉")
        
    except Exception as e:
        # 오류 발생 시 더 자세한 정보를 볼 수 있도록 traceback 추가
        import traceback
        print(f"\n🔥🔥🔥 테스트 실패! 오류가 발생했습니다: {e} 🔥🔥🔥")
        traceback.print_exc()