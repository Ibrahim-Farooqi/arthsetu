"""
Market data provider implementation.
Integrates live market quotes and candlestick data directly from Groww API.
"""
from __future__ import annotations

import json
import ssl
import time
import urllib.request
from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime, timezone

from app.core.config import settings


@dataclass
class SeedStock:
    symbol: str
    name: str
    sector: str
    base_price: float
    exchange: str = "NSE"


SEED_UNIVERSE: list[SeedStock] = [
    SeedStock("RELIANCE", "Reliance Industries Ltd", "Energy & Conglomerate", 1313.00),
    SeedStock("TCS", "Tata Consultancy Services Ltd", "Information Technology", 2348.00),
    SeedStock("HDFCBANK", "HDFC Bank Ltd", "Banking & Finance", 700.00),
    SeedStock("INFY", "Infosys Ltd", "Information Technology", 1140.00),
    SeedStock("ICICIBANK", "ICICI Bank Ltd", "Banking & Finance", 1426.00),
    SeedStock("BHARTIARTL", "Bharti Airtel Ltd", "Telecommunications", 1580.00),
    SeedStock("ITC", "ITC Ltd", "FMCG", 465.00),
    SeedStock("LT", "Larsen & Toubro Ltd", "Infrastructure & Capital Goods", 3981.00),
    SeedStock("SBIN", "State Bank of India", "Banking & Finance", 1020.00),
    SeedStock("ASIANPAINT", "Asian Paints Ltd", "Consumer Goods", 2895.00),
    SeedStock("MARUTI", "Maruti Suzuki India Ltd", "Automobile", 12849.00),
    SeedStock("SUNPHARMA", "Sun Pharmaceutical Industries Ltd", "Pharma & Healthcare", 1780.00),
    SeedStock("TATAMOTORS", "Tata Motors Ltd", "Automobile", 985.00),
    SeedStock("ADANIENT", "Adani Enterprises Ltd", "Conglomerate", 3150.00),
    SeedStock("ZOMATO", "Zomato Ltd (Eternal)", "Consumer Internet", 215.00),
    SeedStock("IRFC", "Indian Railway Finance Corp", "Financial Services", 168.00),
    SeedStock("TATAPOWER", "Tata Power Company Ltd", "Power & Energy", 425.00),
    SeedStock("DMART", "Avenue Supermarts Ltd (DMart)", "Retail", 4210.00),
    SeedStock("PAYTM", "One97 Communications Ltd (Paytm)", "Fintech", 810.00),
    SeedStock("TITAN", "Titan Company Ltd", "Consumer Goods", 3480.00),
    SeedStock("BAJFINANCE", "Bajaj Finance Ltd", "Financial Services", 6912.00),
    SeedStock("AXISBANK", "Axis Bank Ltd", "Banking & Finance", 1166.00),
    SeedStock("WIPRO", "Wipro Ltd", "Information Technology", 480.00),
    SeedStock("HCLTECH", "HCL Technologies Ltd", "Information Technology", 1720.00),
    SeedStock("TATASTEEL", "Tata Steel Ltd", "Metals & Mining", 148.00),
]


class MarketDataProvider(ABC):
    @abstractmethod
    def get_universe(self) -> list[SeedStock]:
        """Full coverage universe used to seed/refresh the Stock table."""

    @abstractmethod
    def get_quote(self, symbol: str, base_price: float = 0.0) -> tuple[float, float]:
        """Return (last_price, day_change_pct) for a symbol."""

    @abstractmethod
    def get_live_quote(self, symbol: str) -> dict:
        """Return full live quote dictionary."""

    @abstractmethod
    def get_candles(self, symbol: str, base_price: float = 0.0, count: int = 60) -> list[dict]:
        """Return OHLCV candles, most recent last."""


