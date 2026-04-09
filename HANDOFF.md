# Presha Trends — AI Handoff Document

> **For any AI assistant picking up this project cold.**
> Read this entire file before touching any code. No guessing required.
> Last updated: 2026-04-09

---

## What This Project Is

**Presha Trends** is a luxury streetwear and sneaker resell brand based in Dubai. We are building their full Shopify storefront from the ground up on the **Horizon theme** (modified copy, theme name: `presha`). The goal is a storefront significantly superior in design, interaction quality, and brand experience to any competitor in the UAE luxury sneaker resell space.

**Closest competitor for reference:** madkicks.com — study their structure but beat their design.

---

## Credentials & Workflow

| Item | Value |
|------|-------|
| Shopify store | `agw1a7-eu.myshopify.com` |
| Theme ID | `194145845329` |
| Theme name | `presha` |
| Git user | `buddingdevT` |
| Git branch | `main` |
| Preview URL | `https://agw1a7-eu.myshopify.com?preview_theme_id=194145845329` |

**Push command (full theme):**
```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live
```

**Single file push:**
```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live --only path/to/file.liquid
```

**No live dev server.** Workflow is always: edit → push → preview link.

---

## Brand Identity

| Property | Value |
|----------|-------|
| Primary color | Burgundy `#6B1A2A` |
| Background | Off-white |
| Heading font | Cormorant Garamond (editorial serif) |
| Body/UI font | Jost |
| Tone | High-end, editorial, exclusive, trustworthy |
| Feel | Very interactive, modern, premium — luxury with energy |

---

## Tech Stack

- **Platform:** Shopify
- **Theme:** Horizon (modified copy)
- **Animations:** GSAP loaded via CDN in `layout/theme.liquid` — `gsap`, `ScrollTrigger`, `SplitText` (or planned)
- **Smooth scroll:** Lenis 1.1.14 — integrated with GSAP ticker in `layout/theme.liquid`
- **3D Intro:** Planned (not scoped yet — likely Three.js or video-based)

---

## File Structure (Key Files)

```
presha/
├── layout/
│   └── theme.liquid              — GSAP + Lenis CDN loaded here
├── sections/
│   ├── header.liquid             — Main header (glassmorphic, 72px, Lenis)
│   ├── header-announcements.liquid — Announcement bar (3 messages)
│   ├── header-group.json         — Header settings (nav: main-menu-mega)
│   ├── presha-hero-carousel.liquid     — ✅ Full-bleed hero carousel (3 slides)
│   ├── presha-marquee.liquid           — ⚠️ Scrolling marquee (BROKEN - animation not working)
│   ├── presha-brand-logos.liquid       — ✅ Shop by Brand (Theme Editor brand list)
│   ├── presha-authentication.liquid    — ✅ Authentication section (dark, 2-col)
│   ├── presha-featured-categories.liquid — ✅ Featured Categories (horizontal scroll)
│   ├── presha-featured-journal.liquid  — ✅ Journal / blog editorial section
│   ├── presha-reviews-press.liquid     — ✅ Reviews & Press (horizontal scroll, auto)
│   ├── presha-trust-bar.liquid         — ✅ Trust bar (3 icons, diamond SVG)
│   ├── presha-email-signup.liquid      — ✅ Email signup (Shopify native form)
│   ├── presha-gifts.liquid             — ✅ Gifts for Her/Him (built, future edits pending)
│   ├── presha-trending-now.liquid      — ✅ Trending Now (built, future edits pending)
│   ├── presha-footer.liquid            — ✅ Footer (built, future edits pending)
│   └── presha-journal.liquid           — (alternate/backup journal section)
├── assets/
│   ├── logo-text-whitey.png      — White logo (used over hero/dark sections)
│   ├── logo-text-blacky.png      — Black logo (used over solid white header)
│   ├── auth4.webp                — ✅ Authentication section image (uploaded 2026-04-09)
│   ├── brand-nike.svg            — Nike logo
│   ├── brand-air-jordan.svg      — Air Jordan Jumpman
│   ├── brand-adidas.svg          — Adidas trefoil
│   ├── brand-chrome-hearts.svg   — Chrome Hearts (text SVG — needs real vector)
│   ├── brand-goyard.svg          — Goyard crest
│   ├── brand-new-balance.svg     — New Balance logo
│   ├── brand-on-running.svg      — On Running logo
│   └── brand-yeezy.svg           — Yeezy (text SVG — needs real vector)
├── templates/
│   └── index.json                — Homepage section order and settings
├── designassets/                 — Designer-provided assets (not all uploaded yet)
│   ├── auth4.webp
│   ├── autht1.webp
│   ├── slide1.webp
│   ├── slide2.webp
│   └── slide3.webp
├── design-refs/                  — Screenshot design references
├── docs/
│   └── superpowers/
│       ├── specs/                — Design specs (approved before build)
│       └── plans/                — Implementation plans
├── PROGRESS.md                   — Detailed build log (update after every task)
├── ADMIN_TODOS.md                — Shopify Admin actions needed by store owner
├── CLAUDE.md                     — Full project brief (READ THIS FIRST)
└── DESIGN-SYSTEM.md              — Brand design system reference
```

