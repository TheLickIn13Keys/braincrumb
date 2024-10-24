from datetime import datetime, timedelta
from typing import Optional, Tuple
from fastapi import Depends
from app.core.security import create_access_token, verify_password, get_password_hash
from app.core.exceptions import AuthenticationError, ValidationError
from app.models.user import UserCreate, UserInDB, User
from app.services.db import Database
from app.core.config import get_settings

settings = get_settings()

class AuthService:
    def __init__(self, db: Database):
        self.db = db

    async def authenticate_user(
        self,
        email: str,
        password: str
    ) -> Tuple[User, str]:
        user = await self.db.users.find_one({"email": email})
        if not user or not verify_password(password, user["hashed_password"]):
            raise AuthenticationError(detail="Incorrect email or password")

        access_token = create_access_token(
            data={"sub": str(user["_id"])},
            expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        )

        return User(**user), access_token

    async def register_user(self, user_create: UserCreate) -> User:
        if await self.db.users.find_one({"email": user_create.email}):
            raise ValidationError("Email already registered")
        
        user_dict = user_create.dict()
        user_dict["hashed_password"] = get_password_hash(user_dict.pop("password"))
        user_dict["created_at"] = datetime.utcnow()
        
        result = await self.db.users.insert_one(user_dict)
        created_user = await self.db.users.find_one({"_id": result.inserted_id})
        
        return User(**created_user)