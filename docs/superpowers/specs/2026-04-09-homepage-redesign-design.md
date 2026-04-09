# Homepage Redesign — Design Spec
**Version:** 1.0  
**Date:** 2026-04-09  
**Status:** Approved for implementation planning

---

## 1. Overview

A full restructure of the Presha Trends homepage to:
- Alternate section backgrounds so no two white/same-colour sections are adjacent
- Add 5 dedicated collection sections (non-sneaker brands / lifestyle / luxury)
- Redesign the Trending Now section with an editorial hero layout and resale-specific product card features
- Introduce burgundy as a structural section background colour (not just an accent)

---

## 2. Homepage Section Order & Color Rhythm

| # | Section | Background | Status | Notes |
|---|---------|-----------|--------|-------|
| — | Announcement Bar | Burgundy `#6D001A` | Existing 🔒 | |
| — | Navigation / Header | White / glassmorphic over hero | Existing 🔒 | |
| 1 | Hero Carousel | Full-bleed image | Existing 🔒 | |
| 2 | Scrolling Marquee | Burgundy `#6D001A` | Fix needed ⚠️ | Animation broken — fix in separate task |
| 3 | Shop by Brand | White `#FFFFFF` | Existing 🔒 | |
| 4 | Trending Now | Dark `#0A0A0A` | **Redesign** | Full layout redesign — see §4 |
| 5 | Chrome Hearts | Ivory `#F5F1EC` | **New** | Layout A |
| 6 | FOG Essentials | Burgundy `#6D001A` | **New** | Layout B |
| 7 | Featured Categories | White `#FFFFFF` | Existing 🔒 | |
| 8 | Supreme | Blush tint `#F7EDEF` | **New** | Layout C |
| 9 | Gifts for Him / Her | Warm grey `#EDE9E3` | Existing — bg update | |
| 10 | Authentication | Dark maroon `#1C1516` | Existing 🔒 | |
| 11 | Hermès | Ivory `#F5F1EC` | **New** | Layout A |
| 12 | Collectibles | Burgundy `#6D001A` | **New** | Brand Row + frosted cards |
| 13 | Journal | White `#FFFFFF` | Existing 🔒 | |
| 14 | Reviews & Press | Blush tint `#F7EDEF` | Existing — bg update | |
| 15 | Email Signup | Dark `#0A0A0A` | Existing — bg update | |
| 16 | Trust Bar | White `#FFFFFF` | Existing 🔒 | |
| 17 | Footer | Dark `#0A0A0A` | Existing 🔒 | |

### Color rhythm rule
No two adjacent sections may share the same background. The palette cycles through: White → Dark → Ivory → Burgundy → Blush → Warm Grey — never repeating consecutively.

---

## 3. Collection Section Layouts

There are 5 collection sections. Three layout templates are defined and recycled across them.

### Layout A — Brand Row
**Used for:** Chrome Hearts, Hermès  
**Background:** Ivory `#F5F1EC`

- Brand name top-left as large italic Cormorant Garamond heading
- Eyebrow label above ("Collection") in burgundy, small caps
- "View All" top-right — small, grey `#999`, understated, not louder than heading
- "View All" hover: animated underline expand (GSAP, left-to-right), colour shifts to `#6D001A`
- Full-width horizontal product scroll (6–8 products per section, ~3 visible at once, scroll 1–2 times before "View All")
- Product card: ivory `#F5F1EC` bg, product photo, product name, price in burgundy
- Scroll hint text below row
- GSAP ScrollTrigger: heading fades in, cards stagger up on scroll entrance
- Mobile: same layout, cards narrower, scroll naturally

### Layout B — Editorial Split
**Used for:** FOG Essentials  
**Background:** Burgundy `#6D001A`

- Fixed anchor image left column (stays static while products scroll right)
- Brand name in italic serif below the anchor image
- "View All" as small link below brand name (white, faded)
- Right column: eyebrow + brand heading + horizontal product scroll
- Product cards: ivory `#F5F1EC` bg on burgundy — high contrast
- GSAP: anchor image fades in from left, products stagger from right
- Mobile: anchor image full width on top, scroll row below (stacked)

### Layout C — Hero Banner + Scroll
**Used for:** Supreme  
**Background:** Blush tint `#F7EDEF`

- Full-width brand lifestyle/hero image at top (height ~180px desktop)
- Dark gradient overlay left-to-right on the image for text legibility
- Brand name overlaid bottom-left on image in white italic serif
- Eyebrow above brand name on image (white, faded)
- Below image: collection descriptor left + "View All" right (small, grey)
- Horizontal product scroll on the warm blush background
- Product cards: ivory `#F5F1EC` bg
- GSAP: hero image fades in, text slides up, product cards stagger in
- Mobile: same structure, image taller proportionally, cards scroll below

### Collectibles — Brand Row on Burgundy (bespoke)
**Used for:** Collectibles only  
**Background:** Burgundy `#6D001A`

- Same Brand Row structure as Layout A (heading top-left, View All top-right)
- Product cards: frosted white `rgba(255,255,255,0.22)` with `1px solid rgba(255,255,255,0.18)` border
- Product images render at full opacity — the frosted card bg frames them
- Product name and price in white
- Preserves the burgundy immersion while keeping product cards readable
- GSAP ScrollTrigger: heading fades in, cards stagger up

### Backlog options (not in scope for this phase)
- **Layout D — Dark + Ivory cards:** Dark `#0A0A0A` bg, ivory `#F5F1EC` product cards with burgundy price accents. Parked as an alternative for Collectibles or future collection sections.
- **Verified badge Pill (Option D):** Tick icon + "Verified" text in a burgundy pill. Backup to the circle badge if the circle proves too small at smaller breakpoints.

