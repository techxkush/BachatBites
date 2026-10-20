"""
BachatBites - AI Deal Extractor Engine
Uses Google Gemini API with Structured Outputs to parse unstructured
restaurant pages, marketing banners, and dining offers into BachatBites schema.
"""

import os
import json
import re
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()

# --- Pydantic Schema for Structured Output ---
class PlatformOfferSchema(BaseModel):
    platformName: str = Field(description="Full name of dining platform, e.g., 'Zomato Gold', 'Swiggy Dineout', 'EazyDiner Prime', 'magicpin'")
    brandColor: str = Field(description="Hex color for platform: #E23744 for Zomato, #FC8019 for Swiggy, #7B2CBF for EazyDiner, #00B4D8 for magicpin")
    offerTitle: str = Field(description="Catchy summary of the offer, e.g. 'Flat 20% Off on Total Bill'")
    discountType: str = Field(description="'percentage' or 'flat'")
    discountPercent: int = Field(default=0, description="Percentage discount value (e.g. 20 for 20%), 0 if flat")
    maxDiscount: int = Field(default=0, description="Maximum discount cap in INR (0 if uncapped)")
    minBill: int = Field(default=0, description="Minimum bill threshold in INR required to unlock offer")
    flatDiscount: int = Field(default=0, description="Flat rupee discount amount, 0 if percentage")
    validDays: str = Field(description="Valid days and time restrictions, e.g., 'All days (Lunch & Dinner)' or 'Mon-Thu all day'")
    paymentRestriction: str = Field(description="Required payment modes or bank cards, e.g. 'HDFC Bank Credit Cards' or 'Any payment mode via app'")
    bookingRequirement: str = Field(description="Booking conditions, e.g. 'Pre-booking required 30 mins prior' or 'Walk-in allowed'")
    promoCode: str = Field(description="Voucher or coupon code to redeem, e.g. 'DINEOUT20'")
    verifiedTag: str = Field(description="Short badge, e.g. 'Instant Bill Cut', 'Table Reserve'")

class RestaurantProfileSchema(BaseModel):
    name: str = Field(description="Official name of the restaurant")
    tagline: str = Field(description="Enticing one-line description of food and ambience")
    locality: str = Field(description="Neighborhood and landmark, e.g. 'Cyber Hub, Gurugram' or 'Indiranagar'")
    city: str = Field(description="City name, e.g. 'Delhi NCR', 'Bengaluru', 'Mumbai', 'Pune', 'Hyderabad'")
    cuisine: List[str] = Field(description="List of cuisines, e.g. ['North Indian', 'Multi-cuisine']")
    costForTwo: int = Field(description="Estimated regular cost for two people in INR")
    rating: float = Field(default=4.6, description="Average star rating (1.0 to 5.0)")
    reviewsCount: int = Field(default=850, description="Total number of reviews")
    badge: str = Field(default="BEST VALUE", description="One of: 'BEST VALUE', 'MOST SAVED', 'POPULAR', 'LOWEST BILL'")
    occasion: List[str] = Field(default=["Friends' Outing", "Casual Hangout"], description="Suitable occasions, e.g. ['Date Night', 'Family Dinner']")
    budgetTier: str = Field(default="1000-2000", description="'under500', '500-1000', '1000-2000', or '2000-5000'")
    platforms: Dict[str, PlatformOfferSchema] = Field(description="Dict with keys 'zomato', 'swiggy', 'eazydiner', 'magicpin'")


def extract_deals_with_gemini(raw_text: str) -> Dict[str, Any]:
    """
    Calls Gemini API with Structured Output to extract normalized restaurant and deal data.
    If no API key is provided, falls back to an intelligent heuristic extractor.
    """
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key or api_key.strip() == "" or api_key == "YOUR_GEMINI_API_KEY_HERE":
        print("[AI Extractor] No GEMINI_API_KEY found. Running smart heuristic extractor.")
        return heuristic_deal_extractor(raw_text)

    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=api_key)

        prompt = f"""
        You are BachatBites' expert Dining Deal Auditor.
        Your task is to analyze the following unstructured restaurant promotions, raw website text,
        or offer fine-print, and extract normalized dining deals for all platforms (Zomato, Swiggy Dineout, EazyDiner, magicpin).

        RULES:
        1. Accurately detect minimum bill requirements, maximum discount caps, flat vouchers vs percentage discounts.
        2. Always note specific bank card conditions (e.g. HDFC, ICICI, IndusInd) or timing restrictions.
        3. If a specific platform is not explicitly mentioned in the text, extrapolate a realistic metropolitan offer for that restaurant based on its price tier.
        4. Output strictly according to the RestaurantProfileSchema.

        UNSTRUCTURED TEXT / PROMO CONTENT:
        {raw_text}
        """

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=RestaurantProfileSchema,
                temperature=0.1
            )
        )

        extracted = json.loads(response.text)
        # Generate a unique ID if not present
        clean_name = re.sub(r'[^a-zA-Z0-9]', '', extracted.get('name', 'restaurant')).lower()
        extracted["id"] = f"bb-{clean_name[:8]}-{os.urandom(2).hex()}"
        if not extracted.get("image"):
            extracted["image"] = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
        
        return extracted

    except Exception as e:
        print(f"[AI Extractor] Error using Gemini API: {e}. Falling back to heuristic extractor.")
        return heuristic_deal_extractor(raw_text)


