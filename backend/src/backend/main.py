from fastapi import FastAPI
from backend.routers import stats

app = FastAPI()
app.include_router(stats.router)
