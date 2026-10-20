"""
BachatBites — Python Flask Backend Server 🐍
"Crave More. Spend Less."

Core Responsibilities:
1. Restaurants Search (Text & Locality)
2. Budget & Occasion Filtering
3. Offer Eligibility Validation (Minimum Spend rules)
4. Accurate Discount & Savings Calculations (Caps & Flat Vouchers)
5. Multi-Platform Comparison (Zomato, Swiggy, EazyDiner, magicpin)
6. Best Deal Recommendation Engine
7. AI-Powered Deal Extraction Integration
"""

import os
import json
import re
from typing import Dict, Any, List, Optional
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "backend", ".env"))

app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app)  # Enable Cross-Origin Resource Sharing for frontend

DATA_FILE = os.path.join(os.path.dirname(__file__), "backend", "restaurants_db.json")

def load_database() -> List[Dict[str, Any]]:
    """Loads restaurant database from JSON store."""
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading database: {e}")
    # Fallback to seed data
    from backend.seed_data import DEFAULT_RESTAURANTS
    return DEFAULT_RESTAURANTS

def save_database(data: List[Dict[str, Any]]) -> None:
    """Saves updated restaurant data to store."""
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


# ============================================================================
# 1. CORE DEAL CALCULATION & ELIGIBILITY ENGINE
# ============================================================================

def calculate_single_deal(bill_amount: int, offer: Dict[str, Any]) -> Dict[str, Any]:
    """
    Checks minimum spend conditions, validates eligibility,
    and computes net payable bill and savings.
    """
    min_bill = offer.get("minBill", 0)
    is_eligible = bill_amount >= min_bill

    if not is_eligible:
        shortfall = min_bill - bill_amount
        return {
            "isEligible": False,
            "ineligibleReason": f"Min bill ₹{min_bill:,} required (Add ₹{shortfall:,} more to unlock)",
            "discountAmount": 0,
            "finalBill": bill_amount,
            "savingsPercent": 0,
            "offer": offer
        }

    discount = 0
    discount_type = offer.get("discountType", "percentage")

    if discount_type == "percentage":
        raw_discount = (bill_amount * offer.get("discountPercent", 0)) / 100.0
        max_discount = offer.get("maxDiscount", 0)
        discount = min(raw_discount, max_discount) if max_discount > 0 else raw_discount
    elif discount_type == "flat":
        flat_discount = offer.get("flatDiscount", 0)
        discount = min(flat_discount, bill_amount)

    discount = int(round(discount))
    final_bill = max(0, bill_amount - discount)
    savings_percent = int(round((discount / bill_amount) * 100)) if bill_amount > 0 else 0

    return {
        "isEligible": True,
        "ineligibleReason": None,
        "discountAmount": discount,
        "finalBill": final_bill,
        "savingsPercent": savings_percent,
        "offer": offer
    }


def compare_all_platforms(restaurant: Dict[str, Any], bill_amount: int) -> Dict[str, Any]:
    """
    Evaluates deals across Zomato, Swiggy Dineout, EazyDiner, and magicpin.
    Ranks them and identifies the 'BEST DEAL' winner.
    """
    platforms = restaurant.get("platforms", {})
    evaluated = []

    for key, offer in platforms.items():
        calc = calculate_single_deal(bill_amount, offer)
        evaluated.append({
            "platformKey": key,
            "platformName": offer.get("platformName", key.title()),
            "brandColor": offer.get("brandColor", "#7C3AED"),
            "calc": calc
        })

    # Sort: Eligible first, then lowest final bill, then highest discount
    def sort_key(item):
        is_elig = item["calc"]["isEligible"]
        final_b = item["calc"]["finalBill"]
        discount_a = item["calc"]["discountAmount"]
        # Ineligible pushed to bottom (weight 1), then ascending bill, then descending discount
        return (0 if is_elig else 1, final_b, -discount_a)

    evaluated.sort(key=sort_key)

    eligible_deals = [item for item in evaluated if item["calc"]["isEligible"]]
    winner_item = eligible_deals[0] if eligible_deals else None
    winner_key = winner_item["platformKey"] if winner_item else None

    return {
        "restaurantId": restaurant.get("id"),
        "restaurantName": restaurant.get("name"),
        "billAmount": bill_amount,
        "bestDealPlatform": winner_key,
        "bestDealItem": winner_item,
        "platforms": evaluated
    }


# ============================================================================
# 2. REST API ROUTES
# ============================================================================

@app.route("/api/health", methods=["GET"])
def health():
    """Health check endpoint showing Flask server and AI status."""
    gemini_key = os.getenv("GEMINI_API_KEY")
    ai_status = "Gemini LLM Active" if gemini_key and gemini_key.strip() and gemini_key != "YOUR_GEMINI_API_KEY_HERE" else "Smart Rule-Based Parser Active"
    return jsonify({
        "status": "online",
        "framework": "Flask 3.x",
        "app": "BachatBites Python Engine",
        "aiEngine": ai_status,
        "version": "1.0.0"
    })


