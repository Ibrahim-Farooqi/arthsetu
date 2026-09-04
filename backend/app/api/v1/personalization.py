from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.user import PersonalizationProfile, User
from app.schemas.personalization import PersonalizationOut, PersonalizationRequest

router = APIRouter(prefix="/personalization", tags=["Personalization"])


def _to_out(profile: PersonalizationProfile) -> PersonalizationOut:
    return PersonalizationOut(
        familiarity=profile.familiarity,
        topics=profile.topics.split(","),
        primary_goals=profile.primary_goals.split(","),
        research_approach=profile.research_approach,
        investment_horizon=profile.investment_horizon,
    )


@router.put("/me", response_model=PersonalizationOut)
async def save_personalization(
    payload: PersonalizationRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """FR-03/FR-04 — submit (or edit, via the Personalization Summary
    screen) answers to the 5-question wizard. Idempotent PUT so re-editing
    from the summary screen is just another call to this endpoint."""
    result = await db.execute(
        select(PersonalizationProfile).where(PersonalizationProfile.user_id == current_user.id)
    )
    profile = result.scalar_one_or_none()

    values = dict(
        familiarity=payload.familiarity.value,
        topics=",".join(payload.topics),
        primary_goals=",".join(payload.primary_goals),
        research_approach=payload.research_approach.value,
        investment_horizon=payload.investment_horizon.value,
    )

    if profile:
        for k, v in values.items():
            setattr(profile, k, v)
    else:
        profile = PersonalizationProfile(user_id=current_user.id, **values)
        db.add(profile)

    await db.commit()
    await db.refresh(profile)
    return _to_out(profile)


@router.get("/me", response_model=PersonalizationOut | None)
async def get_personalization(
    db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    result = await db.execute(
        select(PersonalizationProfile).where(PersonalizationProfile.user_id == current_user.id)
    )
    profile = result.scalar_one_or_none()
    return _to_out(profile) if profile else None
