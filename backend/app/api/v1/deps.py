from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from motor.motor_asyncio import AsyncIOMotorClient
from ...core.config import get_settings
from ...models.domain.user import UserInDB

settings = get_settings()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_db():
    client = AsyncIOMotorClient(settings.MONGODB_URL)
    try:
        yield client[settings.DATABASE_NAME]
    finally:
        client.close()

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncIOMotorClient = Depends(get_db)
) -> UserInDB:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = await db.users.find_one({"_id": user_id})
    if user is None:
        raise credentials_exception
    return UserInDB(**user)