from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import time
import logging
from typing import Callable

logger = logging.getLogger(__name__)

class MonitoringMiddleware(BaseHTTPMiddleware):
    async def dispatch(
        self, request: Request, call_next: Callable
    ) -> Response:
        start_time = time.time()
        
        try:
            response = await call_next(request)
            process_time = time.time() - start_time
            
            logger.info(
                "request_processed",
                extra={
                    "path": request.url.path,
                    "method": request.method,
                    "status_code": response.status_code,
                    "processing_time": process_time,
                    "client_host": request.client.host if request.client else None,
                }
            )
            
            response.headers["X-Process-Time"] = str(process_time)
            return response
            
        except Exception as e:
            process_time = time.time() - start_time
            logger.error(
                "request_failed",
                extra={
                    "path": request.url.path,
                    "method": request.method,
                    "error": str(e),
                    "processing_time": process_time,
                    "client_host": request.client.host if request.client else None,
                }
            )
            raise

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, redis_client):
        super().__init__(app)
        self.redis = redis_client
        self.rate_limit = 100  # requests per minute
        self.window = 60  # seconds

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        client_ip = request.client.host
        key = f"rate_limit:{client_ip}"
        
        current = await self.redis.incr(key)
        if current == 1:
            await self.redis.expire(key, self.window)
        
        if current > self.rate_limit:
            raise BraincrumbException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded"
            )
        
        return await call_next(request)