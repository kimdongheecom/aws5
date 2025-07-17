from pydantic import BaseModel, EmailStr


class UserRequest(BaseModel):
    id: str
    email: EmailStr
    name: str
    picture: str
    is_active: bool = True
    is_admin: bool = False

    class Config:
        from_attributes = True
