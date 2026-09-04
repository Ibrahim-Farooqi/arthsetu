import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


def _uuid() -> str:
    return str(uuid.uuid4())


def _now() -> datetime:
    return datetime.now(timezone.utc)


class User(Base):
    """Lightweight account per BRD 6.1 — no Aadhaar/PAN/bank/KYC fields.
    Just enough to authenticate and personalize the experience."""

    __tablename__ = "users"

    # When Supabase Auth is enabled, `id` IS the Supabase user UUID (`sub`
    # claim) rather than a locally-generated id — see
    # app.api.deps._get_or_provision_supabase_user.
    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    full_name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    mobile_number: Mapped[str | None] = mapped_column(String(20), unique=True, index=True, nullable=True)
    # Nullable: unused for Supabase-authenticated users, since Supabase Auth
    # owns credential storage. Only populated by the legacy local-JWT flow.
    hashed_password: Mapped[str | None] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)

    personalization: Mapped["PersonalizationProfile | None"] = relationship(
        back_populates="user", uselist=False, cascade="all, delete-orphan"
    )
    subscription: Mapped["Subscription | None"] = relationship(
        back_populates="user", uselist=False, cascade="all, delete-orphan"
    )


class PersonalizationProfile(Base):
    """Answers to the 5-question wizard (BRD 6.2). Stored as discrete
    columns rather than free-form JSON so downstream personalization
    logic (Pro Arth 'Selected For You', etc.) can query on them directly."""

    __tablename__ = "personalization_profiles"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), unique=True)

    familiarity: Mapped[str] = mapped_column(String(30))  # new/learning/experienced/advanced
    topics: Mapped[str] = mapped_column(String(500))  # comma-separated selections
    primary_goals: Mapped[str] = mapped_column(String(500))
    research_approach: Mapped[str] = mapped_column(String(30))
    investment_horizon: Mapped[str] = mapped_column(String(30))

    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now, onupdate=_now)

    user: Mapped["User"] = relationship(back_populates="personalization")


class Subscription(Base):
    """Current plan for a user (BRD section 7). Entitlements are resolved
    from the PLAN_CATALOG config, not duplicated per-user."""

    __tablename__ = "subscriptions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), unique=True)
    plan_code: Mapped[str] = mapped_column(String(30), default="free")
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)
    renews_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    user: Mapped["User"] = relationship(back_populates="subscription")
