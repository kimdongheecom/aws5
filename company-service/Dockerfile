# company-service/Dockerfile

FROM python:3.12.7-slim

WORKDIR /app

# ✨ [수정] 컴파일에 필요한 패키지들을 먼저 설치합니다.
# -------------------------------------------------------------------
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
# -------------------------------------------------------------------

COPY requirements.txt .
# 이제 이 부분에서 에러가 발생하지 않습니다.
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8011

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8011", "--reload"]