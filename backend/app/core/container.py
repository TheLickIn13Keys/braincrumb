from dependency_injector import containers, providers
from app.services.db import Database
from app.core.config import get_settings

class Container(containers.DeclarativeContainer):
    wiring_config = containers.WiringConfiguration(packages=["app.api"])
    
    config = providers.Singleton(get_settings)
    
    db = providers.Singleton(
        Database,
        uri=config.provided.MONGODB_URI,
        database=config.provided.DATABASE_NAME
    )