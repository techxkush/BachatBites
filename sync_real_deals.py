"""
BachatBites - Real Deals Sync Utility CLI 🚀
Synchronizes authentic restaurant offers and bank dining programs into the live database.
"""

import os
import sys

# Ensure backend directory is in python path
backend_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from real_deal_scraper import sync_real_catalog
import database

if __name__ == "__main__":
    print("\n" + "="*65)
    print(" [BachatBites] Synchronizing Real Metropolitan Dining Deals...")
    print("="*65)
    
    total = sync_real_catalog()
    
    print("\n [Success] Real offers synchronized across:")
    print("  - Zomato Gold Dining")
    print("  - Swiggy Dineout (+ HDFC Bank extra 10%)")
    print("  - EazyDiner Prime (+ Axis Bank Dining Delights)")
    print("  - magicpin Vouchers")
    print(f"\n Total active restaurants in database: {total}")
    print("="*65 + "\n")
