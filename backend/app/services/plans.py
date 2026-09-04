"""
Subscription plan catalog (BRD section 7).

The BRD explicitly says exact feature entitlements should be "maintained
as configurable product policy" — so this is plain config, not hardcoded
into endpoints. Changing prices/features/adding a tier means editing this
dict, not touching business logic. In a real deployment this would likely
move to a DB table managed by an admin/CMS, with this module as the
in-memory fallback/default.
"""

PLAN_CATALOG: dict[str, dict] = {
    "free": {
        "name": "Free",
        "price_inr_per_month": 0,
        "description": "Core market and research experience.",
        "features": [
            "market_intelligence",
            "watchlist",
            "stock_research_overview",
            "investment_lab_basic",
        ],
    },
    "picks": {
        "name": "ArthSetu Picks",
        "price_inr_per_month": 499,
        "description": "Premium research/picks tier.",
        "features": [
            "market_intelligence",
            "watchlist",
            "stock_research_overview",
            "investment_lab_basic",
            "pro_research_picks",
            "conviction_scores",
        ],
    },
    "collections": {
        "name": "ArthSetu Collections",
        "price_inr_per_month": 999,
        "description": "Premium curated collections tier.",
        "features": [
            "market_intelligence",
            "watchlist",
            "stock_research_overview",
            "investment_lab_basic",
            "pro_research_picks",
            "conviction_scores",
            "pro_collections",
            "sector_intelligence",
        ],
    },
    "pro_gold": {
        "name": "ArthSetu Pro Gold",
        "price_inr_per_month": 1999,
        "description": "Highest premium intelligence tier.",
        "features": [
            "market_intelligence",
            "watchlist",
            "stock_research_overview",
            "investment_lab_basic",
            "pro_research_picks",
            "conviction_scores",
            "pro_collections",
            "sector_intelligence",
            "advanced_charts_full",
            "bull_base_bear_scenarios",
            "priority_ai_copilot",
        ],
    },
}
