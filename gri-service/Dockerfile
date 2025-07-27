# Base Image: CUDA 12.8.0, Ubuntu 22.04
FROM nvidia/cuda:12.8.0-devel-ubuntu22.04

# Environment Variables
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# ✅ [핵심 수정] bitsandbytes가 CUDA 라이브러리를 찾을 수 있도록 환경 변수를 명시적으로 설정합니다.
# 이 두 줄을 추가하는 것이 가장 중요합니다.
ENV NVIDIA_VISIBLE_DEVICES all
ENV LD_LIBRARY_PATH="/usr/local/cuda/lib64:${LD_LIBRARY_PATH}"

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
        build-essential \
    && rm -rf /var/lib/apt/lists/*

RUN ln -sf /usr/bin/python3.12 /usr/bin/python && ln -sf /usr/bin/python3.12 /usr/bin/python3

# Application Setup
WORKDIR /app

# Python Dependencies (PyTorch Nightly for RTX 5060)
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.12
RUN python3.12 -m pip install --upgrade pip setuptools wheel

# =========================================================================
# ✅ [핵심 수정] 문제가 되는 패키지 설치 순서 및 방법 변경
# =========================================================================

# 1. PyTorch와 관련 CUDA 라이브러리를 먼저 설치합니다.
#    이것이 다른 GPU 의존성 패키지들의 기반이 됩니다. (기존과 동일하지만 중요)
RUN python3.12 -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128

# 2. requirements.txt 파일을 컨테이너 안으로 복사합니다.
COPY requirements.txt .

# 3. requirements.txt에 명시된 모든 패키지를 설치합니다.
#    triton과 bitsandbytes도 일단 이 단계에서 설치를 시도합니다.
RUN python3.12 -m pip install --no-cache-dir -r requirements.txt

# 4. bitsandbytes를 소스에서 CUDA 12.8용으로 컴파일하여 설치합니다.
#    이 방법이 가장 확실한 해결책입니다.
RUN git clone https://github.com/TimDettmers/bitsandbytes.git \
    && cd bitsandbytes \
    && CUDA_VERSION=128 python setup.py install \
    && cd .. \
    && rm -rf bitsandbytes

# 5. triton을 최신 호환 버전으로 업그레이드하여 설치합니다.
#    -U ( --upgrade ) 옵션을 사용하여 최신 버전으로 설치하여 모듈 누락 문제를 해결합니다.
RUN python3.12 -m pip install -U "triton>=2.3.0"

# 6. CUDA 라이브러리 경로를 명시적으로 설정하여 bitsandbytes가 CUDA를 찾을 수 있도록 합니다.
ENV LD_LIBRARY_PATH="/usr/local/cuda/lib64:/usr/local/nvidia/lib64:${LD_LIBRARY_PATH}"
ENV CUDA_HOME="/usr/local/cuda"

# 7. bitsandbytes가 CUDA를 올바르게 인식할 수 있도록 환경 변수를 추가로 설정합니다.
ENV BNB_CUDA_VERSION="128"
ENV CUDA_VERSION="12.8"

# =========================================================================

# Application Source Code
COPY . .

# Networking and Execution
EXPOSE 8010
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8010", "--reload"]