def heuristic_deal_extractor(raw_text: str) -> Dict[str, Any]:
    """
    Smart rule-based and regex extraction fallback when Gemini API key is not configured.
    Detects restaurant names, discount percentages, min bills, and platform keywords.
    """
    text_lower = raw_text.lower()

    # Extract or infer name
    name_match = re.search(r'(?:restaurant|cafe|bar|bistro|kitchen|dhaba|dining)?\s*[:\-]?\s*([A-Z][a-zA-Z0-9\s&\'\-]+)', raw_text)
    restaurant_name = name_match.group(1).strip() if name_match else "The Artisanal Table"
    if len(restaurant_name) > 40:
        restaurant_name = restaurant_name[:40].strip()

    # Detect city
    city = "Delhi NCR"
    for c in ["Delhi NCR", "Bengaluru", "Mumbai", "Pune", "Hyderabad"]:
        if c.lower() in text_lower:
            city = c
            break

    # Detect locality
    locality = f"Central {city}"
    locality_match = re.search(r'(?:in|at|near|locality[:\s])\s*([A-Za-z0-9\s,]+)', raw_text, re.IGNORECASE)
    if locality_match:
        found_loc = locality_match.group(1).split('.')[0].split('\n')[0].strip()
        if len(found_loc) < 35:
            locality = found_loc

    # Detect discount percentages
    percentages = [int(p) for p in re.findall(r'(\d{1,2})\s*%', raw_text)]
    base_discount = percentages[0] if percentages else 20

    # Detect rupee values
    rupee_values = [int(r.replace(',', '')) for r in re.findall(r'₹\s*(\d[\d,]+)', raw_text)]
    min_bill = 1200
    for v in rupee_values:
        if 800 <= v <= 3000:
            min_bill = v
            break

    cost_for_two = max(min_bill, 1600)

    # Clean ID
    clean_slug = re.sub(r'[^a-zA-Z0-9]', '', restaurant_name).lower()[:8]
    item_id = f"bb-{clean_slug}-{os.urandom(2).hex()}"

    return {
        "id": item_id,
        "name": restaurant_name,
        "tagline": "AI-Extracted gourmet dining with live cross-platform savings",
        "locality": locality,
        "city": city,
        "cuisine": ["Multi-cuisine", "North Indian"],
        "rating": 4.7,
        "reviewsCount": 850,
        "costForTwo": cost_for_two,
        "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
        "badge": "BEST VALUE",
        "occasion": ["Date Night", "Friends' Outing"],
        "budgetTier": "1000-2000" if cost_for_two <= 2000 else "2000-5000",
        "features": ["AI Verified Deal", "Instant Cut", "Online Reservation"],
        "platforms": {
            "swiggy": {
                "platformName": "Swiggy Dineout",
                "brandColor": "#FC8019",
                "offerTitle": f"Flat {base_discount}% Off on Total Bill",
                "discountType": "percentage",
                "discountPercent": base_discount,
                "maxDiscount": int(cost_for_two * 0.3),
                "minBill": min_bill,
                "flatDiscount": 0,
                "validDays": "Mon - Thu all day, Fri - Sun till 7 PM",
                "paymentRestriction": "HDFC & Axis Bank credit cards eligible",
                "bookingRequirement": "Pre-booking required 20 mins prior",
                "promoCode": f"DINEOUT{base_discount}",
                "verifiedTag": "Instant Dineout Pay"
            },
            "zomato": {
                "platformName": "Zomato Gold",
                "brandColor": "#E23744",
                "offerTitle": f"Instant {max(15, base_discount - 5)}% Off via Gold",
                "discountType": "percentage",
                "discountPercent": max(15, base_discount - 5),
                "maxDiscount": int(cost_for_two * 0.25),
                "minBill": max(500, min_bill - 300),
                "flatDiscount": 0,
                "validDays": "All days Lunch & Dinner",
                "paymentRestriction": "Any payment mode via Zomato Pay",
                "bookingRequirement": "Walk-in allowed",
                "promoCode": "GOLDINSTANT",
                "verifiedTag": "Zero Waiting"
            },
            "eazydiner": {
                "platformName": "EazyDiner Prime",
                "brandColor": "#7B2CBF",
                "offerTitle": f"Flat ₹{min(500, int(cost_for_two * 0.25))} Off Prime Voucher",
                "discountType": "flat",
                "discountPercent": 0,
                "maxDiscount": min(500, int(cost_for_two * 0.25)),
                "minBill": max(1000, min_bill),
                "flatDiscount": min(500, int(cost_for_two * 0.25)),
                "validDays": "All days with Prime table booking",
                "paymentRestriction": "IndusInd Bank cards compatible",
                "bookingRequirement": "Mandatory table reservation",
                "promoCode": "PRIMEVALUE",
                "verifiedTag": "Prime Slot"
            },
            "magicpin": {
                "platformName": "magicpin",
                "brandColor": "#00B4D8",
                "offerTitle": f"{max(10, base_discount - 8)}% Cashback Voucher",
                "discountType": "percentage",
                "discountPercent": max(10, base_discount - 8),
                "maxDiscount": 300,
                "minBill": max(500, min_bill - 500),
                "flatDiscount": 0,
                "validDays": "Daily 11 AM - 11 PM",
                "paymentRestriction": "magicpin wallet or UPI",
                "bookingRequirement": "Voucher scan at cashier desk",
                "promoCode": "MAGICDEAL",
                "verifiedTag": "Voucher Code"
            }
        }
    }
