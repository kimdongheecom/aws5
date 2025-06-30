from app.domain.service.report_service import ReportService


class ReportController:
    def __init__(self):
        self.report_service = ReportService()

    def get_report(self, company_name: str):
        return self.report_service.get_report(company_name)


