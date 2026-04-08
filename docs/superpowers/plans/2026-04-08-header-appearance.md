# Header — Overall Appearance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the header to 72px height, 13px nav, shadow + burgundy border separation on scroll, Lenis smooth scroll globally, and fix the red hover bug.

**Architecture:** Three targeted file edits — CSS overrides in `header.liquid`, config fix in `header-group.json`, and Lenis CDN + init in `theme.liquid`. No new files created. All changes are additive overrides that sit on top of Horizon's existing header system without touching its JS logic.

**Tech Stack:** Shopify Liquid, vanilla CSS (scoped `{% stylesheet %}`), Lenis 1.1.14 (CDN), GSAP ticker integration

**Spec:** `docs/superpowers/specs/2026-04-08-header-appearance-design.md`

---

## File Map

| File | What changes |
|---|---|
| `sections/header.liquid` | `--header-height` → 72px; shadow + border CSS; nav font/tracking override |
| `sections/header-group.json` | Remove red `#ff0000` custom CSS; bump `type_font_primary_size` to `"0.8125rem"` |
| `layout/theme.liquid` | Add Lenis CDN script + DOMContentLoaded init block |

---

## Task 1: Fix the red hover bug + nav font size in header-group.json

**Files:**
- Modify: `sections/header-group.json`

- [ ] **Step 1: Open `sections/header-group.json` and locate the two fields to change**

  Find line containing `custom_css` — it currently reads:
  ```json
  "custom_css": [
    ".header__menu-item:hover {color: #ff0000 !important;}"
  ],
  ```
  And find `type_font_primary_size` inside the `header-menu` block:
  ```json
  "type_font_primary_size": "0.75rem",
  ```

- [ ] **Step 2: Remove the red hover override**

  Change `custom_css` to an empty array:
  ```json
  "custom_css": [],
  ```

- [ ] **Step 3: Bump nav font size**

  Change `type_font_primary_size`:
  ```json
  "type_font_primary_size": "0.8125rem",
  ```

- [ ] **Step 4: Verify the JSON is still valid**

  Run:
  ```bash
  cd "C:\Users\akiny\Downloads\HK projects\Preshatrends\presha"
  node -e "JSON.parse(require('fs').readFileSync('sections/header-group.json','utf8')); console.log('valid');"
  ```
  Expected output: `valid`

- [ ] **Step 5: Push to Shopify and visually verify**

  ```bash
  shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --only sections/header-group.json --allow-live
  ```

  Open preview: `https://agw1a7-eu.myshopify.com?preview_theme_id=194145845329`

  Verify:
  - Nav items are slightly larger than before (13px vs 12px)
  - Hovering a nav item does NOT turn it red — should be dark/muted or burgundy depending on the `scheme-red-hover` color scheme

- [ ] **Step 6: Commit**

  ```bash
  git add sections/header-group.json
  git commit -m "Header - fix red hover bug, bump nav font to 13px"
  ```

---

## Task 2: Increase header height to 72px

**Files:**
- Modify: `sections/header.liquid` (line ~369 in the `{% stylesheet %}` block)

- [ ] **Step 1: Locate the height variable**

  In `sections/header.liquid`, find this block inside `{% stylesheet %}`:
  ```css
  body {
    --header-height: 60px;
    --header-group-height: var(--header-height);
    --transparent-header-offset-boolean: 0;
  }
  ```

- [ ] **Step 2: Change height to 72px**

  Update to:
  ```css
  body {
    --header-height: 72px;
    --header-group-height: var(--header-height);
    --transparent-header-offset-boolean: 0; /* stylelint-disable-line declaration-property-value-disallowed-list */
  }
  ```

- [ ] **Step 3: Push and visually verify**

  ```bash
  shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --only sections/header.liquid --allow-live
  ```

  Open preview and verify:
  - Header is visibly taller than before
  - Hero section still sits flush beneath the header (transparent overlay still works)
  - No gap between announcement bar and header
  - Logo and nav items are vertically centred within the new height

- [ ] **Step 4: Commit**

  ```bash
  git add sections/header.liquid
  git commit -m "Header - increase height to 72px"
  ```

---

## Task 3: Add nav letter-spacing override

**Files:**
- Modify: `sections/header.liquid` (in the `{% stylesheet %}` block, after the existing `.menu-list__link` rule)

- [ ] **Step 1: Locate the existing `.menu-list__link` rule**

  In the `{% stylesheet %}` block, find:
  ```css
  .menu-list__link {
    font-family: var(--menu-top-level-font-family);
    ...
  }
  ```

- [ ] **Step 2: Add letter-spacing override after the existing rule**

  Add this block immediately after the closing `}` of `.menu-list__link`:
  ```css
  /* Presha — wider tracking on top-level nav for editorial feel */
  .header-menu .menu-list__link {
    letter-spacing: 0.1em;
  }
  ```

- [ ] **Step 3: Push and visually verify**

  ```bash
  shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --only sections/header.liquid --allow-live
  ```

  Open preview and verify:
  - Nav items have noticeably wider letter spacing
  - Text still fits without wrapping on desktop
  - Check at 1024px width — nav items should not overflow into the "More" overflow menu prematurely

- [ ] **Step 4: Commit**

  ```bash
  git add sections/header.liquid
  git commit -m "Header - add editorial letter-spacing to nav"
  ```

---

## Task 4: Add scroll separation — shadow + burgundy border

**Files:**
- Modify: `sections/header.liquid` (in the `{% stylesheet %}` block)

