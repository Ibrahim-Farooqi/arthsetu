from datetime import datetime

from pydantic import BaseModel, Field

from app.schemas.market import StockOut


class LabSetupRequest(BaseModel):
    """BRD section 11 — user chooses virtual starting capital (₹5,000 to
    ₹10,00,000), presets or custom entry. Bounds are enforced in the
    endpoint against settings.LAB_MIN/MAX_VIRTUAL_CAPITAL."""

    starting_capital: float = Field(gt=0)


class LabOverviewOut(BaseModel):
    starting_capital: float
    available_tokens: float
    invested_value: float
    total_lab_value: float
    total_return_pct: float
    benchmark_return_pct: float  # vs Nifty/benchmark simulation, see services/lab.py


class LabHoldingOut(BaseModel):
    stock: StockOut
    quantity: int
    avg_entry_price: float
    current_price: float
    current_value: float
    return_pct: float
    holding_period_days: int
    opened_at: datetime

    class Config:
        from_attributes = True


class InvestRequest(BaseModel):
    stock_id: str
    quantity: int = Field(gt=0)
    thesis: str = Field(min_length=1, max_length=1000, description="Investment thesis for the Decision Journal")


class SellRequest(BaseModel):
    stock_id: str
    quantity: int = Field(gt=0)


class LabTransactionOut(BaseModel):
    id: str
    stock: StockOut
    side: str
    quantity: int
    price: float
    total_value: float
    executed_at: datetime

    class Config:
        from_attributes = True


class DecisionJournalEntryOut(BaseModel):
    id: str
    stock: StockOut
    thesis: str
    thesis_status: str
    decision_quality_score: int | None
    lesson: str | None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
