class StockService:
    def __init__(self):
        pass

    def get_stock(self,company_name:str):
        return {"message": f"STOCK 서비스 호출: {company_name}"}