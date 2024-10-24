
from fastapi import HTTPException, status
from typing import Any, Optional, Dict

class BraincrumbException(HTTPException):
    def __init__(
        self,
        status_code: int,
        detail: str,
        code: Optional[str] = None,
        headers: Optional[Dict[str, Any]] = None
    ) -> None:
        super().__init__(
            status_code=status_code,
            detail={
                "message": detail,
                "code": code
            } if code else {"message": detail},
            headers=headers
        )

class AuthenticationError(BraincrumbException):
    def __init__(
        self,
        detail: str = "Could not validate credentials",
        code: Optional[str] = "AUTH_ERROR",
        headers: Optional[Dict[str, str]] = None
    ) -> None:
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            code=code,
            headers=headers or {"WWW-Authenticate": "Bearer"}
        )

class ValidationError(BraincrumbException):
    def __init__(
        self,
        detail: str,
        code: Optional[str] = "VALIDATION_ERROR"
    ) -> None:
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
            code=code
        )

class NotFoundError(BraincrumbException):
    def __init__(
        self,
        detail: str,
        code: Optional[str] = "NOT_FOUND"
    ) -> None:
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=detail,
            code=code
        )