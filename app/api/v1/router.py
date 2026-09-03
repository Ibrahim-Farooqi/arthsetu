from fastapi import APIRouter

from app.api.v1 import auth, lab, market, personalization, plans, users, watchlist

api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(personalization.router)
api_router.include_router(plans.router)
api_router.include_router(market.router)
api_router.include_router(watchlist.router)
api_router.include_router(lab.router)