---

## Homepage Section Order (Current State)

| # | Section | Status | File |
|---|---------|--------|------|
| 1 | Announcement Bar | ✅ Done | `header-announcements.liquid` |
| 2 | Navigation / Header | ✅ Done | `header.liquid` |
| 3 | Hero Carousel | ✅ Done | `presha-hero-carousel.liquid` |
| 4 | Scrolling Marquee | ⚠️ BROKEN | `presha-marquee.liquid` |
| 5 | Shop by Brand | ✅ Done | `presha-brand-logos.liquid` |
| 6 | Gifts For Her / Him | ✅ Built — future edits pending | `presha-gifts.liquid` |
| 7 | Trending Now | ✅ Built — future edits pending | `presha-trending-now.liquid` |
| 8 | Presha Authentication | ✅ Done | `presha-authentication.liquid` |
| 9 | Featured Categories | ✅ Done | `presha-featured-categories.liquid` |
| 10 | Journal | ✅ Done | `presha-featured-journal.liquid` |
| 11 | Reviews & Press | ✅ Done | `presha-reviews-press.liquid` |
| 12 | Email Signup | ✅ Built — future edits pending | `presha-email-signup.liquid` |
| 13 | Trust Bar | ✅ Done | `presha-trust-bar.liquid` |
| 14 | Footer | ✅ Built — future edits pending | `presha-footer.liquid` |

---

## Known Issues & Deferred Work

### ⚠️ Scrolling Marquee — Animation Broken
- **File:** `sections/presha-marquee.liquid`
- **Problem:** Section structure displays correctly but scroll motion does not animate
- **Tried:** Multiple CSS keyframe approaches, `requestAnimationFrame` JS, inline-flex, various `translateX` techniques
- **Suspected cause:** Shopify parent `overflow: hidden` or JS execution order
- **Status:** Parked — needs fresh investigation

### ✅ Hero Carousel — Slide Images Uploaded
- **Status:** `slide1.webp`, `slide2.webp`, and `slide3.webp` have been uploaded via Theme Editor and are referenced in `templates/index.json`.

### ✅ Brand Logos — Theme Editor Source of Truth
- The homepage brand list has changed in Theme Editor and should be treated as the current source of truth.
- Chrome Hearts and Yeezy now use Theme Editor uploaded images on the homepage brand strip, so the old text-SVG replacement note no longer applies there.

### ⚠️ Collections Not Created
- Many section links point to collections that don't exist in Shopify Admin yet
- Full list in `ADMIN_TODOS.md`

### ⚠️ Hero Carousel Progress Indicators — Deferred
- Animated progress bar indicators work in code but visual style was not finalized
- Deferred from session 3

---

## What Was Just Done (This Session — 2026-04-09)

- Changed the Presha Authentication section image from a placeholder to `auth4.webp`
- Copied `designassets/auth4.webp` → `assets/auth4.webp` (pushed to Shopify)
- Updated fallback `<img>` in `presha-authentication.liquid` to use `{{ 'auth4.webp' | asset_url }}`

---

## Session Update — Later 2026-04-09 Work

- Synced the latest GitHub and Shopify Theme Editor state before new edits:
  - `git pull --ff-only origin main` confirmed the local repo was current.
  - `shopify theme pull --store agw1a7-eu.myshopify.com --theme 194145845329 --force` succeeded and did not leave content diffs in Git.

- Finalized the policy pages:
  - `658c3cf Policy Pages - finalize copy and editor support`
  - `a5d091d Policy Pages - add contact email`
  - `sections/presha-policy-page.liquid` now supports a hybrid mode:
    - if the Shopify page body has content, the page renders Page Editor content
    - if the Shopify page body is blank, the page renders the curated template clauses
  - `templates/page.privacy-policy.json` and `templates/page.terms-of-service.json` now contain Presha-specific copy.
  - `preshatrends@gmail.com` is used as the current privacy/support contact email.

- Added the Shipping Policy page:
  - `fe13135 Shipping Policy - add page template`
  - Added `templates/page.shipping-policy.json`
  - Owner approved the shipping policy page and received the HTML copy for the Shopify page body, including a lighter-divider version for Page Editor use.

- Refreshed the homepage Authentication section UI:
  - `35c02e2 Authentication - refresh UI styling`
  - Updated `sections/presha-authentication.liquid`
  - Layout approved by owner; some color/design choices may be revisited later.

- Added the dedicated Authentication page and wired the homepage CTA:
  - `89ed61b Authentication Page - add dedicated template`
  - `b6a8d2b Authentication Page - fix schema name`
  - Added `sections/presha-authentication-page.liquid`
  - Added `templates/page.authentication.json`
  - Updated `templates/index.json` so the homepage Authentication CTA now links to `/pages/authentication`
  - Footer Support already linked to `/pages/authentication`
  - Shopify initially rejected the new section because the schema `name` exceeded 25 characters; that was fixed in `b6a8d2b`, and the retry push succeeded.
  - Layout approved by owner; some color/design choices may be revisited later.

