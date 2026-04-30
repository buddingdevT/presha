# Presha Trends — Development & Refinement Roadmap

This document tracks the prioritized refinements, design tasks, and functional bugs identified for the Presha storefront.

---

## 1. Critical & Functional Fixes

### ⚠️ Trending Now: Dynamic Collection Support
*   **Issue:** The section only works as expected when products are added manually one-by-one. It does not correctly handle automated collection population with the required editorial tags/badges.
*   **Goal:** Allow the section to work for collections (automated) while maintaining the ranking and condition badge logic currently seen in the manual mode.

### ⚠️ Collection Component: Selection Sync
*   **Issue:** When an admin selects a collection in the Theme Editor, the name/data doesn't appear immediately. It requires the admin to manually type or interact with the field to "wake it up."
*   **Goal:** Ensure the component reactive state updates immediately upon selection.

### ⚠️ Gifts Section: Spacing Refinement
*   **Issue:** The "Gifts for Her/Him" tiles have no top/bottom margin or padding. They are sitting flush against the section boundaries.
*   **Goal:** Apply vertical padding/margins that match the left/right rhythm of the site.

---

## 2. Section-Specific Issues & Refinements

### 🐛 Scrolling Marquee (`presha-marquee.liquid`)
*   **Issue:** The infinite scroll animation is currently non-functional in the storefront preview.
*   **Goal:** Implement a robust GSAP or CSS-based solution that ensures smooth, continuous scrolling.

### 🐛 Announcement Bar Error (`header-announcements.liquid`)
*   **Issue:** `Invalid block '_announcement': type is invalid` error identified during theme push.
*   **Goal:** Reconcile the schema blocks with the theme editor configuration to resolve the push error.

### ✨ General Section Polish
*   **Footer:** Refine layout and links for a more premium feel.
*   **Email Signup:** Tweak typography and input styling for better alignment with the editorial brand.

---

## 3. Commerce Core: Editorial Redesign
*Goal: Transform generic storefront pages into high-end editorial experiences. Brainstorming and inspiration-gathering required.*

### Product Detail Page (PDP)
*   **Goal:** Brainstorm a premium layout that emphasizes authenticity, luxury, and detailed storytelling for high-value resale items.

### Collection / Category Pages
*   **Goal:** Overhaul the collection grid to feel less like a standard e-commerce store and more like a curated gallery.

---

## 4. Store Config & Transactional Pages
*Goal: Bring the "Presha" brand into the checkout and account ecosystem. Priority is ranked by customer-facing impact.*

### Priority 1: The Purchase Funnel (Customer-Facing)
1.  **Checkout:** Styling the Shopify checkout (fonts, colors, branding) to match the premium Ivory/Burgundy identity.
2.  **Thank You Page:** Creating a high-end post-purchase confirmation experience.
3.  **Sign-in / Login:** Customizing the entry point for returning customers.

### Priority 2: Account & History
4.  **Order Status Page:** Enhancing the tracking and status updates look.
5.  **Profile / Account Page:** Branding the personal customer dashboard.
6.  **Orders History:** Designing the list of previous purchases.

---

## 5. Inspiration & Research
*   **Competitor Benchmark:** [Mad Kicks](https://www.madkicks.com)
*   **Action:** Research and emulate the "Mad Kicks" premium flow, specifically focusing on their checkout logic and high-conversion product page details.
