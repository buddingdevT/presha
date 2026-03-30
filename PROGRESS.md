# Presha Trends — Build Progress

---

## 2026-03-27 — Header & Announcement Bar

**What was built:**
- Customized the GSAP-powered Announcement Bar (`header-announcements.liquid`) to fade out old text and slide in new text from below, matching the requested content ("Presha Verified...", "Worldwide Shipping", "Dubai Based").
- Implemented a premium glassmorphic effect for the Header when over the hero section (using `backdrop-filter` and translucent background).
- Configured the Header to transition to a solid white background with a dark logo on scroll.
- Integrated `logo-text-whitey.png` and `logo-text-blacky.png` directly into the logo block and section logic to ensure a seamless color swap.

**Fixes:**
- Added the missing `text` and `link` settings back into the `_announcement` block schema in `header-announcements.liquid`, which was causing Shopify to strip the actual block content and rendering the bar invisible.
- Corrected `header-group.json` to include the final 4 exact Announcement texts.
- `assets/header.js` (Modified)
- `sections/presha-trust-bar.liquid` (Added)
- `sections/presha-featured-journal.liquid` (Added)
- `sections/presha-authentication.liquid` (Added)
- Added top and bottom padding (`12px`) to the logo container in `blocks/_header-logo.liquid`.
- Replaced the GSAP `sections/header-announcements.liquid` completely with the static, extracted Announcement Bar from Password template.
- Refined Header layout and navigation.
- Built a 3-column Trust Bar (`presha-trust-bar.liquid`) with custom diamond SVGs, placing it beneath the reviews section.
- Built a 3-column Editorial Hub `presha-featured-journal.liquid` that renders dynamic Blog Articles or design-accurate fallbacks.
- Built a 2-column Authentication split-layout `presha-authentication.liquid` styled with a dark `#1c1516` theme and the floating burgundy guaranteed badge.
  - *Fix:* Reconfigured CSS to allow the dark maroon background to bleed 100vw while keeping content constrained to the 1200px site grid.
- Built a 2-column Email Signup section `presha-email-signup.liquid` using heavy display typography and a fully integrated Shopify Native Customer Form with pill-shaped inputs.

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
- `sections/presha-trust-bar.liquid` — New section file
- `sections/presha-featured-journal.liquid` — New section file
- `sections/presha-authentication.liquid` — New section file
- `templates/index.json` (Modified: Added presha_trust_bar, presha_featured_journal, presha_authentication)

**Next Steps:**
- GSAP now globally available for all future sections via theme.liquid
- Section includes a preset so it can be added from the Theme Editor via "Add section"
- Avatar placeholders are CSS circles — can be swapped for real images later if needed
- Press logos are text-based (not images) matching the design ref's editorial approach

---

## 2026-03-30 — Scrolling Marquee Section ⚠️ IN PROGRESS

**Status: Known Issue — scrolling animation not rendering on the live preview.**

**What was attempted:**
- Multiple CSS keyframe approaches (`{% stylesheet %}`, `<style>` tags, inline-flex, various translateX techniques)
- Switched to JavaScript `requestAnimationFrame` scrolling as a final attempt
- Section structure, full-width bleed, and text content display correctly
- The scroll motion itself does not animate — root cause not yet identified

**Files:**
- `sections/presha-marquee.liquid` — Exists but scroll is non-functional
- `templates/index.json` — Section is injected after hero

**To revisit:** Investigate whether Shopify's `overflow: hidden` on parent containers or JS execution order is blocking the animation.

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
