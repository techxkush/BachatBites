"""
BachatBites - Real Deal Scraper & Ingestion Pipeline
Fetches public dining offer pages, runs extraction via Gemini AI,
attaches live bank discounts, and syncs into the live restaurant database.
"""

import os
import sys
import json
import asyncio
import httpx
from bs4 import BeautifulSoup
from typing import List, Dict, Any

current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

import database
import ai_extractor
from bank_offers import REAL_BANK_PROGRAMS
from real_restaurants_catalog import REAL_METRO_RESTAURANTS

CRAWL_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-IN,en-US;q=0.9,en;q=0.8"
}

async def fetch_and_extract_url(url: str) -> Dict[str, Any]:
    """
    Crawls a public restaurant dining page or offer URL and passes it
    to Gemini AI to parse deals into BachatBites schema.
    """
    try:
        async with httpx.AsyncClient(timeout=12.0, follow_redirects=True) as client:
            resp = await client.get(url, headers=CRAWL_HEADERS)
            if resp.status_code == 200:
                soup = BeautifulSoup(resp.text, "html.parser")
                for s in soup(["script", "style", "noscript", "svg", "footer"]):
                    s.decompose()
                clean_text = soup.get_text(separator=" ", strip=True)[:10000]
                extracted = ai_extractor.extract_deals_with_gemini(clean_text)
                return extracted
            else:
                print(f"[Scraper] Failed to fetch {url}: HTTP {resp.status_code}")
                return None
    except Exception as e:
        print(f"[Scraper] Exception fetching {url}: {e}")
        return None


def sync_real_catalog() -> int:
    """
    Syncs the real metropolitan dining catalog into the live database.
    Updates or inserts verified restaurant profiles and platform discounts.
    """
    existing_db = database.load_all_restaurants()
    existing_ids = {r.get("id"): idx for idx, r in enumerate(existing_db)}

    added_count = 0
    updated_count = 0

    for item in REAL_METRO_RESTAURANTS:
        item_id = item["id"]
        # Attach bank program notes if missing
        if "swiggy" in item.get("platforms", {}):
            item["platforms"]["swiggy"]["bankPartner"] = REAL_BANK_PROGRAMS["hdfc"]["badgeText"]
        if "eazydiner" in item.get("platforms", {}):
            item["platforms"]["eazydiner"]["bankPartner"] = REAL_BANK_PROGRAMS["axis"]["badgeText"]

        if item_id in existing_ids:
            # Update existing
            existing_db[existing_ids[item_id]] = item
            updated_count += 1
        else:
            # Prepend new real restaurant
            existing_db.insert(0, item)
            added_count += 1

    database.save_all_restaurants(existing_db)
    print(f"[Real Deals Pipeline] Ingested {added_count} new restaurants, updated {updated_count}. Total in DB: {len(existing_db)}")
    return len(existing_db)


if __name__ == "__main__":
    count = sync_real_catalog()
    print(f"Sync complete. Total restaurants in database: {count}")