- [ ] **Step 1: Find the end of the `.header[transparent]` block**

  In the `{% stylesheet %}` block, locate the closing `}` of the `.header[transparent] { ... }` block (around line 429 in the file). It ends with:
  ```css
    .header__row {
      /* Slower transition for "out" animation */
      transition: color var(--animation-values-slow), border-color var(--animation-values-slow),
        background-color var(--animation-values-slow);
    }
  }
  ```

- [ ] **Step 2: Add separation CSS immediately after that closing `}`**

  ```css
  /* Presha — header separation from white page sections */
  /* Shadow on the outer header component */
  #header-component {
    transition: box-shadow 0.35s ease;
    box-shadow: none;
  }

  #header-component:not([transparent]) ,
  #header-component[transparent='not-sticky'][data-sticky-state='active'] {
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.09);
  }

  /* Subtle burgundy bottom border on the top row */
  .header__row--top {
    border-bottom: 1px solid rgba(107, 26, 42, 0);
    transition: border-color 0.35s ease;
  }

  #header-component:not([transparent]) .header__row--top,
  #header-component[transparent='not-sticky'][data-sticky-state='active'] .header__row--top {
    border-color: rgba(107, 26, 42, 0.18);
  }
  ```

- [ ] **Step 3: Push and visually verify**

  ```bash
  shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --only sections/header.liquid --allow-live
  ```

  Open preview and test:
  - **On the homepage hero (transparent state):** No shadow, no border visible — header blends cleanly into the hero image
  - **Scroll down past the hero onto a white section:** Shadow and subtle burgundy border should fade in smoothly (~0.35s)
  - **Scroll back up to hero:** Shadow and border should fade out
  - **Test at 375px mobile width** — separation still visible, no layout issues

- [ ] **Step 4: Commit**

  ```bash
  git add sections/header.liquid
  git commit -m "Header - add shadow + burgundy border separation on scroll"
  ```

---

## Task 5: Add Lenis smooth scroll

**Files:**
- Modify: `layout/theme.liquid` (lines 40–43, the GSAP CDN block)

- [ ] **Step 1: Locate the GSAP script block in theme.liquid**

  In `layout/theme.liquid`, find:
  ```html
  <!-- GSAP Animation Library -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" defer></script>
  ```

- [ ] **Step 2: Add Lenis CDN after ScrollTrigger**

  Replace that block with:
  ```html
  <!-- GSAP Animation Library -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" defer></script>
  <!-- Lenis smooth scroll -->
  <script src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js" defer></script>
  ```

- [ ] **Step 3: Add Lenis initialisation script**

  In `layout/theme.liquid`, find the closing `</body>` tag and add the following block immediately before it:

  ```html
  <!-- Lenis smooth scroll init -->
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      if (typeof Lenis === 'undefined' || typeof gsap === 'undefined') return;

      var lenis = new Lenis({
        duration: 1.2,
        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        smoothWheel: true,
        touchMultiplier: 1.5
      });

      // Keep GSAP ScrollTrigger in sync with Lenis scroll position
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    });
  </script>
  ```

- [ ] **Step 4: Push and visually verify**

  ```bash
  shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --only layout/theme.liquid --allow-live
  ```

  Open preview and verify:
  - Scrolling feels smooth and physics-based (not instant/janky)
  - Hero carousel ScrollTrigger still works — scroll-based animations trigger at correct positions
  - No console errors in browser DevTools
  - Test on mobile (375px) — touch scroll still feels natural, not "floaty"
  - Test at 768px and 1280px

- [ ] **Step 5: Commit**

  ```bash
  git add layout/theme.liquid
  git commit -m "Header - add Lenis smooth scroll with GSAP ScrollTrigger integration"
  ```

---

## Task 6: Final integration check + push to GitHub

- [ ] **Step 1: Full visual pass on preview**

  Open `https://agw1a7-eu.myshopify.com?preview_theme_id=194145845329` and check all of the following:

  | Check | Expected |
  |---|---|
  | Header height | 72px — visibly taller than before |
  | Nav font | 13px, wider tracking — more editorial |
  | Nav hover | No red. Dark or burgundy depending on scheme |
  | Hero transparent state | Header blends into hero, no shadow/border |
  | Scrolled white section | Shadow + faint burgundy border visible |
  | Scroll transition | Shadow/border fades in smoothly (~0.35s) |
  | Lenis scroll | Physics-based smooth scroll throughout |
  | ScrollTrigger | Hero carousel and section animations still trigger correctly |
  | 375px mobile | No overflow, touch scroll natural |
  | 768px tablet | No overflow, layout intact |

- [ ] **Step 2: Update PROGRESS.md**

  Append to `PROGRESS.md`:
  ```markdown
  ## 2026-04-08 — Header Overall Appearance

  **What was built:**
  - Header height increased from 60px to 72px
  - Nav font bumped to 13px with 0.1em letter-spacing for editorial feel
  - Scroll separation: box-shadow + subtle burgundy bottom border that fade in when header is solid and fade out over hero/dark sections
  - Red hover bug fixed — removed `#ff0000 !important` custom CSS override from header-group.json
  - Lenis 1.1.14 smooth scroll added globally with GSAP ScrollTrigger integration

  **Files changed:**
  - `sections/header.liquid` — height, letter-spacing, separation CSS
  - `sections/header-group.json` — red hover removed, font size updated
  - `layout/theme.liquid` — Lenis CDN + init script
  ```

- [ ] **Step 3: Commit PROGRESS.md**

  ```bash
  git add PROGRESS.md
  git commit -m "Header Appearance - update PROGRESS.md"
  ```

- [ ] **Step 4: Push to GitHub**

  ```bash
  git push origin main
  ```
