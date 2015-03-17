import json
from sqlalchemy import (
    Column, Integer, String, DateTime,
    func
)
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

SETTINGS = json.load(open("settings.json"))

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String)

class WifiPass(Base):
    __tablename__ = "wifi_pass"
    id = Column(Integer, primary_key=True)
    password = Column(String(50))
    change_date = Column(DateTime)
    expiry = Column(DateTime)
    
class Bandwidth(Base):
    __tablename__ = "bandwidth"
    id = Column(Integer, primary_key=True)
    downstream = Column(String)
    upstream = Column(String)
    last_check = Column(DateTime, default=func.now())
    

def create_tables():
    from sqlalchemy import create_engine
    engine = create_engine(SETTINGS["settings"]["db"]["url"], echo=True)
    Base.metadata.create_all(engine)

