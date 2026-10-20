"""
BachatBites - Real Bank Dining Partnerships Engine
Real dining programs active across major Indian credit cards and dining aggregators.
"""

from typing import Dict, Any, List

REAL_BANK_PROGRAMS = {
    "hdfc": {
        "bankName": "HDFC Bank",
        "programName": "HDFC Dineout Pay",
        "cardTypes": ["Millennia", "Regalia", "Infinia", "Diners Club Black"],
        "extraDiscountPercent": 10,
        "maxCashback": 500,
        "minBill": 1500,
        "supportedPlatforms": ["swiggy"],
        "badgeText": "HDFC Extra 10% Off"
    },
    "axis": {
        "bankName": "Axis Bank",
        "programName": "Dining Delights",
        "cardTypes": ["Neo", "MyZone", "Select", "Magnus", "Burgundy"],
        "extraDiscountPercent": 15,
        "maxCashback": 1000,
        "minBill": 2000,
        "supportedPlatforms": ["eazydiner", "swiggy"],
        "badgeText": "Axis Flat 15% Off"
    },
    "icici": {
        "bankName": "ICICI Bank",
        "programName": "Culinary Treats",
        "cardTypes": ["Coral", "Rubyx", "Sapphiro", "Emeralde"],
        "extraDiscountPercent": 10,
        "maxCashback": 300,
        "minBill": 1200,
        "supportedPlatforms": ["zomato", "swiggy"],
        "badgeText": "ICICI 10% Off"
    },
    "indusind": {
        "bankName": "IndusInd Bank",
        "programName": "EazyDiner Prime Card",
        "cardTypes": ["Legend", "Pinnacle", "EazyDiner Signature"],
        "extraDiscountPercent": 25,
        "maxCashback": 1000,
        "minBill": 2000,
        "supportedPlatforms": ["eazydiner"],
        "badgeText": "IndusInd 25% Off"
    }
}

def apply_bank_discount(platform_key: str, bill_amount: int, bank_code: str) -> Dict[str, Any]:
    """
    Computes additional bank partner cashback / discount if applicable.
    """
    bank = REAL_BANK_PROGRAMS.get(bank_code.lower())
    if not bank or platform_key not in bank["supportedPlatforms"]:
        return {"extraSavings": 0, "isBankEligible": False}

    if bill_amount < bank["minBill"]:
        return {
            "extraSavings": 0,
            "isBankEligible": False,
            "reason": f"Need min bill ₹{bank['minBill']} for {bank['bankName']} discount"
        }

    raw = (bill_amount * bank["extraDiscountPercent"]) / 100
    extra = min(raw, bank["maxCashback"])

    return {
        "extraSavings": int(round(extra)),
        "isBankEligible": True,
        "bankName": bank["bankName"],
        "badge": bank["badgeText"]
    }
