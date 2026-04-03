# Backlog: Hero — Clean Editorial Variant (No Discovery Rail)

**Status:** Parked — build if brand evolves toward a purer editorial direction  
**Decision date:** 2026-04-03  
**Reason parked:** Option A (with Discovery Rail) chosen for initial launch for higher commercial utility.

---

## Concept

A pure full-bleed editorial hero with no overlaid rail at the bottom.  
The photography and copy own the entire canvas — nothing competes with the image.

### When to use this variant
- If Presha moves upmarket toward Dior / Kith / END Clothing positioning
- If analytics show the discovery rail is underused or hurts conversion
- For seasonal campaigns where full visual immersion is the priority

---

## Design Spec

### Dimensions
- Width: 100vw (full bleed)
- Height: ~92–95vh (more canvas than the rail variant — bottom padding freed up)

### Text block
- Position: `bottom: 10%`, `left: 6%`
- Same type treatment as the rail variant (label / headline / CTA)

### Indicators
- Horizontal line indicators
- Position: `bottom: 4%`, `left: 6%`

### No rail
- Remove the `presha-hero-rail` component entirely
- The Shop By Brand section below the fold handles brand navigation

### CTA Button
- Burgundy `#6D001A` fill on dark slides
- Consider white fill on lighter slides (per-slide setting)

---

## Implementation Notes
- Can be implemented as a boolean setting on `presha-hero-carousel.liquid`:  
  `show_discovery_rail` (checkbox, default: true)  
  When unchecked, the rail renders nothing and the hero gains full height.
- This means **zero extra code** — just a Shopify admin toggle once the rail variant is built.
