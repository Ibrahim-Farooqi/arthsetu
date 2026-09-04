from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.lab import DecisionJournalEntry, LabHolding, LabTransaction
from app.models.market import Stock
from app.models.user import User
from app.schemas.lab import (
    DecisionJournalEntryOut,
    InvestRequest,
    LabHoldingOut,
    LabOverviewOut,
    LabSetupRequest,
    LabTransactionOut,
    SellRequest,
)
from app.schemas.market import StockOut
from app.services import lab as lab_service

router = APIRouter(prefix="/lab", tags=["Investment Lab"])


async def _require_account(db: AsyncSession, user_id: str):
    account = await lab_service.get_or_create_account(db, user_id)
    if not account:
        raise HTTPException(
            status.HTTP_404_NOT_FOUND,
            "Investment Lab not set up yet. Call POST /lab/setup with a starting capital first.",
        )
    return account


async def _get_stock_or_404(db: AsyncSession, stock_id: str) -> Stock:
    result = await db.execute(select(Stock).where(Stock.id == stock_id))
    stock = result.scalar_one_or_none()
    if not stock:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Stock not found.")
    return stock


@router.post("/setup", response_model=LabOverviewOut, status_code=status.HTTP_201_CREATED)
async def setup_lab(
    payload: LabSetupRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """BRD section 11 — choose virtual starting capital (₹5,000–₹10,00,000).
    One-time setup; there is no reset endpoint by design."""
    account = await lab_service.setup_account(db, current_user.id, payload.starting_capital)
    return LabOverviewOut(**lab_service.build_overview(account, []))


@router.get("/overview", response_model=LabOverviewOut)
async def get_overview(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    account = await _require_account(db, current_user.id)
    result = await db.execute(
        select(LabHolding).where(LabHolding.account_id == account.id).options(selectinload(LabHolding.stock))
    )
    holdings = result.scalars().all()
    priced = [(h, lab_service.current_price(h.stock)) for h in holdings]
    return LabOverviewOut(**lab_service.build_overview(account, priced))


@router.get("/holdings", response_model=list[LabHoldingOut])
async def get_holdings(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    account = await _require_account(db, current_user.id)
    result = await db.execute(
        select(LabHolding).where(LabHolding.account_id == account.id).options(selectinload(LabHolding.stock))
    )
    holdings = result.scalars().all()

    out = []
    for h in holdings:
        price = lab_service.current_price(h.stock)
        current_value = round(price * h.quantity, 2)
        return_pct = round(((price - h.avg_entry_price) / h.avg_entry_price) * 100, 2) if h.avg_entry_price else 0.0
        out.append(
            LabHoldingOut(
                stock=StockOut(
                    id=h.stock.id, symbol=h.stock.symbol, name=h.stock.name, exchange=h.stock.exchange,
                    sector=h.stock.sector, last_price=price, day_change_pct=0.0,
                ),
                quantity=h.quantity,
                avg_entry_price=h.avg_entry_price,
                current_price=price,
                current_value=current_value,
                return_pct=return_pct,
                holding_period_days=lab_service.holding_period_days(h.opened_at),
                opened_at=h.opened_at,
            )
        )
    return out


@router.post("/invest", response_model=LabTransactionOut, status_code=status.HTTP_201_CREATED)
async def invest(
    payload: InvestRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """FR-11 — virtual buy. Requires a thesis, which seeds the Decision
    Journal entry for this position (BRD section 11/12)."""
    account = await _require_account(db, current_user.id)
    stock = await _get_stock_or_404(db, payload.stock_id)
    txn = await lab_service.buy(db, account, stock, payload.quantity, payload.thesis)
    return LabTransactionOut(
        id=txn.id,
        stock=StockOut(id=stock.id, symbol=stock.symbol, name=stock.name, exchange=stock.exchange,
                        sector=stock.sector, last_price=txn.price, day_change_pct=0.0),
        side=txn.side, quantity=txn.quantity, price=txn.price, total_value=txn.total_value,
        executed_at=txn.executed_at,
    )


@router.post("/sell", response_model=LabTransactionOut)
async def sell(
    payload: SellRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """FR-11 — virtual sell; proceeds return to Available Tokens (no
    reset mechanism exists — this is the only way capital is released)."""
    account = await _require_account(db, current_user.id)
    stock = await _get_stock_or_404(db, payload.stock_id)
    txn = await lab_service.sell(db, account, stock, payload.quantity)
    return LabTransactionOut(
        id=txn.id,
        stock=StockOut(id=stock.id, symbol=stock.symbol, name=stock.name, exchange=stock.exchange,
                        sector=stock.sector, last_price=txn.price, day_change_pct=0.0),
        side=txn.side, quantity=txn.quantity, price=txn.price, total_value=txn.total_value,
        executed_at=txn.executed_at,
    )


@router.get("/transactions", response_model=list[LabTransactionOut])
async def get_transactions(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    account = await _require_account(db, current_user.id)
    result = await db.execute(
        select(LabTransaction)
        .where(LabTransaction.account_id == account.id)
        .options(selectinload(LabTransaction.stock))
        .order_by(LabTransaction.executed_at.desc())
    )
    txns = result.scalars().all()
    return [
        LabTransactionOut(
            id=t.id,
            stock=StockOut(id=t.stock.id, symbol=t.stock.symbol, name=t.stock.name, exchange=t.stock.exchange,
                            sector=t.stock.sector, last_price=t.price, day_change_pct=0.0),
            side=t.side, quantity=t.quantity, price=t.price, total_value=t.total_value, executed_at=t.executed_at,
        )
        for t in txns
    ]


@router.get("/journal", response_model=list[DecisionJournalEntryOut])
async def get_journal(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    """FR-13 — Decision Journal: chronological decision memory with
    thesis, status, and (once closed) the decision quality score/lesson."""
    account = await _require_account(db, current_user.id)
    result = await db.execute(
        select(DecisionJournalEntry)
        .where(DecisionJournalEntry.account_id == account.id)
        .options(selectinload(DecisionJournalEntry.stock))
        .order_by(DecisionJournalEntry.created_at.desc())
    )
    entries = result.scalars().all()
    return [
        DecisionJournalEntryOut(
            id=e.id,
            stock=StockOut(id=e.stock.id, symbol=e.stock.symbol, name=e.stock.name, exchange=e.stock.exchange,
                            sector=e.stock.sector, last_price=0.0, day_change_pct=0.0),
            thesis=e.thesis, thesis_status=e.thesis_status,
            decision_quality_score=e.decision_quality_score, lesson=e.lesson,
            created_at=e.created_at, updated_at=e.updated_at,
        )
        for e in entries
    ]
