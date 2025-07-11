#!/usr/bin/env python3
# train_lora_adapter_fast.py - 최적화된 빠른 LoRA 훈련 스크립트

import sys
import os
import torch
import pandas as pd
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Union
from dataclasses import dataclass
import logging

# 로컬 모듈 import를 위한 경로 추가
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from transformers import (
    AutoTokenizer, 
    AutoModelForCausalLM,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling
)
from peft import (
    LoraConfig, 
    get_peft_model, 
    prepare_model_for_kbit_training,
    TaskType
)
from datasets import Dataset

from app.foundation.config import MODEL_PATH, ADAPTERS_PATH, MODEL_ID
from train_knowledge import KnowledgeTrainer

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class FastLoRATrainingConfig:
    """빠른 LoRA 훈련 설정"""
    # LoRA 설정 (더 작은 파라미터로 빠른 훈련)
    lora_r: int = 8                     # LoRA rank (16→8로 감소)
    lora_alpha: int = 16                # LoRA alpha (32→16으로 감소)
    lora_dropout: float = 0.1           # LoRA dropout
    target_modules: Optional[List[str]] = None    # 타겟 모듈
    
    # 훈련 설정 (속도 최적화)
    num_epochs: int = 1                 # 에포크 수 (3→1로 감소)
    learning_rate: float = 5e-4         # 학습률 증가 (2e-4→5e-4)
    batch_size: int = 4                 # 배치 크기 증가 (2→4)
    gradient_accumulation_steps: int = 2 # 그래디언트 누적 (4→2로 감소)
    max_length: int = 256               # 최대 길이 감소 (512→256)
    
    # 저장 설정
    adapter_name: str = "gri_adapter_fast"
    save_steps: int = 50                # 저장 간격 감소
    eval_steps: int = 25                # 평가 간격 감소

