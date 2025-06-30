from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class LoginSchema(BaseModel):
    provider: str
    code: str
    redirect_uri: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "provider": "google",
                "code": "4/0AfJohXl_LaQjc6k3QY-fCKWlLCuUQd08AVLZKO_A-mjUbFcYk4Cw",
                "redirect_uri": "https://www.jinmini.com/callback"
            }
        }

class LoginResponseSchema(BaseModel):
    access_token: str
    token_type: str = "Bearer"
    expires_in: int
    refresh_token: Optional[str] = None
    scope: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now) 