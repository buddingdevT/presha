# Header — Overall Appearance
**Date:** 2026-04-08  
**Scope:** `sections/header.liquid`, `sections/header-group.json`, `layout/theme.liquid`  
**Status:** Approved — ready for implementation

---

## Summary

Upgrade the Presha Trends header from its current baseline Horizon state to a premium, editorial-quality navigation bar. Covers height, typography, scroll separation, smooth scroll, and a critical hover bug fix. Announcement bar and nav structure are out of scope for this spec (separate sessions).

---

## Decisions Made

### 1. Height
- **From:** `60px`
- **To:** `72px`
- **How:** Override `--header-height` CSS variable in `header.liquid`
- **Why:** 72px reads as more commanding and premium without being overbearing. Matches the editorial feel of reference brands (END Clothing, Kith).

### 2. Nav Font Size & Tracking
- **From:** `0.75rem` (12px), default tracking
- **To:** `0.8125rem` (13px), `letter-spacing: 0.1em`
- **How:** Override in `header-group.json` → `type_font_primary_size: "0.8125rem"` + CSS on `.menu-list__link`
- **Why:** 12px is too small for a luxury brand — lacks presence. 13px with open tracking reads editorial without being heavy.

### 3. Scroll Separation (Option D)
When the header is in its solid/scrolled state, it must be visually separated from white page sections beneath it. Two signals working together:

- **Drop shadow:** `box-shadow: 0 2px 16px rgba(0, 0, 0, 0.09)`
- **Bottom border:** `1px solid rgba(107, 26, 42, 0.18)` (burgundy at 18% opacity)

**Trigger condition:** Applied only when the header is solid — i.e. when `header-component[transparent='not-sticky'][data-sticky-state='active']` or when there is no `transparent` attribute.

**Behaviour on dark/hero sections:** Both signals are invisible over dark backgrounds — the shadow blends in, the border is too subtle to read. They only activate where needed (white/light sections). No GSAP needed here — CSS `transition` on `box-shadow` and `border-color` handles the smooth fade perfectly.

**CSS approach:**
```css
/* Default — no separation signals */
header-component .header__row--top {
  box-shadow: 0 2px 16px rgba(0,0,0,0);
  border-bottom: 1px solid rgba(107,26,42,0);
  transition: box-shadow 0.35s ease, border-color 0.35s ease;
}

/* Solid state — separation active */
header-component:not([transparent]) .header__row--top,
header-component[transparent='not-sticky'][data-sticky-state='active'] .header__row--top {
  box-shadow: 0 2px 16px rgba(0,0,0,0.09);
  border-bottom: 1px solid rgba(107,26,42,0.18);
}
```

### 4. GSAP Scroll Transition Enhancement
The existing Horizon CSS transition (opacity fade on `.header__row`) already handles transparent→solid adequately. We will **not** replace it with GSAP to avoid duplicating transition logic and risking conflicts with `header.js`.

Instead, GSAP will be used for future per-section animations where it earns its cost. The header transition stays CSS-driven.

### 5. Lenis Smooth Scroll
Add Lenis globally to replace the browser's default scroll with a physics-based smooth scroll. This is the highest-impact single addition for luxury feel across the entire site.

**CDN:** `https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js`  
**Load location:** `layout/theme.liquid` — after GSAP, before closing `</body>`  
**Initialisation:** Inline `<script>` in `theme.liquid` after the Lenis CDN tag

```js
document.addEventListener('DOMContentLoaded', function () {
  const lenis = new Lenis({
    duration: 1.2,
    easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  // Integrate with GSAP ticker so ScrollTrigger stays in sync
  gsap.ticker.add(function(time) {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
});
```

**Mobile:** `touchMultiplier: 1.5` gives touch scroll a natural feel without feeling "floaty". Lenis does not interfere with native iOS momentum scroll.

**Prefers-reduced-motion:** Lenis respects `prefers-reduced-motion` by default. No extra handling needed.

### 6. Red Hover Bug Fix
**Problem:** `sections/header-group.json` contains a custom CSS override:
```css
.header__menu-item:hover { color: #ff0000 !important; }
```
This turns nav items bright red on hover — incorrect for the brand.

**Fix:** Remove this line entirely from `custom_css` in `header-group.json`. Burgundy hover will be handled via the `scheme-red-hover` color scheme already applied to the menu block (confirm this scheme is set to `#6B1A2A` in theme settings — if not, fix the scheme). Nav hover state is managed by `.menu-list__link:hover` in the Horizon CSS.

---

## Files to Change

| File | Change |
|---|---|
| `sections/header.liquid` | `--header-height: 72px`, shadow + border CSS, `.menu-list__link` font/tracking override |
| `sections/header-group.json` | Remove red hover custom CSS, update `type_font_primary_size` to `"0.8125rem"` |
| `layout/theme.liquid` | Add Lenis CDN + initialisation script |

---

## Out of Scope
- Announcement bar content/animation (separate session)
- Navigation structure / mega menus (separate session)
- Mobile drawer styling (covered when we tackle navigation)
- Logo sizing changes (stable as-is)

---

## Success Criteria
- [ ] Header height is 72px on all viewports
- [ ] Nav items render at 13px with 0.1em letter-spacing
- [ ] Shadow + burgundy border visible only when scrolled over white sections; invisible over hero/dark sections
- [ ] Shadow/border transition is smooth (CSS-driven, ~0.35s)
- [ ] Lenis smooth scroll active globally; ScrollTrigger animations remain in sync
- [ ] No red hover on nav items
- [ ] No horizontal overflow introduced on any viewport
- [ ] Tested at 375px, 768px, 1280px
