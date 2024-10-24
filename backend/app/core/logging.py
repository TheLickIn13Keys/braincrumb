import logging
import sys
from typing import Optional
from pythonjsonlogger import jsonlogger

def setup_logging(level: Optional[str] = None) -> None:
    logger = logging.getLogger()
    handler = logging.StreamHandler(sys.stdout)
    
    formatter = jsonlogger.JsonFormatter(
        fmt='%(asctime)s %(levelname)s %(name)s %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )
    
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    logger.setLevel(level or logging.INFO)