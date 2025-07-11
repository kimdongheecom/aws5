# gri-service/app/foundation/config.py

from pathlib import Path
import os

# --- 기본 경로 설정 ---
# 이 파일의 위치(app/foundation)에서 두 단계 상위 폴더(gri-service)를 프로젝트 루트로 지정
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# --- 모델 설정 ---
# KoAlpaca Polyglot 5.8B 모델 사용
MODEL_ID = "beomi/KoAlpaca-Polyglot-5.8B"

# (변경) 모델을 다운로드할 기본 폴더 경로 (app/domain/model 폴더)
# 하위 폴더(beomi/...)는 snapshot_download가 자동으로 생성합니다.
MODEL_PATH = BASE_DIR / "app" / "domain" / "model"

# --- LoRA 어댑터 설정 ---
ADAPTERS_PATH = BASE_DIR / "app" / "domain" / "adapters"
DEFAULT_ADAPTER = "gri_adapter"  # 기본 로딩할 어댑터 이름

# GRI 전문가 어댑터 설정
GRI_ADAPTER_CONFIG = {
    "name": "GRI 전문가",
    "description": "ESG 및 지속가능성 보고서 전문 어댑터",
    "path": "gri_adapter",
    "enabled": True
}

# --- 서버 설정 ---
API_PORT = int(os.getenv("API_PORT", 8010))
API_HOST = os.getenv("API_HOST", "0.0.0.0")