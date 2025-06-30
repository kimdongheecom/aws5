from app.domain.service.thesis_service import ThesisService

class ThesisController:
    def __init__(self):
        self.thesis_service = ThesisService()

    def get_thesis(self):
        return self.thesis_service.get_thesis()
