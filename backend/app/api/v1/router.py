from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.lab import router as lab_router
from app.api.v1.market import router as market_router
from app.api.v1.personalization import router as personalization_router
from app.api.v1.plans import router as plans_router
from app.api.v1.users import router as users_router
from app.api.v1.watchlist import router as watchlist_router
from app.api.v1.research import router as research_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(users_router)
api_router.include_router(personalization_router)
api_router.include_router(market_router)
api_router.include_router(watchlist_router)
api_router.include_router(lab_router)
api_router.include_router(plans_router)
api_router.include_router(research_router)
