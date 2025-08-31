from pydantic import BaseModel

class BugBase(BaseModel):
    title: str
    description: str
    component: str

class BugCreate(BugBase):
    pass

class Bug(BugBase):
    id: int
    severity: str
    class Config:
        orm_mode = True