from pydantic_settings import BaseSettings
from functools import lru_cache
import os
from typing import List

class Settings(BaseSettings):
    
    MONGODB_URI: str = os.getenv("MONGODB_URI", "your_mongodb_atlas_uri")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "braincrumb")
    
    
    JWT_SECRET: str = os.getenv("JWT_SECRET", "your-secret-key")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()