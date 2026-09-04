from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import UpdateProfileRequest, UserOut

router = APIRouter(prefix="/users", tags=["Users"])


@router.put("/me", response_model=UserOut)
async def update_current_user(
    payload: UpdateProfileRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Edit the lightweight profile fields ArthSetu actually collects
    (BRD 6.1 — no Aadhaar/PAN/bank fields to update here)."""
    if payload.full_name is not None:
        current_user.full_name = payload.full_name
    if payload.mobile_number is not None:
        current_user.mobile_number = payload.mobile_number

    await db.commit()
    await db.refresh(current_user)
    return current_user