class GrowwMarketDataProvider(MarketDataProvider):
    """Real live market data fetched directly from Groww API."""

    def __init__(self):
        self._quote_cache: dict[str, tuple[float, dict]] = {}  # symbol -> (timestamp, data)
        self._cache_ttl = 10.0  # 10 second in-memory cache for high throughput
        self._ssl_ctx = ssl._create_unverified_context()

    def _get_headers(self) -> dict[str, str]:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/json",
        }
        if settings.GROW_API_KEY:
            headers["Authorization"] = f"Bearer {settings.GROW_API_KEY}"
        return headers

    def get_universe(self) -> list[SeedStock]:
        return SEED_UNIVERSE

    def _fetch_groww_quote(self, symbol: str) -> dict | None:
        now = time.time()
        cached = self._quote_cache.get(symbol)
        if cached and (now - cached[0]) < self._cache_ttl:
            return cached[1]

        url = f"https://groww.in/v1/api/stocks_data/v1/tr_live_prices/exchange/NSE/segment/CASH/{symbol}/latest"
        req = urllib.request.Request(url, headers=self._get_headers())
        try:
            with urllib.request.urlopen(req, context=self._ssl_ctx, timeout=4) as res:
                if res.status == 200:
                    data = json.loads(res.read().decode("utf-8"))
                    self._quote_cache[symbol] = (now, data)
                    return data
        except Exception:
            # Check if we have an older cached value
            if cached:
                return cached[1]
        return None

    def get_quote(self, symbol: str, base_price: float = 0.0) -> tuple[float, float]:
        data = self._fetch_groww_quote(symbol)
        if data and data.get("ltp") is not None:
            ltp = float(data["ltp"])
            change_pct = float(data.get("dayChangePerc") or 0.0)
            return round(ltp, 2), round(change_pct, 2)

        # Fallback to seed base_price if offline
        fallback_stock = next((s for s in SEED_UNIVERSE if s.symbol == symbol), None)
        price = fallback_stock.base_price if fallback_stock else (base_price or 100.0)
        return price, 0.0

    def get_live_quote(self, symbol: str) -> dict:
        data = self._fetch_groww_quote(symbol)
        if data and data.get("ltp") is not None:
            ltp = float(data.get("ltp") or 0.0)
            day_change = float(data.get("dayChange") or 0.0)
            day_change_perc = float(data.get("dayChangePerc") or 0.0)
            return {
                "symbol": symbol,
                "companyName": symbol,
                "lastPrice": round(ltp, 2),
                "change": round(day_change, 2),
                "changePercent": round(day_change_perc, 2),
                "high": float(data.get("high") or ltp),
                "low": float(data.get("low") or ltp),
                "open": float(data.get("open") or ltp),
                "previousClose": float(data.get("close") or (ltp - day_change)),
                "volume": int(data.get("volume") or 0),
                "fiftyTwoWeekHigh": float(data.get("yearHighPrice") or ltp * 1.2),
                "fiftyTwoWeekLow": float(data.get("yearLowPrice") or ltp * 0.8),
            }

        # Fallback dictionary
        price, change = self.get_quote(symbol)
        return {
            "symbol": symbol,
            "companyName": symbol,
            "lastPrice": price,
            "change": round(price * change / 100, 2),
            "changePercent": change,
            "high": price,
            "low": price,
            "open": price,
            "previousClose": price,
            "volume": 100000,
            "fiftyTwoWeekHigh": round(price * 1.2, 2),
            "fiftyTwoWeekLow": round(price * 0.8, 2),
        }

    def get_candles(self, symbol: str, base_price: float = 0.0, count: int = 60) -> list[dict]:
        end_ms = int(time.time() * 1000)
        start_ms = end_ms - (count * 24 * 60 * 60 * 1000)
        url = (
            f"https://groww.in/v1/api/charting_service/v2/chart/exchange/NSE/segment/CASH/{symbol}"
            f"?endTimeInMillis={end_ms}&intervalInMinutes=1440&startTimeInMillis={start_ms}"
        )
        req = urllib.request.Request(url, headers=self._get_headers())
        try:
            with urllib.request.urlopen(req, context=self._ssl_ctx, timeout=5) as res:
                if res.status == 200:
                    payload = json.loads(res.read().decode("utf-8"))
                    raw_candles = payload.get("candles") or []
                    candles = []
                    for c in raw_candles[-count:]:
                        # Format: [timestamp_seconds, open, high, low, close, volume]
                        ts = datetime.fromtimestamp(c[0], tz=timezone.utc)
                        candles.append(
                            {
                                "timestamp": ts,
                                "open": round(float(c[1]), 2),
                                "high": round(float(c[2]), 2),
                                "low": round(float(c[3]), 2),
                                "close": round(float(c[4]), 2),
                                "volume": int(c[5]) if len(c) > 5 else 0,
                            }
                        )
                    if candles:
                        return candles
        except Exception:
            pass

        # Fallback candle generation if external API fails
        price, _ = self.get_quote(symbol, base_price)
        now = datetime.now(timezone.utc)
        fallback = []
        cur_p = price
        for i in range(count):
            ts = datetime.fromtimestamp(now.timestamp() - (count - i) * 86400, tz=timezone.utc)
            fallback.append(
                {
                    "timestamp": ts,
                    "open": round(cur_p, 2),
                    "high": round(cur_p * 1.01, 2),
                    "low": round(cur_p * 0.99, 2),
                    "close": round(cur_p, 2),
                    "volume": 500000,
                }
            )
        return fallback

    def search_stocks(self, query: str) -> list[dict]:
        if not query or len(query.strip()) == 0:
            return []
        url = f"https://groww.in/v1/api/search/v1/entity?app=false&entity_type=stocks&q={urllib.parse.quote(query)}&page=0&size=10"
        req = urllib.request.Request(url, headers=self._get_headers())
        try:
            with urllib.request.urlopen(req, context=self._ssl_ctx, timeout=4) as res:
                if res.status == 200:
                    data = json.loads(res.read().decode("utf-8"))
                    results = []
                    for item in data.get("content", []):
                        sym = item.get("header") or item.get("search_id") or ""
                        results.append(
                            {
                                "symbol": sym.upper(),
                                "name": item.get("title") or sym,
                                "bse_code": item.get("bse_scrip_code"),
                            }
                        )
                    return results
        except Exception:
            pass
        return []

    def get_market_indices(self) -> list[dict]:
        indices = [
            {"symbol": "NIFTY", "name": "NIFTY 50", "exchange": "NSE", "base": 24820.0},
            {"symbol": "BANKNIFTY", "name": "BANK NIFTY", "exchange": "NSE", "base": 52140.0},
            {"symbol": "SENSEX", "name": "SENSEX", "exchange": "BSE", "base": 81380.0},
            {"symbol": "NIFTY IT", "name": "NIFTY IT", "exchange": "NSE", "base": 35200.0},
            {"symbol": "NIFTY AUTO", "name": "NIFTY AUTO", "exchange": "NSE", "base": 26410.0},
            {"symbol": "NIFTY PHARMA", "name": "NIFTY PHARMA", "exchange": "NSE", "base": 22980.0},
        ]
        out = []
        for idx in indices:
            data = self._fetch_groww_quote(idx["symbol"])
            if data and data.get("ltp") is not None:
                ltp = float(data["ltp"])
                change = float(data.get("dayChange") or 0.0)
                change_pct = float(data.get("dayChangePerc") or 0.0)
            else:
                ltp = idx["base"]
                change = 0.0
                change_pct = 0.0
            out.append(
                {
                    "name": idx["name"],
                    "symbol": idx["symbol"],
                    "exchange": idx["exchange"],
                    "value": round(ltp, 2),
                    "change": round(change, 2),
                    "changePercent": round(change_pct, 2),
                    "isPositive": change >= 0,
                }
            )
        return out


def get_market_data_provider() -> MarketDataProvider:
    return GrowwMarketDataProvider()
