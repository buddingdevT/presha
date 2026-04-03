# PRESHA TRENDS — DESIGN SYSTEM
### Version 1.0 · March 2026
### "Where Culture Meets Curation"

---

> **Source of Truth Priority:**
> 1. This document (brand guidelines extrapolated into decisions)
> 2. Brand Guidelines PDF (March 2026) — color, typography, logo
> 3. Design reference screenshots in `/designrefs/`
> 4. CLAUDE.md for technical/dev rules
>
> If anything in CLAUDE.md conflicts with this file on a **visual/design decision**, this file wins.
> If anything conflicts on a **technical/Shopify constraint**, CLAUDE.md wins.

---

## 1. BRAND IDENTITY

### Brand Essence
| Dimension | Value |
|-----------|-------|
| **Tagline** | "Where Culture Meets Curation" |
| **Category** | Luxury streetwear authority — resell, authentication, curation |
| **Location** | Dubai — global reach |
| **Position** | The intersection of luxury fashion and streetwear culture |

### Brand Personality (from guidelines)
| Trait | Design Expression |
|-------|------------------|
| **Elevated** | Restraint, whitespace, considered hierarchy — nothing shouts |
| **Authoritative** | Strong type weight, confident sizing, no hedging |
| **Cultured** | Editorial typography, intentional composition, magazine-grade imagery |

### How the audience should feel after interacting with Presha
> *Confident, validated, and culturally ahead. Certain they made the right choice. Elevated — like insiders who understand the culture.*

This feeling must translate into every micro-decision: button radius, loading copy, card spacing.

---

## 2. COLOR SYSTEM

> **Source:** Brand Guidelines PDF, p.20–22
> **Critical rule:** Black **dominates**. Burgundy is the **signature accent** — not the background color.

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Burgundy** | `#6D001A` | Accent — CTAs, badges, icons, announcement bar, overline text |
| **Black** | `#000000` | Dominant — headings, body text, dark sections, footer |
| **White** | `#FFFFFF` | Surfaces, cards, overlays |

### Accent Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Soft Ivory** | `#F5F1EC` | Page background, section backgrounds — never pure white |
| **Dusty Rose** | `#A84A5C` | Depth accent within burgundy spectrum — use sparingly |
| **Slate** | `#4A4A4A` | Neutral body text, supporting copy, muted labels |

### Semantic Color Tokens

```
Background
  bg-base:          #F5F1EC   Page background (Soft Ivory — not pure white)
  bg-surface:       #FFFFFF   Cards, panels, product tiles
  bg-elevated:      #FFFFFF   Modals, drawers, dropdowns
  bg-subtle:        #EDE9E3   Tinted alternate sections (email signup, quote blocks)
  bg-dark:          #0A0A0A   Footer, dark hero overlays
  bg-dark-surface:  #141414   Dark section cards
  bg-announcement:  #6D001A   Announcement bar (burgundy)

Text
  text-primary:     #000000   Headlines, all dominant copy — black leads
  text-secondary:   #4A4A4A   Body copy, supporting text (Slate)
  text-muted:       #8A8A8A   Captions, meta, hints, price footnotes
  text-on-dark:     #F5F1EC   Text on dark/footer sections (Ivory)
  text-on-brand:    #FFFFFF   White text on burgundy backgrounds
  text-brand:       #6D001A   Burgundy used as text accent (overlines, hover states)
  text-dusty:       #A84A5C   Dusty rose for subtle accent text

Borders
  border-default:   #DDD9D3   Card outlines, dividers
  border-strong:    #B8B3AC   Input fields, strong separators
  border-brand:     #6D001A   Focus rings, brand-accented borders
  border-dark:      #1F1F1F   Dark section borders

Interactive
  interactive:      #6D001A   Default CTA state
  interactive-hover:#580015   Hover state (darker burgundy)
  interactive-active:#440010  Pressed/active state
  interactive-focus:rgba(109,0,26,0.25)  Focus ring
  interactive-disabled:#B8B3AC Disabled — reduced opacity

Feedback
  success:          #1E6B3F   Success states
  success-bg:       #EBF5F0
  warning:          #926B12   Warning states
  warning-bg:       #FDF6E3
  error:            #B8001A   Error states (burgundy-adjacent for brand harmony)
  error-bg:         #FCEAEC
  info:             #0F4C7A
  info-bg:          #E8F3FB
```

