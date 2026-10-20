"""
BachatBites - Web Crawler & Page Text Fetcher
Fetches and sanitizes web pages or simulates restaurant deal pages for AI ingestion.
"""

import httpx
from bs4 import BeautifulSoup
from typing import Optional

async def fetch_page_content(url: str) -> str:
    """
    Fetches raw HTML from a public URL and converts it into clean, readable text.
    Handles user-agent headers to mimic modern browser requests.
    """
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5"
    }

    try:
        async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
            response = await client.get(url, headers=headers)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, "html.parser")
                # Remove scripts, styles, and unwanted tags
                for tag in soup(["script", "style", "noscript", "svg", "header", "footer"]):
                    tag.decompose()
                
                text = soup.get_text(separator=" ", strip=True)
                # Truncate to reasonable token size for LLM
                return text[:12000]
            else:
                return f"HTTP error {response.status_code} when fetching {url}."
    except Exception as e:
        return f"Failed to fetch URL {url}: {str(e)}"
