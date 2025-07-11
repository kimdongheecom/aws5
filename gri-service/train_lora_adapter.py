#!/usr/bin/env python3
# train_lora_adapter.py - LoRA 훈련 스크립트

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
class LoRATrainingConfig:
    """LoRA 훈련 설정"""
    # LoRA 설정
    lora_r: int = 16                    # LoRA rank
    lora_alpha: int = 32                # LoRA alpha
    lora_dropout: float = 0.1           # LoRA dropout
    target_modules: Optional[List[str]] = None    # 타겟 모듈
    
    # 훈련 설정
    num_epochs: int = 3
    learning_rate: float = 2e-4
    batch_size: int = 2
    gradient_accumulation_steps: int = 4
    max_length: int = 512
    
    # 저장 설정
    adapter_name: str = "gri_adapter"
    save_steps: int = 100
    eval_steps: int = 50

class LoRATrainer:
    """LoRA 어댑터 훈련 클래스"""
    
    def __init__(self, config: LoRATrainingConfig):
        self.config = config
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = None
        self.tokenizer = None
        self.knowledge_trainer = KnowledgeTrainer()
        
        # 기본 타겟 모듈 설정 (GPT-NeoX 아키텍처용)
        if self.config.target_modules is None:
            self.config.target_modules = [
                "query_key_value",  # attention의 Q, K, V 통합 모듈
                "dense",           # attention output projection
                "dense_h_to_4h",   # MLP의 첫 번째 linear
                "dense_4h_to_h"    # MLP의 두 번째 linear
            ]
        
        logger.info(f"LoRA 훈련 초기화 - Device: {self.device}")

    def load_base_model(self):
        """베이스 모델과 토크나이저 로딩"""
        logger.info(f"베이스 모델 로딩: {MODEL_ID}")
        
        # 토크나이저 로딩
        self.tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
        if self.tokenizer.pad_token is None:
            self.tokenizer.pad_token = self.tokenizer.eos_token
        
        # 모델 로딩 (meta tensor 문제 해결)
        self.model = AutoModelForCausalLM.from_pretrained(
            MODEL_PATH,
            torch_dtype=torch.float16,
            device_map=None,  # auto 대신 None 사용
            low_cpu_mem_usage=True,
            trust_remote_code=True,
        )
        
        # GPU로 명시적 이동
        if torch.cuda.is_available():
            self.model = self.model.to("cuda")
        
        logger.info("✅ 베이스 모델 로딩 완료")

    def prepare_training_data(self) -> Dataset:
        """훈련 데이터 준비"""
        logger.info("훈련 데이터 준비 중...")
        
        try:
            # GRI 데이터 로딩
            df = self.knowledge_trainer.load_gri_data()
            
            # 훈련 예제 생성
            training_examples = []
            
            for _, row in df.iterrows():
                # pandas Series의 값을 안전하게 추출
                try:
                    gongsi = str(row['공시사항']) if pd.notna(row['공시사항']) else ""  # type: ignore
                except (KeyError, ValueError):
                    gongsi = ""
                
                try:
                    yogusahang = str(row['요구사항']) if pd.notna(row['요구사항']) else ""  # type: ignore
                except (KeyError, ValueError):
                    yogusahang = ""
                
                if gongsi and yogusahang:
                    # 대화형 프롬프트 생성
                    prompt = f"### 질문: {gongsi}에 대한 GRI 요구사항을 설명해주세요.\n\n### 답변: {yogusahang}"
                    training_examples.append({"text": prompt})
            
            # 추가 ESG 관련 질문들
            esg_examples = [
                {
                    "text": "### 질문: ESG가 무엇인가요?\n\n### 답변: ESG는 Environmental(환경), Social(사회), Governance(지배구조)의 줄임말로, 기업의 비재무적 성과를 측정하는 지표입니다. 기업이 환경 보호, 사회적 책임, 지배구조 개선에 얼마나 기여하는지를 평가합니다."
                },
                {
                    "text": "### 질문: GRI 스탠다드란 무엇인가요?\n\n### 답변: GRI(Global Reporting Initiative) 스탠다드는 조직이 경제, 환경, 사회적 영향을 보고하기 위한 국제적으로 인정받는 지속가능성 보고 프레임워크입니다."
                },
                {
                    "text": "### 질문: 지속가능성 보고서가 왜 중요한가요?\n\n### 답변: 지속가능성 보고서는 기업의 ESG 성과를 투명하게 공개하여 이해관계자들에게 신뢰를 제공하고, 기업의 장기적 가치 창출을 입증하는 중요한 도구입니다."
                }
            ]
            
            training_examples.extend(esg_examples)
            
            logger.info(f"총 {len(training_examples)}개의 훈련 예제 생성")
            
            # Dataset 객체 생성
            dataset = Dataset.from_list(training_examples)
            
            return dataset
            
        except Exception as e:
            logger.error(f"데이터 준비 실패: {e}")
            raise

    def tokenize_function(self, examples):
        """토크나이징 함수"""
        if self.tokenizer is None:
            raise ValueError("Tokenizer가 로딩되지 않았습니다.")
            
        # 텍스트 토크나이징
        tokenized = self.tokenizer(
            examples["text"],
            truncation=True,
            padding=True,
            max_length=self.config.max_length,
            return_tensors="pt"
        )
        
        # GPT-NeoX는 token_type_ids를 지원하지 않으므로 제거
        if "token_type_ids" in tokenized:
            del tokenized["token_type_ids"]
        
        # labels를 input_ids와 동일하게 설정 (언어 모델링)
        tokenized["labels"] = tokenized["input_ids"].clone()
        
        return tokenized

    def setup_lora(self):
        """LoRA 설정 및 모델 준비"""
        logger.info("LoRA 설정 중...")
        
        if self.model is None:
            raise ValueError("모델이 로딩되지 않았습니다.")
        
        # LoRA 설정
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
        
        logger.info("✅ LoRA 설정 완료")

    def train(self):
        """실제 훈련 수행"""
        logger.info("LoRA 훈련 시작...")
        
        try:
            # 1. 베이스 모델 로딩
            self.load_base_model()
            
            # 2. LoRA 설정
            self.setup_lora()
            
            # 3. 훈련 데이터 준비
            dataset = self.prepare_training_data()
            tokenized_dataset = dataset.map(
                self.tokenize_function,
                batched=True,
                remove_columns=dataset.column_names
            )
            
            # 4. 출력 디렉토리 설정
            output_dir = ADAPTERS_PATH / self.config.adapter_name
            output_dir.mkdir(parents=True, exist_ok=True)
            
            # 5. 훈련 인자 설정
            training_args = TrainingArguments(
                output_dir=str(output_dir),
                num_train_epochs=self.config.num_epochs,
                per_device_train_batch_size=self.config.batch_size,
                gradient_accumulation_steps=self.config.gradient_accumulation_steps,
                learning_rate=self.config.learning_rate,
                logging_steps=10,
                save_steps=self.config.save_steps,
                eval_steps=self.config.eval_steps,
                warmup_steps=100,
                lr_scheduler_type="cosine",
                fp16=True,
                report_to=None,  # wandb 등 사용 안함
                remove_unused_columns=False,
            )
            
            # 6. 데이터 콜레이터
            if self.tokenizer is None:
                raise ValueError("Tokenizer가 로딩되지 않았습니다.")
                
            data_collator = DataCollatorForLanguageModeling(
                tokenizer=self.tokenizer,
                mlm=False,  # 인과 언어 모델링
            )
            
            # 7. Trainer 생성
            trainer = Trainer(
                model=self.model,  # type: ignore
                args=training_args,
                train_dataset=tokenized_dataset,
                data_collator=data_collator,
            )
            
            # 8. 훈련 실행
            logger.info("🚀 훈련 시작!")
            train_result = trainer.train()
            
            # 9. 어댑터 저장
            trainer.save_model()
            
            # 10. 훈련 로그 저장
            log_data = {
                "timestamp": datetime.now().isoformat(),
                "config": self.config.__dict__,
                "train_result": train_result.metrics,
                "adapter_path": str(output_dir)
            }
            
            log_file = output_dir / "training_log.json"
            with open(log_file, 'w', encoding='utf-8') as f:
                json.dump(log_data, f, ensure_ascii=False, indent=2)
            
            logger.info(f"✅ 훈련 완료! 어댑터 저장 위치: {output_dir}")
            logger.info(f"📊 훈련 로그: {log_file}")
            
            return output_dir
            
        except Exception as e:
            logger.error(f"❌ 훈련 실패: {e}")
            raise

