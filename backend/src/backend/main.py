from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from backend.routers import stats

app = FastAPI()
app.include_router(stats.router)

dist = Path(__file__).resolve().parents[3] / "frontend" / "dist"
if dist.exists():
    app.mount("/", StaticFiles(directory=dist, html=True), name="frontend")
