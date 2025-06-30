from app.domain.service.stock_service import StockService


class StockController:
    def __init__(self):
        self.stock_service = StockService()

    def get_report(self, company_name: str):
        return self.stock_service.get_stock(company_name)


