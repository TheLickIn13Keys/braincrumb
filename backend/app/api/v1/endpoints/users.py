from fastapi import APIRouter, Depends, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from ....models.domain.user import User, UserAcademicInfo
from ..deps import get_current_user, get_db

router = APIRouter()

@router.get("/me", response_model=User)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    return current_user

@router.put("/academic-info", response_model=User)
async def update_academic_info(
    academic_info: UserAcademicInfo,
    current_user: User = Depends(get_current_user),
    db: AsyncIOMotorClient = Depends(get_db)
):
    result = await db.users.update_one(
        {"_id": current_user.id},
        {"$set": {"academic_info": academic_info.dict()}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not update academic info"
        )
    
    updated_user = await db.users.find_one({"_id": current_user.id})
    return User(**updated_user)