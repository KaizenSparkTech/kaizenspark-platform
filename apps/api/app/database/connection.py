from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database URL configuration
# Note: This will be replaced by environment variables in production
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/kaizenspark"

# SQLAlchemy engine initialization
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Session factory for database transactions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for declarative ORM models
Base = declarative_base()

def get_db():
    """
    Database dependency to be used in FastAPI path operations.
    Ensures a new session is created per request and closed upon completion.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()