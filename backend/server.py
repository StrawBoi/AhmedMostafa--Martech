from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Ahmed Mostafa Portfolio API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Rate limit: max RATE_LIMIT_MAX submissions per IP within RATE_LIMIT_WINDOW_MIN minutes.
RATE_LIMIT_MAX = 5
RATE_LIMIT_WINDOW_MIN = 60


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=160)
    role_type: Optional[str] = Field(default=None, max_length=120)
    message: str = Field(min_length=10, max_length=4000)
    # Honeypot — humans should leave this empty.
    website: Optional[str] = Field(default=None, max_length=240)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    role_type: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Helpers ----------
def _client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    if fwd:
        return fwd.split(",")[0].strip()
    real = request.headers.get("x-real-ip")
    if real:
        return real.strip()
    return request.client.host if request.client else "unknown"


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Ahmed Mostafa Portfolio API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(payload: StatusCheckCreate):
    obj = StatusCheck(**payload.model_dump())
    doc = obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return rows


@api_router.post("/contact", response_model=ContactMessage, status_code=201)
async def submit_contact(payload: ContactCreate, request: Request):
    # Honeypot — bots fill the hidden 'website' field. Quietly drop the request
    # but return a 201 so the bot thinks it succeeded (no signal back).
    if payload.website:
        logger.info("Honeypot triggered for contact submission — silently dropping.")
        return ContactMessage(**payload.model_dump(exclude={"website"}))

    ip = _client_ip(request)
    now = datetime.now(timezone.utc)
    window_start = now - timedelta(minutes=RATE_LIMIT_WINDOW_MIN)

    try:
        recent = await db.contact_messages.count_documents(
            {"_ip": ip, "created_at": {"$gte": window_start.isoformat()}}
        )
    except Exception:
        recent = 0

    if recent >= RATE_LIMIT_MAX:
        raise HTTPException(
            status_code=429,
            detail="Too many submissions from this network. Please try again in a little while.",
        )

    try:
        obj = ContactMessage(**payload.model_dump(exclude={"website"}))
        doc = obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        doc['_ip'] = ip  # internal field; never returned to clients
        await db.contact_messages.insert_one(doc)
        return obj
    except HTTPException:
        raise
    except Exception:
        logger.exception("Failed to save contact message")
        raise HTTPException(status_code=500, detail="Could not save your message. Please try again.")


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages():
    # Exclude both _id (Mongo) and _ip (internal). Sort newest first.
    rows = await db.contact_messages.find(
        {}, {"_id": 0, "_ip": 0}
    ).sort("created_at", -1).to_list(500)
    for r in rows:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rows


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
