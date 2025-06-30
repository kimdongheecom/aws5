import schedule
import time
import logging
import sys
import os
import datetime
from zoneinfo import ZoneInfo  # pytz 대신 Python 3.9+ 표준 라이브러리 사용


# KSTFormatter를 새로운 유틸리티 파일에서 임포트
from app.core.logging_utils import KSTFormatter  # <--- 수정된 임포트

# --- 로깅 설정 수정 (이전과 동일하게 유지) ---
logger_batch = logging.getLogger("news_batch")
logger_batch.setLevel(logging.INFO)
logger_batch.propagate = False

if not logger_batch.handlers:
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    kst_formatter = KSTFormatter( # 임포트된 KSTFormatter 사용
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    console_handler.setFormatter(kst_formatter)
    logger_batch.addHandler(console_handler)
# --- 로깅 설정 수정 끝 ---
# 이 모듈에서 사용할 로거
logger_batch = logging.getLogger("news_batch") # 명시적인 로거 이름 사용
logger_batch.setLevel(logging.INFO)
logger_batch.propagate = False # 루트 로거로 이벤트 전파 방지 (중복 로깅 방지 위함)

# 이 로거에 핸들러가 이미 설정되어 있는지 확인 (모듈 재로드 시 중복 방지)
if not logger_batch.handlers:
    # 콘솔 핸들러 생성
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)

    # KST 포맷터 생성 및 핸들러에 설정
    kst_formatter = KSTFormatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    console_handler.setFormatter(kst_formatter)

    # 로거에 핸들러 추가
    logger_batch.addHandler(console_handler)
# --- 로깅 설정 수정 끝 ---

# 상위 디렉토리를 sys.path에 추가하여 app 모듈에 접근할 수 있게 함
# sys.path.insert(0, os.path.abspath(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))))


# NewsService 임포트 (이것은 순환을 일으키지 않음, job_news_batch 함수 내에서 사용)
from app.domain.service.news_service import NewsService

def job_news_batch():
    kst_now = datetime.datetime.now(ZoneInfo('Asia/Seoul'))
    logger_batch.info(f"🔄 뉴스 배치 작업 시작 (현재 시간: {kst_now.strftime('%Y-%m-%d %H:%M:%S')})")
    try:
        news_service = NewsService() # NewsService 객체 생성
        target_companies = ["삼성전자", "현대자동차", "SK하이닉스", "LG전자", "카카오"]
        for company in target_companies:
            logger_batch.info(f"🔎 {company} 관련 뉴스 수집 시작")
            news_service.get_news(company)
            logger_batch.info(f"✅ {company} 관련 뉴스 수집 및 분석 완료")
        kst_finish_time = datetime.datetime.now(ZoneInfo('Asia/Seoul'))
        logger_batch.info(f"✅ 모든 뉴스 배치 작업 완료 (완료 시간: {kst_finish_time.strftime('%Y-%m-%d %H:%M:%S')})")
    except Exception as e:
        logger_batch.error(f"❌ 뉴스 배치 작업 중 오류 발생: {e}", exc_info=True)

if __name__ == "__main__":
    # __main__으로 실행될 때의 로깅은 위에서 설정된 logger_batch를 사용합니다.
    kst_now = datetime.datetime.now(ZoneInfo('Asia/Seoul'))
    logger_batch.info(f"📅 뉴스 배치 프로그램 시작 (현재 시간: {kst_now.strftime('%Y-%m-%d %H:%M:%S')})")
    schedule.every().day.at("11:30").do(job_news_batch)
    logger_batch.info("🚀 초기 실행: 배치 작업 즉시 실행")
    job_news_batch()
    while True:
        schedule.run_pending()
        time.sleep(60)