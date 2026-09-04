import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, Float, ForeignKey, String, UniqueConstraint, Integer
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


class SectorPerformance(Base):
    __tablename__ = "sector_performance"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    name: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    change_percent: Mapped[float] = mapped_column(Float, default=0.0)
    top_gainer: Mapped[str] = mapped_column(String(20))
    gainer_change: Mapped[float] = mapped_column(Float, default=0.0)
    top_loser: Mapped[str] = mapped_column(String(20))
    loser_change: Mapped[float] = mapped_column(Float, default=0.0)
    market_cap: Mapped[str] = mapped_column(String(50))
    volume: Mapped[str] = mapped_column(String(50))
    momentum_score: Mapped[int] = mapped_column(Integer, default=50)
    trend: Mapped[str] = mapped_column(String(20))  # Bullish | Bearish | Neutral
    rsi: Mapped[float] = mapped_column(Float, default=50.0)
    capital_flow: Mapped[str] = mapped_column(String(50))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now, onupdate=_now)


class MarketOutlook(Base):
    __tablename__ = "market_outlook"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    date: Mapped[str] = mapped_column(String(20), unique=True)  # YYYY-MM-DD
    nifty_trend: Mapped[str] = mapped_column(String(20))
    nifty_support: Mapped[float] = mapped_column(Float)
    nifty_resistance: Mapped[float] = mapped_column(Float)
    bank_nifty_trend: Mapped[str] = mapped_column(String(20))
    bank_nifty_support: Mapped[float] = mapped_column(Float)
    bank_nifty_resistance: Mapped[float] = mapped_column(Float)
    vix_value: Mapped[float] = mapped_column(Float)
    vix_change: Mapped[float] = mapped_column(Float)
    fii_flow: Mapped[str] = mapped_column(String(100))
    dii_flow: Mapped[str] = mapped_column(String(100))
    pcr_ratio: Mapped[float] = mapped_column(Float)
    market_sentiment: Mapped[str] = mapped_column(String(20))
    key_events_json: Mapped[str] = mapped_column(String(1000), default="[]")
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now, onupdate=_now)


class ResearchCall(Base):
    __tablename__ = "research_calls"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    stock_id: Mapped[str] = mapped_column(ForeignKey("stocks.id"))
    recommendation: Mapped[str] = mapped_column(String(10))  # BUY | SELL | HOLD
    entry_price_min: Mapped[float] = mapped_column(Float)
    entry_price_max: Mapped[float] = mapped_column(Float)
    target_price: Mapped[float] = mapped_column(Float)
    stop_loss: Mapped[float] = mapped_column(Float)
    risk_level: Mapped[str] = mapped_column(String(20))  # Low | Medium | High
    confidence_score: Mapped[int] = mapped_column(Integer)  # 0-100
    horizon: Mapped[str] = mapped_column(String(50))  # Short Term | Medium Term | Long Term
    analysis_summary: Mapped[str] = mapped_column(String(2000))
    status: Mapped[str] = mapped_column(String(20), default="ACTIVE")
    analyst_name: Mapped[str] = mapped_column(String(100))
    analyst_accuracy: Mapped[str] = mapped_column(String(50))
    technical_rsi: Mapped[float] = mapped_column(Float)
    technical_macd: Mapped[str] = mapped_column(String(20))
    technical_trend: Mapped[str] = mapped_column(String(20))
    published_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)

    stock: Mapped["Stock"] = relationship()
