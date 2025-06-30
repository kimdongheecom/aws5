from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LoginEntity(BaseModel):
    id: str
    provider: str
    access_token: str
    refresh_token: Optional[str] = None
    expires_at: Optional[datetime] = None
    created_at: datetime = datetime.now()
    
    class Config:
        from_attributes = True 