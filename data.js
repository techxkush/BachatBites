/**
 * BachatBites - Restaurant & Deal Database
 * 
 * DISCLAIMER: All data, platforms, and discount structures presented here are
 * illustrative demo data for the BachatBites deal comparison engine.
 * Does not represent live partner APIs or real-time guaranteed restaurant billing.
 */

const RESTAURANTS_DATA = [
  {
    "id": "real-hyd-001",
    "name": "Tatva",
    "tagline": "Fine-dining vegetarian gastronomy with continental delicacies & artisanal mocktails",
    "locality": "Jubilee Hills",
    "city": "Hyderabad",
    "cuisine": [
      "Multi-cuisine",
      "Italian",
      "North Indian"
    ],
    "rating": 4.9,
    "reviewsCount": 6400,
    "costForTwo": 1800,
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    "badge": "BEST VALUE",
    "occasion": [
      "Family Dinner",
      "Date Night"
    ],
    "budgetTier": "1000-2000",
    "features": [
      "Pure Veg Fine Dining",
      "Valet Parking",
      "Artisanal Desserts",
      "Mocktail Lounge"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "Flat 20% Off on Food Bill",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 450,
        "minBill": 1400,
        "flatDiscount": 0,
        "validDays": "Mon - Sun",
        "paymentRestriction": "Dineout Pay via credit cards",
        "bookingRequirement": "Pre-book slot 30 mins prior",
        "promoCode": "TATVA20",
        "verifiedTag": "Instant Food Off",
        "bankPartner": "HDFC Extra 10% Off"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "15% Off Total Bill via Gold",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 400,
        "minBill": 1200,
        "flatDiscount": 0,
        "validDays": "All days Lunch & Dinner",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Walk-in allowed",
        "promoCode": "GOLDTATVA",
        "verifiedTag": "Instant Cut"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹400 Off with Prime Booking",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 400,
        "minBill": 1600,
        "flatDiscount": 400,
        "validDays": "Tue - Sun all slots",
        "paymentRestriction": "IndusInd / Axis cards",
        "bookingRequirement": "Prime table confirmation",
        "promoCode": "PRIMETATVA",
        "verifiedTag": "Prime Slot",
        "bankPartner": "Axis Flat 15% Off"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "15% Voucher Off",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 300,
        "minBill": 1100,
        "flatDiscount": 0,
        "validDays": "Daily",
        "paymentRestriction": "magicpin app",
        "bookingRequirement": "Show barcode at billing desk",
        "promoCode": "MAGICTATVA",
        "verifiedTag": "Voucher"
      }
    }
  },
  {
    "id": "real-pun-001",
    "name": "Effingut Brewerkz",
    "tagline": "Unapologetic craft brews, smoky tandoori platters & hearty beer garden comfort",
    "locality": "Koregaon Park",
    "city": "Pune",
    "cuisine": [
      "Multi-cuisine",
      "North Indian"
    ],
    "rating": 4.8,
    "reviewsCount": 8100,
    "costForTwo": 2200,
    "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80",
    "badge": "BEST VALUE",
    "occasion": [
      "Friends' Outing",
      "Birthday"
    ],
    "budgetTier": "2000-5000",
    "features": [
      "Apple Cider on Tap",
      "Outdoor Beer Garden",
      "Live Rock Music",
      "Trivia Nights"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "Flat 25% Off Total Bill",
        "discountType": "percentage",
        "discountPercent": 25,
        "maxDiscount": 650,
        "minBill": 1600,
        "flatDiscount": 0,
        "validDays": "Mon - Thu All Day, Fri till 7 PM",
        "paymentRestriction": "Dineout Pay with Axis / HDFC",
        "bookingRequirement": "Pre-booking required",
        "promoCode": "EFFIN25",
        "verifiedTag": "Instant Cut",
        "bankPartner": "HDFC Extra 10% Off"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "20% Off up to ₹500",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 500,
        "minBill": 1400,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Direct app payment",
        "promoCode": "GOLDEFFIN",
        "verifiedTag": "Instant"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹550 Off with Prime Table",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 550,
        "minBill": 2000,
        "flatDiscount": 550,
        "validDays": "All days",
        "paymentRestriction": "IndusInd cards",
        "bookingRequirement": "Table reservation required",
        "promoCode": "PRIMEEFFIN",
        "verifiedTag": "Prime Slot",
        "bankPartner": "Axis Flat 15% Off"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "18% Magic Voucher",
        "discountType": "percentage",
        "discountPercent": 18,
        "maxDiscount": 400,
        "minBill": 1500,
        "flatDiscount": 0,
        "validDays": "Daily",
        "paymentRestriction": "magicpin balance",
        "bookingRequirement": "Redeem at billing desk",
        "promoCode": "MAGICEFFIN",
        "verifiedTag": "Voucher"
      }
    }
  },
  {
    "id": "real-blr-002",
    "name": "Truffles",
    "tagline": "Bengaluru's favorite burger joint with monstrous All-American beef burgers & dense shakes",
    "locality": "Koramangala",
    "city": "Bengaluru",
    "cuisine": [
      "Cafe",
      "Multi-cuisine"
    ],
    "rating": 4.8,
    "reviewsCount": 22400,
    "costForTwo": 750,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80",
    "badge": "LOWEST BILL",
    "occasion": [
      "Casual Hangout",
      "Friends' Outing"
    ],
    "budgetTier": "500-1000",
    "features": [
      "Gourmet Burgers",
      "Student Discounts",
      "Quick Service",
      "Dessert Counter"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "15% Off Total Bill",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 150,
        "minBill": 500,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "Dineout Pay",
        "bookingRequirement": "No reservation required",
        "promoCode": "TRUFF15",
        "verifiedTag": "Instant Cut",
        "bankPartner": "HDFC Extra 10% Off"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "10% Off Instant Discount",
        "discountType": "percentage",
        "discountPercent": 10,
        "maxDiscount": 120,
        "minBill": 450,
        "flatDiscount": 0,
        "validDays": "Daily all operating hours",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Direct app payment",
        "promoCode": "GOLDTRUFF",
        "verifiedTag": "Zero Waiting"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹100 Off on min bill ₹600",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 100,
        "minBill": 600,
        "flatDiscount": 100,
        "validDays": "Mon - Sun",
        "paymentRestriction": "All cards",
        "bookingRequirement": "Walk-in check-in",
        "promoCode": "TRUFF100",
        "verifiedTag": "Pocket Deal",
        "bankPartner": "Axis Flat 15% Off"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "25% Cashback on Magic voucher",
        "discountType": "percentage",
        "discountPercent": 25,
        "maxDiscount": 200,
        "minBill": 500,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "magicpin UPI",
        "bookingRequirement": "Voucher scan at cashier desk",
        "promoCode": "MAGICTRUFF",
        "verifiedTag": "Super Saver"
      }
    }
  },
  {
    "id": "real-blr-001",
    "name": "Toit Brewpub",
    "tagline": "Legendary craft brewery with Tintin Toit ale, wood-fired pizzas & electric pub energy",
    "locality": "Indiranagar",
    "city": "Bengaluru",
    "cuisine": [
      "Multi-cuisine",
      "Italian"
    ],
    "rating": 4.9,
    "reviewsCount": 18200,
    "costForTwo": 2000,
    "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80",
    "badge": "MOST SAVED",
    "occasion": [
      "Friends' Outing",
      "Casual Hangout"
    ],
    "budgetTier": "1000-2000",
    "features": [
      "Microbrewery",
      "Pet Friendly Patio",
      "Iconic Pizzas",
      "Outdoor Deck"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "20% Off on Dineout Pay",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 500,
        "minBill": 1500,
        "flatDiscount": 0,
        "validDays": "Mon - Thu 12 PM - 7 PM",
        "paymentRestriction": "HDFC Bank credit cards extra 10%",
        "bookingRequirement": "Pre-booking required on weekends",
        "promoCode": "TOIT20",
        "verifiedTag": "Brewery Deal",
        "bankPartner": "HDFC Extra 10% Off"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "15% Off Total Bill",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 450,
        "minBill": 1200,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Direct pay at table",
        "promoCode": "GOLDTOIT",
        "verifiedTag": "Instant"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹450 Off on ₹1800+",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 450,
        "minBill": 1800,
        "flatDiscount": 450,
        "validDays": "Mon - Fri",
        "paymentRestriction": "Prime eligible cards",
        "bookingRequirement": "Reserve slot via EazyDiner",
        "promoCode": "EAZYTOIT",
        "verifiedTag": "Prime Slot",
        "bankPartner": "Axis Flat 15% Off"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "15% Voucher Off",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 350,
        "minBill": 1200,
        "flatDiscount": 0,
        "validDays": "Daily",
        "paymentRestriction": "magicpin UPI",
        "bookingRequirement": "Redeem at checkout",
        "promoCode": "MAGICTOIT",
        "verifiedTag": "Voucher"
      }
    }
  },
  {
    "id": "real-mum-002",
    "name": "Pizza By The Bay",
    "tagline": "Panoramic Marine Drive views, classic deep-dish pizzas & sea breeze breakfasts",
    "locality": "Churchgate",
    "city": "Mumbai",
    "cuisine": [
      "Italian",
      "Cafe"
    ],
    "rating": 4.7,
    "reviewsCount": 7800,
    "costForTwo": 1800,
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
    "badge": "POPULAR",
    "occasion": [
      "Date Night",
      "Casual Hangout"
    ],
    "budgetTier": "1000-2000",
    "features": [
      "Marine Drive View",
      "Wood-fired Pizza",
      "Breakfast Spot",
      "Outdoor Seating"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "15% Off Total Bill",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 350,
        "minBill": 1200,
        "flatDiscount": 0,
        "validDays": "Mon - Fri 11 AM - 7 PM",
        "paymentRestriction": "Dineout Pay",
        "bookingRequirement": "Direct walk-in allowed",
        "promoCode": "BAY15",
        "verifiedTag": "Instant Cut",
        "bankPartner": "HDFC Extra 10% Off"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "Flat 20% Off via Gold",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 400,
        "minBill": 1400,
        "flatDiscount": 0,
        "validDays": "All days Lunch & Dinner",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Walk-in allowed",
        "promoCode": "GOLDBAY",
        "verifiedTag": "Gold Special"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹350 Off on min bill ₹1500",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 350,
        "minBill": 1500,
        "flatDiscount": 350,
        "validDays": "Mon - Sun",
        "paymentRestriction": "Select credit cards",
        "bookingRequirement": "Table slot booking",
        "promoCode": "EAZYBAY",
        "verifiedTag": "Table Booking",
        "bankPartner": "Axis Flat 15% Off"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "20% Magic Voucher",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 300,
        "minBill": 1000,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "magicpin balance",
        "bookingRequirement": "Redeem at billing desk",
        "promoCode": "MAGICBAY",
        "verifiedTag": "Voucher"
      }
    }
  },
  {
    "id": "real-mum-001",
    "name": "Bastian",
    "tagline": "Celebrity-favorite seafood sanctuary with truffle mac & cheese & decadent cheesecakes",
    "locality": "Bandra West",
    "city": "Mumbai",
    "cuisine": [
      "Multi-cuisine",
      "Italian"
    ],
    "rating": 4.9,
    "reviewsCount": 6100,
    "costForTwo": 3800,
    "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80",
    "badge": "BEST VALUE",
    "occasion": [
      "Date Night",
      "Birthday"
    ],
    "budgetTier": "2000-5000",
    "features": [
      "Celebrity Spotting",
      "Seafood Platters",
      "Valet Parking",
      "Artisanal Bakery"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "20% Off via Dineout Pay",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 900,
        "minBill": 3000,
        "flatDiscount": 0,
        "validDays": "Tue - Sun lunch and dinner",
        "paymentRestriction": "ICICI / HDFC Credit Cards extra 10%",
        "bookingRequirement": "Pre-booking required 2 hours prior",
        "promoCode": "BASTIAN20",
        "verifiedTag": "Dineout Special",
        "bankPartner": "HDFC Extra 10% Off"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "15% Off Total Bill",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 800,
        "minBill": 2500,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Table check-in on app",
        "promoCode": "GOLDBASTIAN",
        "verifiedTag": "Instant Cut"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹1000 Off with Prime Booking",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 1000,
        "minBill": 3500,
        "flatDiscount": 1000,
        "validDays": "Mon - Thu dinner only",
        "paymentRestriction": "IndusInd / Axis Bank Magnus",
        "bookingRequirement": "Compulsory table reservation",
        "promoCode": "PRIMEBASTIAN",
        "verifiedTag": "Mega Savings",
        "bankPartner": "Axis Flat 15% Off"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "12% Cashback Voucher",
        "discountType": "percentage",
        "discountPercent": 12,
        "maxDiscount": 500,
        "minBill": 2000,
        "flatDiscount": 0,
        "validDays": "All operating hours",
        "paymentRestriction": "magicpin UPI",
        "bookingRequirement": "Scan code at counter",
        "promoCode": "MAGICBASTIAN",
        "verifiedTag": "Cashback"
      }
    }
  },
  {
    "id": "real-del-003",
    "name": "Farzi Café",
    "tagline": "Modern Indian molecular gastronomy with whimsical presentation & artisanal drinks",
    "locality": "Connaught Place",
    "city": "Delhi NCR",
    "cuisine": [
      "North Indian",
      "Multi-cuisine"
    ],
    "rating": 4.8,
    "reviewsCount": 5600,
    "costForTwo": 2600,
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    "badge": "POPULAR",
    "occasion": [
      "Date Night",
      "Birthday",
      "Family Dinner"
    ],
    "budgetTier": "2000-5000",
    "features": [
      "Molecular Gastronomy",
      "Live Band",
      "Valet Parking",
      "Signature Cocktails"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "Flat 30% Off Total Bill",
        "discountType": "percentage",
        "discountPercent": 30,
        "maxDiscount": 800,
        "minBill": 2000,
        "flatDiscount": 0,
        "validDays": "Mon - Thu All Day, Fri lunch only",
        "paymentRestriction": "Dineout Pay with HDFC Cards",
        "bookingRequirement": "Advance slot booking mandatory",
        "promoCode": "FARZI30",
        "verifiedTag": "Super Saver",
        "bankPartner": "HDFC Extra 10% Off"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "20% Off up to ₹600",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 600,
        "minBill": 1800,
        "flatDiscount": 0,
        "validDays": "All days Lunch & Dinner",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Direct check-in",
        "promoCode": "GOLDFARZI",
        "verifiedTag": "Instant Gold"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹750 Off on ₹2500+",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 750,
        "minBill": 2500,
        "flatDiscount": 750,
        "validDays": "All days with Prime membership",
        "paymentRestriction": "IndusInd Pinnacle/Legend",
        "bookingRequirement": "Prime reservation",
        "promoCode": "FARZI750",
        "verifiedTag": "Prime Slot",
        "bankPartner": "Axis Flat 15% Off"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "15% Voucher Off",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 400,
        "minBill": 1600,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "magicpin app",
        "bookingRequirement": "Show code at bill",
        "promoCode": "MAGICFARZI",
        "verifiedTag": "E-Voucher"
      }
    }
  },
  {
    "id": "real-del-002",
    "name": "Mamagoto",
    "tagline": "Quirky Pan-Asian cafe with vibrant manga art, dumplings & wok bowls",
    "locality": "Khan Market",
    "city": "Delhi NCR",
    "cuisine": [
      "Chinese",
      "Japanese",
      "Multi-cuisine"
    ],
    "rating": 4.8,
    "reviewsCount": 2850,
    "costForTwo": 2200,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    "badge": "BEST VALUE",
    "occasion": [
      "Date Night",
      "Friends' Outing"
    ],
    "budgetTier": "2000-5000",
    "features": [
      "Dimsum Bar",
      "Craft Mocktails",
      "Cozy Ambience",
      "Vegan Options"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "Flat 25% Off Food Bill",
        "discountType": "percentage",
        "discountPercent": 25,
        "maxDiscount": 600,
        "minBill": 1500,
        "flatDiscount": 0,
        "validDays": "All days lunch & dinner",
        "paymentRestriction": "Dineout Pay via ICICI/HDFC cards",
        "bookingRequirement": "Table reservation recommended",
        "promoCode": "MAMA25",
        "verifiedTag": "Food Bill Only",
        "bankPartner": "HDFC Extra 10% Off"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "20% Off up to ₹500 on Total Bill",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 500,
        "minBill": 1400,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Walk-in allowed",
        "promoCode": "GOLDMAMA",
        "verifiedTag": "Instant"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹600 Off with Prime Table",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 600,
        "minBill": 2000,
        "flatDiscount": 600,
        "validDays": "Tue - Sun all slots",
        "paymentRestriction": "Axis Bank / IndusInd cards",
        "bookingRequirement": "Prime table confirmation",
        "promoCode": "PRIMEMAMA",
        "verifiedTag": "Prime Exclusive",
        "bankPartner": "Axis Flat 15% Off"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "18% Off Magic Voucher",
        "discountType": "percentage",
        "discountPercent": 18,
        "maxDiscount": 450,
        "minBill": 1500,
        "flatDiscount": 0,
        "validDays": "Daily",
        "paymentRestriction": "magicpin Pay",
        "bookingRequirement": "Voucher scan",
        "promoCode": "MAGICMAMA",
        "verifiedTag": "Voucher"
      }
    }
  },
  {
    "id": "real-del-001",
    "name": "Social",
    "tagline": "Iconic co-working cafe & energetic urban hangout with fusion street plates",
    "locality": "Cyber Hub, Gurugram",
    "city": "Delhi NCR",
    "cuisine": [
      "North Indian",
      "Multi-cuisine",
      "Cocktails"
    ],
    "rating": 4.7,
    "reviewsCount": 4200,
    "costForTwo": 1800,
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
    "badge": "MOST SAVED",
    "occasion": [
      "Friends' Outing",
      "Casual Hangout"
    ],
    "budgetTier": "1000-2000",
    "features": [
      "Live Sports",
      "DJ Nights",
      "Outdoor Deck",
      "Craft Cocktails"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "Flat 20% Off via Dineout Pay",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 500,
        "minBill": 1200,
        "flatDiscount": 0,
        "validDays": "Mon - Thu All Day, Fri - Sun till 7 PM",
        "paymentRestriction": "HDFC & Axis Bank credit cards extra 10% cashback",
        "bookingRequirement": "Pre-book slot 15 mins prior",
        "promoCode": "SOCIAL20",
        "verifiedTag": "Instant Dineout Pay",
        "bankPartner": "HDFC Extra 10% Off"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "15% Off Total Bill with Gold",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 400,
        "minBill": 1000,
        "flatDiscount": 0,
        "validDays": "All days Lunch & Dinner",
        "paymentRestriction": "Any payment mode on Zomato Pay",
        "bookingRequirement": "Walk-in allowed",
        "promoCode": "GOLDSOCIAL",
        "verifiedTag": "Instant Gold Cut"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹400 Off with Prime Booking",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 400,
        "minBill": 1600,
        "flatDiscount": 400,
        "validDays": "All days on table reservation",
        "paymentRestriction": "IndusInd Bank cards eligible",
        "bookingRequirement": "Table reservation required",
        "promoCode": "EAZYSOCIAL",
        "verifiedTag": "Prime Slot",
        "bankPartner": "Axis Flat 15% Off"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "15% Savings Voucher",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 300,
        "minBill": 1000,
        "flatDiscount": 0,
        "validDays": "All days 12 PM - 11 PM",
        "paymentRestriction": "magicpin UPI or Wallet",
        "bookingRequirement": "Redeem at cashier counter",
        "promoCode": "MAGICSOCIAL",
        "verifiedTag": "Voucher Deal"
      }
    }
  },
  {
    "id": "bb-punjabgr-d37e",
    "name": "Punjab Grill in Cyber Hub Gurugram",
    "tagline": "AI-Extracted gourmet dining with live cross-platform savings",
    "locality": "Cyber Hub Gurugram",
    "city": "Delhi NCR",
    "cuisine": [
      "Multi-cuisine",
      "North Indian"
    ],
    "rating": 4.7,
    "reviewsCount": 850,
    "costForTwo": 1600,
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    "badge": "BEST VALUE",
    "occasion": [
      "Date Night",
      "Friends' Outing"
    ],
    "budgetTier": "1000-2000",
    "features": [
      "AI Verified Deal",
      "Instant Cut",
      "Online Reservation"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "Flat 25% Off on Total Bill",
        "discountType": "percentage",
        "discountPercent": 25,
        "maxDiscount": 480,
        "minBill": 1200,
        "flatDiscount": 0,
        "validDays": "Mon - Thu all day, Fri - Sun till 7 PM",
        "paymentRestriction": "HDFC & Axis Bank credit cards eligible",
        "bookingRequirement": "Pre-booking required 20 mins prior",
        "promoCode": "DINEOUT25",
        "verifiedTag": "Instant Dineout Pay"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "Instant 20% Off via Gold",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 400,
        "minBill": 900,
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
        "offerTitle": "Flat ₹400 Off Prime Voucher",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 400,
        "minBill": 1200,
        "flatDiscount": 400,
        "validDays": "All days with Prime table booking",
        "paymentRestriction": "IndusInd Bank cards compatible",
        "bookingRequirement": "Mandatory table reservation",
        "promoCode": "PRIMEVALUE",
        "verifiedTag": "Prime Slot"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "17% Cashback Voucher",
        "discountType": "percentage",
        "discountPercent": 17,
        "maxDiscount": 300,
        "minBill": 700,
        "flatDiscount": 0,
        "validDays": "Daily 11 AM - 11 PM",
        "paymentRestriction": "magicpin wallet or UPI",
        "bookingRequirement": "Voucher scan at cashier desk",
        "promoCode": "MAGICDEAL",
        "verifiedTag": "Voucher Code"
      }
    }
  },
  {
    "id": "bb-001",
    "name": "Urban Spice Social",
    "tagline": "Modern Indian bistro with craft cocktails & artisanal tandoor",
    "locality": "Cyber Hub, Gurugram",
    "city": "Delhi NCR",
    "cuisine": [
      "North Indian",
      "Multi-cuisine",
      "Cocktails"
    ],
    "rating": 4.8,
    "reviewsCount": 1420,
    "costForTwo": 2200,
    "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
    "badge": "BEST VALUE",
    "occasion": [
      "Date Night",
      "Friends' Outing",
      "Casual Hangout"
    ],
    "budgetTier": "2000-5000",
    "features": [
      "Rooftop Seating",
      "Live Music",
      "Valet Parking",
      "Craft Cocktails"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "Flat 25% Off + Extra Bank Cashback",
        "discountType": "percentage",
        "discountPercent": 25,
        "maxDiscount": 600,
        "minBill": 1500,
        "flatDiscount": 0,
        "validDays": "Mon - Thu All Day, Fri - Sun till 7:00 PM",
        "paymentRestriction": "HDFC, Axis or ICICI Cards via Dineout Pay",
        "bookingRequirement": "Pre-booking required 30 mins prior",
        "promoCode": "DINEOUT25",
        "verifiedTag": "Instant Bill Off"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "20% Off on Dining Bill",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 450,
        "minBill": 1200,
        "flatDiscount": 0,
        "validDays": "All days (Lunch & Dinner)",
        "paymentRestriction": "Any payment mode via Zomato Pay",
        "bookingRequirement": "Walk-in pay via app allowed",
        "promoCode": "GOLD20",
        "verifiedTag": "Zero Reservation Fee"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹500 Off with Prime Booking",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 500,
        "minBill": 2000,
        "flatDiscount": 500,
        "validDays": "All days, Valid on table booking",
        "paymentRestriction": "IndusInd / Axis Bank cards eligible",
        "bookingRequirement": "Mandatory Prime reservation",
        "promoCode": "PRIME500",
        "verifiedTag": "Complimentary Dessert"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "15% Cashback Voucher",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 350,
        "minBill": 1000,
        "flatDiscount": 0,
        "validDays": "All days 12 PM - 11 PM",
        "paymentRestriction": "magicpin wallet / UPI",
        "bookingRequirement": "Voucher barcode scanned at billing",
        "promoCode": "MAGIC15",
        "verifiedTag": "Voucher Code"
      }
    }
  },
  {
    "id": "bb-002",
    "name": "Caffè Bella Vista",
    "tagline": "Wood-fired Neapolitan pizzas & handcrafted fresh pasta",
    "locality": "Indiranagar",
    "city": "Bengaluru",
    "cuisine": [
      "Italian",
      "Cafe"
    ],
    "rating": 4.7,
    "reviewsCount": 980,
    "costForTwo": 1600,
    "image": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    "badge": "POPULAR",
    "occasion": [
      "Date Night",
      "Casual Hangout"
    ],
    "budgetTier": "1000-2000",
    "features": [
      "Outdoor Patio",
      "Pet Friendly",
      "Wood-fired Oven",
      "Gelato Bar"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "15% Off Total Food Bill",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 300,
        "minBill": 1000,
        "flatDiscount": 0,
        "validDays": "All Days except Saturday Dinner",
        "paymentRestriction": "Pay via Swiggy app",
        "bookingRequirement": "Direct Dineout Pay",
        "promoCode": "PASTA15",
        "verifiedTag": "Food Bill Only"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "Flat 25% Off Total Bill",
        "discountType": "percentage",
        "discountPercent": 25,
        "maxDiscount": 500,
        "minBill": 1400,
        "flatDiscount": 0,
        "validDays": "All days Lunch & Dinner",
        "paymentRestriction": "Zomato Pay using UPI or Credit Card",
        "bookingRequirement": "Table check-in on app",
        "promoCode": "BELLA25",
        "verifiedTag": "Instant Bill Cut"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "20% Off + Free Garlic Bread",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 400,
        "minBill": 1200,
        "flatDiscount": 0,
        "validDays": "Tue - Sun, 12 PM - 10 PM",
        "paymentRestriction": "Select cards",
        "bookingRequirement": "Advance booking",
        "promoCode": "EAZYBELLA",
        "verifiedTag": "Add-on Freebie"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "Flat ₹250 Off Voucher",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 250,
        "minBill": 1200,
        "flatDiscount": 250,
        "validDays": "Mon - Fri",
        "paymentRestriction": "Any payment mode",
        "bookingRequirement": "Show voucher to server",
        "promoCode": "MAGIC250",
        "verifiedTag": "E-Gift Voucher"
      }
    }
  },
  {
    "id": "bb-003",
    "name": "Dragon Lantern Pan-Asian",
    "tagline": "Authentic Cantonese dim sums & Japanese robata grill",
    "locality": "Bandra West",
    "city": "Mumbai",
    "cuisine": [
      "Chinese",
      "Japanese",
      "Multi-cuisine"
    ],
    "rating": 4.9,
    "reviewsCount": 2150,
    "costForTwo": 2800,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    "badge": "BEST VALUE",
    "occasion": [
      "Date Night",
      "Family Dinner",
      "Birthday"
    ],
    "budgetTier": "2000-5000",
    "features": [
      "Private Dining",
      "Omakase Bar",
      "Valet",
      "Vegan Options"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "Flat 30% Off via Girf Pre-pay",
        "discountType": "percentage",
        "discountPercent": 30,
        "maxDiscount": 900,
        "minBill": 2200,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "Pre-bought deal voucher on Dineout",
        "bookingRequirement": "Show booking voucher upon entry",
        "promoCode": "GIRF30",
        "verifiedTag": "Super Saver"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "20% Off Up to ₹600",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 600,
        "minBill": 1800,
        "flatDiscount": 0,
        "validDays": "Mon - Thu lunch & dinner",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Walk-in eligible",
        "promoCode": "GOLDASIAN",
        "verifiedTag": "Instant Gold"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹800 Off on Bills > ₹2500",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 800,
        "minBill": 2500,
        "flatDiscount": 800,
        "validDays": "All days with Prime membership",
        "paymentRestriction": "IndusInd / HDFC bank cards",
        "bookingRequirement": "Table reservation compulsory",
        "promoCode": "PRIME800",
        "verifiedTag": "Prime Exclusive"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "18% Savings on Magic Voucher",
        "discountType": "percentage",
        "discountPercent": 18,
        "maxDiscount": 550,
        "minBill": 1500,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "UPI or Card via magicpin",
        "bookingRequirement": "Instant voucher redemption",
        "promoCode": "MAGICDRAGON",
        "verifiedTag": "Digital Voucher"
      }
    }
  },
  {
    "id": "bb-004",
    "name": "The Roasted Bean Roastery",
    "tagline": "Specialty brews, sourdough sandwiches & avocado bowls",
    "locality": "Koregaon Park",
    "city": "Pune",
    "cuisine": [
      "Cafe"
    ],
    "rating": 4.6,
    "reviewsCount": 740,
    "costForTwo": 850,
    "image": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
    "badge": "LOWEST BILL",
    "occasion": [
      "Casual Hangout",
      "Friends' Outing"
    ],
    "budgetTier": "500-1000",
    "features": [
      "High Speed WiFi",
      "Work Friendly",
      "Single Origin Coffee",
      "Acai Bowls"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "15% Off on Food & Beverages",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 180,
        "minBill": 500,
        "flatDiscount": 0,
        "validDays": "Mon - Fri 9 AM - 6 PM",
        "paymentRestriction": "Dineout Pay",
        "bookingRequirement": "No booking required",
        "promoCode": "BREW15",
        "verifiedTag": "Work Hours Deal"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "10% Off Instant Discount",
        "discountType": "percentage",
        "discountPercent": 10,
        "maxDiscount": 150,
        "minBill": 400,
        "flatDiscount": 0,
        "validDays": "Daily all operating hours",
        "paymentRestriction": "Any payment mode",
        "bookingRequirement": "Direct app payment",
        "promoCode": "CAFE10",
        "verifiedTag": "Instant"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹150 Off on min bill ₹700",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 150,
        "minBill": 700,
        "flatDiscount": 150,
        "validDays": "Mon - Sat",
        "paymentRestriction": "All major payment modes",
        "bookingRequirement": "Slot booking on app",
        "promoCode": "ROAST150",
        "verifiedTag": "Prime Slot"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "25% Off Magic Voucher",
        "discountType": "percentage",
        "discountPercent": 25,
        "maxDiscount": 220,
        "minBill": 600,
        "flatDiscount": 0,
        "validDays": "Daily",
        "paymentRestriction": "magicpin points & payment",
        "bookingRequirement": "Voucher redeem before bill printing",
        "promoCode": "MAGICBREW",
        "verifiedTag": "Top Cafe Deal"
      }
    }
  },
  {
    "id": "bb-005",
    "name": "Dhaba 1947 Heritage",
    "tagline": "Authentic buttery dal makhani, Amritsari kulche & succulent tikkas",
    "locality": "Connaught Place",
    "city": "Delhi NCR",
    "cuisine": [
      "North Indian"
    ],
    "rating": 4.8,
    "reviewsCount": 3100,
    "costForTwo": 1400,
    "image": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=1000&q=80",
    "badge": "MOST SAVED",
    "occasion": [
      "Family Dinner",
      "Friends' Outing"
    ],
    "budgetTier": "1000-2000",
    "features": [
      "Family Seating",
      "Pure Desi Ghee",
      "Traditional Decor",
      "Lassi Station"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "20% Off Food & Soft Drinks",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 400,
        "minBill": 1000,
        "flatDiscount": 0,
        "validDays": "Mon - Thu lunch & dinner",
        "paymentRestriction": "Swiggy Pay",
        "bookingRequirement": "Table booking recommended",
        "promoCode": "DHABA20",
        "verifiedTag": "Food Only"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "Flat 25% Off on Total Bill",
        "discountType": "percentage",
        "discountPercent": 25,
        "maxDiscount": 450,
        "minBill": 1200,
        "flatDiscount": 0,
        "validDays": "All days (Lunch & Dinner)",
        "paymentRestriction": "Any payment method on Zomato",
        "bookingRequirement": "Instant pay at table",
        "promoCode": "GOLDDHABA",
        "verifiedTag": "Best Seller"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹350 Off on Bill of ₹1400",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 350,
        "minBill": 1400,
        "flatDiscount": 350,
        "validDays": "All days except festival dates",
        "paymentRestriction": "IndusInd / Axis cards",
        "bookingRequirement": "Table reservation via EazyDiner",
        "promoCode": "DHABA350",
        "verifiedTag": "Prime Booking"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "15% Voucher Off",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 250,
        "minBill": 800,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "magicpin UPI",
        "bookingRequirement": "Redeem at billing desk",
        "promoCode": "MAGICDHABA",
        "verifiedTag": "Voucher Discount"
      }
    }
  },
  {
    "id": "bb-006",
    "name": "Sakura Kaiseki & Sushi Bar",
    "tagline": "Tokyo-trained chefs, bluefin sashimi & steaming miso ramen",
    "locality": "Jubilee Hills",
    "city": "Hyderabad",
    "cuisine": [
      "Japanese"
    ],
    "rating": 4.9,
    "reviewsCount": 890,
    "costForTwo": 3400,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1000&q=80",
    "badge": "POPULAR",
    "occasion": [
      "Date Night",
      "Birthday"
    ],
    "budgetTier": "2000-5000",
    "features": [
      "Omakase Counter",
      "Imported Fish",
      "Sake Pairings",
      "Zen Garden"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "20% Off on Food Bill",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 800,
        "minBill": 2500,
        "flatDiscount": 0,
        "validDays": "Tue - Sun lunch and dinner",
        "paymentRestriction": "Dineout Pay with ICICI/HDFC",
        "bookingRequirement": "Advance slot reservation",
        "promoCode": "SAKURA20",
        "verifiedTag": "Chef's Table"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "Flat 15% Off on Total Bill",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 700,
        "minBill": 2000,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Check-in at restaurant",
        "promoCode": "ZOMSAKURA",
        "verifiedTag": "Instant Cut"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹1000 Off on Bill of ₹3000+",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 1000,
        "minBill": 3000,
        "flatDiscount": 1000,
        "validDays": "Mon - Thu dinner only",
        "paymentRestriction": "Axis Bank Olympus / Magnus",
        "bookingRequirement": "Guaranteed table reservation",
        "promoCode": "SAKURA1000",
        "verifiedTag": "Mega Savings"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "10% Cashback on Magic voucher",
        "discountType": "percentage",
        "discountPercent": 10,
        "maxDiscount": 400,
        "minBill": 2000,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "magicpin app",
        "bookingRequirement": "Redeem during checkout",
        "promoCode": "MAGICSUSHI",
        "verifiedTag": "Cashback"
      }
    }
  },
  {
    "id": "bb-007",
    "name": "La Trattoria Toscana",
    "tagline": "Rustic Italian courtyard dining with truffle risotto and tiramisu",
    "locality": "Colaba",
    "city": "Mumbai",
    "cuisine": [
      "Italian"
    ],
    "rating": 4.8,
    "reviewsCount": 1650,
    "costForTwo": 2400,
    "image": "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80",
    "badge": "BEST VALUE",
    "occasion": [
      "Date Night",
      "Birthday"
    ],
    "budgetTier": "2000-5000",
    "features": [
      "Candlelit Courtyard",
      "Sommelier on site",
      "Handmade Pasta",
      "Vegan Options"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "25% Off Total Bill",
        "discountType": "percentage",
        "discountPercent": 25,
        "maxDiscount": 700,
        "minBill": 1800,
        "flatDiscount": 0,
        "validDays": "All days except Saturday dinner",
        "paymentRestriction": "Dineout Pay",
        "bookingRequirement": "Book slot 1 hr in advance",
        "promoCode": "TOSCANA25",
        "verifiedTag": "Dineout Gold"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "20% Off up to ₹500",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 500,
        "minBill": 1500,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Instant pay via app",
        "promoCode": "GOLDITALY",
        "verifiedTag": "Instant"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹600 Off + Glass of Wine",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 600,
        "minBill": 2200,
        "flatDiscount": 600,
        "validDays": "Wed - Sun",
        "paymentRestriction": "Prime eligible cards",
        "bookingRequirement": "EazyDiner table booking",
        "promoCode": "PRIME600",
        "verifiedTag": "Free Beverage"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "15% Voucher Off",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 350,
        "minBill": 1200,
        "flatDiscount": 0,
        "validDays": "Mon - Fri",
        "paymentRestriction": "Any payment mode",
        "bookingRequirement": "Present voucher code",
        "promoCode": "MAGICTUSCANY",
        "verifiedTag": "Voucher"
      }
    }
  },
  {
    "id": "bb-008",
    "name": "Bao & Dimsum Studio",
    "tagline": "Fluffy steamed baos, crystal shrimp dumplings & sizzling hot pots",
    "locality": "Koramangala",
    "city": "Bengaluru",
    "cuisine": [
      "Chinese",
      "Cafe"
    ],
    "rating": 4.5,
    "reviewsCount": 1100,
    "costForTwo": 950,
    "image": "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1000&q=80",
    "badge": "LOWEST BILL",
    "occasion": [
      "Casual Hangout",
      "Friends' Outing"
    ],
    "budgetTier": "500-1000",
    "features": [
      "Neon Aesthetics",
      "Quick Bites",
      "Bubble Tea Bar",
      "Late Night"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "Flat 20% Off Bill",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 250,
        "minBill": 700,
        "flatDiscount": 0,
        "validDays": "Mon - Thu all day",
        "paymentRestriction": "Swiggy UPI or Credit card",
        "bookingRequirement": "Walk-in pay via Dineout",
        "promoCode": "BAO20",
        "verifiedTag": "Instant"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "15% Off Total Bill",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 200,
        "minBill": 600,
        "flatDiscount": 0,
        "validDays": "Daily all day",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Direct payment",
        "promoCode": "DIMSUM15",
        "verifiedTag": "Zero Wait"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹200 Off on min bill ₹800",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 200,
        "minBill": 800,
        "flatDiscount": 200,
        "validDays": "Mon - Sat",
        "paymentRestriction": "All cards accepted",
        "bookingRequirement": "Slot confirmation",
        "promoCode": "BAOSTUDIO",
        "verifiedTag": "Table Reserve"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "30% Off on Food Voucher",
        "discountType": "percentage",
        "discountPercent": 30,
        "maxDiscount": 300,
        "minBill": 750,
        "flatDiscount": 0,
        "validDays": "Daily",
        "paymentRestriction": "magicpin Pay",
        "bookingRequirement": "Show voucher code at register",
        "promoCode": "MAGICBAO",
        "verifiedTag": "Mega Savings"
      }
    }
  },
  {
    "id": "bb-009",
    "name": "The Royal Awadh Darbar",
    "tagline": "Dum pukht biryanis, melt-in-mouth galouti kebabs & sheermal",
    "locality": "Banjara Hills",
    "city": "Hyderabad",
    "cuisine": [
      "North Indian",
      "Multi-cuisine"
    ],
    "rating": 4.8,
    "reviewsCount": 2450,
    "costForTwo": 1900,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
    "badge": "MOST SAVED",
    "occasion": [
      "Family Dinner",
      "Birthday"
    ],
    "budgetTier": "1000-2000",
    "features": [
      "Royal Seating",
      "Live Gazal Evenings",
      "Mughlai Recipes",
      "Spacious Hall"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "20% Off on Dineout Pay",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 450,
        "minBill": 1500,
        "flatDiscount": 0,
        "validDays": "Mon - Sun",
        "paymentRestriction": "Dineout Pay with any card",
        "bookingRequirement": "Booking encouraged",
        "promoCode": "AWADH20",
        "verifiedTag": "Instant"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "Flat 25% Off up to ₹500",
        "discountType": "percentage",
        "discountPercent": 25,
        "maxDiscount": 500,
        "minBill": 1600,
        "flatDiscount": 0,
        "validDays": "All days lunch & dinner",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Table check-in on app",
        "promoCode": "GOLDAWADH",
        "verifiedTag": "Gold Special"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹500 Off with Table Reservation",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 500,
        "minBill": 1800,
        "flatDiscount": 500,
        "validDays": "All days",
        "paymentRestriction": "IndusInd / Axis / ICICI cards",
        "bookingRequirement": "Prime table confirmation",
        "promoCode": "DARBAR500",
        "verifiedTag": "Prime Value"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "15% Voucher Savings",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 350,
        "minBill": 1200,
        "flatDiscount": 0,
        "validDays": "Daily",
        "paymentRestriction": "magicpin app",
        "bookingRequirement": "Redeem during payment",
        "promoCode": "MAGICAWADH",
        "verifiedTag": "Voucher"
      }
    }
  },
  {
    "id": "bb-010",
    "name": "Skyline Brewery & Kitchen",
    "tagline": "Panoramic 180° city views, artisanal wheat beers & woodfired burgers",
    "locality": "Viman Nagar",
    "city": "Pune",
    "cuisine": [
      "Multi-cuisine",
      "Cafe",
      "North Indian"
    ],
    "rating": 4.7,
    "reviewsCount": 1890,
    "costForTwo": 2100,
    "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1000&q=80",
    "badge": "POPULAR",
    "occasion": [
      "Friends' Outing",
      "Birthday",
      "Date Night"
    ],
    "budgetTier": "2000-5000",
    "features": [
      "Open Air Rooftop",
      "Microbrewery",
      "DJ Sets",
      "Sports Screening"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "30% Off Total Bill",
        "discountType": "percentage",
        "discountPercent": 30,
        "maxDiscount": 750,
        "minBill": 1800,
        "flatDiscount": 0,
        "validDays": "Mon - Thu all day, Fri till 6 PM",
        "paymentRestriction": "Dineout Pay",
        "bookingRequirement": "Advance slot reservation",
        "promoCode": "SKYBREW30",
        "verifiedTag": "Brewery Special"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "20% Off on Food & Drinks",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 500,
        "minBill": 1500,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Direct app payment",
        "promoCode": "GOLDSKY",
        "verifiedTag": "Instant"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹550 Off + Beer Sampler",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 550,
        "minBill": 2000,
        "flatDiscount": 550,
        "validDays": "Tue - Sun",
        "paymentRestriction": "Prime supported cards",
        "bookingRequirement": "Reserve table on EazyDiner",
        "promoCode": "PRIMESKY",
        "verifiedTag": "Free Tasting"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "20% Off Magic Voucher",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 450,
        "minBill": 1400,
        "flatDiscount": 0,
        "validDays": "Mon - Fri",
        "paymentRestriction": "magicpin balance or UPI",
        "bookingRequirement": "Voucher scan at bar counter",
        "promoCode": "MAGICBREWERY",
        "verifiedTag": "Voucher Code"
      }
    }
  },
  {
    "id": "bb-011",
    "name": "Chai Tapri & Street Gourmet",
    "tagline": "Kulhad chai, artisanal bun maska, samosa sliders & loaded fries",
    "locality": "Khar West",
    "city": "Mumbai",
    "cuisine": [
      "Cafe",
      "North Indian"
    ],
    "rating": 4.6,
    "reviewsCount": 650,
    "costForTwo": 450,
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
    "badge": "LOWEST BILL",
    "occasion": [
      "Casual Hangout"
    ],
    "budgetTier": "under500",
    "features": [
      "Quick Service",
      "Outdoor Benches",
      "Pocket Friendly",
      "Midnight Munchies"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "10% Off via Dineout Pay",
        "discountType": "percentage",
        "discountPercent": 10,
        "maxDiscount": 80,
        "minBill": 300,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "Any payment mode",
        "bookingRequirement": "No booking needed",
        "promoCode": "TAPRI10",
        "verifiedTag": "Instant"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "15% Off Total Bill",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 100,
        "minBill": 350,
        "flatDiscount": 0,
        "validDays": "Daily 8 AM - 12 AM",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Pay bill directly",
        "promoCode": "CHAI15",
        "verifiedTag": "Instant Cut"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹50 Off on min bill ₹300",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 50,
        "minBill": 300,
        "flatDiscount": 50,
        "validDays": "All days",
        "paymentRestriction": "All online payments",
        "bookingRequirement": "Walk-in check-in",
        "promoCode": "TAPRI50",
        "verifiedTag": "Pocket Saver"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "25% Cashback on Magic voucher",
        "discountType": "percentage",
        "discountPercent": 25,
        "maxDiscount": 120,
        "minBill": 300,
        "flatDiscount": 0,
        "validDays": "All days",
        "paymentRestriction": "magicpin Pay",
        "bookingRequirement": "Barcode scan",
        "promoCode": "MAGICTAPRI",
        "verifiedTag": "Super Saver"
      }
    }
  },
  {
    "id": "bb-012",
    "name": "Olive & Herb Mediterranean",
    "tagline": "Sunlit greenhouse dining, mezze platters & Greek lamb chops",
    "locality": "Kavuri Hills",
    "city": "Hyderabad",
    "cuisine": [
      "Multi-cuisine",
      "Italian"
    ],
    "rating": 4.8,
    "reviewsCount": 1320,
    "costForTwo": 2300,
    "image": "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1000&q=80",
    "badge": "BEST VALUE",
    "occasion": [
      "Date Night",
      "Friends' Outing"
    ],
    "budgetTier": "2000-5000",
    "features": [
      "Greenhouse Glassroom",
      "Cocktail Bar",
      "Live Saxophone",
      "Gluten Free"
    ],
    "platforms": {
      "swiggy": {
        "platformName": "Swiggy Dineout",
        "brandColor": "#FC8019",
        "offerTitle": "20% Off on Food Bill",
        "discountType": "percentage",
        "discountPercent": 20,
        "maxDiscount": 500,
        "minBill": 1600,
        "flatDiscount": 0,
        "validDays": "Mon - Thu lunch & dinner",
        "paymentRestriction": "Dineout Pay with credit card",
        "bookingRequirement": "Book 1 hour before arrival",
        "promoCode": "OLIVE20",
        "verifiedTag": "Dineout Offer"
      },
      "zomato": {
        "platformName": "Zomato Gold",
        "brandColor": "#E23744",
        "offerTitle": "25% Off Total Bill",
        "discountType": "percentage",
        "discountPercent": 25,
        "maxDiscount": 650,
        "minBill": 1800,
        "flatDiscount": 0,
        "validDays": "All days (Lunch & Dinner)",
        "paymentRestriction": "Zomato Pay",
        "bookingRequirement": "Instant pay via app",
        "promoCode": "GOLDOLIVE",
        "verifiedTag": "Instant"
      },
      "eazydiner": {
        "platformName": "EazyDiner Prime",
        "brandColor": "#7B2CBF",
        "offerTitle": "Flat ₹600 Off with Prime",
        "discountType": "flat",
        "discountPercent": 0,
        "maxDiscount": 600,
        "minBill": 2200,
        "flatDiscount": 600,
        "validDays": "All days except Sunday brunch",
        "paymentRestriction": "IndusInd cards",
        "bookingRequirement": "Reservation compulsory",
        "promoCode": "PRIMEOLIVE",
        "verifiedTag": "Prime Table"
      },
      "magicpin": {
        "platformName": "magicpin",
        "brandColor": "#00B4D8",
        "offerTitle": "15% Voucher Off",
        "discountType": "percentage",
        "discountPercent": 15,
        "maxDiscount": 400,
        "minBill": 1500,
        "flatDiscount": 0,
        "validDays": "Daily",
        "paymentRestriction": "magicpin balance / cards",
        "bookingRequirement": "Voucher redemption at bill",
        "promoCode": "MAGICOLIVE",
        "verifiedTag": "Voucher Discount"
      }
    }
  }
];

