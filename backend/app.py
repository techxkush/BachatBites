"""
BachatBites - FastAPI Backend Server
Serves REST APIs for restaurant deals, cross-platform calculations,
and Gemini-powered automated deal ingestion.
"""

import os
import sys
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Add current dir to python path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

import database
import ai_extractor
import crawler_service

app = FastAPI(
    title="BachatBites Dining Deals API",
    description="Cross-Platform Dining Deal Comparison Engine with Gemini AI Extractor",
    version="1.0.0"
)

# Enable CORS for all local environments
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Request Models ---
class DealCalculationRequest(BaseModel):
    restaurant_id: str
    bill_amount: int

class AIExtractTextRequest(BaseModel):
    raw_text: str

class AIExtractURLRequest(BaseModel):
    url: str

# --- API Endpoints ---
@app.get("/api/health")
def health_check():
    gemini_key = os.getenv("GEMINI_API_KEY")
    ai_status = "Gemini 2.5 Flash active" if gemini_key and gemini_key != "YOUR_GEMINI_API_KEY_HERE" else "Smart heuristic parser active (Add GEMINI_API_KEY to .env for LLM mode)"
    return {
        "status": "online",
        "app": "BachatBites API Engine",
        "version": "1.0.0",
        "ai_engine": ai_status
    }

@app.get("/api/restaurants")
def get_restaurants(
    city: Optional[str] = Query(None),
    locality: Optional[str] = Query(None),
    cuisine: Optional[str] = Query(None),
    occasion: Optional[str] = Query(None),
    max_budget: Optional[int] = Query(None),
    search: Optional[str] = Query(None),
    sort_by: Optional[str] = Query("recommended")
):
    """Fetches filtered and sorted list of dining spots with live platform offers."""
    return database.filter_restaurants(
        city=city,
        locality=locality,
        cuisine=cuisine,
        occasion=occasion,
        max_budget=max_budget,
        search=search,
        sort_by=sort_by
    )

@app.get("/api/restaurants/{restaurant_id}")
def get_restaurant_detail(restaurant_id: str):
    """Retrieves full profile for a single restaurant."""
    restaurant = database.get_restaurant_by_id(restaurant_id)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant

@app.post("/api/compare-deal")
def calculate_cross_platform_deals(req: DealCalculationRequest):
    """
    Calculates eligible discounts and final payable amount across
    Zomato, Swiggy Dineout, EazyDiner, and magicpin for a specific bill.
    """
    restaurant = database.get_restaurant_by_id(req.restaurant_id)
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    bill = max(0, req.bill_amount)
    platforms = restaurant.get("platforms", {})
    results = []

    for key, offer in platforms.items():
        min_bill = offer.get("minBill", 0)
        is_eligible = bill >= min_bill
        
        if not is_eligible:
            shortfall = min_bill - bill
            results.append({
                "platformKey": key,
                "platformName": offer.get("platformName"),
                "isEligible": False,
                "ineligibleReason": f"Min bill ₹{min_bill:,} required (Add ₹{shortfall:,} more)",
                "discountAmount": 0,
                "finalBill": bill,
                "savingsPercent": 0,
                "offer": offer
            })
            continue

        discount = 0
        d_type = offer.get("discountType", "percentage")
        if d_type == "percentage":
            raw = (bill * offer.get("discountPercent", 0)) / 100
            max_d = offer.get("maxDiscount", 0)
            discount = min(raw, max_d) if max_d > 0 else raw
        elif d_type == "flat":
            discount = min(offer.get("flatDiscount", 0), bill)

        discount = int(round(discount))
        final_bill = max(0, bill - discount)
        savings_pct = int(round((discount / bill) * 100)) if bill > 0 else 0

        results.append({
            "platformKey": key,
            "platformName": offer.get("platformName"),
            "isEligible": True,
            "ineligibleReason": None,
            "discountAmount": discount,
            "finalBill": final_bill,
            "savingsPercent": savings_pct,
            "offer": offer
        })

    # Sort to determine winner (lowest final bill among eligible)
    eligible_deals = [r for r in results if r["isEligible"]]
    eligible_deals.sort(key=lambda x: x["finalBill"])
    winner_key = eligible_deals[0]["platformKey"] if eligible_deals else None

    return {
        "restaurantId": req.restaurant_id,
        "billAmount": bill,
        "bestDealPlatform": winner_key,
        "comparisons": results
    }

@app.post("/api/ai/extract-deal")
def ai_extract_from_text(payload: AIExtractTextRequest):
    """
    AI Deal Ingestion: Parses raw promotional text using Gemini AI
    and immediately inserts the new restaurant and deals into the database.
    """
    if not payload.raw_text or len(payload.raw_text.strip()) < 10:
        raise HTTPException(status_code=400, detail="Text too short to extract deals")

    extracted = ai_extractor.extract_deals_with_gemini(payload.raw_text)
    # Save into database
    saved = database.upsert_restaurant(extracted)
    return {
        "success": True,
        "message": f"Successfully extracted deals for '{saved.get('name')}'!",
        "restaurant": saved
    }

@app.post("/api/ai/crawl-and-extract")
async def ai_crawl_and_extract(payload: AIExtractURLRequest):
    """
    Crawler + AI Ingestion: Fetches web page content from a URL,
    extracts structured deals via Gemini, and updates the database.
    """
    if not payload.url.startswith("http"):
        raise HTTPException(status_code=400, detail="Invalid URL provided")

    web_text = await crawler_service.fetch_page_content(payload.url)
    extracted = ai_extractor.extract_deals_with_gemini(web_text)
    saved = database.upsert_restaurant(extracted)
    return {
        "success": True,
        "message": f"Successfully extracted from {payload.url}!",
        "restaurant": saved
    }

@app.get("/api/stats")
def get_global_stats():
    """Returns platform savings metrics."""
    return {
        "totalSavings": 4850000,
        "dealsCompared": 14200,
        "avgDiscountPercent": 28.4
    }

# Serve root frontend files
root_dir = os.path.dirname(current_dir)
if os.path.exists(os.path.join(root_dir, "index.html")):
    app.mount("/", StaticFiles(directory=root_dir, html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
