# Mad Kicks Hero Section — Reverse Engineering Breakdown

## Overview

Full analysis of the Mad Kicks Shopify store hero section + header for recreation purposes. The design follows a luxury streetwear editorial aesthetic — dark, confident, high-fashion with a clean navigation and a slideshow hero featuring a discovery rail at the bottom.

---

## 1. Header / Navigation

### Layout
- Full-width, white background `#FFFFFF`
- Height: ~52px
- No visible box-shadow (flat, clean)
- Sticky/fixed to top

### Logo
- Text: `MAD KICKS`
- Style: Uppercase, bold, wide letter-spacing (~5–6px tracking)
- Font: Geometric sans-serif (Futura, Gill Sans, or similar condensed/geometric)
- Color: `#000000`
- Position: Far left, vertically centered

### Divider
- 1px vertical line separating logo from nav links
- Color: `#E0E0E0` or similar light grey
- Height: ~60% of header height, centered vertically

### Navigation Links (center)
- Items: `Featured · Sneakers · Shoes · Streetwear · Accessories · Collectibles`
- Font size: ~14px
- Font weight: Regular (400)
- Color: `#111111` or `#000000`
- Letter-spacing: slight (~0.5px)
- No underline, hover likely adds underline or slight opacity shift
- Centered in the remaining space after logo

### Right Cluster
- **Search bar**: Rounded pill or slight radius input, light grey border, ~200px wide, placeholder: `"Search for a brand,..."`
- **Account icon**: Simple person silhouette SVG icon
- **Locale selector**: `AE AE` text with a small chevron `▾` — dropdown for region/currency
- **Cart icon**: Simple bag/cart SVG icon

---

## 2. Hero Slideshow

### Dimensions
- Width: 100vw (edge to edge, full bleed)
- Height: ~88–90vh (fills viewport below header)
- No padding or margin from edges

