"""
Central application settings.

All environment-dependent values are read here (12-factor style) so the
rest of the codebase never touches os.environ directly. Copy .env.example
to .env and adjust for local/staging/prod.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # --- General ---
    APP_NAME: str = "ArthSetu API"
    ENV: str = "development"
    API_V1_PREFIX: str = "/api/v1"

    # --- Database ---
    # Default: local SQLite (async) so the project runs with zero external
    # services. For production, point this at your Supabase Postgres
    # instance using the async driver, e.g.:
    #   postgresql+asyncpg://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres
    # Use the Supabase *connection pooler* (port 6543 / pgbouncer, "Transaction"
    # mode) rather than the direct DB port (5432) when deploying to a
    # serverless target like Vercel, since serverless functions open a new
    # connection per invocation and Postgres has a low max-connections limit.
    DATABASE_URL: str = "sqlite+aiosqlite:///./arthsetu.db"

    # --- Auth / JWT ---
    # Local JWT signing is kept as a fallback for running the API fully
    # standalone (no Supabase) during development.
    SECRET_KEY: str = "CHANGE_ME_IN_PRODUCTION_use_a_long_random_value"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24h

    # --- Supabase ---
    # When SUPABASE_JWT_SECRET is set, the API trusts and verifies access
    # tokens issued by Supabase Auth (Project Settings -> API -> JWT Secret)
    # instead of minting its own JWTs. The frontend authenticates directly
    # against Supabase (email/password or OTP) and sends the resulting
    # access token as a Bearer token; see app/api/deps.py.
    SUPABASE_URL: str = ""
    SUPABASE_JWT_SECRET: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""  # server-side only, never expose to the frontend

    @property
    def SUPABASE_AUTH_ENABLED(self) -> bool:
        return bool(self.SUPABASE_URL or self.SUPABASE_JWT_SECRET)

    # --- CORS ---
    # Include your Vercel deployment URL(s) here (production + preview),
    # e.g. "https://arthsetu.vercel.app" and "https://arthsetu-*.vercel.app".
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:5173"]

    # --- Investment Lab business rules (BRD section 11) ---
    LAB_MIN_VIRTUAL_CAPITAL: int = 5_000
    LAB_MAX_VIRTUAL_CAPITAL: int = 1_000_000
    LAB_PRESET_CAPITALS: list[int] = [5_000, 25_000, 100_000, 500_000, 1_000_000]

    # --- Market data provider ---
    # "groww" for real live data from Groww API. Fallback to "mock" if needed.
    MARKET_DATA_PROVIDER: str = "groww"
    GROW_API_KEY: str = ""
    GROW_SECRET_KEY: str = ""


settings = Settings()
