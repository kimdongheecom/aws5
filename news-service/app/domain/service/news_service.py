from collections import Counter
import re
import requests
from bs4 import BeautifulSoup
import logging
from wordcloud import WordCloud # 워드클라우드 임포트
import matplotlib # matplotlib 임포트
matplotlib.use('Agg') # GUI 백엔드 비활성화
import matplotlib.pyplot as plt # pyplot 임포트 (폰트 경로 지정 등에 사용될 수 있음)
import io # 바이트 스트림 처리를 위해 임포트
import base64 # 이미지를 base64로 인코딩하기 위해 임포트
from konlpy.tag import Okt
# 🔧 [Selenium 관련 추가 import]
import time
import datetime # 날짜/시간 처리를 위한 모듈 추가
from zoneinfo import ZoneInfo # Python 3.9+ 표준 라이브러리 사용
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
import os
import sys

# 로깅 포맷터 임포트 (새로운 유틸리티 파일에서)
from app.core.logging_utils import KSTFormatter  # <--- 수정된 임포트

# --- 로깅 설정 수정 (이전과 동일하게 유지) ---
logger_service = logging.getLogger("news_service")
logger_service.setLevel(logging.INFO)
logger_service.propagate = False

if not logger_service.handlers:
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    kst_formatter = KSTFormatter( # 임포트된 KSTFormatter 사용
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    console_handler.setFormatter(kst_formatter)
    logger_service.addHandler(console_handler)
# --- 로깅 설정 수정 끝 ---

# 한글 폰트 경로 (Dockerfile에 설치된 경로에 맞게 조정 필요)
# Dockerfile에서 fonts-nanum을 설치했다면 일반적으로 아래 경로 중 하나에서 찾을 수 있습니다.
# 실제 경로는 Docker 이미지 내부에서 `fc-list :lang=ko` 명령 등으로 확인 가능합니다.
FONT_PATH = 'app/static/fonts/NanumGothic.ttf' # 폰트 경로를 프로젝트 내부 경로로 변경
OUTPUT_DIR = 'app/static/output'

class NewsService:
    def __init__(self):
        # Okt 객체는 초기화에 시간이 걸릴 수 있으므로, 클래스 생성 시 한 번만 생성
        try:
            self.okt = Okt()
            logger_service.info("✅ Okt 형태소 분석기 초기화 성공")
        except Exception as e:
            logger_service.error(f"❌ Okt 형태소 분석기 초기화 실패: {e}. NLP 기능이 제한될 수 있습니다.")
            self.okt = None
        # pass # 기존 __init__ 내용 유지 (Okt 초기화 외에는 비워둠)

        # 애플리케이션 시작 시 output 디렉터리 생성 시도
        try:
            if not os.path.exists(OUTPUT_DIR):
                os.makedirs(OUTPUT_DIR)
                logger_service.info(f"✅ 출력 디렉터리 '{OUTPUT_DIR}'가 생성되었습니다.")
        except OSError as e:
            logger_service.error(f"❌ 출력 디렉터리 '{OUTPUT_DIR}' 생성 실패: {e}")

    def get_news(self, company_name: str):
        base_url = "https://search.naver.com/search.naver"
        params = {
            "where": "news",
            "ie": "utf8",
            "sm": "nws_hty",
            "query": company_name
        }
        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        try:
            response = requests.get(base_url, headers=headers, params=params)
            logger_service.info(f"🎃✨🎉🎊 Response: {response.text}")
            response.raise_for_status()  # HTTP 오류 발생 시 예외 발생
        except requests.RequestException as e:
            logger_service.error(f"❌ 네이버 뉴스 요청 실패: {str(e)}")
            return {"error": f"네이버 뉴스 요청 실패: {str(e)}"}

        soup = BeautifulSoup(response.text, "html.parser")
        #logger.info(f"🎃✨🎉🎊 Soup: {soup}")
        
        # 제목 요소 찾기
        items = soup.select("span[class='sds-comps-text sds-comps-text-ellipsis-1 sds-comps-text-type-headline1']")
        logger_service.info(f"🎃✨🎉Items: {len(items)}")
        
        # 부모 요소를 탐색하여 링크 추출
        news_list = []
        for item in items[:5]:  # 상위 5개 뉴스만 추출
            title = item.get_text(strip=True)
            
            # 제목 요소의 부모 중에서 a 태그 찾기
            parent_element = item.parent
            while parent_element and parent_element.name != 'a' and parent_element.name != 'html':
                parent_element = parent_element.parent
            
            link = None
            if parent_element and parent_element.name == 'a':
                link = parent_element.get('href')
                logger_service.info(f"🔗 링크 추출 성공: {link}")
            else:
                logger_service.warning(f"⚠️ 링크를 찾을 수 없음: {title}")
            
            news_list.append({
                "title": title,
                "link": link
            })
        
        logger_service.info(f"🎃✨🎉🎊 News List: {news_list}")

        # 링크만 추출해서 리스트로 정리
        links = [news['link'] for news in news_list if news.get('link')]
        print("🔗 추출된 링크 목록:")
        for link in links:
            print(link)
        
        for i, link in enumerate(links[:5], start=1):
            content = self.crawl_with_selenium(link)
            word_freq = self.process_text_for_nlp(content)
            self.generate_wordcloud_image_from_freq(word_freq, i)

        # print("🔗 추출된 컨텐츠 내용:",content)

  
    
    def crawl_with_selenium(self, link: str) -> str:
        """Selenium을 이용한 뉴스 본문 동적 크롤링 (Docker 최적화)"""
        
        # ChromeDriver는 Docker 내부 PATH에 있거나, 명시적 경로 사용:
        CHROMEDRIVER_IN_CONTAINER_PATH = "/usr/bin/chromedriver" 

        options = Options()
        options.add_argument("--headless")
        options.add_argument("--no-sandbox")  # Docker에서 root로 실행 시 필수
        options.add_argument("--disable-dev-shm-usage")  # 제한된 리소스 문제 해결
        options.add_argument("--disable-gpu") # headless 모드에서 권장
        options.add_argument("--window-size=1920x1080") # 반응형 사이트에 도움될 수 있음
        
        # 이 User-Agent를 Dockerfile의 CHROME_VERSION과 일치시키면 좋음
        # 예: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.6478.126 Safari/537.36"
        # 간단하게 일반적인 것을 사용해도 무방:
        options.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
        
        # chromedriver가 PATH에 있다면 Service()에 executable_path가 필요 없을 수 있음
        # service = ChromeService()
        # 하지만 Docker 환경에서는 명시하는 것이 더 안전:
        service = ChromeService(executable_path=CHROMEDRIVER_IN_CONTAINER_PATH)
        
        driver = None # finally 블록을 위해 driver를 None으로 초기화
        try:
            driver = webdriver.Chrome(service=service, options=options)
            logger_service.info(f"🚀 Selenium WebDriver 시작됨. URL: {link}")
            driver.get(link)
            logger_service.info(f"🎇🎆🎋🎁 Selenium WebDriver 시작됨. URL: {link}")
            
            # JavaScript 로드 시간 부여, 필요에 따라 조정
            # time.sleep(3) # 복잡한 페이지에는 너무 짧을 수 있음
            # AJAX가 많은 사이트의 경우 WebDriverWait 필요할 수 있음
            driver.implicitly_wait(5) # 요소가 나타날 때까지 최대 5초 대기
            logger_service.info(f"🧶🧥🥽 Selenium WebDriver 시작됨. URL: {link}")

            # 뉴스 콘텐츠에 대한 일반적인 선택자 시도
            selectors = [
                'div#dic_area',             # 네이버 뉴스 일반
                'article#dic_area',         # 좀 더 구체적인 네이버 뉴스
                '#articleBodyContents',     # 구형 네이버 뉴스
                'div.article_body',         # 많은 뉴스 사이트 공통
                'div.newsct_article',       # 다른 일반적인 패턴
                'div.news_view',            # 또 다른 패턴
                'div#newsct_article',       # 특정 ID
                'section.article-view',     # 일반적인 section 태그
                'article',                  # 일반 HTML5 article 태그
                'main'                      # 일반 HTML5 main 태그
            ]
            logger_service.info(f"🎃✨🎉🎊 선택자 시도 중: {selectors[0]}")
            content_text = ""
            for i, selector in enumerate(selectors):
                try:
                    # logger.debug(f"선택자 시도 중 [{i+1}/{len(selectors)}]: '{selector}' (URL: {link})")
                    # 즉시 예외를 발생시키지 않고 존재 확인을 위해 find_elements 사용
                    elements = driver.find_elements("css selector", selector)
                    if elements:
                        # 발견된 첫 번째 요소에서 텍스트 가져오기 (주요 내용으로 가정)
                        # 일부 페이지는 여러 개가 일치할 수 있으며, 여기서는 비어있지 않은 첫 번째 것을 사용
                        for elem in elements:
                            elem_text = elem.text.strip()
                            if elem_text: # 비어있지 않은 텍스트 발견
                                content_text = elem_text
                                logger_service.info(f"✅ 내용 추출 성공 (선택자: '{selector}') (URL: {link})")
                                break # 내부 루프(elements) 탈출
                        if content_text:
                            break # 외부 루프(selectors) 탈출
                except Exception as e_select:
                    logger_service.warning(f"⚠️ 선택자 '{selector}' 사용 중 오류 또는 요소 없음 (URL {link}): {str(e_select)}")
            
            if not content_text:
                logger_service.warning(f"⁉️ 위 선택자들로 내용을 찾지 못했습니다 (URL: {link}). 페이지 전체 텍스트를 시도합니다.")
                # 대체: body에서 모든 텍스트 가져오기
                try:
                    content_text = driver.find_element("css selector", "body").text.strip()
                    if not content_text:
                         content_text = "[본문 내용 없음 - 모든 선택자 실패 및 body 비어있음]"
                except Exception as e_body:
                    logger_service.error(f"❌ Body 텍스트 추출 실패 (URL {link}): {str(e_body)}")
                    content_text = "[본문 내용 없음 - Body 접근 불가]"

            logger_service.info(f"🎃✨🎉🎊 최종 컨텐츠 텍스트: {content_text}")
            return content_text

        except Exception as e:
            logger_service.error(f"❌❌❌ Selenium 크롤링 중 심각한 오류 발생 ({link}): {str(e)}")
            # page_source = driver.page_source if driver else "드라이버 초기화 안됨"
            # logger.debug(f"오류 발생 시점의 페이지 소스 (처음 1000자):\n{page_source[:1000]}")
            return f"[Selenium 크롤링 오류]: {str(e)}"

        finally:
            if driver:
                driver.quit()
                logger_service.info(f"🧹 Selenium WebDriver 종료됨 (URL: {link})")
     # --- 여기에 새로운 NLP 및 워드클라우드 함수 추가 ---
    
    def process_text_for_nlp(self, text: str, custom_stopwords: list = None) -> Counter:
        """
        주어진 텍스트에 대해 NLP 전처리 (형태소 분석, 명사 추출, 불용어 제거 등)를 수행하고
        단어 빈도수를 Counter 객체로 반환합니다.
        custom_stopwords: 추가적인 불용어 리스트를 받을 수 있습니다.
        """
        if not self.okt:
            logger_service.error("Okt 형태소 분석기가 초기화되지 않아 NLP 처리를 건너뜁니다.")
            return Counter()

        if not text or text.startswith("["): # 오류 메시지나 빈 텍스트 처리
            logger_service.warning(f"NLP 처리할 유효한 텍스트가 없습니다: '{text[:50]}...'")
            return Counter()

        # 1. 텍스트 정제: 한글, 영문, 숫자, 공백을 제외한 특수문자 제거
        processed_text = re.sub(r'[^가-힣A-Za-z0-9\s]', '', text)
        # logger.debug(f"특수문자 제거 후 텍스트 (일부): {processed_text[:100]}")

        # 2. 명사 추출
        try:
            nouns = self.okt.nouns(processed_text)
            logger_service.info(f"🎃✨🎉🎊 추출된 명사 (처음 20개): {nouns[:20]}")
            # logger.debug(f"추출된 명사 (처음 20개): {nouns[:20]}")
        except Exception as e:
            logger_service.error(f"Okt 명사 추출 중 오류 발생: {e}")
            return Counter()

        # 3. 불용어 처리
        # 기본 불용어 세트 정의
        default_stopwords_set = set([
            '기자', '뉴스', '사진', '제공', '무단', '전재', '재배포', '금지', '닷컴', '씨엔에스', '데일리',
            '것', '수', '이', '그', '저', '들', '등', '및', '제', '더', '위해', '통해', '오전', '오후',
            '오늘', '내일', '지난', '올해', '최근', '현재', '때문', '따라', '대한', '대해', '통한', '바로',
            '면서', '까지', '부터', '정도', '관련', '부분', '경우', '문제', '상황', '가운데', '한편',
            '또한', '역시', '사실', '밝혔다', '전했다', '말했다', '했다', '있는', '있습니다', '있어',
            '하는', '하고', '한', '합니다', '하는것이', '억원', '만원', '달러', '유로', '포인트', '퍼센트',
            '월', '일', '년', '시', '분', '초' # 날짜/시간 관련 단어
        ])
        
        # 외부에서 전달된 custom_stopwords가 있다면 합침
        final_stopwords = default_stopwords_set
        if custom_stopwords:
            final_stopwords.update(custom_stopwords)

        # 단어 길이가 2 이상이고 불용어가 아닌 명사만 선택
        meaningful_nouns = [
            noun for noun in nouns if len(noun) > 1 and noun.lower() not in final_stopwords
        ]
        # logger.debug(f"불용어 처리 및 길이 필터링 후 명사 (처음 20개): {meaningful_nouns[:20]}")

        if not meaningful_nouns:
            logger_service.warning("NLP 처리 후 분석할 의미있는 명사가 없습니다.")
            return Counter()
            
        # 4. 단어 빈도수 계산
        word_freq = Counter(meaningful_nouns)
        logger_service.info(f"📊 단어 빈도 분석 완료. 고유 단어 수: {len(word_freq)}, 상위 5개: {word_freq.most_common(5)}")
        
        return word_freq

    def generate_wordcloud_image_from_freq(self, word_freq: Counter, num: int = 1, font_path: str = FONT_PATH) -> str:
        """
        단어 빈도수(Counter 객체)를 기반으로 워드클라우드 이미지를 생성하고
        output 폴더에 news_cloud_{num}.png로 저장합니다. 저장된 파일 경로를 반환합니다.
        """
        if not isinstance(word_freq, Counter) or not word_freq:
            logger_service.warning("워드클라우드 생성을 위한 유효한 단어 빈도 데이터(Counter)가 없습니다.")
            return "" # 빈 경로 반환

        # --- 디렉터리 생성 로직 추가 ---
        output_dir = OUTPUT_DIR # 클래스 변수 사용
        
        # 현재 날짜와 시간을 파일명에 포함 (한국 시간 KST 사용)
        # 한국 시간대(KST) 설정
        kst = ZoneInfo('Asia/Seoul')
        current_time = datetime.datetime.now(kst).strftime("%Y%m%d_%H%M%S")
        output_filename = f"news_cloud_{num}_{current_time}.png"
        output_path = os.path.join(output_dir, output_filename)

        try:
            # 디렉터리가 없으면 생성 (os.makedirs는 중간 경로도 함께 생성)
            if not os.path.exists(output_dir):
                os.makedirs(output_dir)
                logger_service.info(f"출력 디렉터리 '{output_dir}'가 생성되었습니다.")
        except OSError as e:
            logger_service.error(f"❌ 출력 디렉터리 '{output_dir}' 생성 실패: {e}")
            return "" # 디렉터리 생성 실패 시 빈 경로 반환
        # --- 디렉터리 생성 로직 종료 ---

        try:
            wc = WordCloud(
                font_path=font_path,
                width=800,
                height=400,
                background_color="white",
                max_words=100,
            ).generate_from_frequencies(dict(word_freq))

            wc.to_file(output_path) # 수정된 경로로 저장
            logger_service.info(f"🖼️ 워드클라우드 이미지가 {output_path}에 저장되었습니다.")
            return output_path # 저장된 파일의 전체 경로 반환

        except Exception as e:
            logger_service.error(f"❌ 워드클라우드 이미지 생성/저장 실패: {str(e)}")
            if "cannot open resource" in str(e) or "No such file or directory" in str(e) or "not a TrueType font" in str(e):
                 logger_service.error(f"🆘 폰트 파일을 찾을 수 없거나 유효하지 않습니다. 사용된 폰트 경로: {font_path}")
            # 파일 저장 실패 시에도 어떤 경로를 시도했는지 알려주면 디버깅에 도움됨
            logger_service.error(f"이미지 저장 시도 경로: {output_path}")
            return "" # 실패 시 빈 경로 반환