# =========================================================================
# Base Image: [최종 수정] 100% 존재하는 가장 안정적인 CUDA 툴킷(12.1.1) 사용
# =========================================================================
FROM nvidia/cuda:12.1.1-devel-ubuntu22.04

# =========================================================================
# Environment Variables: 컨테이너 환경 설정
# =========================================================================
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# =========================================================================
# System Packages & Python 3.12 설치
# =========================================================================
RUN apt-get update && apt-get install -y \
    software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa \
    && apt-get update && apt-get install -y \
    # Python 3.12와 개발 도구만 설치
    python3.12 \
    python3.12-venv \
    python3.12-dev \
    # pip를 설치하기 위해 curl 추가
    curl \
    # 기타 시스템 패키지
    tzdata \
    git \
    git-lfs \
    && rm -rf /var/lib/apt/lists/*

# [핵심] python3와 python을 python3.12로 연결(심볼릭 링크)
RUN ln -sf /usr/bin/python3.12 /usr/bin/python && \
    ln -sf /usr/bin/python3.12 /usr/bin/python3

# =========================================================================
# Application Setup: pip 관리 및 의존성 설치
# =========================================================================
WORKDIR /app

# 1. [핵심] 공식 get-pip.py 스크립트를 사용하여 python3.12에 pip를 직접 설치
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.12

# 2. 이제 python3.12에 pip가 설치되었으므로, 업그레이드 및 다른 패키지 설치가 가능
RUN python3.12 -m pip install --upgrade pip setuptools wheel

# 3. [핵심] PyTorch를 먼저, CUDA 버전에 맞춰 별도로 설치합니다.
# 이 단계는 requirements.txt를 처리하기 전에 실행되어야 합니다.
RUN python3.12 -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# 4. 사용자님의 requirements.txt를 사용하여 나머지 Python 의존성 설치
# requirements.txt를 설치하면, 이미 설치된 torch는 건너뛰고 나머지만 설치합니다.
RUN python3.12 -m pip install --no-cache-dir -r requirements.txt

# 5. 애플리케이션 소스 코드 전체 복사
COPY . .

# =========================================================================
# Networking and Execution
# =========================================================================
EXPOSE 8010

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8010/health || exit 1

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8010", "--reload"]