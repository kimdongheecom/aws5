# C:\Users\edh48\Documents\aws5\gri-service\app\domain\service\model_loader_service.py

import torch
import logging
import os
import traceback
from typing import Union, Optional, Any, Dict
from transformers import AutoTokenizer, AutoModelForCausalLM
from huggingface_hub import snapshot_download

from peft import PeftModel

from app.foundation.config import MODEL_ID, MODEL_PATH, ADAPTERS_PATH, DEFAULT_ADAPTER, GRI_ADAPTER_CONFIG

# RTX 5060용 CUDA 설정
os.environ["TORCH_CUDA_ARCH_LIST"] = "8.9+PTX"  # RTX 5060 호환
os.environ["CUDA_LAUNCH_BLOCKING"] = "1"
os.environ["TORCH_ALLOW_TF32_CUBLAS_OVERRIDE"] = "1"
os.environ["TORCH_USE_CUDA_DSA"] = "1"  # CUDA DSA 활성화
os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "max_split_size_mb:128"  # 메모리 분할 최적화

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ModelLoaderService:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelLoaderService, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self.model: Optional[Any] = None
        self.tokenizer: Optional[Any] = None
        self.current_adapter: Optional[str] = None
        self.adapters_loaded: Dict[str, bool] = {}
        
        self.device = "cuda"
        
        self._initialized = True
        logger.info(f"ModelLoaderService 초기화 (Device: {self.device})")
        
    def _check_peft_available(self) -> bool:
        return True
        
    def _download_model_if_not_exists(self):
        if not MODEL_PATH.exists() or not list(MODEL_PATH.glob("*.json")):
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
        if self.model:
            logger.info("모델이 이미 로드되어 있습니다.")
            return

        self._download_model_if_not_exists()
        
        try:
            logger.info(f"🧠 모델 로딩 시작: {MODEL_ID} (GPU 직접 로딩)")
            
            self.model = AutoModelForCausalLM.from_pretrained(
                MODEL_PATH, 
                torch_dtype=torch.float16,
                trust_remote_code=True,
                low_cpu_mem_usage=True,
                use_safetensors=True,
                attn_implementation="eager",
            )
            
            # 모델을 GPU로 명시적으로 이동
            self.model = self.model.to(self.device)
            
            self.tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
            
            pad_token = getattr(self.tokenizer, 'pad_token', None)
            if pad_token is None:
                eos_token = getattr(self.tokenizer, 'eos_token', None)
                if eos_token is not None:
                    setattr(self.tokenizer, 'pad_token', eos_token)
                
            logger.info("✅ 모델 및 토크나이저 로딩 완료!")
            
            if GRI_ADAPTER_CONFIG["enabled"]:
                self._load_default_adapter()
            
        except Exception as e:
            logger.error(f"❌ 모델 로딩 실패: {e}", exc_info=True)
            raise

    def _load_default_adapter(self):
        try:
            adapter_path = ADAPTERS_PATH / DEFAULT_ADAPTER
            if adapter_path.exists() and any(adapter_path.glob("*.safetensors")):
                logger.info(f"🔧 기본 LoRA 어댑터 로딩 중: {DEFAULT_ADAPTER}")
                self.load_adapter(DEFAULT_ADAPTER)
                logger.info(f"✅ 기본 어댑터 '{DEFAULT_ADAPTER}' 로딩 완료!")
            else:
                logger.info(f"⚠️ 기본 어댑터 '{DEFAULT_ADAPTER}'가 없습니다. 베이스 모델로 시작합니다.")
        except Exception as e:
            logger.warning(f"⚠️ 기본 어댑터 로딩 실패, 베이스 모델 사용: {e}")

    def load_adapter(self, adapter_name: str):
        if not self._check_peft_available():
            raise RuntimeError("PEFT 라이브러리가 필요합니다.")
            
        if not self.model:
            raise RuntimeError("베이스 모델이 먼저 로드되어야 합니다.")
        
        adapter_path = ADAPTERS_PATH / adapter_name
        if not adapter_path.exists():
            raise FileNotFoundError(f"어댑터 폴더를 찾을 수 없습니다: {adapter_path}")
        
        try:
            if self.current_adapter:
                logger.info(f"🔄 기존 어댑터 '{self.current_adapter}' 제거 중...")
                self.unload_adapter()
            
            logger.info(f"🔧 LoRA 어댑터 로딩 중: {adapter_name}")
            
            self.model = PeftModel.from_pretrained(
                self.model, 
                adapter_path,
                is_trainable=False
            )
            
            # 어댑터 로딩 후에도 GPU로 이동
            self.model = self.model.to(self.device)
            
            self.current_adapter = adapter_name
            self.adapters_loaded[adapter_name] = True
            
            logger.info(f"✅ LoRA 어댑터 '{adapter_name}' 로딩 완료!")
            
        except Exception as e:
            logger.error(f"❌ 어댑터 '{adapter_name}' 로딩 실패: {e}")
            raise

    def unload_adapter(self):
        if not self.current_adapter:
            logger.info("제거할 어댑터가 없습니다.")
            return
        
        try:
            logger.info(f"🗑️ 어댑터 '{self.current_adapter}' 제거 중...")
            
            if hasattr(self.model, 'unload') and callable(getattr(self.model, 'unload')):
                self.model.unload()
            elif hasattr(self.model, 'base_model'):
                self.model = getattr(self.model, 'base_model')
            
            self.current_adapter = None
            logger.info("✅ 어댑터 제거 완료!")
            
        except Exception as e:
            logger.error(f"❌ 어댑터 제거 실패: {e}")
            raise

    def switch_adapter(self, adapter_name: str):
        if self.current_adapter == adapter_name:
            logger.info(f"이미 '{adapter_name}' 어댑터가 로딩되어 있습니다.")
            return
        
        logger.info(f"🔄 어댑터 전환: {self.current_adapter} → {adapter_name}")
        self.load_adapter(adapter_name)

    def get_adapter_info(self):
        return {
            "current_adapter": self.current_adapter,
            "available_adapters": list(self.adapters_loaded.keys()),
            "adapter_config": GRI_ADAPTER_CONFIG if self.current_adapter == DEFAULT_ADAPTER else None
        }

    def generate(self, prompt: str, max_new_tokens: int = 512) -> str:
        """프롬프트로 텍스트를 생성합니다."""
        if not self.model or not self.tokenizer:
            raise RuntimeError("모델이 로드되지 않았습니다.")
        
        adapter_info = f" (어댑터: {self.current_adapter})" if self.current_adapter else " (베이스 모델)"
        logger.info(f"🤖 텍스트 생성 시작{adapter_info}")
        
        # --- ▼▼▼ 핵심 수정 부분 시작 ▼▼▼ ---
        inputs = self.tokenizer(prompt, return_tensors="pt", add_special_tokens=True)
        # 1. 입력 프롬프트의 토큰 길이를 미리 저장합니다.
        input_ids_length = inputs['input_ids'].shape[1]
        # --- ▲▲▲ 핵심 수정 부분 끝 ▲▲▲ ---

        if 'token_type_ids' in inputs:
            del inputs['token_type_ids']
        
        # 모든 입력을 GPU로 이동
        inputs = {k: v.to(self.device) for k, v in inputs.items()}
        
        with torch.no_grad():
            try:
                generate_method = getattr(self.model, 'generate', None)
                if generate_method is None or not callable(generate_method):
                    raise RuntimeError("모델에 generate 메서드가 없습니다.")
                
                outputs = generate_method(
                    **inputs, 
                    max_new_tokens=max_new_tokens,
                    do_sample=True,
                    temperature=0.7,
                    top_p=0.9,
                    repetition_penalty=1.1,
                    pad_token_id=getattr(self.tokenizer, 'eos_token_id', None),
                    eos_token_id=getattr(self.tokenizer, 'eos_token_id', None),
                    use_cache=True,
                    output_attentions=False,
                    output_hidden_states=False,
                )
            except RuntimeError as e:
                if "no kernel image is available" in str(e):
                    logger.warning("CUDA 커널 호환성 문제 감지. 대체 방법으로 시도합니다...")
                    outputs = generate_method(
                        **inputs, 
                        max_new_tokens=min(max_new_tokens, 50),
                        do_sample=False,
                        pad_token_id=getattr(self.tokenizer, 'eos_token_id', None),
                        eos_token_id=getattr(self.tokenizer, 'eos_token_id', None),
                        use_cache=False,
                    )
                else:
                    raise
        
        # --- ▼▼▼ 핵심 수정 부분 시작 ▼▼▼ ---
        # 2. 전체 결과에서 입력 토큰 길이만큼을 잘라내어, 새로 생성된 토큰만 분리합니다.
        generated_token_ids = outputs[0][input_ids_length:]
        # 3. 분리된 토큰들만 텍스트로 변환합니다.
        answer = self.tokenizer.decode(generated_token_ids, skip_special_tokens=True).strip()
        # --- ▲▲▲ 핵심 수정 부분 끝 ▲▲▲ ---
        
        logger.info(f"🤖🤖🤖🤖🤖 GRI 답변 생성 완료: {answer}")
        
        # 특정 문자열에 의존하는 불안정한 후처리 로직은 제거하거나 신중하게 사용해야 합니다.
        if "### 질문:" in answer:
            answer = answer.split("### 질문:")[0].strip()
            
        return answer

model_loader_service = ModelLoaderService()

if __name__ == "__main__":
    try:
        print("="*50)
        print("모델 로더 서비스 단독 실행 테스트를 시작합니다...")
        print("="*50)
        
        model_loader_service.load_model()
        
        print("\n🎉🎉🎉 테스트 성공! 모델이 정상적으로 로드되었습니다. 🎉🎉🎉")
        
    except Exception as e:
        print(f"\n🔥🔥🔥 테스트 실패! 오류가 발생했습니다: {e} 🔥🔥🔥")
        traceback.print_exc()