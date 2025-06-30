from app.domain.service.news_service import NewsService
import logging
import threading
import time
import sys
import schedule
import datetime
from zoneinfo import ZoneInfo  # Python 3.9+ 표준 라이브러리 사용
# 배치 작업 관련 import 추가
from app.domain.batch.news_batch import job_news_batch  # KSTFormatter 클래스 import
from app.core.logging_utils import KSTFormatter  # <--- 수정된 임포트

# --- 로깅 설정 수정 ---
logger_controller = logging.getLogger("news_controller") # 명시적인 로거 이름 사용
logger_controller.setLevel(logging.INFO)
logger_controller.propagate = False

if not logger_controller.handlers:
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    kst_formatter = KSTFormatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    console_handler.setFormatter(kst_formatter)
    logger_controller.addHandler(console_handler)
    
# --- 로깅 설정 수정 끝 ---
def print_automation_test():
    """자동화 테스트 메시지 출력 함수"""
    print("\n===================================")
    print("🤖 자동화 테스트")
    print("===================================\n")
    # 현재 한국 시간을 함께 출력
    kst_now = datetime.datetime.now(ZoneInfo('Asia/Seoul'))
    logger_controller.info(f"🤖 자동화 테스트 메시지가 출력되었습니다. 현재 시간: {kst_now.strftime('%Y-%m-%d %H:%M:%S')}")

def run_batch_job():
    """배치 작업을 실행하는 함수"""
    print("\n===================================")
    print("📊 배치 뉴스 크롤링 작업 시작")
    print("===================================\n")
    # 배치 작업 실행
    job_news_batch()
    # 현재 한국 시간을 함께 출력
    kst_now = datetime.datetime.now(ZoneInfo('Asia/Seoul'))
    logger_controller.info(f"📊 배치 뉴스 크롤링 작업이 실행되었습니다. 현재 시간: {kst_now.strftime('%Y-%m-%d %H:%M:%S')}")

# 스케줄러를 실행하는 스레드 함수
def run_scheduler():
    """스케줄러를 백그라운드에서 실행하는 함수"""
    while True:
        schedule.run_pending()
        time.sleep(60)  # 1분마다 스케줄 확인

class NewsController:
    def __init__(self):
        try:
            # 초기 메시지 출력 - 컨트롤러 생성 확인
            print("NewsController 초기화 중...")
            
            self.news_service = NewsService()
            
            # 배치 작업 스케줄 설정
            self.setup_batch_schedule()
            
            # 테스트용 자동화 메시지 (1분 후)
            self.setup_automation_test()
            
            # 초기화 시간 로깅
            kst_now = datetime.datetime.now(ZoneInfo('Asia/Seoul'))
            logger_controller.info(f"NewsController 초기화 완료. 현재 시간: {kst_now.strftime('%Y-%m-%d %H:%M:%S')}")
            
        except Exception as e:
            print(f"NewsController 초기화 중 오류 발생: {e}")
            logger_controller.error(f"NewsController 초기화 오류: {e}")
    
    def setup_batch_schedule(self):
        """배치 작업을 매일 오전 11:30에 실행하도록 스케줄 설정"""
        try:
            # 매일 오전 11:30에 실행
            schedule.every().day.at("11:30").do(run_batch_job)
            
            # 현재 한국 시간을 로그에 기록
            kst_now = datetime.datetime.now(ZoneInfo('Asia/Seoul'))
            logger_controller.info(f"⏰ 배치 작업이 매일 오전 11:30에 실행되도록 설정되었습니다. 현재 시간: {kst_now.strftime('%Y-%m-%d %H:%M:%S')}")
            
            # 스케줄러를 백그라운드에서 실행
            scheduler_thread = threading.Thread(target=run_scheduler)
            scheduler_thread.daemon = True  # 메인 프로그램 종료 시 함께 종료
            scheduler_thread.start()
            logger_controller.info("🔄 스케줄러가 백그라운드에서 실행 중입니다.")
            
        except Exception as e:
            print(f"스케줄 설정 중 오류 발생: {e}")
            logger_controller.error(f"스케줄 설정 오류: {e}")

    def setup_automation_test(self):
        """자동화 테스트 메시지를 출력하도록 타이머 설정 (1분 후)"""
        try:
            delay_seconds = 60  # 1분
            
            # 현재 한국 시간과 예상 실행 시간 계산
            kst_now = datetime.datetime.now(ZoneInfo('Asia/Seoul'))
            expected_time = kst_now + datetime.timedelta(seconds=delay_seconds)
            
            # 콘솔에 직접 출력하여 로깅 문제 우회
            print(f"⏰ {delay_seconds}초({delay_seconds/60}분) 후에 자동화 테스트 메시지가 출력됩니다.")
            print(f"⏰ 현재 시간: {kst_now.strftime('%Y-%m-%d %H:%M:%S')}, 예상 실행 시간: {expected_time.strftime('%Y-%m-%d %H:%M:%S')}")
            
            # 로거를 통한 출력도 시도
            logger_controller.info(f"⏰ {delay_seconds}초({delay_seconds/60}분) 후에 자동화 테스트 메시지가 출력됩니다.")
            logger_controller.info(f"⏰ 현재 시간: {kst_now.strftime('%Y-%m-%d %H:%M:%S')}, 예상 실행 시간: {expected_time.strftime('%Y-%m-%d %H:%M:%S')}")
            
            # 테스트용 타이머 스레드 설정 및 시작
            timer = threading.Timer(delay_seconds, print_automation_test)
            timer.daemon = True  # 메인 프로그램 종료 시 타이머도 함께 종료되도록 설정
            timer.start()
            
        except Exception as e:
            print(f"타이머 설정 중 오류 발생: {e}")
            logger_controller.error(f"타이머 설정 오류: {e}")

    def get_news(self, company_name: str):
        # 1. 뉴스 정보 및 본문 가져오기 (get_news가 본문까지 가져오도록 수정됨)
        self.news_service.get_news(company_name)
        
        return {
            "company": company_name,
        }
