from enum import Enum
import os


class ServiceType(str, Enum):
    NEWS = "news"
    SASB = "sasb"
    ISSUEPOOL = "issuepool"
    REPORT = "report"
    THESIS = "thesis"
    STOCK = "stock"
    GRI = "gri"
    AUTH = "auth"

# ✅ 환경 변수에서 서비스 URL 가져오기
NEWS_SERVICE_URL = os.getenv("NEWS_SERVICE_URL")
SASB_SERVICE_URL = os.getenv("SASB_SERVICE_URL")
ISSUEPOOL_SERVICE_URL = os.getenv("ISSUEPOOL_SERVICE_URL")
REPORT_SERVICE_URL = os.getenv("REPORT_SERVICE_URL")
THESIS_SERVICE_URL = os.getenv("THESIS_SERVICE_URL")
STOCK_SERVICE_URL = os.getenv("STOCK_SERVICE_URL")
GRI_SERVICE_URL = os.getenv("GRI_SERVICE_URL")
AUTH_SERVICE_URL = os.getenv("AUTH_SERVICE_URL")

SERVICE_URLS = {
    ServiceType.NEWS: NEWS_SERVICE_URL,
    ServiceType.SASB: SASB_SERVICE_URL,
    ServiceType.ISSUEPOOL: ISSUEPOOL_SERVICE_URL,
    ServiceType.REPORT: REPORT_SERVICE_URL,
    ServiceType.THESIS: THESIS_SERVICE_URL,
    ServiceType.STOCK: STOCK_SERVICE_URL,
    ServiceType.GRI: GRI_SERVICE_URL,
    ServiceType.AUTH: AUTH_SERVICE_URL,
}