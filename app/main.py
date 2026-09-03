from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import settings
from app.db.seed import seed_stocks
from app.db.session import init_models


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Dev/demo convenience: auto-create tables + seed the stock universe on
    # startup. Skipped in production/serverless (e.g. Vercel) — there, run
    # `alembic upgrade head` + the seed script as separate deploy steps
    # instead, since a serverless function's "startup" runs on every cold
    # start rather than once, and concurrent invocations racing to run DDL
    # against Supabase Postgres is unsafe.
    if settings.ENV == "development":
        await init_models()
        await seed_stocks()
    yield


app = FastAPI(
    title=settings.APP_NAME,
    description="AI-Powered Investment Advisory & Research Intelligence Platform API",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_PREFIX)


@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "ok", "env": settings.ENV}
