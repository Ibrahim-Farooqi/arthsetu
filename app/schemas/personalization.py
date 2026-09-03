from enum import Enum

from pydantic import BaseModel, Field


class Familiarity(str, Enum):
    new = "new"
    learning = "learning"
    experienced = "experienced"
    advanced = "advanced"


class ResearchApproach(str, Enum):
    independent = "independent"
    guided = "guided"
    mix = "mix"
    figuring_out = "figuring_out"


class InvestmentHorizon(str, Enum):
    short_term = "short_term"
    medium_term = "medium_term"
    long_term = "long_term"
    very_long_term = "very_long_term"


class PersonalizationRequest(BaseModel):
    """BRD 6.2 — five-question wizard, submitted together so the summary
    screen (post Q5) can be generated and edited before plan selection."""

    familiarity: Familiarity
    topics: list[str] = Field(min_length=1)
    primary_goals: list[str] = Field(min_length=1)
    research_approach: ResearchApproach
    investment_horizon: InvestmentHorizon


class PersonalizationOut(BaseModel):
    familiarity: str
    topics: list[str]
    primary_goals: list[str]
    research_approach: str
    investment_horizon: str

    class Config:
        from_attributes = True