### Color Hierarchy in Layouts
```
Section light:  bg-base (#F5F1EC) + text-primary (#000) + burgundy accents
Section white:  bg-surface (#FFF) + text-primary (#000) + burgundy accents
Section subtle: bg-subtle (#EDE9E3) + text-primary (#000) (email, quiet sections)
Section dark:   bg-dark (#0A0A0A) + text-on-dark (#F5F1EC) + white/ivory
Footer:         bg-dark (#0A0A0A) + text-on-dark + column structure
Announcement:   bg-announcement (#6D001A) + text-on-brand (#FFF)
```

### Contrast Compliance (WCAG AA minimum 4.5:1)
| Pair | Ratio | Status |
|------|-------|--------|
| `#000000` on `#F5F1EC` | 19.5:1 | ✅ AAA |
| `#000000` on `#FFFFFF` | 21:1 | ✅ AAA |
| `#FFFFFF` on `#6D001A` | 9.2:1 | ✅ AAA |
| `#F5F1EC` on `#0A0A0A` | 18.1:1 | ✅ AAA |
| `#4A4A4A` on `#F5F1EC` | 7.8:1 | ✅ AA |
| `#8A8A8A` on `#FFFFFF` | 3.5:1 | ⚠ AA Large only — don't use for small body text |

> **Design advice:** The muted slate `#8A8A8A` must only be used at sizes ≥18px or for decorative non-critical labels. For all body copy, use `#4A4A4A` minimum.

---

## 3. TYPOGRAPHY

> **Source:** Brand Guidelines PDF, p.25–28
> **Note:** The Glamore and Gilroy are commercial fonts requiring a license. Fallback stacks are provided for development. Never substitute Cormorant Garamond as a primary — it is an approximate fallback only.

### Font Roles

| Role | Font | Usage |
|------|------|-------|
| **Display** | The Glamore | Hero headlines, campaign copy, editorial section titles, journal headers |
| **Body/UI** | Gilroy | All body text, UI labels, navigation, buttons, prices, captions, product names |
| **Logo** | Custom wordmark | Logo use only — never recreate or substitute in UI |

### Fallback Stacks (Shopify / development)
```css
--font-display: 'The Glamore', 'Cormorant Garamond', Georgia, serif;
--font-body:    'Gilroy', 'Jost', 'Helvetica Neue', Arial, sans-serif;
```

> **UI/UX Pro Max intelligence:** For luxury e-commerce, the tool recommends a high-contrast serif+sans pairing (Playfair Display + Inter, or Bodoni Moda + Jost). The Glamore + Gilroy fulfils this brief perfectly — high-contrast editorial display serif paired with a geometric, neutral sans. This is correct and should not be changed.

### Type Scale

| Token | Size | Usage |
|-------|------|-------|
| `text-2xs` | 10px / 0.625rem | Micro-labels, "PRESHA VERIFIED" badge |
| `text-xs` | 11px / 0.6875rem | Overlines, ALL CAPS labels, price meta |
| `text-sm` | 13px / 0.8125rem | Captions, product sub-labels, nav links |
| `text-base` | 16px / 1rem | Body copy — minimum for all readable text |
| `text-lg` | 18px / 1.125rem | Lead paragraph, hero sub-copy |
| `text-xl` | 22px / 1.375rem | Small section headings |
| `text-2xl` | 28px / 1.75rem | Section headings (desktop) |
| `text-3xl` | 36px / 2.25rem | Major headings |
| `text-4xl` | 48px / 3rem | Hero sub / large display (Gilroy) |
| `text-5xl` | 64px / 4rem | The Glamore display (mid-hero) |
| `text-6xl` | 88px / 5.5rem | The Glamore editorial hero |

> **Rule:** Never use body text below 16px on mobile. iOS will auto-zoom any input under 16px — this breaks the shopping experience.

### Type Style Roles

**THE GLAMORE — Display/Editorial**
- Light or Regular weight (400) — the high contrast of Glamore does the work
- Letter spacing: `-0.03em` (tight — luxury feel)
- Line height: `1.1` (tight — editorial)
- Usage: hero headline, campaign headlines, journal article titles, section-defining moments
- On dark: Ivory `#F5F1EC` — not pure white

**GILROY — UI/Body**
- Bold (700) for section headings: "TRENDING NOW", "SHOP BY BRAND"
- Semibold (600) for labels, buttons, prices
- Regular (400) for body copy, descriptions
- Letter spacing: `0em` body, `0.18em` for ALL CAPS overlines
- Line height: `1.5` body, `1.1–1.25` headings

