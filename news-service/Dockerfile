# Dockerfile
# Base Image: Python 3.12.7 공식 이미지를 사용합니다.
FROM python:3.12.7-slim

# --- Environment Variables ---
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
ENV PYTHONUNBUFFERED=1
# PYTHONPATH를 설정하여 'from app.controller...' 같은 절대 경로 임포트를 가능하게 함
ENV PYTHONPATH=/app

# --- System Packages & PyTorch GPU-enabled Installation ---
# 시스템 도구와 PyTorch를 함께 설치합니다.
RUN apt-get update && apt-get install -y tzdata git git-lfs curl \
    && rm -rf /var/lib/apt/lists/* \
    # PyTorch 설치: CUDA 12.1에 맞는 버전을 공식 index-url을 통해 설치
    && pip install --no-cache-dir torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# --- Application Setup ---
WORKDIR /app

# 1. 의존성 파일만 먼저 복사하여 Docker 빌드 캐시를 활용
COPY requirements.txt .
# 2. PyTorch를 제외한 나머지 의존성 설치
RUN pip install --no-cache-dir -r requirements.txt

# 3. news-service의 소스 코드 전체를 /app 폴더 안으로 복사
COPY app/ .

# --- Networking and Execution ---
EXPOSE 8010

HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=3 \
    CMD curl -f http://localhost:8010/health || exit 1

# 컨테이너 시작 시 실행될 메인 명령어
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8010"]