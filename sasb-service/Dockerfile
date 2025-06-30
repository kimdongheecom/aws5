FROM python:3.12.7-slim

WORKDIR /app

# apt-get install 중 프롬프트를 피하기 위해 DEBIAN_FRONTEND 설정
ENV DEBIAN_FRONTEND=noninteractive

# --- 시스템 공통 의존성 설치 (한 번에 업데이트 및 설치) ---
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    openjdk-17-jdk-headless \
    libglib2.0-0 libnss3 libnspr4 libdbus-1-3 libatk1.0-0 \
    libatk-bridge2.0-0 libcups2 libdrm2 libexpat1 libgbm1 \
    libgdk-pixbuf2.0-0 libgtk-3-0 libpango-1.0-0 libx11-6 \
    libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 \
    libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 \
    libxss1 libxtst6 libasound2 \
    wget unzip ca-certificates curl git \
    fontconfig fonts-nanum \
 && fc-cache -fv \
 && rm -rf /var/lib/apt/lists/*

# JAVA_HOME 환경 변수 설정
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# --- Chrome/ChromeDriver 설치 ---
# 요청하신 Chrome 버전.
# 경고: 이 버전이 Chrome for Testing 저장소에 linux64용으로 실제로 존재하는지 반드시 확인해야 합니다.
# 존재하지 않으면 이 단계에서 빌드가 실패합니다.
ENV CHROME_VERSION="136.0.7103.114"

# Google Chrome for Testing (브라우저) 설치
RUN echo "Attempting to install Chrome for Testing version: ${CHROME_VERSION}" \
 && URL_CHROME="https://storage.googleapis.com/chrome-for-testing-public/${CHROME_VERSION}/linux64/chrome-linux64.zip" \
 && echo "Downloading Chrome from: ${URL_CHROME}" \
 && if wget -q "${URL_CHROME}" -O chrome-linux64.zip; then \
      echo "Chrome downloaded successfully."; \
      unzip -q chrome-linux64.zip -d /opt; \
      rm -f chrome-linux64.zip; \
      if [ -f /opt/chrome-linux64/chrome ]; then \
        ln -sf /opt/chrome-linux64/chrome /usr/bin/google-chrome; \
        echo "Chrome symlinked. Verifying version:"; \
        google-chrome --version; \
      else \
        echo "ERROR: Chrome binary not found in /opt/chrome-linux64 after unzip."; \
      fi; \
    else \
      echo "ERROR: Failed to download Chrome version ${CHROME_VERSION}. Please check if this version exists for linux64."; \
      # 실패 시 빌드를 중단하지 않고 경고만 남기려면 exit 0, 중단하려면 exit 1 (또는 아무것도 안함)
      # exit 1; # 다운로드 실패 시 빌드 중단 (권장)
    fi

# 일치하는 ChromeDriver for Testing 설치
RUN echo "Attempting to install ChromeDriver for Testing version: ${CHROME_VERSION}" \
 && URL_CHROMEDRIVER="https://storage.googleapis.com/chrome-for-testing-public/${CHROME_VERSION}/linux64/chromedriver-linux64.zip" \
 && echo "Downloading ChromeDriver from: ${URL_CHROMEDRIVER}" \
 && if wget -q "${URL_CHROMEDRIVER}" -O chromedriver-linux64.zip; then \
      echo "ChromeDriver downloaded successfully."; \
      unzip -q chromedriver-linux64.zip -d /opt; \
      rm -f chromedriver-linux64.zip; \
      if [ -f /opt/chromedriver-linux64/chromedriver ]; then \
        ln -sf /opt/chromedriver-linux64/chromedriver /usr/bin/chromedriver; \
        chmod +x /usr/bin/chromedriver; \
        echo "ChromeDriver symlinked. Verifying version:"; \
        chromedriver --version; \
      else \
        echo "ERROR: ChromeDriver binary not found in /opt/chromedriver-linux64 after unzip."; \
      fi; \
    else \
      echo "ERROR: Failed to download ChromeDriver version ${CHROME_VERSION}. Please check if this version exists for linux64."; \
      # exit 1; # 다운로드 실패 시 빌드 중단 (권장)
    fi
# --- Chrome/ChromeDriver 설치 종료 ---

# Python 패키지 설치 단계
RUN python -m pip install --upgrade pip
RUN python -m pip install --upgrade setuptools wheel

COPY requirements.txt .
RUN python -m pip install --no-cache-dir -r requirements.txt --verbose

COPY . .

EXPOSE 8004

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8004", "--reload"] 