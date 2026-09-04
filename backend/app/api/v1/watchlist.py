from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models.market import Stock, Watchlist, WatchlistItem
from app.models.user import User
from app.schemas.market import StockOut, WatchlistItemOut
from app.services.market_data import get_market_data_provider

router = APIRouter(prefix="/watchlist", tags=["Watchlist"])
provider = get_market_data_provider()


async def _get_or_create_watchlist(db: AsyncSession, user_id: str) -> Watchlist:
    result = await db.execute(
        select(Watchlist).where(Watchlist.user_id == user_id).options(selectinload(Watchlist.items).selectinload(WatchlistItem.stock))
    )
    watchlist = result.scalar_one_or_none()
    if not watchlist:
        watchlist = Watchlist(user_id=user_id)
        db.add(watchlist)
        await db.commit()
        await db.refresh(watchlist)
    return watchlist


@router.get("", response_model=list[WatchlistItemOut])
async def get_watchlist(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    """FR-08 — Watchlist panel contents."""
    watchlist = await _get_or_create_watchlist(db, current_user.id)
    out = []
    for item in watchlist.items:
        price, change = provider.get_quote(item.stock.symbol, item.stock.last_price)
        out.append(
            WatchlistItemOut(
                stock=StockOut(
                    id=item.stock.id, symbol=item.stock.symbol, name=item.stock.name,
                    exchange=item.stock.exchange, sector=item.stock.sector,
                    last_price=price, day_change_pct=change,
                ),
                added_at=item.added_at,
            )
        )
    return out


@router.post("/{stock_id}", status_code=status.HTTP_201_CREATED)
async def add_to_watchlist(
    stock_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    stock_result = await db.execute(select(Stock).where(Stock.id == stock_id))
    if not stock_result.scalar_one_or_none():
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Stock not found.")

    watchlist = await _get_or_create_watchlist(db, current_user.id)
    existing = await db.execute(
        select(WatchlistItem).where(
            WatchlistItem.watchlist_id == watchlist.id, WatchlistItem.stock_id == stock_id
        )
    )
    if existing.scalar_one_or_none():
        return {"detail": "Already in watchlist."}

    db.add(WatchlistItem(watchlist_id=watchlist.id, stock_id=stock_id))
    await db.commit()
    return {"detail": "Added to watchlist."}


@router.delete("/{stock_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_from_watchlist(
    stock_id: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)
):
    watchlist = await _get_or_create_watchlist(db, current_user.id)
    result = await db.execute(
        select(WatchlistItem).where(
            WatchlistItem.watchlist_id == watchlist.id, WatchlistItem.stock_id == stock_id
        )
    )
    item = result.scalar_one_or_none()
    if item:
        await db.delete(item)
        await db.commit()
    return None
