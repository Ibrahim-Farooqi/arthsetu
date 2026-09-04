from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.market import Stock, MarketOutlook, SectorPerformance
from app.schemas.market import CandleOut, StockDetailOut, StockOut
from app.services.market_data import get_market_data_provider
from app.services.research import get_stock_research
import json

router = APIRouter(prefix="/market", tags=["Market"])
provider = get_market_data_provider()

@router.get("/outlook")
async def get_market_outlook(db: AsyncSession = Depends(get_db)):
    """Fetch today's market outlook from the database."""
    today_date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    result = await db.execute(select(MarketOutlook).order_by(MarketOutlook.date.desc()).limit(1))
    outlook = result.scalar_one_or_none()
    if not outlook:
        return None
    return {
        "niftyTrend": outlook.nifty_trend,
        "niftySupport": outlook.nifty_support,
        "niftyResistance": outlook.nifty_resistance,
        "bankNiftyTrend": outlook.bank_nifty_trend,
        "bankNiftySupport": outlook.bank_nifty_support,
        "bankNiftyResistance": outlook.bank_nifty_resistance,
        "vixValue": outlook.vix_value,
        "vixChange": outlook.vix_change,
        "fiiFlow": outlook.fii_flow,
        "diiFlow": outlook.dii_flow,
        "pcrRatio": outlook.pcr_ratio,
        "marketSentiment": outlook.market_sentiment,
        "keyEvents": json.loads(outlook.key_events_json)
    }

@router.get("/sectors")
async def get_sectors(db: AsyncSession = Depends(get_db)):
    """Fetch sector performances from the database."""
    result = await db.execute(select(SectorPerformance))
    sectors = result.scalars().all()
    return [
        {
            "name": s.name,
            "changePercent": s.change_percent,
            "topGainer": s.top_gainer,
            "gainerChange": s.gainer_change,
            "topLoser": s.top_loser,
            "loserChange": s.loser_change,
            "marketCap": s.market_cap,
            "volume": s.volume,
            "momentumScore": s.momentum_score,
            "trend": s.trend,
            "rsi": s.rsi,
            "capitalFlow": s.capital_flow
        }
        for s in sectors
    ]


