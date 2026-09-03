import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, Float, ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


def _uuid() -> str:
    return str(uuid.uuid4())


def _now() -> datetime:
    return datetime.now(timezone.utc)


class Stock(Base):
    """Coverage universe. In this scaffold, rows are seeded once from the
    mock market data provider so Lab/Watchlist can hold foreign keys to a
    stable id. Swap the provider (app/services/market_data.py) for a real
    vendor and re-seed without touching this schema."""

    __tablename__ = "stocks"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    symbol: Mapped[str] = mapped_column(String(20), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(150))
    exchange: Mapped[str] = mapped_column(String(10), default="NSE")
    sector: Mapped[str] = mapped_column(String(80))
    last_price: Mapped[float] = mapped_column(Float)
    day_change_pct: Mapped[float] = mapped_column(Float, default=0.0)


class Watchlist(Base):
    __tablename__ = "watchlists"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), unique=True)

    items: Mapped[list["WatchlistItem"]] = relationship(
        back_populates="watchlist", cascade="all, delete-orphan"
    )


class WatchlistItem(Base):
    __tablename__ = "watchlist_items"
    __table_args__ = (UniqueConstraint("watchlist_id", "stock_id", name="uq_watchlist_stock"),)

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    watchlist_id: Mapped[str] = mapped_column(ForeignKey("watchlists.id"))
    stock_id: Mapped[str] = mapped_column(ForeignKey("stocks.id"))
    added_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)

    watchlist: Mapped["Watchlist"] = relationship(back_populates="items")
    stock: Mapped["Stock"] = relationship()
