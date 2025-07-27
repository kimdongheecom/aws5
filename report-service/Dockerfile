# report-service/Dockerfile

FROM python:3.12.7-slim

WORKDIR /app

# ✅ [수정] 컴파일에 필요한 패키지들을 먼저 설치합니다.
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8006

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8006", "--reload"]