# Hero Carousel — Design Spec
**Project:** Presha Trends  
**Date:** 2026-04-03  
**Status:** Approved — ready for implementation  
**File to create:** `sections/presha-hero-carousel.liquid`

---

## 1. Overview

A full-bleed, full-viewport hero carousel section built from scratch as a custom Shopify Liquid section. Slides and discovery rail cards are both managed as Shopify blocks — fully editable, reorderable, and scalable via the theme editor. GSAP drives all animations. The section replaces the placeholder hero on the homepage.

---

## 2. Design Decisions Summary

| Decision | Choice |
|---|---|
| Discovery rail | Yes — overlaid at the bottom of the hero |
| Slide transition | Crossfade + Ken Burns slow zoom |
| Auto-play | Yes — pauses on hover/touch, 5s default |
| Mobile images | Same image per slide, `object-fit: cover` smart crop |
| Rail card management | Shopify blocks — unlimited, editable via theme editor |
| Mobile rail | Horizontal scroll with scroll-snap |
| Slide indicators | 64px × 2px animated fill bars, GSAP-driven |
| Typography | Cormorant Garamond (headlines) + Jost (all UI) |
| Clean hero variant | Parked — see `docs/backlog/hero-clean-no-rail.md` |

---

## 3. Layout & Dimensions

### Desktop
- **Width:** `100vw` — full bleed, no container constraint
- **Height:** `92vh` — enough to show the rail within the viewport
- **Overlay:** `linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0) 100%)` — left-side text contrast
- **Secondary overlay:** `linear-gradient(to top, rgba(0,0,0,0.40) 0%, transparent 35%)` — rail legibility

### Mobile (≤749px)
- **Height:** `92svh` (use `svh` to account for mobile browser chrome)
- Same image per slide — `object-fit: cover`, `object-position: center center`
- Rail changes to horizontal scroll (see §7)

---

## 4. Slides

### Shopify Block Type: `slide`
- Max blocks: 6 (soft limit — adjustable)
- Settings per block:

| Setting | Type | Description |
|---|---|---|
| `image` | image_picker | Slide background image |
| `label` | text | Overline label e.g. "New Arrival" |
| `headline` | textarea | Hero headline e.g. "Own the Dark" |
| `cta_text` | text | CTA button label e.g. "Shop Air Jordan 4" |
| `cta_link` | url | Collection or page link |

### Initial 3 Slides
| Slide | Image | Label | Headline | CTA |
|---|---|---|---|---|
| 1 | `slide1.webp` | New Arrival | Own the Dark | Shop Air Jordan 4 |
| 2 | `slide2.webp` | LA Exclusive | Not for Everyone | Shop the Collection |
| 3 | `slide3.webp` | Now At Presha | Five Colors. One Obsession | Shop Goyard |

> **Admin TODO:** Upload `designassets/slide1.webp`, `slide2.webp`, `slide3.webp` via theme editor image pickers once section is deployed.

---

## 5. Text Block

**Position:** `bottom: 18%` desktop / `bottom: 22%` mobile, `left: 5%`

### Label pill
- Font: Jost (Gilroy fallback), 11px, weight 600, tracking 0.18em, UPPERCASE
- Color: `#6D001A` (burgundy text)
- Background: `rgba(255,255,255,0.92)` white pill
- Padding: `3px 10px`
- Margin-bottom: `14px`
- Animates in with headline stagger

### Headline
- Font: Cormorant Garamond (The Glamore fallback), weight 300
- Size: `clamp(40px, 6vw, 80px)` — scales with viewport
- Color: `#FFFFFF`
- Letter-spacing: `-0.03em`
- Line-height: `1.05`
- Margin-bottom: `20px`
- Text-shadow: `0 2px 24px rgba(0,0,0,0.28)`

### CTA Button
- Font: Jost, 11px, weight 600, tracking 0.18em, UPPERCASE
- Background: `#6D001A` (burgundy)
- Color: `#FFFFFF`
- Padding: `13px 28px` desktop / `11px 22px` mobile
- Border-radius: `0` — flat/square (luxury fashion standard)
- Border: none
- Min tap target: 44px height on mobile (add padding as needed)
- Hover: background `#580015` (darker burgundy), `transition: 0.2s ease`
- `cursor: pointer`

---

## 6. Slide Progress Indicators

**Position:** `bottom: calc(90px + 16px)` — sits just above the rail  
**Left:** `5%`  
**Display:** `flex`, `gap: 8px`, `align-items: center`

### Each indicator
- **Track:** `width: 64px`, `height: 2px`, `background: rgba(255,255,255,0.28)`, `border-radius: 1px`, `overflow: hidden`
- **Fill element** (child div): `position: absolute`, `inset: 0`, `background: #FFFFFF`, `transform-origin: left center`

### Animation (GSAP)
```
// Active bar fill
gsap.fromTo(activeFill,
  { scaleX: 0 },
  { scaleX: 1, duration: slideInterval / 1000, ease: "none" }
)
// On hover/touch: tween.pause() — bar freezes mid-fill
// On resume: tween.resume() — continues from exact position
// On slide change: scaleX snaps to 0 instantly, next bar begins
// Previous bars: remain at scaleX(1) — fully white, full opacity
```

---

## 7. Discovery Rail

**Position:** `position: absolute`, `bottom: 0`, `left: 0`, `right: 0`  
**Height:** `90px` desktop / `68px` mobile  
**Background:** `rgba(10,10,10,0.90)`  
**Border-top:** `1px solid rgba(255,255,255,0.06)`

