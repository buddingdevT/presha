# PRESHA TRENDS

### A HollowKraft Collective Project
**Luxury Editorial Storefront for Authenticated Streetwear & Sneakers**

---

## 💎 Project Overview
**Presha Trends** is a high-end Shopify storefront for a Dubai-based luxury resale brand. Unlike traditional e-commerce sites, Presha is designed as an editorial experience, blending the storytelling of a high-fashion magazine with the functionality of a global marketplace for sneakers, streetwear, and rare collectibles.

This project is meticulously crafted by **HollowKraft Collective** to outperform market competitors through superior motion design, interactive layouts, and a "mobile-first" editorial approach.

---

## 🚀 Key Features
- **Editorial Motion:** Powered by **GSAP**, featuring sophisticated crossfades, staggered entrance animations, and high-performance Ken Burns effects.
- **Ultra-Smooth UX:** Integrated **Lenis** smooth scrolling for a fluid, premium browsing experience.
- **Modular Sections:** 16+ custom Liquid sections including high-end hero carousels, editorial collection grids (A/B/C), and a bespoke authentication tracking system.
- **Glassmorphic UI:** Premium header treatments and frosted glass components designed for high-contrast luxury appeal.
- **Brand Identity:** Deep Burgundy (`#6D001A`) accents paired with Soft Ivory backgrounds and a refined typographic stack (Cormorant Garamond, Jost, and Gilroy).

---

## 🛠️ Tech Stack
- **Platform:** Shopify (Modified Horizon Theme)
- **Languages:** Liquid, CSS (Scoped), JavaScript (Vanilla + GSAP)
- **Libraries:** 
    - [GSAP](https://gsap.com/) — Animation & ScrollTrigger
    - [Lenis](https://lenis.darkroom.engineering/) — Smooth Scrolling
- **Workflow:** Shopify CLI for seamless local-to-cloud synchronization.

---

## 📂 Architecture
The storefront is built on a highly modular architecture:
- `sections/` — Contains custom-built editorial blocks (Hero Carousel, Trending Now, Collection Layouts).
- `assets/` — Brand-specific SVGs, custom JS logic (Lenis init, Header behavior).
- `layout/theme.liquid` — The central hub for global GSAP integration and performance optimization.

---

## 🛠️ Development & Sync
This repository is managed using the Shopify CLI.

**Pull latest theme changes:**
```bash
shopify theme pull --store agw1a7-eu.myshopify.com --theme 194145845329
```

**Push changes to development:**
```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329
```

---

## 🎨 Creative Direction & Attribution
This storefront is a product of the **HollowKraft Collective**. Every interaction, line of code, and layout choice is designed to uphold the collective's standard of "Premium by Design."

**For more information:**
- [HollowKraft Collective](https://github.com/hollowkraft)

---

&copy; 2026 Presha Trends & HollowKraft Collective. All Rights Reserved.
