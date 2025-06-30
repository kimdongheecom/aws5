import logging
import datetime
from zoneinfo import ZoneInfo

class KSTFormatter(logging.Formatter):
    """한국 시간(KST)으로 로그 시간을 표시하는 포맷터"""

    def converter(self, timestamp):
        dt = datetime.datetime.fromtimestamp(timestamp)
        return dt.replace(tzinfo=datetime.timezone.utc).astimezone(ZoneInfo('Asia/Seoul'))

    def formatTime(self, record, datefmt=None):
        dt = self.converter(record.created)
        if datefmt:
            return dt.strftime(datefmt)
        else:
            return dt.strftime("%Y-%m-%d %H:%M:%S")