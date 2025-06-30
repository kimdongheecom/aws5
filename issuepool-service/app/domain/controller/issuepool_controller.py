from app.domain.service.issuepool_service import IssuepoolService


class IssuepoolController:
    def __init__(self):
        self.issuepool_service = IssuepoolService()

    def get_issuepool(self, company_name: str):
        return self.issuepool_service.get_issuepool(company_name)