### Text Style Quick Reference

```
Display hero:       The Glamore, 64–88px, weight 400, tracking -0.03em, leading 1.1
Section heading:    Gilroy, 32–36px, weight 700, tracking -0.01em, leading 1.25
Sub-heading:        Gilroy, 22–28px, weight 600, leading 1.25
Body:               Gilroy, 16–18px, weight 400, leading 1.5
Lead:               Gilroy, 18px, weight 400, leading 1.65
Label/UI:           Gilroy, 13px, weight 600, tracking 0.05em
Overline:           Gilroy, 11px, weight 600, tracking 0.18em, UPPERCASE, color: #6D001A
Caption:            Gilroy, 13px, weight 400, color: #8A8A8A
Badge:              Gilroy, 10px, weight 700, tracking 0.18em, UPPERCASE
Price:              Gilroy, 16–18px, weight 600, tabular figures (font-variant-numeric: tabular-nums)
```

> **Design advice (UI/UX Pro Max rule `number-tabular`):** Price and numeric data must use tabular figures to prevent layout jitter as numbers update (cart counts, price drops). Always set `font-variant-numeric: tabular-nums` on price elements.

---

## 4. SPACING SYSTEM

> **Standard:** 4px base, 8dp rhythm — consistent with Material Design and Apple HIG.
> **Rule:** No arbitrary pixel values. Every spacing decision uses a token.

```
space-1:   4px    Micro gaps (icon-to-label, badge padding)
space-2:   8px    Tight pairs (label-to-input, icon spacing)
space-3:   12px   Compact padding (small cards, badges)
space-4:   16px   Default padding (card body, form fields)
space-5:   20px   Medium gap
space-6:   24px   Section header margin-bottom (mobile)
space-8:   32px   Card-to-card gap, section sub-components
space-10:  40px   Major component gaps
space-12:  48px   Section padding top/bottom (mobile)
space-16:  64px   Section padding (tablet)
space-20:  80px   Section padding (desktop)
space-24:  96px   Large section gaps
space-32:  128px  Section padding (large desktop)
```

### Breakpoints
```
375px   — iPhone SE, minimum baseline (always test here)
480px   — Small mobile
749px   — Tablet portrait / large mobile
1024px  — Tablet landscape / small desktop
1280px  — Desktop
1440px  — Wide desktop
```

> **Rule:** Mobile-first. Design and code for 375px first, then scale up.

---

## 5. SHAPE LANGUAGE & BORDERS

The Presha logo has two distinct shape languages — the **angular PT monogram** and the **fluid serif curves** of the wordmark. This duality informs our UI:

- **Product cards, category tiles:** Minimal radius (`4–8px`) — structured, not playful
- **Buttons and CTAs:** Full pill (`9999px`) — confirmed in all design refs (Subscribe, Shop Now, Explore Brands)
- **Input fields:** Pill (`20px` radius) — confirmed in email section design ref
- **Trust icons:** Diamond (rotated square) — brand-specific, confirmed in Trust Bar design ref
- **Badges/tags:** Very minimal radius (`2px`) — sharp, authoritative

```
radius-none: 0        — Dividers, announcement bar
radius-xs:   2px      — Tags, "PRESHA VERIFIED" badges, table cells
radius-sm:   4px      — Product thumbnails, small cards
radius-md:   8px      — Standard product cards, category tiles
radius-lg:   12px     — Large editorial tiles
radius-xl:   20px     — Input fields (pill)
radius-full: 9999px   — All buttons and CTAs (confirmed from designs)
```

---

## 6. SHADOW & ELEVATION

> **Rule:** Flat design on light sections. Shadows used only to indicate elevation — never decorative.
> No decorative glow effects except the brand CTA glow (`--shadow-brand`).

```
shadow-none: none
shadow-xs:   0 1px 3px rgba(0,0,0,0.06)    — Subtle card lift
shadow-sm:   0 2px 8px rgba(0,0,0,0.08)    — Resting card
shadow-md:   0 4px 20px rgba(0,0,0,0.10)   — Hovered card / active state
shadow-lg:   0 8px 40px rgba(0,0,0,0.14)   — Modals, drawers
shadow-xl:   0 20px 60px rgba(0,0,0,0.18)  — Full-page overlays
shadow-brand:0 4px 24px rgba(109,0,26,0.35)— Burgundy CTA button hover glow only
```

