from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import models, schemas, crud, database, auth

models.Base.metadata.create_all(bind=database.engine)
app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/bugs", response_model=schemas.Bug, dependencies=[Depends(auth.verify_token)])
def create_bug(bug: schemas.BugCreate, db: Session = Depends(get_db)):
    return crud.create_bug(db, bug)

@app.get("/bugs", response_model=list[schemas.Bug], dependencies=[Depends(auth.verify_token)])
def list_bugs(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    return crud.get_bugs(db, skip=skip, limit=limit)