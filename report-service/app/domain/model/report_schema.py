from pydantic import BaseModel

class ReportRequest(BaseModel):
    company_name: str

