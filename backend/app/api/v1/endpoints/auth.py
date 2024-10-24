from ....services.db import Database
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import timedelta
from ....core.security import verify_password, create_access_token, get_password_hash
from ....models.domain.user import UserCreate, UserInDB, User
from ..deps import get_db
from ....core.config import get_settings

router = APIRouter()
settings = get_settings()

@router.post("/signup", response_model=User)
async def signup(
    user_create: UserCreate,
    db: AsyncIOMotorClient = Depends(get_db)
):
    
    if await db.users.find_one({"email": user_create.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    
    user_dict = user_create.dict()
    user_dict["hashed_password"] = get_password_hash(user_dict.pop("password"))
    
    result = await db.users.insert_one(user_dict)
    user = await db.users.find_one({"_id": result.inserted_id})
    
    return User(**user)

@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncIOMotorClient = Depends(get_db)
):
    
    user = await db.users.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user["_id"])},
        expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": User(**user)
    }


@router.get("/test-db")
async def test_db():
    try:
        db = Database.get_db()
        await db.command("ping")
        return {"status": "Connected to MongoDB Atlas successfully!"}
    except Exception as e:
        return {"status": "Error", "detail": str(e)}