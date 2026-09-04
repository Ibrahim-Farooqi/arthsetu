"""
Investment Lab business rules (BRD sections 11 & 12).

Key rules encoded here:
- Tokens have no cash value and cannot be withdrawn (simulation only).
- No reset action — capital is only released by selling holdings.
- Buys consume Available Tokens at current (mock) price; average entry
  price is recalculated on repeat buys of the same stock.
- Sells release simulated proceeds back to Available Tokens and close or
  reduce the holding; a full sell also closes out the Decision Journal
  entry for that position with an outcome.
"""
from __future__ import annotations

from datetime import datetime, timezone

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.models.lab import DecisionJournalEntry, LabAccount, LabHolding, LabTransaction
from app.models.market import Stock
from app.services.market_data import get_market_data_provider

provider = get_market_data_provider()


def current_price(stock: Stock) -> float:
    price, _ = provider.get_quote(stock.symbol, stock.last_price)
    return price


async def get_or_create_account(db: AsyncSession, user_id: str) -> LabAccount | None:
    result = await db.execute(select(LabAccount).where(LabAccount.user_id == user_id))
    return result.scalar_one_or_none()


async def setup_account(db: AsyncSession, user_id: str, starting_capital: float) -> LabAccount:
    if not (settings.LAB_MIN_VIRTUAL_CAPITAL <= starting_capital <= settings.LAB_MAX_VIRTUAL_CAPITAL):
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            f"Starting capital must be between ₹{settings.LAB_MIN_VIRTUAL_CAPITAL:,} "
            f"and ₹{settings.LAB_MAX_VIRTUAL_CAPITAL:,}.",
        )
    existing = await get_or_create_account(db, user_id)
    if existing:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Investment Lab account already exists.")

    account = LabAccount(
        user_id=user_id, starting_capital=starting_capital, available_tokens=starting_capital
    )
    db.add(account)
    await db.commit()
    await db.refresh(account)
    return account


async def buy(
    db: AsyncSession, account: LabAccount, stock: Stock, quantity: int, thesis: str
) -> LabTransaction:
    price = current_price(stock)
    total_cost = round(price * quantity, 2)

    if total_cost > account.available_tokens:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            f"Insufficient Available Tokens. Need {total_cost}, have {account.available_tokens}.",
        )

    account.available_tokens = round(account.available_tokens - total_cost, 2)

    result = await db.execute(
        select(LabHolding).where(LabHolding.account_id == account.id, LabHolding.stock_id == stock.id)
    )
    holding = result.scalar_one_or_none()
    if holding:
        new_qty = holding.quantity + quantity
        holding.avg_entry_price = round(
            ((holding.avg_entry_price * holding.quantity) + total_cost) / new_qty, 2
        )
        holding.quantity = new_qty
    else:
        holding = LabHolding(
            account_id=account.id, stock_id=stock.id, quantity=quantity, avg_entry_price=price
        )
        db.add(holding)

    txn = LabTransaction(
        account_id=account.id,
        stock_id=stock.id,
        side="buy",
        quantity=quantity,
        price=price,
        total_value=total_cost,
    )
    db.add(txn)

    db.add(
        DecisionJournalEntry(
            account_id=account.id,
            stock_id=stock.id,
            thesis=thesis,
            thesis_status="still_playing_out",
        )
    )

    await db.commit()
    await db.refresh(txn)
    return txn


async def sell(db: AsyncSession, account: LabAccount, stock: Stock, quantity: int) -> LabTransaction:
    result = await db.execute(
        select(LabHolding).where(LabHolding.account_id == account.id, LabHolding.stock_id == stock.id)
    )
    holding = result.scalar_one_or_none()
    if not holding or holding.quantity < quantity:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Not enough shares held to sell that quantity.")

    price = current_price(stock)
    proceeds = round(price * quantity, 2)
    account.available_tokens = round(account.available_tokens + proceeds, 2)

    holding.quantity -= quantity
    is_full_close = holding.quantity == 0
    if is_full_close:
        await db.delete(holding)

    txn = LabTransaction(
        account_id=account.id,
        stock_id=stock.id,
        side="sell",
        quantity=quantity,
        price=price,
        total_value=proceeds,
    )
    db.add(txn)

    if is_full_close:
        j_result = await db.execute(
            select(DecisionJournalEntry)
            .where(
                DecisionJournalEntry.account_id == account.id,
                DecisionJournalEntry.stock_id == stock.id,
                DecisionJournalEntry.decision_quality_score.is_(None),
            )
            .order_by(DecisionJournalEntry.created_at.desc())
        )
        entry = j_result.scalars().first()
        if entry:
            gain_pct = ((price - holding.avg_entry_price) / holding.avg_entry_price) * 100
            entry.decision_quality_score = _score_decision(gain_pct)
            entry.lesson = _generate_lesson(gain_pct)

    await db.commit()
    await db.refresh(txn)
    return txn


def _score_decision(gain_pct: float) -> int:
    """Simplistic placeholder for the real Decision Quality methodology
    (BRD section 12), which should weigh thesis clarity, valuation at
    entry, risk, and benchmark-relative performance — not just raw P&L.
    This keeps the score in range and directionally sensible for demo
    purposes until that methodology is finalized."""
    return max(0, min(100, round(50 + gain_pct * 2)))


def _generate_lesson(gain_pct: float) -> str:
    if gain_pct > 0.01:
        return (
            "This position closed with a simulated gain. Review whether the "
            "original thesis played out as expected or whether the outcome "
            "was driven by broader market movement."
        )
    if gain_pct < -0.01:
        return (
            "This position closed with a simulated loss. Review the original "
            "thesis against what actually happened — was it a thesis issue, "
            "timing, or market-wide movement?"
        )
    return (
        "This position closed roughly flat. Consider whether the thesis "
        "still holds and whether holding longer or exiting was the better call."
    )


def build_overview(account: LabAccount, holdings_with_prices: list[tuple[LabHolding, float]]) -> dict:
    invested_value = sum(h.quantity * price for h, price in holdings_with_prices)
    total_lab_value = round(account.available_tokens + invested_value, 2)
    total_return_pct = (
        round(((total_lab_value - account.starting_capital) / account.starting_capital) * 100, 2)
        if account.starting_capital
        else 0.0
    )
    # Benchmark simulation placeholder — replace with a real index series
    # (e.g. Nifty 50) once a market data vendor is selected.
    benchmark_return_pct = round(total_return_pct * 0.6, 2)

    return {
        "starting_capital": account.starting_capital,
        "available_tokens": account.available_tokens,
        "invested_value": round(invested_value, 2),
        "total_lab_value": total_lab_value,
        "total_return_pct": total_return_pct,
        "benchmark_return_pct": benchmark_return_pct,
    }


def holding_period_days(opened_at: datetime) -> int:
    now = datetime.now(timezone.utc)
    if opened_at.tzinfo is None:
        opened_at = opened_at.replace(tzinfo=timezone.utc)
    return max(0, (now - opened_at).days)
