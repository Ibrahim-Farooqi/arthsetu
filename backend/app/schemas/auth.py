from pydantic import BaseModel, EmailStr, Field, field_validator


class CreateAccountRequest(BaseModel):
    """FR-01/FR-02 — lightweight signup, no KYC fields."""

    full_name: str = Field(min_length=2, max_length=120)
    mobile_number: str = Field(min_length=10, max_length=15)
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
    confirm_password: str

    @field_validator("confirm_password")
    @classmethod
    def passwords_match(cls, v: str, info):
        if "password" in info.data and v != info.data["password"]:
            raise ValueError("Passwords do not match")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserOut(BaseModel):
    id: str
    full_name: str
    email: EmailStr
    mobile_number: str
    role: str = "INVESTOR"
    is_active: bool = True

    class Config:
        from_attributes = True


class UpdateProfileRequest(BaseModel):
    full_name: str | None = Field(default=None, min_length=2, max_length=120)
    mobile_number: str | None = Field(default=None, min_length=10, max_length=15)