- Added follow-up notes to project docs:
  - `d28d35d Docs - note authentication follow-up`
  - `CLAUDE.md` and `PROGRESS.md` now note that the Authentication page layout is approved for now and the color/design direction may be revisited later.

- Current Git state:
  - Branch: `main`
  - `HEAD`: `d28d35d Docs - note authentication follow-up`
  - `origin/main`: `d28d35d Docs - note authentication follow-up`
  - Working tree: clean

- Current open follow-ups:
  - `sections/presha-marquee.liquid` is still broken on preview and needs a fresh investigation.
  - In Shopify Admin, create/confirm and assign templates for:
    - `/pages/shipping-policy` → template `shipping-policy`
    - `/pages/authentication` → template `authentication`
  - Authentication page colors/design choices may be revisited later.
  - Do not touch the homepage redesign spec/plan unless the owner explicitly asks:
    - `docs/superpowers/specs/2026-04-09-homepage-redesign-design.md`
    - `docs/superpowers/plans/2026-04-09-homepage-redesign.md`

### Corrections / Current Truth

- Earlier notes in this file about policy-page copy being placeholder or requiring replacement are no longer current.
  - Current truth:
    - `f68a3ae Policy Pages - add legal templates`
    - `658c3cf Policy Pages - finalize copy and editor support`
    - `a5d091d Policy Pages - add contact email`
  - The Privacy Policy and Terms of Service templates now contain Presha-specific copy and use `preshatrends@gmail.com` as the current support/privacy contact.

- Earlier notes about local-only homepage redesign commits are no longer current.
  - Current truth:
    - `e83e194 Homepage redesign - add full design spec` is on `origin/main`
    - `5915168 Homepage redesign - add implementation plan` is on `origin/main`
  - Even so, do not modify those homepage redesign files unless the owner explicitly asks.

- Earlier workflow notes that some recent commits were not yet pushed to GitHub are also no longer current.
  - Current truth:
    - `10bd46e Header - add nav hover underline` is on `origin/main`
    - `35516a5 Scrolling Marquee - attempt CSS loop` is on `origin/main`
    - `f68a3ae Policy Pages - add legal templates` is on `origin/main`
    - `35c02e2 Authentication - refresh UI styling` is on `origin/main`
    - `89ed61b Authentication Page - add dedicated template` is on `origin/main`
    - `b6a8d2b Authentication Page - fix schema name` is on `origin/main`
    - `d28d35d Docs - note authentication follow-up` is on `origin/main`

- For the Authentication page specifically:
  - Current truth:
    - layout is approved by the owner
    - some color/design choices may be revisited later
    - homepage CTA and footer support link should both point to `/pages/authentication`

---

## Next Tasks (Priority Order)

1. **Fix Scrolling Marquee** — investigate and resolve the animation blocking issue
2. **Resolve remaining Shopify Admin page/template assignments** — especially Shipping Policy and Authentication
3. **Make planned edits to Gifts / Trending Now / Email Signup / Footer** — built sections, but still open for refinement
4. **Collection setup** — assist store owner in creating required Shopify collections
5. **Other pages** — Collection page, Product Detail Page, About, Cart (not started)

---

## Development Rules (Non-Negotiable)

- **Mobile-first always** — code for 375px first, scale up
- **Breakpoints:** 480px / 749px / 1024px / 1280px
- **Never rewrite full files** — surgical edits only
- **GSAP for all animations** — ScrollTrigger for scroll-based, GSAP for interactions
- **After every task:** update `PROGRESS.md`, update `ADMIN_TODOS.md` if needed, commit, push to Shopify, provide preview link, wait for approval, then push to GitHub
- **Commit format:** `"Section Name - brief description"` (no Co-Authored-By, no boilerplate)
- **Consult before ambiguous decisions** — the project owner makes final calls

---

## Task Completion Workflow (Every Time)

```
1. Update PROGRESS.md
2. Update ADMIN_TODOS.md (if store owner action needed)
3. git commit (stage section files + PROGRESS.md)
4. shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live
5. Provide preview link
6. Wait for approval
7. git push origin main
```

---

## Key Decisions Already Made

| Decision | Rationale |
|----------|-----------|
| GSAP loaded globally in `theme.liquid` | All sections share one CDN load |
| Lenis smooth scroll via GSAP ticker | Not ScrollerProxy — works for current animations |
| Header 72px height | More commanding editorial presence |
| Logos hardcoded in `_header-logo.liquid` | White/black swap on scroll without editor friction |
| `auth4.webp` as authentication image | Owner selected from two options (auth4 vs autht1) |
| Hero at `100svh` | Confirmed and committed — fills viewport correctly |
| SVG brand logos via `asset_url` | Avoids manual CDN upload — files in `assets/` |
| Chrome Hearts / Yeezy as text SVGs | Placeholder until real vectors sourced |

---

## Design References Location

- `design-refs/` — Screenshot design references (final — build exactly as shown)
- `designassets/` — Designer-provided assets (images, webps)
- `DESIGN-SYSTEM.md` — Typography, color, component guidelines

---

*To update this file after completing work, run `/handoff` in Claude Code.*
