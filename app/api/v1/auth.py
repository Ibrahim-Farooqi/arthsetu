from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.core.config import settings
from app.core.security import create_access_token, hash_password, verify_password
from app.db.session import get_db
from app.models.user import Subscription, User
from app.schemas.auth import CreateAccountRequest, TokenResponse, UserOut

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.get("/me", response_model=UserOut)
async def read_current_user(current_user: User = Depends(get_current_user)):
    """Returns the profile for whichever token was presented — a Supabase
    Auth access token when SUPABASE_JWT_SECRET is configured, otherwise a
    locally-issued JWT. The frontend calls this right after Supabase
    sign-in/sign-up to fetch (and, for first-time users, implicitly
    provision) the ArthSetu profile row."""
    return current_user


# --- Legacy local-JWT auth (used only when Supabase Auth is NOT configured,
# e.g. running the API fully standalone in local dev). When
# SUPABASE_JWT_SECRET is set, the frontend authenticates directly against
# Supabase and these two endpoints are unused. ---


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def register(payload: CreateAccountRequest, db: AsyncSession = Depends(get_db)):
    """FR-01/FR-02 — Create Account. Deliberately collects only name,
    mobile, email, password (no Aadhaar/PAN/bank/KYC per BRD section 6)."""
    if settings.SUPABASE_AUTH_ENABLED:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            "Supabase Auth is enabled — sign up via supabase-js on the frontend, "
            "then call GET /auth/me to provision the profile.",
        )

    existing = await db.execute(
        select(User).where((User.email == payload.email) | (User.mobile_number == payload.mobile_number))
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Email or mobile number already registered.")

    user = User(
        full_name=payload.full_name,
        email=payload.email,
        mobile_number=payload.mobile_number,
        hashed_password=hash_password(payload.password),
    )
    db.add(user)
    await db.flush()

    # Every new user starts on the Free tier (BRD section 7) until they
    # complete personalization + plan selection.
    db.add(Subscription(user_id=user.id, plan_code="free"))

    await db.commit()
    await db.refresh(user)
    return user


@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    """OAuth2 password flow: 'username' field carries the email."""
    if settings.SUPABASE_AUTH_ENABLED:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            "Supabase Auth is enabled — sign in via supabase-js on the frontend.",
        )

    result = await db.execute(select(User).where(User.email == form_data.username))
    user = result.scalar_one_or_none()
    if not user or not user.hashed_password or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Incorrect email or password.")

    access_token = create_access_token(subject=user.id)
    return TokenResponse(access_token=access_token)