// Curated Popular Categories
const POPULAR_CATEGORIES = [
  { id: "cat-rooftop", name: "Rooftop Vistas", icon: "cloud-sun", count: "34 Places", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-date", name: "Romantic Dinners", icon: "heart", count: "48 Places", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-brewery", name: "Craft Breweries", icon: "beer", count: "26 Places", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-asian", name: "Sushi & Dimsums", icon: "soup", count: "41 Places", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-cafe", name: "Pocket Cafes", icon: "coffee", count: "55 Places", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=80" },
  { id: "cat-family", name: "Royal Buffets", icon: "utensils", count: "29 Places", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80" }
];

// Locations supported in prototype
const CITIES_LIST = [
  { name: "Delhi NCR", localities: ["Cyber Hub, Gurugram", "Connaught Place", "Hauz Khas Village", "Noida Sector 18", "Aerocity"] },
  { name: "Bengaluru", localities: ["Indiranagar", "Koramangala", "Lavelle Road", "Whitefield", "HSR Layout"] },
  { name: "Mumbai", localities: ["Bandra West", "Colaba", "Khar West", "Lower Parel", "Juhu"] },
  { name: "Pune", localities: ["Koregaon Park", "Viman Nagar", "Kalyani Nagar", "Balewadi High St"] },
  { name: "Hyderabad", localities: ["Jubilee Hills", "Banjara Hills", "Kavuri Hills", "Gachibowli"] }
];

// FAQs Data
const FAQS_DATA = [
  {
    q: "How does BachatBites calculate the lowest dining bill?",
    a: "BachatBites runs an eligibility algorithm across all leading platforms (Zomato Gold, Swiggy Dineout, EazyDiner Prime, and magicpin) against your estimated bill amount. We test minimum spend rules, maximum cap limits, flat voucher thresholds, and payment prerequisites to reveal the true out-of-pocket payable amount before you reserve or pay."
  },
  {
    q: "Can I combine multiple offers or bank credit card discounts?",
    a: "No single dining platform allows stacking incompatible coupons. However, some platforms (like Swiggy Dineout or EazyDiner) permit an app discount plus a secondary bank partner cashback (e.g. HDFC/IndusInd credit cards). BachatBites explicitly notes payment conditions so you don't face surprises at the billing counter."
  },
  {
    q: "Do I book directly on BachatBites or on the respective app?",
    a: "BachatBites is an unbiased discovery and price comparison engine. Once you find the best deal, we provide the exact promo code, booking guidelines, and direct booking steps to complete your reservation or bill payment on the winning platform."
  },
  {
    q: "Is the data shown live or guaranteed by the restaurant?",
    a: "Currently, BachatBites displays illustrative demo data reflecting typical platform discounts in metropolitan cities. We are actively developing direct API integrations with dining platforms for live real-time rate verification."
  },
  {
    q: "How do I save places I want to visit later?",
    a: "Click the heart icon on any restaurant card. Your favorites are securely saved in your browser's local storage and accessible anytime from the 'Saved Places' button in the navigation bar."
  }
];

// Export to window for vanilla JS modularity
if (typeof window !== "undefined") {
  window.RESTAURANTS_DATA = RESTAURANTS_DATA;
  window.POPULAR_CATEGORIES = POPULAR_CATEGORIES;
  window.CITIES_LIST = CITIES_LIST;
  window.FAQS_DATA = FAQS_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { RESTAURANTS_DATA, POPULAR_CATEGORIES, CITIES_LIST, FAQS_DATA };
}
