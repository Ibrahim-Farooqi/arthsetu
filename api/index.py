"""
Vercel serverless entrypoint.

Vercel's Python runtime auto-detects an ASGI `app` object in files under
/api and wraps it, so this file just needs to import and re-export the
existing FastAPI app — no code duplication with app/main.py.

Note: FastAPI's `lifespan` startup/shutdown events are NOT reliably run by
Vercel's Python runtime between invocations, and this app's lifespan is
already a no-op outside ENV=development (see app/main.py), so this is safe.
For anything that truly must run once (migrations, seeding), use a separate
deploy step (`alembic upgrade head`) rather than app startup — see README.md.

If you'd rather run this API on a platform built for long-lived ASGI
servers (Render, Railway, Fly.io, a VM, etc.) instead of Vercel's
serverless functions, that also works unmodified — just point the
frontend's VITE_API_URL at that deployment and you can ignore this file
and the root vercel.json.
"""

from app.main import app  # noqa: F401
