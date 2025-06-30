from pydantic import BaseModel

class StockRequest(BaseModel):
    company_name: str

