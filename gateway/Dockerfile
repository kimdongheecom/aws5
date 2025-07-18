# 1. 기본 이미지는 그대로 사용
FROM python:3.12.7-slim

WORKDIR /app

# 2. [핵심 수정] 파이썬 패키지를 설치하기 전에 빌드에 필요한 시스템 도구들을 먼저 설치
#    - 'build-essential': gcc, g++ 등 C/C++ 컴파일러 포함
#    - 'libpq-dev': PostgreSQL 클라이언트 라이브러리 개발 파일 (asyncpg가 의존할 수 있음)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# 3. 이제 requirements.txt 설치가 정상적으로 진행됩니다.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. 나머지 소스 코드 복사
COPY . .

# 5. 포트 노출 및 실행 명령어는 그대로
EXPOSE 8080

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]