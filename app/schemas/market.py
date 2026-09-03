from datetime import datetime

from pydantic import BaseModel


class StockOut(BaseModel):
    id: str
    symbol: str
    name: str
    exchange: str
    sector: str
    last_price: float
    day_change_pct: float

    class Config:
        from_attributes = True


class CandleOut(BaseModel):
    timestamp: datetime
    open: float
    high: float
    low: float
    close: float
    volume: int


class StockDetailOut(BaseModel):
    """BRD section 13 Overview tab. 'why_moving' / 'arthsetu_view' are
    stubs — see app/services/research.py for where a real research/AI
    pipeline plugs in."""

    stock: StockOut
    why_moving: str
    arthsetu_view: dict[str, int]  # 6-part score: business_quality, growth, valuation, momentum, financial_health, risk
    updated_at: datetime


class WatchlistItemOut(BaseModel):
    stock: StockOut
    added_at: datetime

    class Config:
        from_attributes = True
