from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import decode_access_token, decode_supabase_token
from app.db.session import get_db
from app.models.user import Subscription, User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_PREFIX}/auth/login", auto_error=False)


async def _get_or_provision_supabase_user(claims: dict, db: AsyncSession) -> User:
    """Look up the local profile row for a Supabase-authenticated user,
    creating it on first sight (JIT provisioning). The Supabase user UUID
    (`sub`) is used directly as the local User.id, keeping the two systems
    in lockstep without a separate mapping table."""
    user_id = claims["sub"]
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user:
        return user

    metadata = claims.get("user_metadata") or {}
    user = User(
        id=user_id,
        full_name=metadata.get("full_name") or (claims.get("email") or "").split("@")[0],
        email=claims.get("email") or f"{user_id}@users.noreply.arthsetu.ai",
        mobile_number=metadata.get("mobile_number") or claims.get("phone") or f"unset-{user_id}",
        hashed_password=None,
    )
    db.add(user)
    await db.flush()
    db.add(Subscription(user_id=user.id, plan_code="free"))
    await db.commit()
    await db.refresh(user)
    return user


async def get_current_user(
    token: str | None = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)
) -> User:
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not token:
        raise credentials_error

    # Prefer Supabase-issued tokens when Supabase Auth is configured; fall
    # back to locally-issued JWTs so the API keeps working standalone
    # (e.g. local dev without a Supabase project).
    if settings.SUPABASE_AUTH_ENABLED:
        claims = decode_supabase_token(token)
        if claims:
            return await _get_or_provision_supabase_user(claims, db)

    user_id = decode_access_token(token)
    if not user_id:
        raise credentials_error

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise credentials_error
    return user
