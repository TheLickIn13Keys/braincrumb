from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(UserBase):
    password: str

class UserAcademicInfo(BaseModel):
    school: str
    grade: str
    previous_classes: List[str] = []
    target_class: str

class User(UserBase):
    id: Optional[str] = Field(alias="_id")
    academic_info: Optional[UserAcademicInfo] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class UserInDB(User):
    hashed_password: str
