# News Service

뉴스 검색 및 분석 서비스

## 기능

- 기업 이름 기반 뉴스 검색
- 뉴스 본문 크롤링
- 텍스트 분석 및 워드클라우드 생성

## 배치 프로그램 사용하기

뉴스 데이터를 자동으로 수집하기 위한 배치 프로그램이 포함되어 있습니다.

### 배치 프로그램 실행 방법

배치 프로그램은 매일 오전 11:30에 자동으로 주요 기업의 뉴스를 수집하고 분석합니다.

```bash
# 필요한 의존성 설치
pip install -r requirements.txt

# 배치 프로그램 실행
python -m app.domain.batch.news_batch
```

### 백그라운드에서 실행하기 (Linux/Unix)

```bash
# nohup을 사용하여 백그라운드에서 실행
nohup python -m app.domain.batch.news_batch > news_batch.log 2>&1 &

# 프로세스 확인
ps aux | grep news_batch
```

### 서비스로 등록하기 (systemd)

1. systemd 서비스 파일 생성 (news-batch.service):

```
[Unit]
Description=News Service Batch Job
After=network.target

[Service]
User=your_username
WorkingDirectory=/path/to/news-service
ExecStart=/usr/bin/python -m app.domain.batch.news_batch
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

2. 서비스 등록 및 시작:

```bash
sudo cp news-batch.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable news-batch
sudo systemctl start news-batch
sudo systemctl status news-batch
```