> **Design advice (UI/UX Pro Max `elevation-consistent`):** Use a max of 3 elevation levels per page. Don't let shadows compete — the page should feel clean, with shadows only telling you "this is above that."

---

## 7. MOTION & ANIMATION

> **Library:** GSAP + ScrollTrigger (required). CSS transitions for micro-interactions only.
> **Philosophy:** Every animation expresses meaning. Motion that doesn't communicate something should be removed.

### Duration Tokens
```
duration-fast:      120ms   — Micro-interactions (button press, hover color)
duration-normal:    220ms   — State changes (dropdown open, input focus)
duration-slow:      380ms   — Component entrances (card reveal, section fade)
duration-cinematic: 900ms   — Hero entrances, editorial moments
```

### Easing
```
ease-default:    cubic-bezier(0.4, 0, 0.2, 1)    — General transitions
ease-out:        cubic-bezier(0, 0, 0.2, 1)       — Elements entering (feel natural landing)
ease-in:         cubic-bezier(0.4, 0, 1, 1)       — Elements exiting
ease-editorial:  cubic-bezier(0.16, 1, 0.3, 1)    — Premium section entrances (GSAP: power3.out)
ease-precise:    cubic-bezier(0.2, 0, 0, 1)        — Refined micro-interactions

GSAP aliases:
  Entrance:  "power3.out"   (most entrances)
  Cinematic: "expo.out"     (hero, editorial)
  Exit:      "power2.in"    (elements leaving)
```

### Global Motion Rules
- **ScrollTrigger:** All major sections fade/slide in on scroll. Start: `top 85%`
- **Stagger on grids:** Product grids, brand grids — stagger children by `40ms`
- **Exit = 60–70% of entrance duration** (feels responsive)
- **Respect `prefers-reduced-motion`** — wrap all GSAP in a `matchMedia` check
- **No looping background animations** — performance cost on mobile
- **No spring/bounce on luxury elements** — save spring physics for interactive feedback only (cart add, wishlist tap)

### Animation Reference by Component

| Component | Animation | GSAP | Duration |
|-----------|-----------|------|----------|
| Section entrance | Fade up `y: 30` → `y: 0`, opacity 0→1 | `power3.out` | 600ms |
| Product grid | Stagger fade up | `power3.out` | 500ms + 40ms stagger |
| Hero headline | Letter/word split reveal | `SplitText` + `power3.out` | 900ms |
| Nav on scroll | Background fade in | CSS transition | 220ms |
| Card hover | Lift `translateY(-4px)`, image scale `1.04` | CSS | 380ms |
| Button press | Scale `0.97` | CSS | 120ms |
| Announcement ticker | Horizontal scroll | CSS `animation` | 25s linear loop |
| Modal open | Scale `0.96→1` + opacity 0→1 | `power3.out` | 280ms |
| Drawer open | `translateX` slide | `power3.out` | 350ms |

---

## 8. COMPONENT SPECIFICATIONS

### Buttons
All buttons: pill shape (`border-radius: 9999px`), Gilroy Semibold, letter-spacing `0.05em`.

| Variant | Background | Text | Border | Use |
|---------|-----------|------|--------|-----|
| Primary | `#6D001A` | `#FFFFFF` | none | Main CTA (Shop Now, Subscribe) |
| Secondary | transparent | `#000000` | `1.5px #B8B3AC` | Secondary action (Explore Brands) |
| Ghost Dark | transparent | `#F5F1EC` | `1.5px rgba(245,241,236,0.3)` | CTAs on dark sections |
| White | `#FFFFFF` | `#000000` | none | On dark backgrounds |

Touch target minimum: `44px height`. No button under `44px` on mobile.

### Product Card
- Background: `#FFFFFF`, radius `8px`, border `1px #DDD9D3`
- Image: `aspect-ratio: 1/1`, `object-fit: cover`
- Hover: `translateY(-4px)` + `shadow-md`, image `scale(1.04)`
- "PRESHA VERIFIED" badge: burgundy `#6D001A`, white text, `2px` radius, ALL CAPS, `10px/0.18em`
- Price: Gilroy Semibold, `tabular-nums`, `#000000`
- Brand label: Gilroy Semibold, `11px`, `0.18em` tracking, UPPERCASE, `#8A8A8A`

