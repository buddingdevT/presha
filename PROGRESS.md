# Presha Trends — Build Progress

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
