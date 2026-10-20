/**
 * BachatBites - Core JavaScript Engine
 * Handles deal calculation, filtering, 3D tilt effects, modals, and persistence.
 */

(function () {
  'use strict';

  // --- STATE MANAGEMENT ---
  const state = {
    restaurants: window.RESTAURANTS_DATA || [],
    currentCity: 'All',
    currentLocality: 'All',
    selectedCuisine: 'All',
    selectedOccasion: 'All',
    maxBudget: 5000,
    searchQuery: '',
    sortBy: 'recommended',
    quickFilter: 'all',
    partySize: 2,
    diningDate: '',
    diningTime: '19:30',
    favorites: JSON.parse(localStorage.getItem('bb_favorites') || '[]'),
    currentUser: JSON.parse(localStorage.getItem('bb_user') || 'null'),
    activeCompareRestaurant: null,
    activeCompareBill: 2000
  };

  // --- CORE DISCOUNT CALCULATION ENGINE ---
  /**
   * Calculates platform deal eligibility, savings, and net payable amount.
   * @param {number} billAmount 
   * @param {object} platformOffer 
   * @returns {object} Calculated deal breakdown
   */
  function calculateDeal(billAmount, platformOffer) {
    if (!platformOffer) return null;

    const minBill = platformOffer.minBill || 0;
    const isEligible = billAmount >= minBill;

    if (!isEligible) {
      const shortfall = minBill - billAmount;
      return {
        isEligible: false,
        ineligibleReason: `Min bill ₹${minBill.toLocaleString('en-IN')} required (Add ₹${shortfall.toLocaleString('en-IN')} more to unlock)`,
        rawDiscount: 0,
        discountAmount: 0,
        finalBill: billAmount,
        savingsPercent: 0,
        effectiveDiscount: 0
      };
    }

    let discount = 0;
    if (platformOffer.discountType === 'percentage') {
      const raw = (billAmount * platformOffer.discountPercent) / 100;
      discount = platformOffer.maxDiscount ? Math.min(raw, platformOffer.maxDiscount) : raw;
    } else if (platformOffer.discountType === 'flat') {
      discount = Math.min(platformOffer.flatDiscount || 0, billAmount);
    }

    // Ensure non-negative discount
    discount = Math.max(0, Math.round(discount));
    const finalBill = Math.max(0, billAmount - discount);
    const savingsPercent = billAmount > 0 ? Math.round((discount / billAmount) * 100) : 0;

    return {
      isEligible: true,
      ineligibleReason: null,
      rawDiscount: discount,
      discountAmount: discount,
      finalBill: finalBill,
      savingsPercent: savingsPercent,
      effectiveDiscount: discount
    };
  }

  /**
   * Evaluates all platforms for a restaurant and determines the best deal.
   * @param {object} restaurant 
   * @param {number} billAmount 
   * @returns {object} Ranked platforms with winner badge
   */
  function evaluateAllPlatforms(restaurant, billAmount) {
    const results = [];
    const platforms = restaurant.platforms;

    for (const [key, offer] of Object.entries(platforms)) {
      const calc = calculateDeal(billAmount, offer);
      results.push({
        platformKey: key,
        offerData: offer,
        calc: calc
      });
    }

    // Sort by lowest final bill among eligible, or by highest discount
    results.sort((a, b) => {
      if (a.calc.isEligible && !b.calc.isEligible) return -1;
      if (!a.calc.isEligible && b.calc.isEligible) return 1;
      return a.calc.finalBill - b.calc.finalBill;
    });

    const eligibleDeals = results.filter(r => r.calc.isEligible);
    const bestDealKey = eligibleDeals.length > 0 ? eligibleDeals[0].platformKey : null;

    return {
      evaluatedList: results,
      bestDealKey: bestDealKey,
      bestDealItem: eligibleDeals.length > 0 ? eligibleDeals[0] : null
    };
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message, type = 'info', icon = 'bell') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <i data-lucide="${icon}" class="toast-icon"></i>
      <span class="toast-msg">${escapeHtml(message)}</span>
      <button class="toast-close" aria-label="Close">&times;</button>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.add('toast-visible');
    });

    const removeToast = () => {
      toast.classList.remove('toast-visible');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    };

    toast.querySelector('.toast-close').addEventListener('click', removeToast);
    setTimeout(removeToast, 4000);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // --- FAVORITES HANDLING ---
  function isFavorite(restaurantId) {
    return state.favorites.includes(restaurantId);
  }

  function toggleFavorite(restaurantId) {
    const index = state.favorites.indexOf(restaurantId);
    let added = false;
    if (index > -1) {
      state.favorites.splice(index, 1);
      showToast('Removed from Saved Places', 'info', 'bookmark-minus');
    } else {
      state.favorites.push(restaurantId);
      added = true;
      showToast('Saved to your Dining Wishlist!', 'success', 'bookmark-check');
    }
    localStorage.setItem('bb_favorites', JSON.stringify(state.favorites));
    updateFavoritesUI();
    renderRestaurants();
  }

  function updateFavoritesUI() {
    const countBadge = document.getElementById('saved-count-badge');
    if (countBadge) {
      countBadge.textContent = state.favorites.length;
      countBadge.style.display = state.favorites.length > 0 ? 'inline-flex' : 'none';
    }
    renderSavedPlacesDrawer();
  }

  // --- FILTERING & SORTING LOGIC ---
  function getFilteredRestaurants() {
    let list = [...state.restaurants];

    // City Filter
    if (state.currentCity && state.currentCity !== 'All') {
      list = list.filter(r => r.city.toLowerCase() === state.currentCity.toLowerCase());
    }

    // Locality Filter
    if (state.currentLocality && state.currentLocality !== 'All') {
      list = list.filter(r => r.locality.toLowerCase().includes(state.currentLocality.toLowerCase()));
    }

    // Cuisine Filter
    if (state.selectedCuisine && state.selectedCuisine !== 'All') {
      list = list.filter(r => r.cuisine.some(c => c.toLowerCase() === state.selectedCuisine.toLowerCase()));
    }

    // Occasion Filter
    if (state.selectedOccasion && state.selectedOccasion !== 'All') {
      list = list.filter(r => r.occasion.some(o => o.toLowerCase() === state.selectedOccasion.toLowerCase()));
    }

    // Budget Filter (Cost for two <= maxBudget)
    if (state.maxBudget) {
      list = list.filter(r => r.costForTwo <= state.maxBudget);
    }

    // Text Search Query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.tagline.toLowerCase().includes(q) ||
        r.locality.toLowerCase().includes(q) ||
        r.city.toLowerCase().includes(q) ||
        r.cuisine.some(c => c.toLowerCase().includes(q))
      );
    }

    // Quick Filter Badges
    if (state.quickFilter === 'under1000') {
      list = list.filter(r => r.costForTwo <= 1000);
    } else if (state.quickFilter === 'topRated') {
      list = list.filter(r => r.rating >= 4.7);
    } else if (state.quickFilter === 'bestValue') {
      list = list.filter(r => r.badge === 'BEST VALUE');
    } else if (state.quickFilter === 'dateNight') {
      list = list.filter(r => r.occasion.includes('Date Night'));
    }

    // Sorting
    if (state.sortBy === 'lowest-bill') {
      list.sort((a, b) => {
        const evalA = evaluateAllPlatforms(a, a.costForTwo).bestDealItem;
        const evalB = evaluateAllPlatforms(b, b.costForTwo).bestDealItem;
        const finalA = evalA ? evalA.calc.finalBill : a.costForTwo;
        const finalB = evalB ? evalB.calc.finalBill : b.costForTwo;
        return finalA - finalB;
      });
    } else if (state.sortBy === 'highest-savings') {
      list.sort((a, b) => {
        const evalA = evaluateAllPlatforms(a, a.costForTwo).bestDealItem;
        const evalB = evaluateAllPlatforms(b, b.costForTwo).bestDealItem;
        const savA = evalA ? evalA.calc.discountAmount : 0;
        const savB = evalB ? evalB.calc.discountAmount : 0;
        return savB - savA;
      });
    } else if (state.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (state.sortBy === 'cost-asc') {
      list.sort((a, b) => a.costForTwo - b.costForTwo);
    } else if (state.sortBy === 'cost-desc') {
      list.sort((a, b) => b.costForTwo - a.costForTwo);
    }

    return list;
  }

  // --- RENDERING RESTAURANT CARDS ---
  function renderRestaurants() {
    const grid = document.getElementById('restaurants-grid');
    const countDisplay = document.getElementById('results-count');
    const emptyState = document.getElementById('empty-results-state');

    if (!grid) return;

    const filtered = getFilteredRestaurants();

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} dining destination${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    let html = '';
    filtered.forEach(restaurant => {
      const evaluation = evaluateAllPlatforms(restaurant, restaurant.costForTwo);
      const best = evaluation.bestDealItem;
      const bestPlatform = best ? best.offerData.platformName : 'Zomato Gold';
      const bestSavings = best ? best.calc.discountAmount : 0;
      const bestFinalBill = best ? best.calc.finalBill : restaurant.costForTwo;
      const isFav = isFavorite(restaurant.id);

      // Badge class
      let badgeClass = 'badge-purple';
      if (restaurant.badge === 'BEST VALUE') badgeClass = 'badge-orange';
      if (restaurant.badge === 'LOWEST BILL') badgeClass = 'badge-green';

      html += `
        <article class="restaurant-card" data-id="${restaurant.id}" tabindex="0">
          <div class="card-media-wrapper">
            <img src="${restaurant.image}" alt="${escapeHtml(restaurant.name)}" loading="lazy" class="card-image" />
            <div class="card-overlay-top">
              <span class="status-pill ${badgeClass}">${restaurant.badge}</span>
              <button class="fav-btn ${isFav ? 'active' : ''}" data-fav-id="${restaurant.id}" aria-label="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                <i data-lucide="heart" class="fav-icon ${isFav ? 'fill-current' : ''}"></i>
              </button>
            </div>
            <div class="card-overlay-bottom">
              <span class="rating-badge">
                <i data-lucide="star" class="icon-star"></i>
                <strong>${restaurant.rating.toFixed(1)}</strong>
                <span class="reviews-count">(${restaurant.reviewsCount})</span>
              </span>
              <span class="locality-tag">
                <i data-lucide="map-pin" class="icon-tiny"></i> ${escapeHtml(restaurant.locality)}
              </span>
            </div>
          </div>

          <div class="card-content">
            <div class="card-header-row">
              <h3 class="restaurant-name">${escapeHtml(restaurant.name)}</h3>
            </div>
            <p class="restaurant-tagline">${escapeHtml(restaurant.tagline)}</p>

            <div class="cuisine-tags">
              ${restaurant.cuisine.map(c => `<span class="cuisine-tag">${escapeHtml(c)}</span>`).join('')}
            </div>

            <!-- Platform Offers Badges Row -->
            <div class="platform-chips-row">
              <span class="platform-chip chip-swiggy" title="Swiggy Dineout Available">
                <span class="chip-dot"></span> Dineout
              </span>
              <span class="platform-chip chip-zomato" title="Zomato Gold Available">
                <span class="chip-dot"></span> Zomato
              </span>
              <span class="platform-chip chip-eazy" title="EazyDiner Prime Available">
                <span class="chip-dot"></span> EazyDiner
              </span>
              <span class="platform-chip chip-magic" title="magicpin Available">
                <span class="chip-dot"></span> magicpin
              </span>
            </div>

            <!-- Deal Price Summary Box -->
            <div class="deal-summary-box">
              <div class="deal-best-platform">
                <span class="trophy-tag"><i data-lucide="zap" class="icon-tiny"></i> Top Deal via ${bestPlatform}</span>
                <span class="deal-savings-tag">Save ₹${bestSavings.toLocaleString('en-IN')}</span>
              </div>
              <div class="price-breakdown-row">
                <div class="price-col">
                  <span class="price-label">Cost for Two</span>
                  <span class="original-price">₹${restaurant.costForTwo.toLocaleString('en-IN')}</span>
                </div>
                <div class="arrow-col">
                  <i data-lucide="arrow-right" class="icon-arrow"></i>
                </div>
                <div class="price-col final-col">
                  <span class="price-label">Best Net Bill</span>
                  <span class="final-price">₹${bestFinalBill.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <!-- Card Actions -->
            <div class="card-footer-actions">
              <button class="btn-compare-deal" data-compare-id="${restaurant.id}">
                <i data-lucide="git-compare" class="icon-btn"></i> Compare 4 Apps
              </button>
              <button class="btn-quick-view" data-view-id="${restaurant.id}" title="Instant breakdown">
                <i data-lucide="external-link" class="icon-btn"></i> View Deal
              </button>
            </div>
          </div>
        </article>
      `;
    });

    grid.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    // Attach card event listeners
    attachCardListeners();
  }

  // --- CARD 3D TILT INTERACTION ---
  function attachCardListeners() {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('.restaurant-card').forEach(card => {
      // Favorite button
      const favBtn = card.querySelector('.fav-btn');
      if (favBtn) {
        favBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = favBtn.getAttribute('data-fav-id');
          toggleFavorite(id);
        });
      }

      // Compare button
      const compareBtn = card.querySelector('.btn-compare-deal');
      if (compareBtn) {
        compareBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = compareBtn.getAttribute('data-compare-id');
          openComparisonModal(id);
        });
      }

      // Quick View button
      const viewBtn = card.querySelector('.btn-quick-view');
      if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const id = viewBtn.getAttribute('data-view-id');
          openComparisonModal(id);
        });
      }

      // 3D subtle tilt on desktop non-reduced-motion
      if (!isTouch && !prefersReducedMotion) {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg
          const rotateY = ((x - centerX) / centerX) * 6;  // Max 6 deg

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
      }
    });
  }

  // --- COMPARISON MODAL LOGIC (CORE FEATURE) ---
  function openComparisonModal(restaurantId) {
    const restaurant = state.restaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;

    state.activeCompareRestaurant = restaurant;
    // Default bill amount to cost for two or previously selected budget
    state.activeCompareBill = restaurant.costForTwo;

    const modal = document.getElementById('comparison-modal');
    if (!modal) return;

    // Populate restaurant summary info in modal
    document.getElementById('modal-restaurant-name').textContent = restaurant.name;
    document.getElementById('modal-restaurant-meta').textContent = `${restaurant.locality} • ${restaurant.cuisine.join(', ')}`;
    document.getElementById('modal-restaurant-rating').innerHTML = `
      <i data-lucide="star" class="icon-star"></i> ${restaurant.rating.toFixed(1)} (${restaurant.reviewsCount} reviews)
    `;

    // Set slider and number input
    const billSlider = document.getElementById('modal-bill-slider');
    const billInput = document.getElementById('modal-bill-input');
    if (billSlider && billInput) {
      billSlider.value = state.activeCompareBill;
      billInput.value = state.activeCompareBill;
    }

    // Render platforms comparison grid & chart
    renderComparisonTable();

    // Show modal
    modal.classList.add('modal-active');
    document.body.classList.add('modal-open');

    if (window.lucide) window.lucide.createIcons();
  }

  function closeComparisonModal() {
    const modal = document.getElementById('comparison-modal');
    if (modal) {
      modal.classList.remove('modal-active');
      document.body.classList.remove('modal-open');
    }
  }

  function renderComparisonTable() {
    const restaurant = state.activeCompareRestaurant;
    if (!restaurant) return;

    const bill = Number(state.activeCompareBill) || 0;
    const evaluation = evaluateAllPlatforms(restaurant, bill);
    const container = document.getElementById('modal-platforms-container');
    const chartContainer = document.getElementById('modal-chart-bars');

    if (!container) return;

    let cardsHtml = '';
    let chartHtml = '';

    evaluation.evaluatedList.forEach(item => {
      const isBest = item.platformKey === evaluation.bestDealKey;
      const offer = item.offerData;
      const calc = item.calc;

      // Platform badge class
      let platClass = 'plat-generic';
      if (item.platformKey === 'swiggy') platClass = 'plat-swiggy';
      if (item.platformKey === 'zomato') platClass = 'plat-zomato';
      if (item.platformKey === 'eazydiner') platClass = 'plat-eazy';
      if (item.platformKey === 'magicpin') platClass = 'plat-magic';

      // Bar percentage relative to original bill
      const barPercent = bill > 0 ? Math.min(100, Math.max(15, Math.round((calc.finalBill / bill) * 100))) : 0;

      cardsHtml += `
        <div class="platform-deal-card ${platClass} ${isBest ? 'is-best-deal' : ''}">
          ${isBest ? `
            <div class="best-deal-ribbon">
              <i data-lucide="crown" class="icon-crown"></i>
              <span>BEST DEAL • SAVE ₹${calc.discountAmount.toLocaleString('en-IN')}</span>
            </div>
          ` : ''}

          <div class="plat-card-header">
            <div class="plat-brand-badge">
              <span class="plat-dot"></span>
              <strong>${escapeHtml(offer.platformName)}</strong>
            </div>
            <span class="plat-tag">${escapeHtml(offer.verifiedTag)}</span>
          </div>

          <h4 class="plat-offer-title">${escapeHtml(offer.offerTitle)}</h4>

          <!-- Eligibility Status -->
          ${calc.isEligible ? `
            <div class="eligibility-banner eligible">
              <i data-lucide="check-circle-2" class="icon-status"></i>
              <span>Eligible for instant discount!</span>
            </div>
          ` : `
            <div class="eligibility-banner ineligible">
              <i data-lucide="alert-triangle" class="icon-status"></i>
              <span>${escapeHtml(calc.ineligibleReason)}</span>
            </div>
          `}

          <!-- Calculations Breakdown -->
          <div class="calc-breakdown-box">
            <div class="calc-row">
              <span class="calc-label">Estimated Bill</span>
              <span class="calc-val">₹${bill.toLocaleString('en-IN')}</span>
            </div>
            <div class="calc-row">
              <span class="calc-label">Discount Applied</span>
              <span class="calc-val ${calc.discountAmount > 0 ? 'text-green' : ''}">
                - ₹${calc.discountAmount.toLocaleString('en-IN')}
                ${calc.savingsPercent > 0 ? `(${calc.savingsPercent}% off)` : ''}
              </span>
            </div>
            <div class="calc-row calc-total">
              <span class="calc-label"><strong>Final Payable</strong></span>
              <span class="calc-val-huge">₹${calc.finalBill.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <!-- Fine Print Conditions -->
          <div class="plat-conditions-list">
            <div class="cond-item">
              <i data-lucide="clock" class="cond-icon"></i>
              <span><strong>Validity:</strong> ${escapeHtml(offer.validDays)}</span>
            </div>
            <div class="cond-item">
              <i data-lucide="credit-card" class="cond-icon"></i>
              <span><strong>Payment:</strong> ${escapeHtml(offer.paymentRestriction)}</span>
            </div>
            <div class="cond-item">
              <i data-lucide="calendar-check" class="cond-icon"></i>
              <span><strong>Booking:</strong> ${escapeHtml(offer.bookingRequirement)}</span>
            </div>
            <div class="cond-item">
              <i data-lucide="tag" class="cond-icon"></i>
              <span><strong>Code:</strong> <code>${escapeHtml(offer.promoCode)}</code></span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="plat-action-row">
            <button class="btn-copy-code" data-code="${escapeHtml(offer.promoCode)}">
              <i data-lucide="copy" class="icon-tiny"></i> Copy Code
            </button>
            <button class="btn-proceed-platform ${isBest ? 'btn-primary-glow' : ''}" data-platform="${offer.platformName}">
              <span>Book on ${offer.platformName.split(' ')[0]}</span>
              <i data-lucide="arrow-up-right" class="icon-tiny"></i>
            </button>
          </div>
        </div>
      `;

      // Visual Comparison Bar
      chartHtml += `
        <div class="chart-bar-group">
          <div class="chart-bar-meta">
            <span class="bar-name">${escapeHtml(offer.platformName.split(' ')[0])}</span>
            <span class="bar-price">₹${calc.finalBill.toLocaleString('en-IN')}</span>
          </div>
          <div class="chart-track">
            <div class="chart-fill ${isBest ? 'fill-winner' : ''}" style="width: ${barPercent}%;">
              ${isBest ? `<span class="chart-winner-marker">Lowest</span>` : ''}
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = cardsHtml;
    if (chartContainer) chartContainer.innerHTML = chartHtml;

    if (window.lucide) window.lucide.createIcons();

    // Attach promo copy listeners & booking click
    container.querySelectorAll('.btn-copy-code').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        navigator.clipboard.writeText(code).then(() => {
          showToast(`Coupon code "${code}" copied to clipboard!`, 'success', 'clipboard-check');
        }).catch(() => {
          showToast(`Use coupon code: ${code}`, 'info', 'ticket');
        });
      });
    });

    container.querySelectorAll('.btn-proceed-platform').forEach(btn => {
      btn.addEventListener('click', () => {
        const platform = btn.getAttribute('data-platform');
        showToast(`Redirecting to ${platform} demo booking flow...`, 'success', 'compass');
      });
    });
  }

  // --- SAVED PLACES DRAWER ---
  function renderSavedPlacesDrawer() {
    const listContainer = document.getElementById('saved-places-list');
    if (!listContainer) return;

    const savedIds = state.favorites;
    const savedRestaurants = state.restaurants.filter(r => savedIds.includes(r.id));

    if (savedRestaurants.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-saved-state">
          <i data-lucide="heart-off" class="icon-large-muted"></i>
          <h4>No saved places yet</h4>
          <p>Tap the heart icon on any restaurant to save it to your wishlist for quick price comparisons.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    let html = '';
    savedRestaurants.forEach(r => {
      const evaluation = evaluateAllPlatforms(r, r.costForTwo);
      const best = evaluation.bestDealItem;
      const finalPrice = best ? best.calc.finalBill : r.costForTwo;

      html += `
        <div class="saved-item-card">
          <img src="${r.image}" alt="${escapeHtml(r.name)}" class="saved-thumb" />
          <div class="saved-info">
            <h5>${escapeHtml(r.name)}</h5>
            <span class="saved-meta">${escapeHtml(r.locality)} • ₹${finalPrice.toLocaleString('en-IN')} for two</span>
            <div class="saved-actions-row">
              <button class="btn-small-compare" data-compare-id="${r.id}">Compare Deal</button>
              <button class="btn-remove-saved" data-remove-id="${r.id}">&times; Remove</button>
            </div>
          </div>
        </div>
      `;
    });

    listContainer.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    // Listeners inside drawer
    listContainer.querySelectorAll('.btn-small-compare').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-compare-id');
        closeSavedPlacesDrawer();
        openComparisonModal(id);
      });
    });

    listContainer.querySelectorAll('.btn-remove-saved').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove-id');
        toggleFavorite(id);
      });
    });
  }

  function openSavedPlacesDrawer() {
    const drawer = document.getElementById('saved-places-drawer');
    if (drawer) {
      drawer.classList.add('drawer-open');
      document.body.classList.add('drawer-backdrop');
    }
  }

  function closeSavedPlacesDrawer() {
    const drawer = document.getElementById('saved-places-drawer');
    if (drawer) {
      drawer.classList.remove('drawer-open');
      document.body.classList.remove('drawer-backdrop');
    }
  }

  // --- PERSONAL SAVINGS CALCULATOR ---
  function initSavingsSimulator() {
    const mealsSlider = document.getElementById('calc-meals-slider');
    const mealsVal = document.getElementById('calc-meals-val');
    const billSlider = document.getElementById('calc-bill-slider');
    const billVal = document.getElementById('calc-bill-val');
    const resultMonthly = document.getElementById('calc-result-monthly');
    const resultYearly = document.getElementById('calc-result-yearly');

    if (!mealsSlider || !billSlider) return;

    function updateSimulator() {
      const meals = Number(mealsSlider.value) || 4;
      const bill = Number(billSlider.value) || 2000;

      if (mealsVal) mealsVal.textContent = meals;
      if (billVal) billVal.textContent = `₹${bill.toLocaleString('en-IN')}`;

      // Average BachatBites discount ~ 24%
      const monthlySpend = meals * bill;
      const monthlySavings = Math.round(monthlySpend * 0.24);
      const yearlySavings = monthlySavings * 12;

      if (resultMonthly) resultMonthly.textContent = `₹${monthlySavings.toLocaleString('en-IN')}`;
      if (resultYearly) resultYearly.textContent = `₹${yearlySavings.toLocaleString('en-IN')}`;
    }

    mealsSlider.addEventListener('input', updateSimulator);
    billSlider.addEventListener('input', updateSimulator);
    updateSimulator();
  }

  // --- STATS ANIMATED COUNTERS ---
  function initAnimatedCounters() {
    const statElements = document.querySelectorAll('.counter-val');
    if (!statElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endValue = Number(target.getAttribute('data-target')) || 0;
          const prefix = target.getAttribute('data-prefix') || '';
          const suffix = target.getAttribute('data-suffix') || '';
          const duration = 2000;
          const startTime = performance.now();

          function updateCounter(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeProgress * endValue);

            target.textContent = `${prefix}${current.toLocaleString('en-IN')}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              target.textContent = `${prefix}${endValue.toLocaleString('en-IN')}${suffix}`;
            }
          }

          requestAnimationFrame(updateCounter);
          obs.unobserve(target);
        }
      });
    }, { threshold: 0.3 });

    statElements.forEach(el => observer.observe(el));
  }

  // --- POPULAR CATEGORIES & FAQS ---
  function renderPopularCategories() {
    const container = document.getElementById('categories-container');
    if (!container || !window.POPULAR_CATEGORIES) return;

    let html = '';
    window.POPULAR_CATEGORIES.forEach(cat => {
      html += `
        <div class="category-card" data-cat-id="${cat.id}">
          <img src="${cat.image}" alt="${escapeHtml(cat.name)}" class="category-img" loading="lazy" />
          <div class="category-overlay">
            <span class="cat-count">${cat.count}</span>
            <h4 class="cat-name">${escapeHtml(cat.name)}</h4>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-cat-id');
        if (id === 'cat-date') {
          setFilterOccasion('Date Night');
        } else if (id === 'cat-cafe') {
          setFilterCuisine('Cafe');
        } else if (id === 'cat-asian') {
          setFilterCuisine('Chinese');
        } else {
          // General scroll to deals
          scrollToSection('deals-section');
        }
        showToast('Filter applied from collection', 'info', 'filter');
      });
    });
  }

  function setFilterOccasion(occasion) {
    state.selectedOccasion = occasion;
    const occasionSelect = document.getElementById('filter-occasion');
    if (occasionSelect) occasionSelect.value = occasion;
    renderRestaurants();
    scrollToSection('deals-section');
  }

  function setFilterCuisine(cuisine) {
    state.selectedCuisine = cuisine;
    const cuisineSelect = document.getElementById('filter-cuisine');
    if (cuisineSelect) cuisineSelect.value = cuisine;
    renderRestaurants();
    scrollToSection('deals-section');
  }

  function renderFAQs() {
    const container = document.getElementById('faqs-accordion');
    if (!container || !window.FAQS_DATA) return;

    let html = '';
    window.FAQS_DATA.forEach((faq, idx) => {
      html += `
        <div class="faq-item ${idx === 0 ? 'active' : ''}">
          <button class="faq-question" aria-expanded="${idx === 0 ? 'true' : 'false'}">
            <span>${escapeHtml(faq.q)}</span>
            <i data-lucide="chevron-down" class="faq-icon"></i>
          </button>
          <div class="faq-answer" style="${idx === 0 ? 'max-height: 200px;' : 'max-height: 0;'}">
            <p>${escapeHtml(faq.a)}</p>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    container.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');

        // Close other items
        container.querySelectorAll('.faq-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            other.querySelector('.faq-answer').style.maxHeight = '0';
            other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = '0';
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // --- HERO 3D PARALLAX INTERACTION ---
  function initHeroParallax() {
    const heroWrapper = document.querySelector('.hero-3d-scene');
    if (!heroWrapper) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const floatingElements = heroWrapper.querySelectorAll('.parallax-layer');

    heroWrapper.addEventListener('mousemove', (e) => {
      const rect = heroWrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      floatingElements.forEach(el => {
        const speed = Number(el.getAttribute('data-speed')) || 20;
        const xOffset = x * speed;
        const yOffset = y * speed;
        el.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      });
    });

    heroWrapper.addEventListener('mouseleave', () => {
      floatingElements.forEach(el => {
        el.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // --- LOCATION SELECTOR LOGIC ---
  function initLocationSelector() {
    const locBtn = document.getElementById('navbar-location-btn');
    const locDropdown = document.getElementById('location-dropdown');
    const locNameSpan = document.getElementById('current-city-name');
    const localitySelect = document.getElementById('filter-locality');

    if (!locBtn || !locDropdown) return;

    locBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      locDropdown.classList.toggle('dropdown-active');
    });

    document.addEventListener('click', () => {
      locDropdown.classList.remove('dropdown-active');
    });

    locDropdown.querySelectorAll('.city-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const selectedCity = opt.getAttribute('data-city');
        state.currentCity = selectedCity;
        if (locNameSpan) locNameSpan.textContent = selectedCity;

        // Update localities in search panel
        populateLocalities(selectedCity);

        renderRestaurants();
        showToast(`Showing best dining deals in ${selectedCity}`, 'info', 'map-pin');
      });
    });

    function populateLocalities(cityName) {
      if (!localitySelect || !window.CITIES_LIST) return;
      localitySelect.innerHTML = '<option value="All">All Localities</option>';

      if (cityName === 'All') {
        window.CITIES_LIST.forEach(c => {
          c.localities.forEach(loc => {
            const opt = document.createElement('option');
            opt.value = loc;
            opt.textContent = `${loc} (${c.name})`;
            localitySelect.appendChild(opt);
          });
        });
      } else {
        const cityObj = window.CITIES_LIST.find(c => c.name.toLowerCase() === cityName.toLowerCase());
        if (cityObj) {
          cityObj.localities.forEach(loc => {
            const opt = document.createElement('option');
            opt.value = loc;
            opt.textContent = loc;
            localitySelect.appendChild(opt);
          });
        }
      }
    }

    populateLocalities('All');
  }

  // --- USER AUTH / PROFILE MODAL ---
  function initUserAuth() {
    const signInBtn = document.getElementById('btn-signin');
    const authModal = document.getElementById('auth-modal');
    const authForm = document.getElementById('auth-form');
    const userAvatarBtn = document.getElementById('user-profile-btn');

    function updateAuthUI() {
      if (state.currentUser) {
        if (signInBtn) signInBtn.style.display = 'none';
        if (userAvatarBtn) {
          userAvatarBtn.style.display = 'flex';
          userAvatarBtn.setAttribute('title', `Logged in as ${state.currentUser.name}`);
        }
      } else {
        if (signInBtn) signInBtn.style.display = 'inline-flex';
        if (userAvatarBtn) userAvatarBtn.style.display = 'none';
      }
    }

    if (signInBtn && authModal) {
      signInBtn.addEventListener('click', () => {
        authModal.classList.add('modal-active');
        document.body.classList.add('modal-open');
      });
    }

    if (userAvatarBtn) {
      userAvatarBtn.addEventListener('click', () => {
        const logoutConfirm = confirm(`Logged in as ${state.currentUser?.name || 'Foodie'}. Sign out?`);
        if (logoutConfirm) {
          state.currentUser = null;
          localStorage.removeItem('bb_user');
          updateAuthUI();
          showToast('Signed out successfully', 'info', 'log-out');
        }
      });
    }

    if (authForm) {
      authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('auth-name');
        const phoneInput = document.getElementById('auth-phone');
        const name = nameInput.value.trim() || 'Foodie Explorer';
        const phone = phoneInput.value.trim() || '+91 98765 43210';

        state.currentUser = { name, phone };
        localStorage.setItem('bb_user', JSON.stringify(state.currentUser));

        authModal.classList.remove('modal-active');
        document.body.classList.remove('modal-open');
        updateAuthUI();
        showToast(`Welcome back, ${name}! Your deals are unlocked.`, 'success', 'user-check');
      });
    }

    updateAuthUI();
  }

  // --- GENERAL EVENT HANDLERS & SEARCH FORM ---
  function initSearchPanel() {
    const searchForm = document.getElementById('main-search-form');
    const searchInput = document.getElementById('filter-search-input');
    const localitySelect = document.getElementById('filter-locality');
    const occasionSelect = document.getElementById('filter-occasion');
    const cuisineSelect = document.getElementById('filter-cuisine');
    const budgetSlider = document.getElementById('filter-budget-slider');
    const budgetDisplay = document.getElementById('budget-val-display');
    const budgetPresetBtns = document.querySelectorAll('.budget-preset-btn');
    const partyMinus = document.getElementById('party-minus');
    const partyPlus = document.getElementById('party-plus');
    const partyDisplay = document.getElementById('party-count-display');
    const sortSelect = document.getElementById('filter-sort-by');
    const resetFiltersBtn = document.getElementById('btn-reset-filters');
    const emptyResetBtn = document.getElementById('btn-empty-reset');

    // Budget slider
    if (budgetSlider && budgetDisplay) {
      budgetSlider.addEventListener('input', () => {
        state.maxBudget = Number(budgetSlider.value);
        budgetDisplay.textContent = `₹${state.maxBudget.toLocaleString('en-IN')}`;
        // Remove preset highlights
        budgetPresetBtns.forEach(btn => btn.classList.remove('active'));
        renderRestaurants();
      });
    }

    // Budget preset buttons
    budgetPresetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        budgetPresetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const val = Number(btn.getAttribute('data-budget'));
        state.maxBudget = val;
        if (budgetSlider) budgetSlider.value = val;
        if (budgetDisplay) budgetDisplay.textContent = `₹${val.toLocaleString('en-IN')}`;
        renderRestaurants();
      });
    });

    // Party size counter
    if (partyMinus && partyPlus && partyDisplay) {
      partyMinus.addEventListener('click', () => {
        if (state.partySize > 1) {
          state.partySize--;
          partyDisplay.textContent = state.partySize;
        }
      });
      partyPlus.addEventListener('click', () => {
        if (state.partySize < 20) {
          state.partySize++;
          partyDisplay.textContent = state.partySize;
        }
      });
    }

    // Search text input
    if (searchInput) {
      let debounceTimeout;
      searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          state.searchQuery = searchInput.value;
          renderRestaurants();
        }, 200);
      });
    }

    // Dropdowns
    if (localitySelect) {
      localitySelect.addEventListener('change', () => {
        state.currentLocality = localitySelect.value;
        renderRestaurants();
      });
    }

    if (occasionSelect) {
      occasionSelect.addEventListener('change', () => {
        state.selectedOccasion = occasionSelect.value;
        renderRestaurants();
      });
    }

    if (cuisineSelect) {
      cuisineSelect.addEventListener('change', () => {
        state.selectedCuisine = cuisineSelect.value;
        renderRestaurants();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        state.sortBy = sortSelect.value;
        renderRestaurants();
      });
    }

    // Quick filter chips
    document.querySelectorAll('.filter-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.quickFilter = btn.getAttribute('data-filter');
        renderRestaurants();
      });
    });

    // Form submit
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        renderRestaurants();
        scrollToSection('deals-section');
        showToast('Found top dining deals matching your criteria!', 'success', 'sparkles');
      });
    }

    // Reset filters
    function resetAllFilters() {
      state.currentCity = 'All';
      state.currentLocality = 'All';
      state.selectedCuisine = 'All';
      state.selectedOccasion = 'All';
      state.maxBudget = 5000;
      state.searchQuery = '';
      state.sortBy = 'recommended';
      state.quickFilter = 'all';

      if (searchInput) searchInput.value = '';
      if (localitySelect) localitySelect.value = 'All';
      if (occasionSelect) occasionSelect.value = 'All';
      if (cuisineSelect) cuisineSelect.value = 'All';
      if (sortSelect) sortSelect.value = 'recommended';
      if (budgetSlider) budgetSlider.value = 5000;
      if (budgetDisplay) budgetDisplay.textContent = '₹5,000';

      document.querySelectorAll('.filter-chip-btn').forEach(b => b.classList.remove('active'));
      const allChip = document.querySelector('.filter-chip-btn[data-filter="all"]');
      if (allChip) allChip.classList.add('active');

      budgetPresetBtns.forEach(b => b.classList.remove('active'));

      const currentCitySpan = document.getElementById('current-city-name');
      if (currentCitySpan) currentCitySpan.textContent = 'All Cities';

      renderRestaurants();
      showToast('All filters have been reset', 'info', 'rotate-ccw');
    }

    if (resetFiltersBtn) resetFiltersBtn.addEventListener('click', resetAllFilters);
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAllFilters);
  }

  // --- DYNAMIC MODAL BILL SLIDER ---
  function initModalBillController() {
    const slider = document.getElementById('modal-bill-slider');
    const input = document.getElementById('modal-bill-input');

    if (!slider || !input) return;

    slider.addEventListener('input', () => {
      state.activeCompareBill = Number(slider.value);
      input.value = state.activeCompareBill;
      renderComparisonTable();
    });

    input.addEventListener('input', () => {
      const val = Math.max(300, Math.min(20000, Number(input.value) || 300));
      state.activeCompareBill = val;
      slider.value = Math.min(val, 10000);
      renderComparisonTable();
    });
  }

  // --- NAVBAR SCROLL & MOBILE DRAWER ---
  function initNavbar() {
    const navbar = document.querySelector('.navbar-floating');
    const mobileToggle = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-nav-drawer');
    const closeMobileBtn = document.getElementById('mobile-nav-close');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar?.classList.add('navbar-scrolled');
      } else {
        navbar?.classList.remove('navbar-scrolled');
      }
    });

    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.add('drawer-open');
        document.body.classList.add('drawer-backdrop');
      });
    }

    if (closeMobileBtn && mobileMenu) {
      closeMobileBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('drawer-open');
        document.body.classList.remove('drawer-backdrop');
      });
    }

    // Close drawers on outside click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('drawer-backdrop')) {
        closeSavedPlacesDrawer();
        mobileMenu?.classList.remove('drawer-open');
        document.body.classList.remove('drawer-backdrop');
      }
    });

    // Saved places buttons
    const savedNavBtn = document.getElementById('btn-saved-nav');
    const savedMobileBtn = document.getElementById('btn-saved-mobile');
    const closeSavedBtn = document.getElementById('btn-close-saved-drawer');

    if (savedNavBtn) savedNavBtn.addEventListener('click', openSavedPlacesDrawer);
    if (savedMobileBtn) savedMobileBtn.addEventListener('click', () => {
      mobileMenu?.classList.remove('drawer-open');
      openSavedPlacesDrawer();
    });
    if (closeSavedBtn) closeSavedBtn.addEventListener('click', closeSavedPlacesDrawer);
  }

  // --- GLOBAL MODAL DISMISS CONTROLS ---
  function initModalDismissals() {
    // Escape key closes modals and drawers
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeComparisonModal();
        closeSavedPlacesDrawer();
        document.getElementById('auth-modal')?.classList.remove('modal-active');
        document.body.classList.remove('modal-open', 'drawer-backdrop');
      }
    });

    // Modal backdrop clicks & close buttons
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('modal-active');
          document.body.classList.remove('modal-open');
        }
      });

      overlay.querySelectorAll('.btn-close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
          overlay.classList.remove('modal-active');
          document.body.classList.remove('modal-open');
        });
      });
    });
  }

  // --- AI DEAL INGESTION ENGINE (GEMINI POWERED) ---
  function initAIIngestor() {
    const openBtn = document.getElementById('btn-open-ai-modal');
    const modal = document.getElementById('ai-ingest-modal');
    const cancelBtn = document.getElementById('btn-cancel-ai');
    const form = document.getElementById('ai-ingest-form');
    const textArea = document.getElementById('ai-raw-text');
    const samplePunjabBtn = document.getElementById('btn-sample-punjab');
    const sampleBastianBtn = document.getElementById('btn-sample-bastian');
    const statusBox = document.getElementById('ai-processing-status');
    const statusText = document.getElementById('ai-status-text');
    const submitBtn = document.getElementById('btn-submit-ai');

    if (!openBtn || !modal) return;

    openBtn.addEventListener('click', () => {
      modal.classList.add('modal-active');
      document.body.classList.add('modal-open');
    });

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        modal.classList.remove('modal-active');
        document.body.classList.remove('modal-open');
      });
    }

    // Pre-fill demo sample buttons
    if (samplePunjabBtn && textArea) {
      samplePunjabBtn.addEventListener('click', () => {
        textArea.value = "Punjab Grill, Cyber Hub Gurugram. Authentic North Indian & tandoori platters. Approx cost for two ₹2,400. Zomato Gold giving 25% off up to ₹500 on min bill ₹1800. Dineout offering flat 30% off with HDFC cards. EazyDiner flat ₹600 off voucher on ₹2200. magicpin giving 15% cashback voucher.";
      });
    }

    if (sampleBastianBtn && textArea) {
      sampleBastianBtn.addEventListener('click', () => {
        textArea.value = "Bastian, Bandra West Mumbai. Seafood & gourmet brunch. Approx cost for two ₹3,500. Zomato Gold offering 20% off up to ₹700 on min bill ₹2500. Dineout Pay with ICICI cards getting 25% off up to ₹1000. EazyDiner Prime flat ₹1000 off on ₹3000. magicpin 12% off.";
      });
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = textArea.value.trim();
        if (!text) return;

        // UI Loading State
        if (statusBox) statusBox.style.display = 'block';
        if (statusText) statusText.textContent = "Gemini AI is parsing discount caps, minimum spends & fine print...";
        if (submitBtn) submitBtn.disabled = true;

        try {
          let extractedData = null;

          // Attempt Backend API call first
          const apiBase = state.apiBaseUrl || (window.location.protocol.startsWith('http') ? '' : 'http://localhost:8000');
          try {
            const res = await fetch(`${apiBase}/api/ai/extract-deal`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ raw_text: text })
            });
            if (res.ok) {
              const data = await res.json();
              extractedData = data.restaurant;
            }
          } catch (err) {
            console.log('Backend API unavailable, using client-side AI parser fallback:', err);
          }

          // Client-side fallback if backend server is not running
          if (!extractedData) {
            extractedData = clientSideHeuristicExtractor(text);
          }

          // Prepend newly extracted restaurant to state
          state.restaurants.unshift(extractedData);
          renderRestaurants();

          // Reset Form and close modal
          textArea.value = '';
          modal.classList.remove('modal-active');
          document.body.classList.remove('modal-open');

          showToast(`✨ Successfully extracted deals for "${extractedData.name}"!`, 'success', 'sparkles');

          // Open comparison modal immediately so user can see extracted deals
          setTimeout(() => {
            openComparisonModal(extractedData.id);
          }, 400);

        } catch (error) {
          console.error(error);
          showToast('Failed to extract deals. Please check format.', 'error', 'alert-circle');
        } finally {
          if (statusBox) statusBox.style.display = 'none';
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }
  }

  // Client-side AI parser fallback
  function clientSideHeuristicExtractor(rawText) {
    const textLower = rawText.toLowerCase();

    // Infer name
    let name = "Punjab Grill";
    const nameMatch = rawText.match(/(?:at|for|restaurant|cafe)?\s*([A-Z][a-zA-Z0-9\s&\'\-]+)/);
    if (nameMatch && nameMatch[1].length < 35) {
      name = nameMatch[1].split(',')[0].trim();
    }

    // Infer City
    let city = "Delhi NCR";
    for (const c of ["Delhi NCR", "Bengaluru", "Mumbai", "Pune", "Hyderabad"]) {
      if (textLower.includes(c.toLowerCase())) { city = c; break; }
    }

    let locality = `Central ${city}`;
    if (textLower.includes('cyber hub')) locality = "Cyber Hub, Gurugram";
    else if (textLower.includes('bandra')) locality = "Bandra West, Mumbai";
    else if (textLower.includes('indiranagar')) locality = "Indiranagar, Bengaluru";

    // Detect numbers
    const percentages = (rawText.match(/(\d{1,2})\s*%/g) || []).map(p => parseInt(p));
    const baseDiscount = percentages[0] || 25;
    const minBillMatches = (rawText.match(/₹\s*(\d[\d,]+)/g) || []).map(r => parseInt(r.replace(/[^\d]/g, '')));
    const costForTwo = minBillMatches[0] || 2400;
    const minBill = minBillMatches[1] || 1500;

    const id = `bb-ai-${Date.now().toString(36)}`;

    return {
      id: id,
      name: name,
      tagline: "AI-Parsed live dining discounts across 4 platforms",
      locality: locality,
      city: city,
      cuisine: ["North Indian", "Multi-cuisine"],
      rating: 4.8,
      reviewsCount: 1250,
      costForTwo: costForTwo,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
      badge: "BEST VALUE",
      occasion: ["Date Night", "Friends' Outing"],
      budgetTier: costForTwo <= 2000 ? "1000-2000" : "2000-5000",
      features: ["AI Extracted Deal", "Instant Verification", "Multi-Platform"],
      platforms: {
        swiggy: {
          platformName: "Swiggy Dineout",
          brandColor: "#FC8019",
          offerTitle: `Flat ${baseDiscount + 5}% Off with Bank Offer`,
          discountType: "percentage",
          discountPercent: baseDiscount + 5,
          maxDiscount: Math.round(costForTwo * 0.35),
          minBill: minBill,
          flatDiscount: 0,
          validDays: "Mon - Thu all day, Fri - Sun till 7 PM",
          paymentRestriction: "HDFC or Axis Bank Credit Cards via Dineout Pay",
          bookingRequirement: "Pre-booking required 20 mins prior",
          promoCode: `DINEOUT${baseDiscount + 5}`,
          verifiedTag: "AI Verified"
        },
        zomato: {
          platformName: "Zomato Gold",
          brandColor: "#E23744",
          offerTitle: `${baseDiscount}% Off on Total Dining Bill`,
          discountType: "percentage",
          discountPercent: baseDiscount,
          maxDiscount: Math.round(costForTwo * 0.25),
          minBill: Math.max(800, minBill - 300),
          flatDiscount: 0,
          validDays: "All days (Lunch & Dinner)",
          paymentRestriction: "Any payment mode via Zomato Pay",
          bookingRequirement: "Walk-in pay via app allowed",
          promoCode: `GOLD${baseDiscount}`,
          verifiedTag: "Instant Cut"
        },
        eazydiner: {
          platformName: "EazyDiner Prime",
          brandColor: "#7B2CBF",
          offerTitle: "Flat ₹500 Off with Prime Booking",
          discountType: "flat",
          discountPercent: 0,
          maxDiscount: 500,
          minBill: Math.max(1200, minBill),
          flatDiscount: 500,
          validDays: "All days on table reservation",
          paymentRestriction: "IndusInd Bank cards compatible",
          bookingRequirement: "Prime table confirmation",
          promoCode: "PRIME500",
          verifiedTag: "Prime Slot"
        },
        magicpin: {
          platformName: "magicpin",
          brandColor: "#00B4D8",
          offerTitle: "15% Cashback Voucher",
          discountType: "percentage",
          discountPercent: 15,
          maxDiscount: 350,
          minBill: 1000,
          flatDiscount: 0,
          validDays: "All days 12 PM - 11 PM",
          paymentRestriction: "magicpin wallet / UPI",
          bookingRequirement: "Show voucher barcode at counter",
          promoCode: "MAGIC15",
          verifiedTag: "Voucher Code"
        }
      }
    };
  }

  // Connect to Python Flask Backend API
  async function checkBackendAndSync() {
    // Check possible ports: current origin, port 5000 (Flask), or port 8000
    const candidateUrls = [
      window.location.protocol.startsWith('http') ? '' : 'http://127.0.0.1:5000',
      'http://127.0.0.1:5000',
      'http://127.0.0.1:8000'
    ];

    for (const url of candidateUrls) {
      try {
        const res = await fetch(`${url}/api/health`, { signal: AbortSignal.timeout(1500) });
        if (res.ok) {
          state.apiBaseUrl = url;
          const health = await res.json();
          console.log('[BachatBites Flask Backend Connected]', health);

          // Fetch live restaurants from Flask backend
          const restRes = await fetch(`${url}/api/restaurants`);
          if (restRes.ok) {
            const apiRestaurants = await restRes.json();
            if (apiRestaurants && apiRestaurants.length > 0) {
              state.restaurants = apiRestaurants;
              renderRestaurants();
            }
          }
          showToast(`Connected to Python Flask Backend (${health.framework || 'Flask 3.x'})`, "success", "cpu");
          return;
        }
      } catch (err) {
        // try next candidate
      }
    }
    console.log('Running in standalone static mode with local data.js');
  }

  // --- INITIALIZATION ENTRY POINT ---
  function init() {
    renderRestaurants();
    updateFavoritesUI();
    renderPopularCategories();
    renderFAQs();
    initSearchPanel();
    initLocationSelector();
    initUserAuth();
    initNavbar();
    initModalBillController();
    initModalDismissals();
    initSavingsSimulator();
    initAnimatedCounters();
    initHeroParallax();
    initAIIngestor();
    checkBackendAndSync();

    // Primary CTA buttons scroll
    const heroFindBtn = document.getElementById('hero-cta-find');
    const heroExploreBtn = document.getElementById('hero-cta-explore');
    if (heroFindBtn) {
      heroFindBtn.addEventListener('click', () => scrollToSection('search-section'));
    }
    if (heroExploreBtn) {
      heroExploreBtn.addEventListener('click', () => scrollToSection('deals-section'));
    }

    // Set default date input to today
    const dateInput = document.getElementById('filter-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
    }

    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

