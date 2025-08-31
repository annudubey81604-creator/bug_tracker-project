from sqlalchemy import Column, Integer, String, Text, DateTime
from .database import Base
import datetime

class Bug(Base):
    _tablename_ = "bugs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    severity = Column(String)
    component = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)