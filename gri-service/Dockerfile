# =========================================================================
# Base Image: [변경] CUDA 12.1.1 공식 이미지를 사용합니다.
# 'devel' 버전은 bitsandbytes 등 일부 패키지 컴파일에 필요한 도구를 포함합니다.
# =========================================================================
FROM nvidia/cuda:12.1.1-cudnn8-devel-ubuntu22.04

# =========================================================================
# Environment Variables: 컨테이너 환경 설정
# =========================================================================
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# =========================================================================
# System Packages & Python 3.12.7 설치
# =========================================================================
RUN apt-get update && apt-get install -y \
    software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa \
    && apt-get update && apt-get install -y \
    # [변경] Python 3.12 설치
    python3.12 \
    python3.12-venv \
    python3.12-dev \
    python3-pip \
    # 기존 시스템 패키지
    tzdata \
    curl \
    git \
    git-lfs \
    && rm -rf /var/lib/apt/lists/*

# [변경] python3 -> python3.12, pip -> pip3로 심볼릭 링크 설정
RUN ln -s /usr/bin/python3.12 /usr/bin/python && \
    ln -s /usr/bin/python3.12 /usr/bin/python3

# =========================================================================
# Application Setup
# =========================================================================
WORKDIR /app

# [변경] PyTorch를 먼저 설치하여 Docker 빌드 캐시 효율 극대화
# 추천해주신 최적 조합(PyTorch Nightly + CUDA 12.1)을 설치합니다.
RUN pip install --upgrade pip && \
    pip install torch --pre --index-url https://download.pytorch.org/whl/nightly/cu121

# Python 의존성 설치
# 1. requirements.txt 파일만 먼저 복사합니다.
COPY requirements.txt .
# 2. PyTorch를 제외한 나머지 의존성을 설치합니다.
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 소스 코드 전체 복사
COPY . .

# =========================================================================
# Networking and Execution
# =========================================================================
EXPOSE 8010

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8010/health || exit 1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8010", "--reload"]