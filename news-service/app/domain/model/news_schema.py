from pydantic import BaseModel

class NewsRequest(BaseModel):
    company_name: str
