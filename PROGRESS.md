# Presha Trends — Build Progress

---

## 2026-03-27 — Header & Announcement Bar

**What was built:**
- Customized the GSAP-powered Announcement Bar (`header-announcements.liquid`) to fade out old text and slide in new text from below, matching the requested content ("Presha Verified...", "Worldwide Shipping", "Dubai Based").
- Implemented a premium glassmorphic effect for the Header when over the hero section (using `backdrop-filter` and translucent background).
- Configured the Header to transition to a solid white background with a dark logo on scroll.
- Integrated `logo-text-whitey.png` and `logo-text-blacky.png` directly into the logo block and section logic to ensure a seamless color swap.

**Files changed:**
- `assets/logo-text-whitey.png` (Added)
- `assets/logo-text-blacky.png` (Added)
- `sections/header-announcements.liquid` — GSAP tweaks and default blocks updated.
- `sections/header.liquid` — Added glassmorphism to `.header[transparent]`.
- `sections/header-group.json` — Enabled `enable_transparent_header_home`.
- `blocks/_header-logo.liquid` — Hardcoded Presha logos with auto-width CSS logic.
- `sections/logo.liquid` — Updated logo logic similarly.

---

## 2026-03-27 — Reviews & Press Section

**What was built:**
- Custom "Reviews & Press" homepage section matching design ref exactly
- Press logos displayed as styled text (HYPEBEAST, GQ, VOGUE, HIGHSNOBIETY) — centered with "TRUSTED WORLDWIDE" eyebrow
- Horizontally scrolling review cards with drag-to-scroll support (mouse + touch)
- Each review card: 5 gold stars, quote text, avatar placeholder, reviewer name + verified buyer location
- 5 review cards pre-populated with content (3 visible, rest accessible via scroll)
- GSAP ScrollTrigger animations: eyebrow fade-in → press logos stagger → review cards stagger entrance
- Hover effects on cards (lift + shadow) and press names (opacity)
- Fully responsive: 375px (iPhone SE) → 480px → 749px → 1024px+ breakpoints
- Section is fully editable from Shopify Theme Editor (all colors, text, blocks configurable)

**Files changed:**
- `layout/theme.liquid` — Added GSAP + ScrollTrigger CDN (defer loaded)
- `sections/presha-reviews-press.liquid` — New section file (created)
- `templates/index.json` — Added section to homepage with all block data

**Notes:**
- GSAP now globally available for all future sections via theme.liquid
- Section includes a preset so it can be added from the Theme Editor via "Add section"
- Avatar placeholders are CSS circles — can be swapped for real images later if needed
- Press logos are text-based (not images) matching the design ref's editorial approach

---

## 2026-03-27 — Reviews & Press: auto-scroll + reviewer photos

**What was built:**
- Auto-scroll on review cards every 3 seconds, loops back to start when reaching the end
- Auto-scroll pauses on hover/touch, resumes 3s after user stops interacting
- Added optional reviewer photo (image_picker) to the review block schema
- Avatar now renders uploaded photo if set, falls back to plain circle placeholder
- Added detailed comments at top of file explaining how to edit reviews, press logos, photos, and colors via Theme Editor

**Files changed:**
- `sections/presha-reviews-press.liquid` — Updated
