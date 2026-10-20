# BachatBites — "Crave More. Spend Less."

> A bold, venture-backed dining deal discovery and cross-platform price comparison engine built with pure **HTML5, CSS3, and vanilla JavaScript**.

![BachatBites Banner](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80)

---

## 🍽️ The Problem & Concept

Dining enthusiasts constantly juggle between multiple food applications—**Zomato Gold, Swiggy Dineout, EazyDiner Prime, and magicpin**—trying to decode complicated discount percentages, maximum discount caps, minimum bill requirements, and bank restrictions to answer one simple question:

> *"Where do I get the lowest final bill for dinner tonight?"*

**BachatBites** eliminates the guesswork. Users enter their party size, estimated budget, occasion, and locality, and BachatBites runs a live comparative discount algorithm across all platforms, displaying the net payable bill and highlighting the **"BEST DEAL"** with full transparency on offer conditions.

---

## ✨ Key Features

1. **Floating 3D Hero Composition**:
   - Modern perspective layers with floating food card, tilted deal card, 3D animated discount badge ("UP TO 40% OFF"), live comparison widget, and subtle mouse-movement parallax.
   - Respects `prefers-reduced-motion` and touch devices.

2. **Cross-Platform Comparison Modal (Core Feature)**:
   - Interactive bill amount slider (test bills from ₹500 to ₹10,000+ in real time).
   - Dynamic evaluation engine checking minimum bill thresholds, percentage caps, and voucher rules.
   - Live visual comparison bar chart comparing out-of-pocket payable costs side by side.
   - Ineligibility warning banners (e.g. *"Add ₹200 more to unlock this offer"*).
   - Instant promo code copy with toast notification feedback.

3. **Smart Search & Filters**:
   - Multi-criteria filter engine: City / Locality, Occasion (*Date Night, Friends' Outing, Family Dinner, Birthday, Casual Hangout*), Cuisine, Party Size Stepper, and interactive Budget Range Slider.
   - Quick filter chips (*Under ₹1,000, Top Rated 4.7+, Best Value, Date Night*).
   - Real-time instant search across restaurant names, dishes, and localities.

4. **3D Interactive Restaurant Cards**:
   - Subtle cursor-following 3D tilt effects (`rotateX` / `rotateY`).
   - High-resolution food photography, rating badges, platform indicators, and calculated net bills.
   - Persistent wishlist bookmarking via browser `localStorage`.

5. **Savings Dashboard & Personal Simulator**:
   - Number counter animations triggered via `IntersectionObserver`.
   - Interactive dining simulator: slide meals per month and bill size to project annual savings with BachatBites.

6. **Saved Places Drawer & Demo Auth**:
   - Slide-over wishlist drawer allowing instant comparison of bookmarked spots.
   - Clean guest/user authentication flow with localStorage persistence.

---

## 📂 Project Architecture

```
bachatbites/
├── index.html        # Semantic HTML5 markup, accessible modal structures & meta
├── style.css         # Modern CSS3 with CSS variables, 3D transforms, glassmorphism
├── script.js        # Vanilla JS calculation engine, state management, modal controllers
├── data.js          # Independent demo restaurant & deal rules dataset
└── README.md        # Documentation and Flask integration roadmap
```

### Color System

| Token | Hex | Role |
|---|---|---|
| `--color-plum` | `#24112F` | Primary dark headings, contrast cards, footer |
| `--color-purple` | `#7C3AED` | Electric brand purple, primary interactive elements |
| `--color-orange` | `#FF7A45` | Warm food accent, CTA buttons, discount badges |
| `--color-cream` | `#FFF9F0` | Warm appetizing main background canvas |
| `--color-dark` | `#211A24` | Primary body typography |
| `--color-lavender` | `#F0E8FF` | Subtle tags, card overlays, and badges |

---

## 🧮 Deal Calculation Algorithm

In `script.js`, every platform offer is evaluated using `calculateDeal(billAmount, platformOffer)`:

```javascript
function calculateDeal(billAmount, platformOffer) {
  const minBill = platformOffer.minBill || 0;
  
  // 1. Minimum Spend Threshold Check
  if (billAmount < minBill) {
    return {
      isEligible: false,
      ineligibleReason: `Min bill ₹${minBill} required (Add ₹${minBill - billAmount} more)`,
      discountAmount: 0,
      finalBill: billAmount
    };
  }

  // 2. Discount Calculation (Percentage with Cap or Flat)
  let discount = 0;
  if (platformOffer.discountType === 'percentage') {
    const raw = (billAmount * platformOffer.discountPercent) / 100;
    discount = platformOffer.maxDiscount ? Math.min(raw, platformOffer.maxDiscount) : raw;
  } else if (platformOffer.discountType === 'flat') {
    discount = Math.min(platformOffer.flatDiscount, billAmount);
  }

  // 3. Final Payable Bill
  const finalBill = Math.max(0, billAmount - Math.round(discount));
  return {
    isEligible: true,
    discountAmount: Math.round(discount),
    finalBill: finalBill,
    savingsPercent: Math.round((discount / billAmount) * 100)
  };
}
```

The engine runs this across **Zomato Gold**, **Swiggy Dineout**, **EazyDiner Prime**, and **magicpin**, ranking results and crowning the lowest eligible net bill with a glowing **BEST DEAL** badge.

---

## 🚀 Running the Project & AI Backend

You can run BachatBites in two modes:

### Mode 1: Full-Stack Mode with AI Deal Extractor (Recommended)
This runs the **FastAPI backend + Gemini AI deal ingestion engine**:
1. Double-click `start.bat` on Windows, OR in your terminal run:
   ```bash
   .venv\Scripts\python.exe run_backend.py
   ```
2. Open **`http://localhost:8000`** in your browser.
3. Interactive API documentation is available at **`http://localhost:8000/docs`**.

#### 🔑 Adding Your Gemini API Key:
In `backend/.env`, add your Google Gemini API key:
```env
GEMINI_API_KEY=AIzaSy...
```
*(If no API key is provided, the backend automatically runs our smart heuristic extractor so you can test deal parsing immediately!)*

### Mode 2: Standalone Static Mode (Zero Server Needed)
Double click `index.html` in your file explorer to open it directly in Chrome, Edge, Safari, or Firefox. The frontend automatically falls back to local data without breaking.

---

## 🤖 AI Auto-Fetch & Ingestion Workflow

To add any new restaurant without manual coding:
1. Click the **"✨ AI Ingest"** button in the top navigation bar.
2. Paste any raw, messy promo text or marketing offer (e.g. from an Instagram post, Zomato screenshot OCR, or WhatsApp deal message). Or click one of the pre-loaded demo buttons (*Punjab Grill*, *Bastian*).
3. Click **"Extract & Add to BachatBites"**.
4. The Gemini 2.5 Flash pipeline:
   - Reads the unstructured content.
   - Normalizes discount types, minimum spends, maximum caps, and bank card restrictions.
   - Generates the structured 4-platform deal profile.
   - Saves it to the live database (`backend/restaurants_db.json`).
   - Automatically injects it into the website grid and opens the live deal comparison modal!

---

## ⚖️ Disclaimer

All restaurant offers and platform details featured in this prototype are illustrative demo representations created to demonstrate the BachatBites comparative calculation engine. Brand names (Zomato, Swiggy, EazyDiner, magicpin) are property of their respective trademark holders.
