# =========================================================================
# Base Image: PyTorch, CUDA, cuDNN이 모두 포함된 공식 이미지를 사용
# =========================================================================
# PyTorch 2.3.0, CUDA 11.8, Python 3.11 환경을 제공합니다.
# GPU를 사용하기 위해 'python:3.12.7-slim' 대신 이 이미지를 반드시 사용해야 합니다.
FROM pytorch/pytorch:2.3.0-cuda11.8-cudnn8-runtime

# =========================================================================
# Environment Variables: 컨테이너 환경 설정
# =========================================================================
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# =========================================================================
# System Packages: 필요한 시스템 도구 설치
# =========================================================================
# apt-get: 리눅스 패키지 매니저
# tzdata: 타임존 설정을 위함
# curl: 상태 체크(health check)나 간단한 API 테스트에 사용
# git, git-lfs: 코드나 모델을 git으로 관리할 경우를 대비 (추천)
RUN apt-get update && apt-get install -y \
    tzdata \
    curl \
    git \
    git-lfs \
    && rm -rf /var/lib/apt/lists/*

# =========================================================================
# Application Setup
# =========================================================================
# 작업 디렉토리 설정
WORKDIR /app

# Python 의존성 설치 (가장 효율적인 방식)
# 1. requirements.txt 파일만 먼저 복사합니다.
COPY requirements.txt .
# 2. 의존성을 설치합니다. 이 부분은 requirements.txt가 변경되지 않으면 캐시되어 재사용됩니다.
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 소스 코드 전체 복사
# 의존성 설치 후에 코드를 복사해야, 코드만 변경 시 빌드 속도가 빨라집니다.
COPY . .

# =========================================================================
# Networking and Execution
# =========================================================================
# 컨테이너 외부에서 접속할 포트 노출
EXPOSE 8010

# 컨테이너의 정상 상태를 확인하는 Health Check (선택사항이지만 강력 추천)
# 서비스에 '/health' 같은 간단한 응답을 주는 API 엔드포인트가 있다고 가정합니다.
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8010/health || exit 1

# 컨테이너 시작 시 실행될 메인 명령어
# 최종 배포 시에는 --reload 옵션을 제거하는 것이 좋습니다.
# CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8010"]
# 만약 main.py가 app 폴더 안에 있다면 아래와 같이 경로를 지정합니다.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8010", "--reload"]