@app.route("/api/restaurants", methods=["GET"])
def get_restaurants():
    """
    1. Searches restaurants by name/dish.
    2. Filters results by budget, locality, occasion, cuisine.
    3. Sorts by lowest bill, highest savings, rating, cost.
    """
    restaurants = load_database()

    # Query Parameters
    city = request.args.get("city")
    locality = request.args.get("locality")
    cuisine = request.args.get("cuisine")
    occasion = request.args.get("occasion")
    max_budget = request.args.get("max_budget", type=int)
    search = request.args.get("search", "").strip()
    sort_by = request.args.get("sort_by", "recommended")

    # City filter
    if city and city != "All":
        restaurants = [r for r in restaurants if r.get("city", "").lower() == city.lower()]

    # Locality filter
    if locality and locality != "All":
        restaurants = [r for r in restaurants if locality.lower() in r.get("locality", "").lower()]

    # Cuisine filter
    if cuisine and cuisine != "All":
        restaurants = [r for r in restaurants if any(c.lower() == cuisine.lower() for c in r.get("cuisine", []))]

    # Occasion filter
    if occasion and occasion != "All":
        restaurants = [r for r in restaurants if any(o.lower() == occasion.lower() for o in r.get("occasion", []))]

    # Budget filter (Cost for two <= max_budget)
    if max_budget and max_budget > 0:
        restaurants = [r for r in restaurants if r.get("costForTwo", 0) <= max_budget]

    # Search keyword filter
    if search:
        q = search.lower()
        restaurants = [
            r for r in restaurants
            if q in r.get("name", "").lower()
            or q in r.get("tagline", "").lower()
            or q in r.get("locality", "").lower()
            or any(q in c.lower() for c in r.get("cuisine", []))
        ]

    # Sorting
    if sort_by == "lowest-bill":
        restaurants.sort(key=lambda r: compare_all_platforms(r, r.get("costForTwo", 2000))["bestDealItem"]["calc"]["finalBill"] if compare_all_platforms(r, r.get("costForTwo", 2000))["bestDealItem"] else r.get("costForTwo", 2000))
    elif sort_by == "highest-savings":
        restaurants.sort(key=lambda r: compare_all_platforms(r, r.get("costForTwo", 2000))["bestDealItem"]["calc"]["discountAmount"] if compare_all_platforms(r, r.get("costForTwo", 2000))["bestDealItem"] else 0, reverse=True)
    elif sort_by == "rating":
        restaurants.sort(key=lambda r: r.get("rating", 0), reverse=True)
    elif sort_by == "cost-asc":
        restaurants.sort(key=lambda r: r.get("costForTwo", 0))
    elif sort_by == "cost-desc":
        restaurants.sort(key=lambda r: r.get("costForTwo", 0), reverse=True)

    return jsonify(restaurants)


@app.route("/api/restaurants/<restaurant_id>", methods=["GET"])
def get_restaurant_detail(restaurant_id):
    """Fetches single restaurant profile."""
    restaurants = load_database()
    for r in restaurants:
        if r.get("id") == restaurant_id:
            return jsonify(r)
    return jsonify({"error": "Restaurant not found"}), 404


@app.route("/api/calculate-deal", methods=["POST"])
@app.route("/api/compare-deal", methods=["POST"])
def calculate_deal_api():
    """
    Flask Endpoint to calculate offer eligibility, discounts, and recommend the best deal.
    Payload: { "restaurant_id": "bb-001", "bill_amount": 2200 }
    """
    data = request.get_json() or {}
    restaurant_id = data.get("restaurant_id") or data.get("restaurantId")
    bill_amount = data.get("bill_amount") or data.get("billAmount", 2000)

    if not restaurant_id:
        return jsonify({"error": "restaurant_id is required"}), 400

    restaurants = load_database()
    target_restaurant = None
    for r in restaurants:
        if r.get("id") == restaurant_id:
            target_restaurant = r
            break

    if not target_restaurant:
        return jsonify({"error": "Restaurant not found"}), 404

    comparison_result = compare_all_platforms(target_restaurant, int(bill_amount))
    return jsonify(comparison_result)


@app.route("/api/ai/extract-deal", methods=["POST"])
def ai_extract_deal():
    """
    AI Deal Ingestor: Parses raw unstructured promo text into BachatBites schema.
    """
    data = request.get_json() or {}
    raw_text = data.get("raw_text", "").strip()

    if not raw_text or len(raw_text) < 10:
        return jsonify({"error": "Text too short to extract deals"}), 400

    from backend.ai_extractor import extract_deals_with_gemini
    extracted = extract_deals_with_gemini(raw_text)

    # Save to database
    restaurants = load_database()
    # Check if duplicate name exists
    existing_idx = next((i for i, r in enumerate(restaurants) if r.get("name", "").lower() == extracted.get("name", "").lower()), None)
    if existing_idx is not None:
        restaurants[existing_idx] = extracted
    else:
        restaurants.insert(0, extracted)

    save_database(restaurants)
    return jsonify({
        "success": True,
        "message": f"Successfully extracted deals for '{extracted.get('name')}'!",
        "restaurant": extracted
    })


# ============================================================================
# 3. STATIC FRONTEND SERVING
# ============================================================================

@app.route("/")
def index():
    """Serves BachatBites index.html."""
    return send_from_directory(".", "index.html")

@app.route("/<path:path>")
def static_proxy(path):
    """Serves CSS, JS, and image assets."""
    return send_from_directory(".", path)


# ============================================================================
# 4. SERVER RUNNER
# ============================================================================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print("\n" + "="*65)
    print(" [BachatBites] Flask Backend Server Running")
    print("="*65)
    print(f" Local URL:     http://127.0.0.1:{port}")
    print(" Search API:    GET  /api/restaurants?search=tandoori")
    print(" Deal Calc API: POST /api/calculate-deal")
    print(" AI Extractor:  POST /api/ai/extract-deal")
    print("="*65 + "\n")
    app.run(host="127.0.0.1", port=port, debug=False)
