"""
Research / AI intelligence stub (BRD section 14).

This intentionally does NOT call a real LLM or proprietary research model —
the BRD's Conviction Score / ArthSetu View methodology is listed as an open
product decision (section 20) that needs to be finalized with the research
team first. This module defines the exact output *shape* the rest of the
app depends on, computed today from simple deterministic heuristics on the
mock quote, so the API contract is stable while the real methodology and a
model/provider (e.g. an LLM call, or a proprietary scoring model) are
plugged in behind get_stock_research() without changing any callers.

Trust & compliance note (BRD section 15): copy here must stay in the
"research candidate / worth researching" register — never "guaranteed" or
"sure-shot" language.
"""
from __future__ import annotations

import random


def get_stock_research(symbol: str, day_change_pct: float) -> dict:
    rng = random.Random(symbol)

    arthsetu_view = {
        "business_quality": rng.randint(55, 95),
        "growth": rng.randint(45, 95),
        "valuation": rng.randint(30, 90),
        "momentum": max(0, min(100, 50 + int(day_change_pct * 8))),
        "financial_health": rng.randint(50, 95),
        "risk": rng.randint(20, 70),
    }

    if day_change_pct > 1.0:
        why_moving = (
            f"{symbol} is trading higher today, broadly in line with positive "
            "sector sentiment and recent research coverage. This reflects "
            "short-term price action, not a forward-looking prediction."
        )
    elif day_change_pct < -1.0:
        why_moving = (
            f"{symbol} is trading lower today, consistent with broader market "
            "or sector softness seen in recent sessions. This is a description "
            "of recent price movement, not investment advice."
        )
    else:
        why_moving = (
            f"{symbol} is trading broadly flat today with no major research "
            "developments noted in this session."
        )

    return {"why_moving": why_moving, "arthsetu_view": arthsetu_view}