### Trust Bar Icons (Diamond System)
- Shape: `56×56px` square, `transform: rotate(45deg)`, `2px` radius
- Fill: Burgundy `#6D001A`
- Icon inside: `transform: rotate(-45deg)`, white SVG, `22px`
- Title: The Glamore italic, `22px`, `#000000`
- Body: Gilroy Regular, `13px`, `#8A8A8A`, max-width `200px`

### Announcement Bar
- Height: `36px` minimum (mobile touch clearance)
- Background: `#6D001A`, text: `#FFFFFF`
- Font: Gilroy Medium, `11px`, `0.06em` tracking
- Content: horizontal marquee or static centered copy

### Navigation
- Background: white with `8px` bottom blur on scroll
- Logo: left-aligned, clear space maintained
- Links: Gilroy Medium, `13px`, `#000000` — `#6D001A` on hover
- Icons (search, cart, account): SVG only, `24px`, stroke consistent
- Mobile: slide-in drawer from right, full height

### Form Inputs (Email Signup)
- Height: `52px` minimum (touch target ≥44px)
- Border-radius: `9999px` (pill — confirmed from design refs)
- Border: `1.5px #B8B3AC`, focus: `#6D001A` border + `rgba(109,0,26,0.25)` ring
- Font: Gilroy Regular, `16px` (prevents iOS auto-zoom)
- Placeholder: `#8A8A8A`
- Paired Subscribe button: pill, burgundy fill, same height

---

## 9. LOGO USAGE

> **Source:** Brand Guidelines PDF, p.12–18

### Variants
| Variant | Use Case |
|---------|----------|
| Full (mark + wordmark) | Primary — all key brand moments |
| Text only (wordmark) | Horizontal navigation bar |
| Mark only (PT monogram) | Favicon, app icon, small placements |
| Burgundy | On white/ivory backgrounds |
| Black | On light backgrounds |
| White | On dark/burgundy backgrounds |

### Rules
- Minimum clear space = height of "P" in the wordmark on all sides
- Never distort, rotate, or stretch
- Never add shadows, gradients, or effects to the logo
- Never change colors outside the approved three (Burgundy, Black, White)
- Never recreate the reversed-"e" letterform in any other context

---

## 10. BRAND VOICE IN UI

> **Source:** Brand Guidelines PDF, p.9 — Elevated, Authoritative, Cultured

### Writing Rules
- **Sentence case** everywhere except overlines and badge labels (ALL CAPS)
- **Short, punchy** — no filler, no padding
- **2nd person** — "You're in", not "Your subscription has been confirmed"
- **No emoji in UI** — WhatsApp and social only
- **No Oxford comma** needed — copy is too short for it to matter
- **Present tense** — "Find your next piece" not "Browse our collection of items"

### UI Copy Reference

| Moment | Generic | Presha Voice |
|--------|---------|--------------|
| Empty state | "No items found" | "Nothing here yet — check back soon." |
| Loading products | "Loading..." | "Finding the heat..." |
| Error | "Something went wrong" | "Something slipped. Try again." |
| Success / confirmation | "Done!" | "You're in." |
| Cart empty | "Your cart is empty" | "Your cart is empty — let's fix that." |
| Out of stock | "Sold out" | "Gone. Join the waitlist." |
| Verified product | "Verified" | "Presha Verified" |
| Newsletter hint | "Enter email" | "jane@email.com" (placeholder) + "Weekly newsletter. Unsubscribe anytime." (hint) |
| Primary CTA | "Submit" / "Buy" | "Shop Now" / "Get It" |
| Community CTA | "Sign up" | "Join the Community" |
| Auth section | "100% Authentic" | "Authenticity Guaranteed" |

---

## 11. IMAGERY GUIDELINES

> **Source:** Brand Guidelines PDF, p.33–37

- **Lifestyle first** — people wearing product, Dubai context, editorial environments
- **Product-on-surface** — clean, neutral surface shots for product pages
- **No busy backgrounds** — if image is too complex, use the monochrome logo variant
- **Aspect ratios:** Hero `16:9` or `21:9`, Product `1:1`, Editorial tiles `4:3` or `3:4`
- **Photography tone:** Natural Dubai light — warm, sun-drenched, cinematic — not overly filtered
- **No stock-photo aesthetic** — all imagery must feel original and editorial

---

## 12. DO / DON'T QUICK REFERENCE