@router.get("/stocks", response_model=list[StockOut])
async def list_or_search_stocks(
    q: str | None = Query(default=None, description="Search by symbol or name"),
    sector: str | None = Query(default=None),
    category: str | None = Query(default=None),
    limit: int = Query(default=50, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """FR-07 — Return stocks enriched with live quotes from Groww API."""
    stmt = select(Stock)
    if q:
        stmt = stmt.where(or_(Stock.symbol.ilike(f"%{q}%"), Stock.name.ilike(f"%{q}%")))
    if sector:
        stmt = stmt.where(Stock.sector == sector)
    result = await db.execute(stmt.order_by(Stock.symbol).limit(limit))
    stocks = result.scalars().all()

    # Fallback to universe if DB has no stocks seeded yet
    if not stocks:
        universe = provider.get_universe()[:limit]
        symbols = [s.symbol for s in universe]
        quotes_map = provider.get_quotes_bulk(symbols)
        out = []
        for s in universe:
            price, change = quotes_map.get(s.symbol, (s.base_price, 0.0))
            out.append(
                StockOut(
                    id=s.symbol.lower(),
                    symbol=s.symbol,
                    name=s.name,
                    exchange=s.exchange,
                    sector=s.sector,
                    last_price=price,
                    day_change_pct=change,
                )
            )
        return out

    symbols = [s.symbol for s in stocks]
    quotes_map = provider.get_quotes_bulk(symbols)
    out = []
    for s in stocks:
        price, change = quotes_map.get(s.symbol, (s.last_price, 0.0))
        out.append(
            StockOut(
                id=s.id,
                symbol=s.symbol,
                name=s.name,
                exchange=s.exchange,
                sector=s.sector,
                last_price=price,
                day_change_pct=change,
            )
        )
    return out


@router.get("/indices")
async def get_indices():
    """Live major Indian indices (NIFTY 50, SENSEX, BANK NIFTY, etc.) from Groww."""
    if hasattr(provider, "get_market_indices"):
        return provider.get_market_indices()
    return []


@router.get("/quote/{symbol}")
async def get_live_quote(symbol: str):
    """Fetch live quote for a specific stock symbol directly from Groww."""
    if hasattr(provider, "get_live_quote"):
        return provider.get_live_quote(symbol.upper())
    price, change = provider.get_quote(symbol.upper())
    return {
        "symbol": symbol.upper(),
        "lastPrice": price,
        "changePercent": change,
    }


@router.get("/quotes")
async def get_batch_quotes(symbols: list[str] = Query(default=[])):
    """Fetch live batch quotes for multiple stock symbols from Groww."""
    result = {}
    for sym in symbols:
        if hasattr(provider, "get_live_quote"):
            result[sym.upper()] = provider.get_live_quote(sym.upper())
        else:
            p, c = provider.get_quote(sym.upper())
            result[sym.upper()] = {"symbol": sym.upper(), "lastPrice": p, "changePercent": c}
    return result


@router.get("/search")
async def search_market(query: str = Query(default="")):
    """Live search stock instruments via Groww search API."""
    if hasattr(provider, "search_stocks"):
        return provider.search_stocks(query)
    return []


@router.get("/stocks/{stock_id}", response_model=StockDetailOut)
async def get_stock_detail(stock_id: str, db: AsyncSession = Depends(get_db)):
    """FR-14 — Stock Detail Overview tab: metrics + why-is-it-moving + ArthSetu View."""
    # Look up by ID or by symbol
    result = await db.execute(select(Stock).where((Stock.id == stock_id) | (Stock.symbol == stock_id.upper())))
    stock = result.scalar_one_or_none()

    if not stock:
        # Check universe
        matched = next((s for s in provider.get_universe() if s.symbol.upper() == stock_id.upper()), None)
        if matched:
            price, change = provider.get_quote(matched.symbol, matched.base_price)
            research = get_stock_research(matched.symbol, change)
            return StockDetailOut(
                stock=StockOut(
                    id=matched.symbol.lower(),
                    symbol=matched.symbol,
                    name=matched.name,
                    exchange=matched.exchange,
                    sector=matched.sector,
                    last_price=price,
                    day_change_pct=change,
                ),
                why_moving=research["why_moving"],
                arthsetu_view=research["arthsetu_view"],
                updated_at=datetime.now(timezone.utc),
            )
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Stock not found.")

    price, change = provider.get_quote(stock.symbol, stock.last_price)
    research = get_stock_research(stock.symbol, change)

    return StockDetailOut(
        stock=StockOut(
            id=stock.id,
            symbol=stock.symbol,
            name=stock.name,
            exchange=stock.exchange,
            sector=stock.sector,
            last_price=price,
            day_change_pct=change,
        ),
        why_moving=research["why_moving"],
        arthsetu_view=research["arthsetu_view"],
        updated_at=datetime.now(timezone.utc),
    )


@router.get("/stocks/{stock_id}/candles", response_model=list[CandleOut])
async def get_stock_candles(
    stock_id: str,
    count: int = Query(default=90, ge=10, le=500),
    db: AsyncSession = Depends(get_db),
):
    """FR-14 — Real live/historical candles fetched directly from Groww."""
    result = await db.execute(select(Stock).where((Stock.id == stock_id) | (Stock.symbol == stock_id.upper())))
    stock = result.scalar_one_or_none()

    symbol = stock.symbol if stock else stock_id.upper()
    base_price = stock.last_price if stock else 100.0

    candles = provider.get_candles(symbol, base_price, count=count)
    return [CandleOut(**c) for c in candles]