class FastLoRATrainer:
    """빠른 LoRA 어댑터 훈련 클래스"""
    
    def __init__(self, config: FastLoRATrainingConfig):
        self.config = config
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = None
        self.tokenizer = None
        self.knowledge_trainer = KnowledgeTrainer()
        
        # 기본 타겟 모듈 설정 (GPT-NeoX 아키텍처용, 핵심 모듈만 선택)
        if self.config.target_modules is None:
            self.config.target_modules = [
                "query_key_value",  # attention의 Q, K, V 통합 모듈만
                "dense"            # attention output projection만
                # MLP 모듈 제외로 훈련 속도 향상
            ]
        
        logger.info(f"빠른 LoRA 훈련 초기화 - Device: {self.device}")

    def load_base_model(self):
        """베이스 모델과 토크나이저 로딩"""
        logger.info(f"베이스 모델 로딩: {MODEL_ID}")
        
        # 토크나이저 로딩
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token
        
        # 모델 로딩 (최적화된 설정)
        self.model = AutoModelForCausalLM.from_pretrained(
            MODEL_PATH,
            torch_dtype=torch.float16,
            device_map=None,
            low_cpu_mem_usage=True,
            trust_remote_code=True,
        )
        
        # GPU로 명시적 이동
        if torch.cuda.is_available():
            self.model = self.model.to("cuda")
        
        logger.info("✅ 베이스 모델 로딩 완료")

    def prepare_fast_training_data(self) -> Dataset:
        """빠른 훈련을 위한 데이터 준비 (JSON 형태로 최적화)"""
        logger.info("빠른 훈련용 데이터 준비 중...")
        
        try:
            # JSON 형태의 미리 정의된 핵심 훈련 데이터
            fast_training_data = [
                {
                    "input": "ESG란 무엇인가요?",
                    "output": "ESG는 Environmental(환경), Social(사회), Governance(지배구조)의 줄임말로, 기업의 지속가능성을 평가하는 핵심 지표입니다."
                },
                {
                    "input": "GRI 스탠다드에 대해 설명해주세요.",
                    "output": "GRI 스탠다드는 조직의 경제, 환경, 사회적 영향을 보고하기 위한 국제적 프레임워크입니다."
                },
                {
                    "input": "지속가능성 보고서의 중요성은?",
                    "output": "지속가능성 보고서는 기업의 ESG 성과를 투명하게 공개하여 이해관계자 신뢰를 구축하는 중요한 도구입니다."
                }
            ]
            
            # GRI 데이터도 일부 추가 (속도를 위해 제한)
            try:
                df = self.knowledge_trainer.load_gri_data()
                gri_count = 0
                for _, row in df.iterrows():
                    if gri_count >= 20:  # 20개만 선택
                        break
                        
                    try:
                        gongsi = str(row['공시사항']) if pd.notna(row['공시사항']) else ""  # type: ignore
                        yogusahang = str(row['요구사항']) if pd.notna(row['요구사항']) else ""  # type: ignore
                        
                        if gongsi and yogusahang and len(gongsi) < 100 and len(yogusahang) < 200:  # 길이 제한
                            fast_training_data.append({
                                "input": f"{gongsi}에 대한 GRI 요구사항을 알려주세요.",
                                "output": yogusahang[:200]  # 길이 제한
                            })
                            gri_count += 1
                    except:
                        continue
            except Exception as e:
                logger.warning(f"GRI 데이터 로딩 실패, 기본 데이터만 사용: {e}")
            
            # 대화형 프롬프트로 변환
            training_examples = []
            for item in fast_training_data:
                prompt = f"### 질문: {item['input']}\n\n### 답변: {item['output']}"
                training_examples.append({"text": prompt})
            
            logger.info(f"총 {len(training_examples)}개의 빠른 훈련 예제 생성")
            
            # Dataset 객체 생성
            dataset = Dataset.from_list(training_examples)
            
            return dataset
            
        except Exception as e:
            logger.error(f"데이터 준비 실패: {e}")
            raise

    def tokenize_function(self, examples):
        """최적화된 토크나이징 함수"""
        if self.tokenizer is None:
            raise ValueError("Tokenizer가 로딩되지 않았습니다.")
            
        # 텍스트 토크나이징 (최적화된 설정)
        tokenized = self.tokenizer(
            examples["text"],
            truncation=True,
            padding="max_length",  # 고정 길이로 패딩
            max_length=self.config.max_length,
            return_tensors="pt"
        )
        
        # GPT-NeoX는 token_type_ids를 지원하지 않으므로 제거
        if "token_type_ids" in tokenized:
            del tokenized["token_type_ids"]
        
        # labels를 input_ids와 동일하게 설정
        tokenized["labels"] = tokenized["input_ids"].clone()
        
        return tokenized

    def setup_fast_lora(self):
        """최적화된 LoRA 설정"""
        logger.info("빠른 LoRA 설정 중...")
        
        if self.model is None:
            raise ValueError("모델이 로딩되지 않았습니다.")
        
        # 최적화된 LoRA 설정
        lora_config = LoraConfig(
            r=self.config.lora_r,
            lora_alpha=self.config.lora_alpha,
            target_modules=self.config.target_modules,
            lora_dropout=self.config.lora_dropout,
            bias="none",
            task_type=TaskType.CAUSAL_LM,
        )
        
        # 모델에 LoRA 적용
        self.model = get_peft_model(self.model, lora_config)  # type: ignore
        
        # 훈련 가능한 파라미터 출력
        self.model.print_trainable_parameters()
        
        logger.info("✅ 빠른 LoRA 설정 완료")

    def train(self):
        """최적화된 빠른 훈련 수행"""
        logger.info("빠른 LoRA 훈련 시작...")
        
        try:
            # 1. 베이스 모델 로딩
            self.load_base_model()
            
            # 2. 빠른 LoRA 설정
            self.setup_fast_lora()
            
            # 3. 빠른 훈련 데이터 준비
            dataset = self.prepare_fast_training_data()
            tokenized_dataset = dataset.map(
                self.tokenize_function,
                batched=True,
                remove_columns=dataset.column_names
            )
            
            # 4. 출력 디렉토리 설정
            output_dir = ADAPTERS_PATH / self.config.adapter_name
            output_dir.mkdir(parents=True, exist_ok=True)
            
            # 5. 최적화된 훈련 인자 설정
            training_args = TrainingArguments(
                output_dir=str(output_dir),
                num_train_epochs=self.config.num_epochs,
                per_device_train_batch_size=self.config.batch_size,
                gradient_accumulation_steps=self.config.gradient_accumulation_steps,
                learning_rate=self.config.learning_rate,
                logging_steps=5,                # 로깅 간격 단축
                save_steps=self.config.save_steps,
                eval_steps=self.config.eval_steps,
                warmup_steps=10,               # warmup 단축 (100→10)
                lr_scheduler_type="linear",    # 더 간단한 스케줄러
                fp16=True,                     # 혼합 정밀도 훈련
                dataloader_num_workers=0,      # 단순화
                remove_unused_columns=False,
                report_to=None,
                save_total_limit=2,            # 저장 파일 수 제한
            )
            
            # 6. 최적화된 데이터 콜레이터
            if self.tokenizer is None:
                raise ValueError("Tokenizer가 로딩되지 않았습니다.")
                
            data_collator = DataCollatorForLanguageModeling(
                tokenizer=self.tokenizer,
                mlm=False,
            )
            
            # 7. Trainer 생성
            trainer = Trainer(
                model=self.model,  # type: ignore
                args=training_args,
                train_dataset=tokenized_dataset,
                data_collator=data_collator,
            )
            
            # 8. 빠른 훈련 실행
            logger.info("🚀 빠른 훈련 시작!")
            start_time = datetime.now()
            
            train_result = trainer.train()
            
            end_time = datetime.now()
            training_time = end_time - start_time
            
            # 9. 어댑터 저장
            trainer.save_model()
            
            # 10. 훈련 로그 저장
            log_data = {
                "timestamp": datetime.now().isoformat(),
                "training_time_minutes": training_time.total_seconds() / 60,
                "config": self.config.__dict__,
                "train_result": train_result.metrics,
                "adapter_path": str(output_dir),
                "optimization": "fast_training"
            }
            
            log_file = output_dir / "fast_training_log.json"
            with open(log_file, 'w', encoding='utf-8') as f:
                json.dump(log_data, f, ensure_ascii=False, indent=2)
            
            logger.info(f"✅ 빠른 훈련 완료! 소요시간: {training_time}")
            logger.info(f"📁 어댑터 저장 위치: {output_dir}")
            logger.info(f"📊 훈련 로그: {log_file}")
            
            return output_dir
            
        except Exception as e:
            logger.error(f"❌ 빠른 훈련 실패: {e}")
            raise