### Colors
| ✅ Do | ❌ Don't |
|------|---------|
| Use black `#000000` as the dominant color | Use burgundy as a large section background |
| Use Soft Ivory `#F5F1EC` as page bg | Use pure white `#FFFFFF` as page bg |
| Burgundy for CTAs, badges, announcement, overlines | Add gradients anywhere |
| Dusty Rose `#A84A5C` sparingly as depth accent | Use unapproved colors (gold, navy, purple) |
| Dark `#0A0A0A` for footer only | Use `#8A8A8A` muted text on small body copy |

### Typography
| ✅ Do | ❌ Don't |
|------|---------|
| The Glamore for hero, campaign, editorial titles | Use The Glamore for body copy or buttons |
| Gilroy for all UI, body, navigation, labels | Use other serifs (Cormorant, Garamond) as primary |
| ALL CAPS + `0.18em` tracking for overlines | Set overlines in mixed case |
| `tabular-nums` on all price elements | Allow price numbers to shift layout |
| 16px minimum for all body text | Use text below 16px in readable body content |

### Buttons & Shapes
| ✅ Do | ❌ Don't |
|------|---------|
| Pill shape (`border-radius: 9999px`) on all CTAs | Use square or rectangular buttons |
| 44px minimum touch target height | Allow buttons under 44px on mobile |
| One primary CTA per screen/section | Stack multiple primary CTAs in the same view |

### Logo
| ✅ Do | ❌ Don't |
|------|---------|
| Maintain minimum clear space (height of "P") | Crop or clip the logo |
| Use approved variants only (Burgundy/Black/White) | Add glow, shadow, or gradient to the logo |
| Use on-brand backgrounds that give sufficient contrast | Place logo on busy images without overlay |

### Motion
| ✅ Do | ❌ Don't |
|------|---------|
| Use GSAP `power3.out` for all section entrances | Loop background animations |
| Stagger grid items by 40ms | Animate all children simultaneously |
| Wrap all GSAP in `prefers-reduced-motion` check | Ignore reduced-motion accessibility |
| Exit animations at 60% of entrance duration | Use equal durations for enter and exit |

### UI/UX (from UI/UX Pro Max audit)
| ✅ Do | ❌ Don't |
|------|---------|
| SVG icons only (Heroicons, Lucide, or custom) | Use emoji as icons |
| Keyboard navigation + visible focus rings | Remove focus outlines |
| `cursor: pointer` on all interactive elements | Leave default cursor on buttons/links |
| `touch-action: manipulation` on buttons | Accept 300ms tap delay on mobile |
| Skeleton screens for loads > 300ms | Show blank space while content loads |
| Lazy load all below-fold images | Eagerly load the entire product grid |
| Tabular numerals on all prices | Allow price font to cause layout jitter |

---

## 13. DESIGN ADVISER NOTES
*(Expert recommendations beyond the brand guidelines)*

### On style direction
The UI/UX Pro Max tool recommends **Liquid Glass** for luxury e-commerce — flowing translucent effects, morphing elements, dynamic blur. **My recommendation: use selectively, not globally.**

Full Liquid Glass on a Shopify theme risks performance degradation on mobile and complicates Liquid templating. Instead:
- **Use glass selectively** on modals, nav backdrop on scroll, and image overlays
- Keep product sections and the homepage clean/flat — let photography do the work
- Reserve glass moments for aspirational, non-product UI (hero filters, editorial overlays)

This is what separates Presha from generic luxury — restraint in the right places, indulgence in the right places.

### On the dual type personality
The Glamore + Gilroy is a deliberately high-contrast pairing. The key risk is overusing The Glamore — it should feel like a rare, deliberate moment, not the default heading font.

**Rule of thumb:** If a heading is informational (product name, category title, section label) → Gilroy. If a heading is editorial, atmospheric, or brand-defining (hero copy, journal title, campaign message) → The Glamore.

### On the color system
The brand guidelines are correct to make black dominant. Most luxury streetwear brands make the mistake of over-using their signature color — burgundy would lose its power if it appeared on every surface. Reserve it, and when it appears, it will carry authority.

The Dusty Rose `#A84A5C` is underused as a design system element. Consider using it for hover states on secondary interactive elements and for depth in gradient-adjacent moments — it keeps the burgundy family interesting without breaking the system.

### On the Dubai context
The audience shops in a high-ambient-light environment — often on phones outdoors. This has two implications:
1. **Contrast must exceed WCAG AA** — aim for AAA on primary text
2. **High-quality imagery** — avoid dark product photography; it renders poorly in bright environments
3. **WhatsApp CTA** is culturally essential — treat it as a primary conversion pathway in the UAE market

