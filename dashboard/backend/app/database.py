"""
Database connection and session management for SecurePipeline.
Uses SQLite with transaction safety.
"""

from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from .config import settings

# SQLite specific config: disable same-thread restriction for multi-threaded uvicorn
connect_args = {"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db() -> Generator[Session, None, None]:
    """Dependency for providing database sessions per request with transaction rollback."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db(target_engine=None) -> None:
    """Creates all database tables defined in models."""
    use_engine = target_engine or engine
    Base.metadata.create_all(bind=use_engine)
