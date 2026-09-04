from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload

from app.db.session import get_db
from app.models.market import ResearchCall, Stock

router = APIRouter(prefix="/research", tags=["Research"])

@router.get("/feed")
async def get_research_feed(db: AsyncSession = Depends(get_db)):
    """Fetch all active research calls enriched with stock data."""
    stmt = select(ResearchCall).options(joinedload(ResearchCall.stock)).where(ResearchCall.status == "ACTIVE")
    result = await db.execute(stmt)
    calls = result.scalars().all()
    
    out = []
    for call in calls:
        out.append({
            "id": call.id,
            "symbol": call.stock.symbol,
            "company_name": call.stock.name,
            "sector": call.stock.sector,
            "exchange": call.stock.exchange,
            "recommendation": call.recommendation,
            "entry_price_min": call.entry_price_min,
            "entry_price_max": call.entry_price_max,
            "target_price": call.target_price,
            "stop_loss": call.stop_loss,
            "risk_level": call.risk_level,
            "confidence_score": call.confidence_score,
            "horizon": call.horizon,
            "analysis_summary": call.analysis_summary,
            "status": call.status,
            "published_at": call.published_at.isoformat(),
            "analyst_name": call.analyst_name,
            "analyst_accuracy": call.analyst_accuracy,
            "technicals": {
                "rsi": call.technical_rsi,
                "macd": call.technical_macd,
                "trend": call.technical_trend
            }
        })
    return out