def main():
    """메인 실행 함수"""
    print("🚀 LoRA 어댑터 훈련을 시작합니다!")
    print("="*60)
    
    # 훈련 설정
    config = LoRATrainingConfig(
        adapter_name="gri_adapter",
        num_epochs=3,
        batch_size=1,  # GPU 메모리에 맞게 조정
        learning_rate=2e-4,
    )
    
    # 설정 출력
    print("훈련 설정:")
    print(f"  - LoRA Rank: {config.lora_r}")
    print(f"  - LoRA Alpha: {config.lora_alpha}")
    print(f"  - 에포크: {config.num_epochs}")
    print(f"  - 배치 크기: {config.batch_size}")
    print(f"  - 학습률: {config.learning_rate}")
    print(f"  - 어댑터 이름: {config.adapter_name}")
    print("="*60)
    
    # 사용자 확인
    response = input("훈련을 시작하시겠습니까? (y/N): ").strip().lower()
    if response not in ['y', 'yes']:
        print("훈련이 취소되었습니다.")
        return
    
    try:
        # 훈련 시작
        trainer = LoRATrainer(config)
        adapter_path = trainer.train()
        
        print("\n🎉 훈련이 성공적으로 완료되었습니다!")
        print(f"📁 어댑터 위치: {adapter_path}")
        print("\n다음 명령으로 어댑터를 테스트할 수 있습니다:")
        print("python tests/test_model_loader.py")
        
    except Exception as e:
        print(f"\n❌ 훈련 실패: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main() 