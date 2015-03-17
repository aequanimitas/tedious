from sqlalchemy import (
    Column, Integer, String, DateTime,
    func,
    create_engine
)
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine("sqlite:///groute", echo=True)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)

class WifiPass(Base):
    __tablename__ = "wifi_pass"
    id = Column(Integer, primary_key=True)
    password = Column(String(50))
    
class Bandwidth(Base):
    __tablename__ = "bandwidth"
    id = Column(Integer, primary_key=True)
    downstream = Column(String)
    upstream = Column(String)
    last_check = Column(DateTime, default=func.now())
    

def create_tables():
    Base.metadata.create_all(engine)

