# gateway/Dockerfile - 최종 수정본

# 1. 기본 이미지는 그대로 사용
FROM python:3.12.7-slim

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. [핵심 수정 1] RUN 명령어에 임의의 주석을 추가하여 Docker가 이 레이어의 캐시를 사용하지 못하도록 강제합니다.
#    만약 문제가 계속되면 이 주석의 숫자를 바꿔서 다시 빌드해보세요. (e.g., # BUILD_VERSION=2)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*  # BUILD_VERSION=1

# 4. requirements.txt 복사
COPY requirements.txt .

# 5. [핵심 수정 2] pip install 명령어에도 임의의 주석을 추가하여 캐시를 무력화합니다.
RUN pip install --no-cache-dir -r requirements.txt # BUILD_VERSION=1

# 6. 나머지 소스 코드 복사
COPY . .

# 7. 포트 노출 및 실행 명령어
EXPOSE 8080
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]