---

## 4. Trending Now — Redesign Spec

**Background:** Dark `#0A0A0A`  
**Layout:** Hero card (pinned left) + single horizontal scroll row (right)

### Section header
- Eyebrow: "Right Now" — small, uppercase, burgundy `#6D001A`
- Section title: "Trending Now" — large italic Cormorant Garamond, ivory `#F5F1EC`
- Top-right: "View All" (small, faded white) + arrow buttons (←/→, circular, 32px, faded border)
- Arrow hover: fills with burgundy `#6D001A`

### Hero card (#1 trending)
- Tall portrait card, `flex: 0 0 ~165px`, `height: ~230px`
- Full product photo, dark gradient overlay (bottom-up)
- **Verified badge:** Circle `#6D001A`, white tick SVG — top-left corner
- **#1 Rank tag:** Italic serif, burgundy bg, white text — top-right corner
- **Condition badge:** Below the rank tag — top-right
  - DS: plain text, no label
  - 9/10, 8/10 etc: score bold + "condition" in thin faded type `font-weight: 300, opacity: 0.35`
- Ghost "1" watermark: large, very low opacity `rgba(255,255,255,0.04)`, decorative only
- Bottom info: brand (small, faded) / product name (bold white) / price (large white) / size (small, faded)

### Scroll row — "Also trending"
- Label: "Also trending →" — small, uppercase, faded white
- Cards: `flex: 0 0 ~118px`, `height: ~118px` image
- **Badge row at top of card image:** Circle verified badge (left) + condition badge (right) — same horizontal line
  - If no condition set: verified badge left, right side empty (no placeholder)
- Brand name, product name, price below image
- Horizontal drag/scroll — no scrollbar

### Rank tags on scroll cards
- Hidden by default — no #2 or #3 shown
- Available as a Theme Editor option per product block (dropdown: None / #1 / #2 / #3)
- When activated: same italic serif burgundy tag, top-right of card image

### Condition — implementation note
- Stored as a Shopify product metafield (e.g. `custom.condition`)
- Values: `DS` / `9.5/10` / `9/10` / `8/10` / `7/10`
- If metafield is empty/unset: condition badge does not render — no empty space, no fallback text

### Arrows — behaviour
- ← / → cycle through all trending products
- → moves current hero product to the scroll row, next product becomes hero
- ← reverses
- Arrows also sync scroll row position so selected item is visible

### Mobile
- Hero card: full width on top
- Scroll row: below hero, full width, horizontal scroll
- Arrows: below hero card
- No layout breaks, no horizontal overflow

---

## 5. Global Rules for Collection & Trending Sections

- **No horizontal overflow** on any viewport — all scroll rows use `overflow-x: auto` with `scrollbar-width: none`
- **Scroll snap** on product rows: `scroll-snap-type: x mandatory`, each card `scroll-snap-align: start`
- **Mobile-first CSS** on every new section — base styles at 375px, scale up via breakpoints: 480px / 749px / 1024px / 1280px
- **Tap targets minimum 44px** on all interactive elements
- **View All CTAs:**  All use the same hover treatment — GSAP animated underline that fills left-to-right on hover/focus. Colour: grey at rest, burgundy `#6D001A` on hover. Never loud or oversized.
- **GSAP ScrollTrigger** entrance on every new section: heading fades in (`opacity 0→1, y 20→0`), product cards stagger up (`stagger: 0.06s`)
- **`prefers-reduced-motion`:** All GSAP animations disabled, instant visibility

---

## 6. Background Updates to Existing Sections

The following existing sections require only a background colour change (no layout changes):

| Section | Old bg | New bg | Note |
|---------|--------|--------|------|
| Gifts for Him / Her | White | Warm grey `#EDE9E3` | Rhythm break between Featured Categories and Authentication |
| Reviews & Press | White | Blush tint `#F7EDEF` | Rhythm break between Journal and Email Signup |
| Email Signup | White/ivory | Dark `#0A0A0A` | Strong contrast before Trust Bar |

---

## 7. Backlog / Deferred

- **Scrolling Marquee fix** — animation is broken; fix is a separate task, not part of this redesign
- **Layout D (Dark + Ivory)** — parked as alternative for Collectibles or future collection sections
- **Verified badge Pill (Option D)** — backup badge style
- **#2 / #3 rank tag display** — available in Theme Editor but off by default; store owner activates per product
- **Collection selection** — Chrome Hearts, FOG Essentials, Supreme, Hermès, Collectibles confirmed for Phase 1. Additional collections (e.g. Travis Scott apparel, accessories, apparel mix) can be added using the same layout templates in future phases.

---

## 8. Files to Create / Modify

### New section files
- `sections/presha-collection-a.liquid` — Layout A (Brand Row) — used for Chrome Hearts, Hermès
- `sections/presha-collection-b.liquid` — Layout B (Editorial Split) — used for FOG Essentials
- `sections/presha-collection-c.liquid` — Layout C (Hero Banner + Scroll) — used for Supreme
- `sections/presha-collection-collectibles.liquid` — Bespoke Brand Row on burgundy — used for Collectibles

### Modified section files
- `sections/presha-trending-now.liquid` — Full redesign (hero card + scroll row + condition/rank/verified systems)
- `sections/presha-gifts.liquid` — Background colour update only (`#EDE9E3`)
- `sections/presha-reviews-press.liquid` — Background colour update only (`#F7EDEF`)
- `sections/presha-email-signup.liquid` — Background colour update only (`#0A0A0A`)

### Template
- `templates/index.json` — Updated section order, new collection sections added

---

*Brainstormed and approved: 2026-04-09*  
*All visual decisions confirmed via visual companion (localhost brainstorm session)*
