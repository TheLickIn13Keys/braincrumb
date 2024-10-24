
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import get_settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings = get_settings()

class Database:
    client: AsyncIOMotorClient = None
    db = None

    @classmethod
    def get_client(cls):
        if cls.client is None:
            logger.info("Creating new MongoDB client")
            try:
                cls.client = AsyncIOMotorClient(settings.MONGODB_URI)
                logger.info("MongoDB client created successfully")
            except Exception as e:
                logger.error(f"Error creating MongoDB client: {str(e)}")
                raise
        return cls.client

    @classmethod
    def get_db(cls):
        if cls.db is None:
            logger.info("Getting database instance")
            try:
                cls.db = cls.get_client()[settings.DATABASE_NAME]
                logger.info(f"Connected to database: {settings.DATABASE_NAME}")
            except Exception as e:
                logger.error(f"Error connecting to database: {str(e)}")
                raise
        return cls.db

    @classmethod
    def init(cls):
        logger.info("Initializing database connection")
        try:
            cls.client = AsyncIOMotorClient(settings.MONGODB_URI)
            cls.db = cls.client[settings.DATABASE_NAME]
            logger.info("Database initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing database: {str(e)}")
            raise

    @classmethod
    def close(cls):
        if cls.client:
            cls.client.close()
            cls.client = None
            cls.db = None
            logger.info("Database connection closed")