def main():
    """메인 실행 함수"""
    print("⚡ 빠른 LoRA 어댑터 훈련을 시작합니다!")
    print("="*60)
    
    # 최적화된 훈련 설정
    config = FastLoRATrainingConfig(
        adapter_name="gri_adapter_fast",
        num_epochs=1,        # 빠른 훈련
        batch_size=4,        # 배치 크기 증가
        learning_rate=5e-4,  # 학습률 증가
        max_length=256,      # 시퀀스 길이 감소
    )
    
    # 설정 출력
    print("빠른 훈련 설정:")
    print(f"  - LoRA Rank: {config.lora_r} (감소)")
    print(f"  - LoRA Alpha: {config.lora_alpha} (감소)")
    print(f"  - 에포크: {config.num_epochs} (감소)")
    print(f"  - 배치 크기: {config.batch_size} (증가)")
    print(f"  - 학습률: {config.learning_rate} (증가)")
    print(f"  - 최대 길이: {config.max_length} (감소)")
    print(f"  - 어댑터 이름: {config.adapter_name}")
    print("="*60)
    
    # 사용자 확인
    response = input("빠른 훈련을 시작하시겠습니까? (y/N): ").strip().lower()
    if response not in ['y', 'yes']:
        print("훈련이 취소되었습니다.")
        return
    
    try:
        # 빠른 훈련 시작
        trainer = FastLoRATrainer(config)
        adapter_path = trainer.train()
        
        print("\n⚡ 빠른 훈련이 성공적으로 완료되었습니다!")
        print(f"📁 어댑터 위치: {adapter_path}")
        print("\n다음 명령으로 어댑터를 테스트할 수 있습니다:")
        print("python tests/test_model_loader.py")
        
    except Exception as e:
        print(f"\n❌ 빠른 훈련 실패: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main() 