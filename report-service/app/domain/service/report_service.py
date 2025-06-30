class ReportService:
    def __init__(self):
        pass

    def get_report(self,company_name:str):
        return {"message": f"REPORT 서비스 호출: {company_name}"}