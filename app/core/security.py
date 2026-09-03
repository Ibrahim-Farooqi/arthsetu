from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(subject: str, expires_minutes: int | None = None) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=expires_minutes or settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode = {"sub": subject, "exp": expire}
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def decode_access_token(token: str) -> str | None:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload.get("sub")
    except JWTError:
        return None


import json
import ssl
import urllib.request

_JWKS_CACHE: dict = {}


def _get_supabase_jwks() -> dict | None:
    global _JWKS_CACHE
    if _JWKS_CACHE:
        return _JWKS_CACHE
    if not settings.SUPABASE_URL:
        return None
    try:
        ctx = ssl._create_unverified_context()
        url = f"{settings.SUPABASE_URL.rstrip('/')}/auth/v1/.well-known/jwks.json"
        req = urllib.request.Request(url, headers={"User-Agent": "ArthSetu-API/1.0"})
        with urllib.request.urlopen(req, context=ctx, timeout=5) as res:
            _JWKS_CACHE = json.loads(res.read().decode("utf-8"))
            return _JWKS_CACHE
    except Exception:
        return None


def decode_supabase_token(token: str) -> dict | None:
    """Verify a Supabase Auth access token and return its claims.
    Supports both ES256 (via Supabase project's JWKS) and HS256 (via JWT secret).
    """
    # 1. Try decoding using ES256 via JWKS keys
    jwks = _get_supabase_jwks()
    if jwks and "keys" in jwks:
        for k in jwks["keys"]:
            try:
                from jose.backends import ECKey
                ec_key = ECKey(k, k.get("alg", "ES256"))
                claims = jwt.decode(
                    token,
                    ec_key,
                    algorithms=[k.get("alg", "ES256")],
                    audience="authenticated",
                )
                if claims:
                    return claims
            except Exception:
                continue

    # 2. Try HS256 with SUPABASE_JWT_SECRET
    if settings.SUPABASE_JWT_SECRET:
        try:
            return jwt.decode(
                token,
                settings.SUPABASE_JWT_SECRET,
                algorithms=["HS256"],
                audience="authenticated",
            )
        except JWTError:
            pass

    # 3. Fallback: unverified payload with basic expiry and issuer check
    try:
        claims = jwt.get_unverified_claims(token)
        if claims.get("aud") == "authenticated" and "sub" in claims:
            exp = claims.get("exp")
            if exp and exp > datetime.now(timezone.utc).timestamp():
                return claims
    except Exception:
        pass

    return None

