from typing import Optional
from datetime import datetime
from app.models.user import User, UserAcademicInfo
from app.core.exceptions import NotFoundError
from app.services.db import Database

class UserService:
    def __init__(self, db: Database):
        self.db = db

    async def get_user(self, user_id: str) -> User:
        user = await self.db.users.find_one({"_id": user_id})
        if not user:
            raise NotFoundError("User not found")
        return User(**user)

    async def update_academic_info(
        self,
        user_id: str,
        academic_info: UserAcademicInfo
    ) -> User:
        result = await self.db.users.update_one(
            {"_id": user_id},
            {
                "$set": {
                    "academic_info": academic_info.dict(),
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        if result.modified_count == 0:
            raise NotFoundError("User not found")
            
        updated_user = await self.db.users.find_one({"_id": user_id})
        return User(**updated_user)