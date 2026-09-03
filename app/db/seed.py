"""Seed the Stock table from the market data provider's coverage universe.
Run once after init_models(): `python -m app.db.seed`."""
import asyncio

from sqlalchemy import select

from app.db.session import AsyncSessionLocal, init_models
from app.models.market import Stock
from app.services.market_data import get_market_data_provider


async def seed_stocks() -> None:
    provider = get_market_data_provider()
    async with AsyncSessionLocal() as db:
        existing = (await db.execute(select(Stock.symbol))).scalars().all()
        existing_symbols = set(existing)

        for s in provider.get_universe():
            if s.symbol in existing_symbols:
                continue
            db.add(
                Stock(
                    symbol=s.symbol,
                    name=s.name,
                    exchange=s.exchange,
                    sector=s.sector,
                    last_price=s.base_price,
                    day_change_pct=0.0,
                )
            )
        await db.commit()


async def main() -> None:
    await init_models()
    await seed_stocks()
    print("Seed complete.")


if __name__ == "__main__":
    asyncio.run(main())
