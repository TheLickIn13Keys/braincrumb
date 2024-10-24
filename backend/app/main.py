
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings
from app.core.container import Container
from app.core.middleware import MonitoringMiddleware, RateLimitMiddleware
from app.core.logging import setup_logging


settings = get_settings()
container = Container()


setup_logging()

app = FastAPI(title="Braincrumb API")


app.add_middleware(MonitoringMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


container.wire(packages=["app.api"])