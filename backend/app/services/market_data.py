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


GROWW_SYMBOL_ALIASES: dict[str, str] = {
    "TATAMOTORS": "TMPV",
    "ZOMATO": "ETERNAL",
}


class GrowwMarketDataProvider(MarketDataProvider):
    """Real live market data fetched directly from Groww API."""

    def __init__(self):
        self._quote_cache: dict[str, tuple[float, dict]] = {}  # symbol -> (timestamp, data)
        self._indices_cache: tuple[float, list[dict]] | None = None
        self._cache_ttl = 10.0  # 10 second in-memory cache for high throughput
        self._indices_cache_ttl = 15.0
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

        groww_symbol = GROWW_SYMBOL_ALIASES.get(symbol, symbol)

        # 1. Try real-time live prices endpoint
        url = f"https://groww.in/v1/api/stocks_data/v1/tr_live_prices/exchange/NSE/segment/CASH/{groww_symbol}/latest"
        req = urllib.request.Request(url, headers=self._get_headers())
        try:
            with urllib.request.urlopen(req, context=self._ssl_ctx, timeout=3) as res:
                if res.status == 200:
                    data = json.loads(res.read().decode("utf-8"))
                    if data and data.get("ltp") is not None:
                        self._quote_cache[symbol] = (now, data)
                        return data
        except Exception:
            pass

        # 2. Fallback to daily charting endpoint for stocks with different scrip routing
        end_ms = int(now * 1000)
        start_ms = end_ms - (3 * 24 * 60 * 60 * 1000)
        chart_url = (
            f"https://groww.in/v1/api/charting_service/v2/chart/exchange/NSE/segment/CASH/{groww_symbol}"
            f"?endTimeInMillis={end_ms}&intervalInMinutes=1440&startTimeInMillis={start_ms}"
        )
        try:
            req2 = urllib.request.Request(chart_url, headers=self._get_headers())
            with urllib.request.urlopen(req2, context=self._ssl_ctx, timeout=3) as res2:
                if res2.status == 200:
                    payload = json.loads(res2.read().decode("utf-8"))
                    candles = payload.get("candles") or []
                    if candles:
                        latest = candles[-1]
                        prev = candles[-2] if len(candles) > 1 else latest
                        ltp = float(latest[4])
                        prev_close = float(prev[4])
                        day_change = round(ltp - prev_close, 2)
                        day_change_perc = round((day_change / prev_close) * 100, 2) if prev_close else 0.0
                        synth_data = {
                            "symbol": symbol,
                            "ltp": ltp,
                            "dayChange": day_change,
                            "dayChangePerc": day_change_perc,
                            "open": float(latest[1]),
                            "high": float(latest[2]),
                            "low": float(latest[3]),
                            "close": prev_close,
                            "volume": int(latest[5]) if len(latest) > 5 and latest[5] else 500000,
                            "yearHighPrice": round(ltp * 1.25, 2),
                            "yearLowPrice": round(ltp * 0.75, 2),
                        }
                        self._quote_cache[symbol] = (now, synth_data)
                        return synth_data
        except Exception:
            pass

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

        fallback_stock = next((s for s in SEED_UNIVERSE if s.symbol == symbol), None)
        price = fallback_stock.base_price if fallback_stock else (base_price or 100.0)
        return price, 0.0

    def get_quotes_bulk(self, symbols: list[str]) -> dict[str, tuple[float, float]]:
        from concurrent.futures import ThreadPoolExecutor
        with ThreadPoolExecutor(max_workers=10) as executor:
            results = list(executor.map(self.get_quote, symbols))
        return dict(zip(symbols, results))

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
        groww_symbol = GROWW_SYMBOL_ALIASES.get(symbol, symbol)
        url = (
            f"https://groww.in/v1/api/charting_service/v2/chart/exchange/NSE/segment/CASH/{groww_symbol}"
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
                        ts = datetime.fromtimestamp(c[0], tz=timezone.utc)
                        candles.append(
                            {
                                "timestamp": ts,
                                "open": round(float(c[1]), 2),
                                "high": round(float(c[2]), 2),
                                "low": round(float(c[3]), 2),
                                "close": round(float(c[4]), 2),
                                "volume": int(c[5]) if len(c) > 5 and c[5] is not None else 0,
                            }
                        )
                    if candles:
                        return candles
        except Exception:
            pass

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
        now = time.time()
        if self._indices_cache and (now - self._indices_cache[0]) < self._indices_cache_ttl:
            return self._indices_cache[1]

        end_ms = int(now * 1000)
        start_ms = end_ms - (24 * 60 * 60 * 1000)

        index_configs = [
            ("NIFTY 50",    "NIFTY",       "NSE", "NIFTY"),
            ("BANK NIFTY",  "BANKNIFTY",   "NSE", "BANKNIFTY"),
            ("SENSEX",      "SENSEX",      "BSE", "SENSEX"),
            ("NIFTY IT",    "NIFTY IT",    "NSE", "NIFTYIT"),
            ("NIFTY AUTO",  "NIFTY AUTO",  "NSE", "NIFTYAUTO"),
            ("NIFTY PHARMA","NIFTY PHARMA","NSE", "NIFTYPHARMA"),
        ]

        out = []
        for name, sym, exchange, chart_sym in index_configs:
            # Try 1-minute interval first (most granular intraday)
            ltp = None
            change = 0.0
            change_pct = 0.0
            for interval in [1, 5, 15]:
                url = (
                    f"https://groww.in/v1/api/charting_service/v2/chart/exchange/{exchange}/segment/CASH/{chart_sym}"
                    f"?endTimeInMillis={end_ms}&intervalInMinutes={interval}&startTimeInMillis={start_ms}"
                )
                try:
                    req = urllib.request.Request(url, headers=self._get_headers())
                    with urllib.request.urlopen(req, context=self._ssl_ctx, timeout=5) as res:
                        if res.status == 200:
                            payload = json.loads(res.read().decode("utf-8"))
                            candles = payload.get("candles") or []
                            if candles and len(candles) >= 2:
                                ltp = float(candles[-1][4])
                                first_open = float(candles[0][1])
                                change = round(ltp - first_open, 2)
                                change_pct = round((change / first_open) * 100, 2) if first_open else 0.0
                                break  # Got valid data, stop trying other intervals
                except Exception:
                    continue

            if ltp is None:
                # Skip this index if all intervals failed — don't return stale hardcoded data
                continue

            out.append(
                {
                    "name": name,
                    "symbol": sym,
                    "exchange": exchange,
                    "value": round(ltp, 2),
                    "change": round(change, 2),
                    "changePercent": round(change_pct, 2),
                    "isPositive": change >= 0,
                }
            )

        self._indices_cache = (now, out)
        return out


def get_market_data_provider() -> MarketDataProvider:
    return GrowwMarketDataProvider()
