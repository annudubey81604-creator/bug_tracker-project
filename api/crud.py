from sqlalchemy.orm import Session
from . import models, schemas
from .analytics import predict_severity

def create_bug(db: Session, bug: schemas.BugCreate):
    severity = predict_severity(bug.description)
    db_bug = models.Bug(**bug.dict(), severity=severity)
    db.add(db_bug)
    db.commit()
    db.refresh(db_bug)
    return db_bug

def get_bugs(db: Session, skip: int = 0, limit: int = 20):
    return db.query(models.Bug).offset(skip).limit(limit).all()