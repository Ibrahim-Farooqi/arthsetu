import asyncio
import json
from datetime import datetime, timezone

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db.session import AsyncSessionLocal
from app.models.market import SectorPerformance, MarketOutlook, ResearchCall, Stock

async def seed_market_data():
    async with AsyncSessionLocal() as session:
        # Seed Sectors
        sectors_data = [
            {"name": "IT", "change_percent": 1.2, "top_gainer": "TCS", "gainer_change": 2.5, "top_loser": "WIPRO", "loser_change": -1.2, "market_cap": "Large", "volume": "10M", "momentum_score": 80, "trend": "Bullish", "rsi": 65, "capital_flow": "Inflow"},
            {"name": "BANK", "change_percent": -0.5, "top_gainer": "HDFCBANK", "gainer_change": 1.1, "top_loser": "SBIN", "loser_change": -2.1, "market_cap": "Large", "volume": "25M", "momentum_score": 40, "trend": "Bearish", "rsi": 45, "capital_flow": "Outflow"},
            {"name": "AUTO", "change_percent": 0.8, "top_gainer": "TATAMOTORS", "gainer_change": 1.5, "top_loser": "MARUTI", "loser_change": -0.5, "market_cap": "Large", "volume": "8M", "momentum_score": 60, "trend": "Bullish", "rsi": 55, "capital_flow": "Inflow"},
        ]
        for s in sectors_data:
            exists = await session.execute(select(SectorPerformance).where(SectorPerformance.name == s["name"]))
            if not exists.scalar_one_or_none():
                session.add(SectorPerformance(**s))

        # Seed Market Outlook
        today_date = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        exists_outlook = await session.execute(select(MarketOutlook).where(MarketOutlook.date == today_date))
        if not exists_outlook.scalar_one_or_none():
            outlook = MarketOutlook(
                date=today_date,
                nifty_trend="Bullish",
                nifty_support=23500.0,
                nifty_resistance=24100.0,
                bank_nifty_trend="Neutral",
                bank_nifty_support=49000.0,
                bank_nifty_resistance=50500.0,
                vix_value=14.5,
                vix_change=-2.1,
                fii_flow="Net Buy ₹1,250 Cr",
                dii_flow="Net Sell ₹320 Cr",
                pcr_ratio=1.15,
                market_sentiment="Bullish",
                key_events_json=json.dumps([
                    {"title": "RBI Monetary Policy", "date": "Tomorrow", "impact": "High"},
                    {"title": "US CPI Data", "date": "Thursday", "impact": "High"}
                ])
            )
            session.add(outlook)

        # Seed Research Calls (if stocks exist)
        stocks_result = await session.execute(select(Stock).limit(3))
        stocks = stocks_result.scalars().all()
        if stocks:
            exists_research = await session.execute(select(ResearchCall))
            if not exists_research.scalars().first():
                for i, stock in enumerate(stocks):
                    rc = ResearchCall(
                        stock_id=stock.id,
                        recommendation="BUY" if i % 2 == 0 else "HOLD",
                        entry_price_min=stock.last_price * 0.98,
                        entry_price_max=stock.last_price * 1.02,
                        target_price=stock.last_price * 1.15,
                        stop_loss=stock.last_price * 0.9,
                        risk_level="Medium",
                        confidence_score=85,
                        horizon="Short Term",
                        analysis_summary="Strong technical breakout supported by volume.",
                        status="ACTIVE",
                        analyst_name="Univest Research",
                        analyst_accuracy="85% Win Rate",
                        technical_rsi=60.0 + i,
                        technical_macd="Bullish",
                        technical_trend="Up"
                    )
                    session.add(rc)

        await session.commit()
        print("Market data seeded successfully.")

if __name__ == "__main__":
    asyncio.run(seed_market_data())
