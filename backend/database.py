"""
BachatBites - Database Layer
Stores and manages restaurants and cross-platform deal rules with persistence.
"""

import os
import json
from typing import List, Optional, Dict, Any

DATA_FILE_PATH = os.path.join(os.path.dirname(__file__), "restaurants_db.json")

def load_all_restaurants() -> List[Dict[str, Any]]:
    """Loads all restaurants from the JSON database file."""
    if not os.path.exists(DATA_FILE_PATH):
        from seed_data import DEFAULT_RESTAURANTS
        save_all_restaurants(DEFAULT_RESTAURANTS)
        return DEFAULT_RESTAURANTS
    
    try:
        with open(DATA_FILE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading database file: {e}")
        from seed_data import DEFAULT_RESTAURANTS
        return DEFAULT_RESTAURANTS

def save_all_restaurants(restaurants: List[Dict[str, Any]]) -> None:
    """Saves the complete restaurant list to the JSON database."""
    with open(DATA_FILE_PATH, "w", encoding="utf-8") as f:
        json.dump(restaurants, f, indent=2, ensure_ascii=False)

def get_restaurant_by_id(restaurant_id: str) -> Optional[Dict[str, Any]]:
    """Retrieves a single restaurant by its unique ID."""
    restaurants = load_all_restaurants()
    for r in restaurants:
        if r.get("id") == restaurant_id:
            return r
    return None

def upsert_restaurant(restaurant_data: Dict[str, Any]) -> Dict[str, Any]:
    """Adds a new restaurant or updates an existing one."""
    restaurants = load_all_restaurants()
    existing_idx = None
    
    # Check if exists by ID or name
    for idx, r in enumerate(restaurants):
        if r.get("id") == restaurant_data.get("id") or r.get("name", "").lower() == restaurant_data.get("name", "").lower():
            existing_idx = idx
            break
            
    if existing_idx is not None:
        # Update existing
        restaurants[existing_idx] = restaurant_data
    else:
        # Prepend new restaurant to show up first
        restaurants.insert(0, restaurant_data)
        
    save_all_restaurants(restaurants)
    return restaurant_data

def filter_restaurants(
    city: Optional[str] = None,
    locality: Optional[str] = None,
    cuisine: Optional[str] = None,
    occasion: Optional[str] = None,
    max_budget: Optional[int] = None,
    search: Optional[str] = None,
    sort_by: Optional[str] = "recommended"
) -> List[Dict[str, Any]]:
    """Filters and sorts restaurants based on user search parameters."""
    list_data = load_all_restaurants()

    if city and city != "All":
        list_data = [r for r in list_data if r.get("city", "").lower() == city.lower()]

    if locality and locality != "All":
        list_data = [r for r in list_data if locality.lower() in r.get("locality", "").lower()]

    if cuisine and cuisine != "All":
        list_data = [r for r in list_data if any(c.lower() == cuisine.lower() for c in r.get("cuisine", []))]

    if occasion and occasion != "All":
        list_data = [r for r in list_data if any(o.lower() == occasion.lower() for o in r.get("occasion", []))]

    if max_budget:
        list_data = [r for r in list_data if r.get("costForTwo", 0) <= max_budget]

    if search and search.strip():
        q = search.strip().lower()
        list_data = [
            r for r in list_data
            if q in r.get("name", "").lower()
            or q in r.get("tagline", "").lower()
            or q in r.get("locality", "").lower()
            or any(q in c.lower() for c in r.get("cuisine", []))
        ]

    # Sorting
    if sort_by == "cost-asc":
        list_data.sort(key=lambda x: x.get("costForTwo", 0))
    elif sort_by == "cost-desc":
        list_data.sort(key=lambda x: x.get("costForTwo", 0), reverse=True)
    elif sort_by == "rating":
        list_data.sort(key=lambda x: x.get("rating", 0), reverse=True)

    return list_data
