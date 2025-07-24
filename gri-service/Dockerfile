# Base Image: CUDA 12.8.0, Ubuntu 22.04
FROM nvidia/cuda:12.8.0-devel-ubuntu22.04

# Environment Variables
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# System Packages & Python 3.12
RUN sed -i 's#http://archive.ubuntu.com/ubuntu/#http://mirror.kakao.com/ubuntu/#' /etc/apt/sources.list \
    && sed -i 's#http://security.ubuntu.com/ubuntu/#http://mirror.kakao.com/ubuntu/#' /etc/apt/sources.list \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        software-properties-common ca-certificates \
    && add-apt-repository -y ppa:deadsnakes/ppa \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        python3.12 python3.12-venv python3.12-dev curl tzdata git \
    && rm -rf /var/lib/apt/lists/*

RUN ln -sf /usr/bin/python3.12 /usr/bin/python && ln -sf /usr/bin/python3.12 /usr/bin/python3

# Application Setup
WORKDIR /app

# Python Dependencies (PyTorch Nightly for RTX 5060)
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.12
RUN python3.12 -m pip install --upgrade pip setuptools wheel

# =========================================================================
# ✅ [핵심 수정] RTX 5060용 CUDA 12.8 호환 PyTorch 설치
# =========================================================================
RUN python3.12 -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128

# 나머지 Python 의존성 설치
COPY requirements.txt .
RUN python3.12 -m pip install --no-cache-dir -r requirements.txt

# Application Source Code
COPY . .

# Networking and Execution
EXPOSE 8010
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8010", "--reload"]