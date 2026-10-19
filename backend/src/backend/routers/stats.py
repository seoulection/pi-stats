from fastapi import APIRouter
from backend.schemas import Stats
from backend import system

router = APIRouter(prefix="/api")

@router.get("/stats", response_model=Stats)
def stats():
    return system.stats()