### Background / Photo Treatment
- The hero is a **full-bleed photo slideshow** (carousel)
- Photo: Male model in Chrome Hearts black jersey, seated, arms crossed
- Studio backdrop: wrinkled warm taupe/beige fabric
- **Key trick**: The LEFT portion of the photo naturally falls into a darker, shadowed/grey area of the studio backdrop — this creates the appearance of a dark-left / warm-right split WITHOUT a CSS gradient overlay (it's compositional)
- Optional: A subtle dark overlay `rgba(0,0,0,0.25)` on the left ~40% to boost text contrast

### Text Block (Left Side)
Position: Bottom-left quadrant, approximately `left: 5–8%`, `bottom: 22–28%`

```
DISCOVER             ← small label
Chrome Hearts        ← large headline
[DISCOVER button]    ← CTA
```

**Label "DISCOVER":**
- Font size: ~11–12px
- Case: UPPERCASE
- Letter-spacing: ~3–4px
- Color: `#FFFFFF`
- Font weight: Regular or Light (300–400)
- Margin bottom: ~8px

**Headline "Chrome Hearts":**
- Font size: ~36–42px
- Color: `#FFFFFF`
- Font weight: Light to Regular (300–400)
- Font style: Could be a light serif (Canela, Freight Display, GT Sectra) or elegant light sans
- Line height: ~1.1
- Margin bottom: ~20px

**CTA Button "DISCOVER":**
- Background: `#FFFFFF` (white)
- Text color: `#000000` (black)
- Text: `DISCOVER` — uppercase, ~12px, letter-spacing ~2px, bold or medium
- Border: none (or `1px solid #FFFFFF`)
- Border-radius: 0–2px (nearly flat/square)
- Padding: ~10px 24px
- Width: ~140–160px
- No shadow or glow

### Carousel Indicators
- Position: Bottom-left, below the text block, ~`bottom: 8–10%`
- Style: **Horizontal dashes/lines** (not dots)
  - Width: ~30–36px
  - Height: ~2px
  - Border-radius: 1px
  - Gap between: ~6–8px
- Active slide: White `#FFFFFF`, full opacity
- Inactive slides: White, ~40% opacity (`rgba(255,255,255,0.4)`)
- Count: 3 indicators (3 slides)

---

## 3. Bottom "Shop By" Discovery Rail

### Container
- Position: Overlaid at the BOTTOM of the hero — part of the hero, not below it
- Width: 100%
- Height: ~80–85px
- Background: Dark semi-transparent `rgba(20,20,20,0.82)` or solid `#1E1E1E` / `#232323`
- Display: flex, 5 equal columns
- No visible border or shadow on top edge (or subtle `1px solid rgba(255,255,255,0.05)`)

### Each Card (5 total)
Layout: `display: flex; align-items: center; gap: 12px; padding: 0 20px;`

**Thumbnail:**
- Size: ~55×55px or ~50×50px
- Border-radius: ~4–6px (slight rounding)
- Object-fit: cover
- Slight border: `1px solid rgba(255,255,255,0.08)` (barely visible)

**Text:**
- Top line: `SHOP BY` — ~10px, uppercase, letter-spacing ~2px, color `#888888` or `#999999`
- Bottom line: Brand name — ~13–14px, white `#FFFFFF`, font-weight regular or medium (400–500)
- Line-height tight: ~1.3

**Divider between cards:**
- 1px vertical line, `rgba(255,255,255,0.1)`, centered vertically at ~60% height

### Cards (Left to Right)
1. Nike Mind Slides — blue/white sneaker thumbnail
2. Pokemon Collectibles — colorful collectibles thumbnail
3. Chrome Hearts — dark clothing thumbnail
4. Loewe x On — colorful sneaker thumbnail
5. **The Mad Kicks App** — app screenshot thumbnail, label is `THE MAD KICKS APP` / `Download the app` (different label treatment, no "SHOP BY")

**Hover state:** Likely a subtle brightness increase or `background: rgba(255,255,255,0.05)` on the card

---

## 4. Typography Summary

| Element | Size | Weight | Case | Tracking | Color |
|---|---|---|---|---|---|
| Logo | ~18–20px | Bold (700) | UPPER | 5–6px | `#000` |
| Nav links | ~14px | Regular (400) | Title | 0.5px | `#000` |
| Hero label | ~11px | Regular | UPPER | 3–4px | `#FFF` |
| Hero headline | ~38–42px | Light (300) | Mixed | 0 | `#FFF` |
| CTA button | ~12px | Medium (500) | UPPER | 2px | `#000` |
| Shop By label | ~10px | Regular (400) | UPPER | 2px | `#888` |
| Brand name | ~13px | Regular/Medium | Title | 0 | `#FFF` |

---

## 5. Color Palette

```
Header Background:    #FFFFFF
Logo / Nav Text:      #000000
Nav divider:          #E0E0E0
Hero overlay (left):  rgba(0,0,0,0.2–0.3)
Hero text:            #FFFFFF
CTA button bg:        #FFFFFF
CTA button text:      #000000
Bottom rail bg:       #1E1E1E or rgba(20,20,20,0.85)
Shop By label:        #888888
Brand name:           #FFFFFF
Card divider:         rgba(255,255,255,0.1)
Slide indicator:      #FFFFFF / rgba(255,255,255,0.4)
```

---

## 6. Structural HTML Skeleton

```html
<div class="site-wrapper">

  <!-- HEADER -->
  <header class="site-header">
    <div class="header-logo">MAD KICKS</div>
    <div class="header-divider"></div>
    <nav class="header-nav">
      <a>Featured</a>
      <a>Sneakers</a>
      <a>Shoes</a>
      <a>Streetwear</a>
      <a>Accessories</a>
      <a>Collectibles</a>
    </nav>
    <div class="header-right">
      <div class="search-bar">🔍 Search for a brand,...</div>
      <button class="icon-btn">👤</button>
      <button class="locale-btn">AE AE ▾</button>
      <button class="icon-btn">🛍</button>
    </div>
  </header>

  <!-- HERO -->
  <section class="hero">

    <!-- Slides -->
    <div class="hero-slides">
      <div class="hero-slide active" style="background-image: url('model-chrome-hearts.jpg')">
        <div class="hero-content">
          <span class="hero-label">DISCOVER</span>
          <h1 class="hero-title">Chrome Hearts</h1>
          <button class="hero-cta">DISCOVER</button>
        </div>
      </div>
      <!-- more slides... -->
    </div>

    <!-- Slide indicators -->
    <div class="slide-indicators">
      <span class="indicator active"></span>
      <span class="indicator"></span>
      <span class="indicator"></span>
    </div>

    <!-- Bottom discovery rail -->
    <div class="discovery-rail">
      <div class="rail-card">
        <img src="nike-slides.jpg" alt="Nike Mind Slides" />
        <div class="rail-card-text">
          <span class="rail-label">SHOP BY</span>
          <span class="rail-brand">Nike Mind Slides</span>
        </div>
      </div>
      <div class="rail-card">
        <img src="pokemon.jpg" alt="Pokemon Collectibles" />
        <div class="rail-card-text">
          <span class="rail-label">SHOP BY</span>
          <span class="rail-brand">Pokemon Collectibles</span>
        </div>
      </div>
      <div class="rail-card">
        <img src="chrome-hearts.jpg" alt="Chrome Hearts" />
        <div class="rail-card-text">
          <span class="rail-label">SHOP BY</span>
          <span class="rail-brand">Chrome Hearts</span>
        </div>
      </div>
      <div class="rail-card">
        <img src="loewe-on.jpg" alt="Loewe x On" />
        <div class="rail-card-text">
          <span class="rail-label">SHOP BY</span>
          <span class="rail-brand">Loewe x On</span>
        </div>
      </div>
      <div class="rail-card">
        <img src="app.jpg" alt="Mad Kicks App" />
        <div class="rail-card-text">
          <span class="rail-label">THE MAD KICKS APP</span>
          <span class="rail-brand">Download the app</span>
        </div>
      </div>
    </div>

  </section>

</div>
```

---

## 7. CSS Architecture Notes

```css
/* HEADER */
.site-header {
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 24px;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-logo {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 6px;
  text-transform: uppercase;
}
.header-divider {
  width: 1px;
  height: 30px;
  background: #e0e0e0;
  margin: 0 24px;
}
.header-nav {
  display: flex;
  gap: 32px;
  flex: 1;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}

/* HERO */
.hero {
  position: relative;
  height: calc(100vh - 52px);
  overflow: hidden;
}
.hero-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}
.hero-content {
  position: absolute;
  left: 6%;
  bottom: 28%;
  color: white;
}
.hero-label {
  display: block;
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 8px;
  opacity: 0.85;
}
.hero-title {
  font-size: 40px;
  font-weight: 300;
  margin: 0 0 20px;
}
.hero-cta {
  background: #fff;
  color: #000;
  border: none;
  padding: 10px 24px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 0;
}

/* SLIDE INDICATORS */
.slide-indicators {
  position: absolute;
  bottom: 22%;
  left: 6%;
  display: flex;
  gap: 8px;
}
.indicator {
  width: 32px;
  height: 2px;
  background: rgba(255,255,255,0.4);
  border-radius: 1px;
}
.indicator.active {
  background: #fff;
}

/* DISCOVERY RAIL */
.discovery-rail {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 82px;
  background: rgba(20,20,20,0.85);
  display: flex;
}
.rail-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  border-right: 1px solid rgba(255,255,255,0.08);
  cursor: pointer;
}
.rail-card:last-child { border-right: none; }
.rail-card img {
  width: 52px;
  height: 52px;
  object-fit: cover;
  border-radius: 4px;
}
.rail-label {
  display: block;
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 4px;
}
.rail-brand {
  display: block;
  font-size: 13px;
  color: #fff;
  font-weight: 400;
}
```

---

## 8. Changes / Customizations to Make for Presha

- Swap brand name from Chrome Hearts to Presha-relevant brand
- Swap hero photography to match Presha's aesthetic
- Adjust color palette if needed (warmer tones? cooler?)
- Font choice for hero headline — pick something distinctive (not Inter)
- Rail cards updated with Presha's product categories
- Logo text and letter-spacing adjusted for Presha brand name

---

## 9. Key Aesthetic Principles to Preserve

1. **Dark left / light right** split in hero photo — purely compositional, no hard line
2. **Very small "DISCOVER" label** above large headline — the contrast in scale is the design
3. **Square/flat CTA** — no border-radius, not pill-shaped. Fashion brands avoid rounded buttons.
4. **Line indicators not dots** — editorial, not app-like
5. **Rail is part of the hero** — not below it, overlaid. Feels premium, space-efficient
6. **Breathing room in header** — logo, gap, nav, lot of space before right cluster
7. **Low-opacity overlays** — nothing harsh, everything feels photographic
