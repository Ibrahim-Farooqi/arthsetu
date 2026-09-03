"""Import every model module so Base.metadata is fully populated before
init_models() / Alembic autogenerate runs."""
from app.models.user import User, PersonalizationProfile, Subscription  # noqa: F401
from app.models.market import Stock, Watchlist, WatchlistItem  # noqa: F401
from app.models.lab import (  # noqa: F401
    LabAccount,
    LabHolding,
    LabTransaction,
    DecisionJournalEntry,
)
