import firebase_admin
from firebase_admin import auth, credentials
from fastapi import Header, HTTPException

cred = credentials.Certificate("firebase.json")
firebase_admin.initialize_app(cred)

def verify_token(authorization: str = Header(...)):
    token = authorization.split(" ")[1]
    try:
        decoded = auth.verify_id_token(token)
        return decoded
    except:
        raise HTTPException(status_code=401, detail="Invalid token")