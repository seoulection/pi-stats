from pydantic import BaseModel

class Stats(BaseModel):
    boot_time: str
    cpu_percent: list[float]
    temperature: float | None
    uptime_seconds: float
