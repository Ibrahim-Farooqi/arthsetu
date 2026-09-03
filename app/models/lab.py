import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


def _uuid() -> str:
    return str(uuid.uuid4())


def _now() -> datetime:
    return datetime.now(timezone.utc)


class LabAccount(Base):
    """One virtual account per user (BRD section 11). Tokens have no cash
    value and cannot be withdrawn — this is a simulation ledger only.
    There is intentionally no 'reset' operation; capital is only released
    by selling holdings (business rule from the BRD)."""

    __tablename__ = "lab_accounts"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), unique=True)

    starting_capital: Mapped[float] = mapped_column(Float)
    available_tokens: Mapped[float] = mapped_column(Float)  # cash-equivalent, uninvested
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)

    holdings: Mapped[list["LabHolding"]] = relationship(
        back_populates="account", cascade="all, delete-orphan"
    )
    transactions: Mapped[list["LabTransaction"]] = relationship(
        back_populates="account", cascade="all, delete-orphan"
    )
    journal_entries: Mapped[list["DecisionJournalEntry"]] = relationship(
        back_populates="account", cascade="all, delete-orphan"
    )


class LabHolding(Base):
    """Open simulated position. Closed (fully sold) positions are removed
    here and live on only as LabTransaction history + DecisionJournalEntry,
    which is what Performance/Insights are computed from."""

    __tablename__ = "lab_holdings"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    account_id: Mapped[str] = mapped_column(ForeignKey("lab_accounts.id"))
    stock_id: Mapped[str] = mapped_column(ForeignKey("stocks.id"))

    quantity: Mapped[int] = mapped_column(Integer)
    avg_entry_price: Mapped[float] = mapped_column(Float)
    opened_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)

    account: Mapped["LabAccount"] = relationship(back_populates="holdings")
    stock: Mapped["Stock"] = relationship()


class LabTransaction(Base):
    """Immutable audit trail of every simulated buy/sell — the source of
    truth for Performance attribution and the Decision Journal."""

    __tablename__ = "lab_transactions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    account_id: Mapped[str] = mapped_column(ForeignKey("lab_accounts.id"))
    stock_id: Mapped[str] = mapped_column(ForeignKey("stocks.id"))

    side: Mapped[str] = mapped_column(String(4))  # "buy" | "sell"
    quantity: Mapped[int] = mapped_column(Integer)
    price: Mapped[float] = mapped_column(Float)
    total_value: Mapped[float] = mapped_column(Float)
    executed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)

    account: Mapped["LabAccount"] = relationship(back_populates="transactions")
    stock: Mapped["Stock"] = relationship()


class DecisionJournalEntry(Base):
    """Chronological decision memory (BRD section 11/12). Created at buy
    time with a thesis; updated as thesis status evolves and again on
    close-out with the eventual outcome/lesson."""

    __tablename__ = "decision_journal_entries"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=_uuid)
    account_id: Mapped[str] = mapped_column(ForeignKey("lab_accounts.id"))
    stock_id: Mapped[str] = mapped_column(ForeignKey("stocks.id"))

    thesis: Mapped[str] = mapped_column(String(1000))
    thesis_status: Mapped[str] = mapped_column(
        String(30), default="still_playing_out"
    )  # still_playing_out | thesis_weakened | thesis_invalidated
    decision_quality_score: Mapped[int | None] = mapped_column(Integer, nullable=True)  # 0-100
    lesson: Mapped[str | None] = mapped_column(String(1000), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=_now, onupdate=_now)

    account: Mapped["LabAccount"] = relationship(back_populates="journal_entries")
    stock: Mapped["Stock"] = relationship()