### Shopify Block Type: `rail_card`
- No max — fully scalable, add/remove/reorder via theme editor
- Settings per block:

| Setting | Type | Description |
|---|---|---|
| `image` | image_picker | Thumbnail image |
| `label` | text | Top label e.g. "SHOP BY" (default: "SHOP BY") |
| `name` | text | Brand/category name e.g. "Trending Now" |
| `link` | url | Destination collection or page |

### Initial 4 Cards
| # | Label | Name | Link |
|---|---|---|---|
| 1 | SHOP BY | Trending Now | `/collections/trending` |
| 2 | SHOP BY | Pokémon Collectibles | `/collections/pokemon` |
| 3 | SHOP BY | Rare Find | `/collections/rare-find` |
| 4 | SHOP BY | Loewe × On | `/collections/loewe-x-on` |

> **Admin TODO:** Create these collections in Shopify admin. Update links once handles are confirmed.

### Desktop rail card layout
- `display: flex`, `align-items: center`, `gap: 12px`, `padding: 0 20px`
- `border-right: 1px solid rgba(255,255,255,0.07)` — last card has no border
- **Thumbnail:** `52×52px`, `border-radius: 5px`, `object-fit: cover`, `border: 1px solid rgba(255,255,255,0.08)`, `flex-shrink: 0`
- **Label ("SHOP BY"):** Jost, 9px, tracking 0.15em, UPPERCASE, `#888888`, margin-bottom `4px`
- **Name:** Jost, 13px, weight 400, `#F5F1EC` (ivory)
- **Hover:** `background: rgba(255,255,255,0.04)` on the card, `transition: 0.25s ease`

### Mobile rail
- `overflow-x: auto`, `scroll-snap-type: x mandatory`, `-webkit-overflow-scrolling: touch`
- Scrollbar hidden: `scrollbar-width: none` + `::-webkit-scrollbar { display: none }`
- Each card: `flex-shrink: 0`, `scroll-snap-align: start`
- Card width: `min-width: 140px` — ensures partial next card is visible (affordance for scrolling)
- Thumbnail: `36×36px`
- Name: `white-space: nowrap`

---

## 8. Animations

### Ken Burns (active slide image)
```
gsap.fromTo(activeSlide.querySelector('img'),
  { scale: 1 },
  { scale: 1.08, duration: slideInterval / 1000, ease: "none" }
)
// Reset to scale(1) instantly when slide changes
// will-change: transform — set only on active slide, removed on deactivate
```

### Crossfade (slide transition)
```
// Outgoing slide
gsap.to(outgoingSlide, { opacity: 0, duration: 0.8, ease: "power2.inOut" })
// Incoming slide
gsap.fromTo(incomingSlide, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.inOut" })
// z-index: outgoing stays below incoming during transition
```

### Text entrance (per slide activation)
```
const tl = gsap.timeline()
tl.fromTo(label,    { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
  .fromTo(headline, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.35")
  .fromTo(cta,      { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.35")
```

### Text exit (before slide changes)
```
gsap.to([label, headline, cta], { opacity: 0, duration: 0.3, ease: "power2.in" })
```

### Rail entrance (page load, ScrollTrigger)
```
gsap.fromTo('.presha-hero__rail-card',
  { opacity: 0, y: 16 },
  { opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
    stagger: 0.08, scrollTrigger: { trigger: '.presha-hero', start: 'top 80%' } }
)
```

---

## 9. Section Settings (theme editor)

| Setting | Type | Default | Label |
|---|---|---|---|
| `autoplay_speed` | number | `5000` | Slide duration (ms) |
| `show_discovery_rail` | checkbox | `true` | Show discovery rail |

---

## 10. Performance Checklist

- [ ] First slide image: `fetchpriority="high"` + `loading="eager"`
- [ ] Slides 2–3 images: `loading="lazy"`
- [ ] `will-change: transform` only on the active slide — add/remove on activation
- [ ] GSAP loaded via CDN in `theme.liquid` (already in place)
- [ ] ScrollTrigger loaded via CDN in `theme.liquid` (already in place)
- [ ] Images served as WebP (source files already WebP)
- [ ] No layout shift — hero height set in CSS, not dependent on image load

---

## 11. Accessibility

- Carousel region: `role="region"` + `aria-label="Hero slideshow"`
- Each slide: `aria-hidden="true"` when inactive
- Progress indicators: `role="tablist"` with `aria-label="Slide indicators"`, each indicator `role="tab"`, `aria-selected` on active
- Auto-play respects `prefers-reduced-motion` — if set, disable Ken Burns and crossfade, use instant transitions
- CTA buttons: descriptive text per slide (not generic "Shop Now")
- Rail links: `aria-label` includes the full name e.g. `aria-label="Shop Trending Now"`

---

## 12. File Structure

```
sections/
  presha-hero-carousel.liquid   ← new section (Liquid + scoped CSS + JS)

assets/
  (no new asset files — all images uploaded via theme editor)

templates/
  index.json                    ← add presha-hero-carousel to homepage order
                                   position: after header, before marquee
```

---

## 13. Out of Scope

- Arrow navigation buttons (not in Mad Kicks reference, not requested)
- Swipe gesture detection (browser native scroll handles mobile)
- Video slides (not requested — image only for now)
- The clean no-rail hero variant (parked in `docs/backlog/hero-clean-no-rail.md`)