---

## 14. FILE REFERENCES

| Asset | Location |
|-------|---------|
| Brand Guidelines PDF | `/designassets/Logo/Brand Guidelines Presentation (Presha Trends).pdf` |
| Logo variants | `/designassets/Logo/` |
| Design reference screenshots | `/designrefs/` |
| Brand partner logos | `/brand logos/` (source) + `/assets/brand-*.svg` (built) |
| This design system | `/DESIGN-SYSTEM.md` |
| CSS token implementation | `/assets/presha-design-system.css` *(to be created)* |

---

---

## 15. EXISTING SECTIONS AUDIT
*(What's built, what needs correcting to align with this design system)*

> **Severity key:** 🔴 Must fix — breaks brand consistency | 🟡 Should fix — off-spec but functional | 🟢 Correct — no action needed

---

### `presha-email-signup.liquid`

| Issue | Current | Correct | Severity |
|-------|---------|---------|----------|
| Headline font | `Impact, Oswald` | `'Gilroy', sans-serif` at weight 900, or The Glamore | 🔴 |
| Headline color | `#111827` | `#000000` | 🟡 |
| Body text color | `#4b5563` | `#4A4A4A` (Slate) | 🟡 |
| Muted/hint color | `#9ca3af` | `#8A8A8A` | 🟡 |
| Hover bg | `#8a0022` | `#580015` | 🟡 |
| Button/focus ring | `#6d001a` | ✅ correct | 🟢 |
| Input pill shape | `border-radius: 50px` | ✅ correct | 🟢 |

**Design note:** The `Impact/Oswald` font is the biggest brand violation in the built sections. The email section uses condensed impact lettering that reads as generic streetwear — not Presha's elevated, cultured positioning. Replace with Gilroy Black (900) for the heavy headline. The design ref ("JOIN THE PRESHA COMMUNITY!") is heavy but it should feel editorial-heavy, not sports-brand heavy.

---

### `presha-authentication.liquid`

| Issue | Current | Correct | Severity |
|-------|---------|---------|----------|
| Heading font | `Impact, system-ui` | `'Gilroy', sans-serif` weight 900 | 🔴 |
| Dark bg | `#111` | `#0A0A0A` | 🟡 |
| Hover state | `#8a0022` | `#580015` | 🟡 |
| Burgundy accent | `#6d001a` | ✅ correct | 🟢 |
| Overline style | 11px, 700, UPPERCASE | ✅ correct pattern | 🟢 |

**Design note:** Same Impact font issue as email section. This section has a strong dark layout concept that works — the structure is right, the font is wrong.

---

### `presha-featured-categories.liquid`

| Issue | Current | Correct | Severity |
|-------|---------|---------|----------|
| Section heading font | `Cormorant Garamond` | `'The Glamore', 'Cormorant Garamond'` (Glamore first) | 🔴 |
| Section background | `#ffffff` | `#F5F1EC` (Soft Ivory) | 🟡 |
| Hover burgundy | `#6B1A2A` | `#6D001A` | 🟡 |
| Body font fallback | `'Jost', system-ui` | `'Gilroy', 'Jost', system-ui` | 🟡 |
| Card radius | `12px` | ✅ correct (radius-lg) | 🟢 |
| Card hover lift | `translateY(-4px)` | ✅ correct | 🟢 |

**Design note:** The italic serif heading concept is right — this is a correct editorial moment. Just update the font stack priority to put The Glamore first, with Cormorant as fallback.

---

### `presha-brand-logos.liquid`

| Issue | Current | Correct | Severity |
|-------|---------|---------|----------|
| Eyebrow color | `#6B1A2A` | `#6D001A` | 🟡 |
| Heading color | `#1e2235` (dark navy) | `#000000` | 🔴 |
| Font fallback | `'Jost', system-ui` | `'Gilroy', 'Jost', system-ui` | 🟡 |
| Card radius | `12px` | Reduce to `8px` (radius-md) to match card spec | 🟡 |
| Hover lift | `3px` | ✅ acceptable (spec is 4px, minor) | 🟢 |

**Design note:** The dark navy heading color `#1e2235` is an off-brand value that crept in. The heading "SHOP BY BRAND" should be `#000000` — black dominates.

---

### `presha-trust-bar.liquid`

| Issue | Current | Correct | Severity |
|-------|---------|---------|----------|
| Icon shape | `border-radius: 16px` (rounded square) | Rotated 45deg diamond (`transform: rotate(45deg)`, `border-radius: 2px`) | 🔴 |
| Icon bg | `#6d001a` | ✅ correct | 🟢 |
| Title font | No `font-family` set → inherits theme default | `'The Glamore', Georgia, serif` italic | 🔴 |
| Body font | `system-ui, -apple-system, ...` | `'Gilroy', system-ui` | 🟡 |
| Body size | `14px` | ✅ acceptable | 🟢 |

**Design note:** The diamond icon shape is the key visual signature of the Trust Bar — confirmed directly in the design ref screenshot. The current rounded-square shape loses that brand-specific detail. This needs to be rebuilt as a rotated square with minimal radius.

---

### `presha-reviews-press.liquid`

| Issue | Current | Correct | Severity |
|-------|---------|---------|----------|
| All font-family | `'Jost', sans-serif` | `'Gilroy', 'Jost', sans-serif` | 🟡 |
| Review card radius | `12px` | `8px` (radius-md) | 🟡 |
| Colors | All via theme settings | ✅ flexible — ensure defaults match tokens | 🟢 |
| Auto-scroll behavior | ✅ | ✅ correct | 🟢 |

**Design note:** Review section is structurally solid. Font stack is the only meaningful correction — swap Jost primary to Gilroy primary.

---

### `presha-marquee.liquid`

| Issue | Current | Correct | Severity |
|-------|---------|---------|----------|
| Animation | ⚠️ Not working | Fix with CSS `@keyframes` translateX, not JS RAF | 🔴 |
| Font | `var(--font-body--family)` | `'Gilroy', system-ui` | 🟡 |
| Colors | Via settings | ✅ flexible | 🟢 |

**Design note:** The marquee animation failure is likely caused by Shopify's `overflow: hidden` on `.shopify-section` wrappers. Fix: add `overflow: visible` override on the section wrapper and ensure the marquee container itself controls overflow. Use CSS `@keyframes` with `translateX(-50%)` on a doubled content track — this is more reliable on Shopify than RAF-based JS.

---

### `presha-brand-logos.liquid` + `presha-featured-categories.liquid` — Background Decision

Both sections currently use `#ffffff` (pure white) backgrounds. Per the design system:
- **Light sections** → Soft Ivory `#F5F1EC`
- **Surface/card backgrounds** → White `#FFFFFF`

The section background should be Ivory; the cards within them can remain white. This creates the layered warmth that distinguishes Presha from generic e-commerce.

---

## 16. SECTIONS SWITCH-UP PLAN
*(Sections that need redesign, not just token fixes)*

| Section | Current State | Direction |
|---------|--------------|-----------|
| `presha-email-signup` | Impact font, functional | Replace heading font → Gilroy Black. Consider The Glamore for the large display line. |
| `presha-authentication` | Impact font, dark bg | Replace heading font → Gilroy Black. Structure is correct, keep dark layout. |
| `presha-trust-bar` | Rounded icon, wrong font | Rebuild icons as true diamonds (rotate 45deg). Add The Glamore to title. |
| `presha-marquee` | Animation broken | Fix CSS animation. Ensure Gilroy font stack. |
| `presha-featured-categories` | Cormorant heading | Update font stack: The Glamore first, Cormorant fallback. Change bg to Ivory. |
| `presha-brand-logos` | Navy heading color | Change heading to `#000000`. Fix eyebrow hex. |
| `presha-reviews-press` | Jost fonts | Update to Gilroy primary. Confirm card radius is 8px. |

### Sections Still To Build
| Section | Status | Notes |
|---------|--------|-------|
| Hero | ❌ Not built | Needs GSAP cinematic entrance. Full-bleed lifestyle image. The Glamore headline. Pill CTAs. |
| Gifts for Her/Him | ❌ Not built | Split editorial tiles, two burgundy CTAs |
| Trending Now | ⚠️ Exists (`presha-trending-now.liquid`) | Verify it's on-spec |
| Footer | ⚠️ `presha-footer.liquid` exists | Verify dark bg, Ivory text, Gilroy fonts, correct structure |
| Scrolling Marquee | ⚠️ Broken | Fix animation — see section 15 note above |

---

*Last updated: April 2026 · Maintained by the Presha Trends development team*
