from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import Subscription, User
from app.services.plans import PLAN_CATALOG

router = APIRouter(prefix="/plans", tags=["Plans"])


@router.get("")
async def list_plans():
    """FR-05 — configurable subscription plan catalog (BRD section 7)."""
    return [{"code": code, **details} for code, details in PLAN_CATALOG.items()]


@router.post("/select/{plan_code}")
async def select_plan(
    plan_code: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if plan_code not in PLAN_CATALOG:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Unknown plan code.")

    result = await db.execute(select(Subscription).where(Subscription.user_id == current_user.id))
    subscription = result.scalar_one_or_none()
    if not subscription:
        subscription = Subscription(user_id=current_user.id, plan_code=plan_code)
        db.add(subscription)
    else:
        subscription.plan_code = plan_code
        # NOTE: real billing lifecycle (renewal date, payment provider
        # webhook handling) is an open decision per BRD section 20 —
        # plug the payment provider's confirmation callback in here
        # before flipping plan_code in production.

    await db.commit()
    await db.refresh(subscription)
    return {"plan_code": subscription.plan_code, **PLAN_CATALOG[subscription.plan_code]}
