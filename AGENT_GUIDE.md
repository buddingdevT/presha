# Presha Trends — Agent Guide

> Open this file first if you are joining the project for the first time.
> This is the single best high-level guide for understanding the project, the current state, and where to continue.
> Last updated: 2026-04-21

---

## 1. What This Project Is

**Presha Trends** is a Shopify storefront for a Dubai-based luxury resale brand focused on sneakers, streetwear, accessories, and collectibles.

The store is being built on a modified copy of the **Horizon** theme. The goal is not a generic ecommerce site. It should feel editorial, premium, modern, interactive, and clearly stronger than category competitors like **Mad Kicks**.

The project already has substantial custom work in place. Do not assume you are starting from scratch.

---

## 2. Source of Truth

When figuring out the current state, trust sources in this order:

1. `templates/index.json`
2. `git log`
3. `PROGRESS.md`
4. `ADMIN_TODOS.md`
5. `CLAUDE.md`

Why: older docs still contain some historical context, but the homepage and project state evolved after those earlier notes were written.

Historical note: older `PROGRESS.md` entries may still reference retired docs such as `HANDOFF.md`. Treat those references as historical only and use this guide plus the live repo state as the starting point.

---

## 3. Current Repo State

- Current branch: `main`
- Latest confirmed project checkpoint: `70af2b7 Sync - pull homepage redesign from Shopify theme`
- `origin/main` matches that checkpoint
- Working tree was clean during the last repo audit except for local untracked `.claude/`

This matters because the most recent major change was not a small feature edit. It was a sync that pulled the newer Shopify homepage redesign into the repo.

---

## 4. Project Goal

Build a luxury editorial Shopify storefront with:

- strong brand presentation
- polished motion and interaction
- mobile-first responsive sections
- curated merchandising
- clear authenticity/trust positioning
- custom editorial support pages

The visual direction uses:

- Burgundy: `#6B1A2A` / nearby variants such as `#6D001A`
- Soft ivory / off-white backgrounds
- Editorial serif moments with `Cormorant Garamond`
- Clean UI/body typography with `Jost`

GSAP is the primary animation system. Lenis is already integrated for smooth scrolling.

---

## 5. Tech / Workflow

- Platform: Shopify
- Theme: Horizon (modified local copy named `presha`)
- Store: `agw1a7-eu.myshopify.com`
- Theme ID: `194145845329`
- Main workflow: edit locally → push to Shopify theme preview → review → commit/push
- No live dev server workflow is assumed

Useful commands:

```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live
```

```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live --only path/to/file.liquid
```

Preview URL:

```text
https://agw1a7-eu.myshopify.com?preview_theme_id=194145845329
```

Project-local agent command:

```text
/handoff
```

Use `/handoff` at the end of a working session to refresh the session-handoff block in this file and keep the guide current.

---

## 6. Important Files

Core project memory:

- `AGENT_GUIDE.md` — this file
- `PROGRESS.md` — chronological build log
- `ADMIN_TODOS.md` — Shopify Admin work still needed
- `CLAUDE.md` — full project brief/history
- `DESIGN-SYSTEM.md` — brand and UI system guidance

Core theme files:

- `layout/theme.liquid` — global scripts, GSAP, Lenis
- `sections/header.liquid` — header behavior/styling
- `sections/header-group.json` — header config and menu handle
- `templates/index.json` — homepage composition and settings

Key custom homepage sections:

- `sections/presha-hero-carousel.liquid`
- `sections/presha-marquee.liquid`
- `sections/presha-brand-logos.liquid`
- `sections/presha-trending-now.liquid`
- `sections/presha-collection-a.liquid`
- `sections/presha-collection-b.liquid`
- `sections/presha-collection-c.liquid`
- `sections/presha-collection-collectibles.liquid`
- `sections/presha-featured-categories.liquid`
- `sections/presha-gifts.liquid`
- `sections/presha-authentication.liquid`
- `sections/presha-featured-journal.liquid`
- `sections/presha-reviews-press.liquid`
- `sections/presha-email-signup.liquid`
- `sections/presha-trust-bar.liquid`
- `sections/presha-footer.liquid`

Custom inner/support pages:

- `sections/presha-policy-page.liquid`
- `sections/presha-authentication-page.liquid`
- `sections/presha-contact-page.liquid`
- `sections/presha-our-story-page.liquid`

---

## 7. Current Homepage Structure

This is the real current homepage order from `templates/index.json`:

1. Hero Carousel
2. Scrolling Marquee
3. Shop by Brand
4. Trending Now
5. Chrome Hearts
6. FOG / Bathing Ape
7. Featured Categories
8. Supreme
9. Gifts For Her / Him
10. Presha Authentication
11. Hermès
12. Collectibles
13. Featured Journal
14. Reviews & Press
15. Email Signup
16. Trust Bar

Header and footer are configured outside that list as part of the theme structure.

---

## 8. What Has Already Been Built

These areas are already substantially implemented:

- custom header and announcement bar behavior
- global GSAP integration
- Lenis smooth scrolling integration
- full-bleed hero carousel
- shop-by-brand strip
- featured categories
- gifts section
- redesigned trending section
- four editorial collection merchandising sections
- authentication homepage section
- journal section
- reviews and press section
- email signup section
- trust bar
- footer
- policy page system
- authentication page
- contact page
- our story page

This is not a blank theme. Most of the remaining work is refinement, bug fixing, Shopify Admin setup, and additional page coverage.

---

## 9. Current Known Issues

### Highest-priority code issue

`sections/presha-marquee.liquid`

The scrolling marquee is still broken. The structure renders, but the scrolling animation does not work correctly in preview.

Attempts already noted in project history:

- CSS keyframe loops
- JS animation loop
- duplicated track rendering
- overflow/translate adjustments

Treat this as the top unresolved frontend issue.

### Other important reality checks

- Several homepage sections depend on Shopify collections that may not exist yet.
- Some sections still need Theme Editor image assignments before they look correct.
- Some sections are built but intentionally expected to receive future design polish.

---

## 10. Shopify Admin Work Still Needed

Use `ADMIN_TODOS.md` for the detailed checklist.

The biggest remaining Admin dependencies are:

- create/confirm collection handles for homepage merchandising
- assign collections in Theme Editor
- upload imagery for collection-led sections
- populate Trending Now product blocks
- confirm `mega-menu` navigation exists and is configured correctly
- confirm/assign page templates for support pages where needed

Important: a missing collection or missing Theme Editor asset can make a finished section look incomplete even when the code is fine.

---

## 11. Current Navigation Truth

`sections/header-group.json` now uses:

- menu handle: `mega-menu`
- menu style: `featured_collections`
- drawer accordion: enabled
- drawer dividers: enabled

Do not rely on older notes that mention `main-menu-mega` as the active handle.

---

## 12. Section Layout Truth

The April 17 homepage redesign introduced four important reusable/custom merchandising layouts:

- `presha-collection-a.liquid`
  - editorial brand row
  - used for Chrome Hearts
  - also reused for Hermès

- `presha-collection-b.liquid`
  - editorial split layout with anchor image
  - currently used for FOG / Bathing Ape direction

- `presha-collection-c.liquid`
  - hero-banner plus scroll-row layout
  - currently used for Supreme

- `presha-collection-collectibles.liquid`
  - bespoke dark/frosted collectibles row

There is no dedicated Hermès section file. Hermès currently reuses Collection A.

---

## 13. Current Page Coverage

Built:

- Authentication page
- Contact Us page
- Our Story page
- Privacy Policy
- Terms of Service
- Shipping Policy
- Returns & Refunds

Still not started or not fully established in codebase as custom final experiences:

- Collection / category page
- Product detail page
- Cart page
- Account page
- Any broader About/seller/FAQ ecosystem beyond the current pages

---

## 14. Development Rules

- Work mobile-first
- Respect breakpoints: `480 / 749 / 1024 / 1280`
- Prefer surgical edits over broad rewrites
- Use GSAP for motion where animation is required
- Preserve performance and accessibility
- Do not assume missing Shopify content means broken code
- Always check `templates/index.json` before discussing homepage state
- Update project memory docs when the project state materially changes

---

## 15. Best Next Actions

If you are picking up active work and need a sensible priority order:

1. Fix the broken marquee
2. Audit homepage readiness against Shopify Admin dependencies
3. Refine built-but-not-final sections such as Gifts, Trending, Email Signup, and Footer
4. Continue missing major commerce pages such as collection/product/cart/account

If the request is ambiguous, start by verifying whether the issue is:

- code
- missing Shopify Admin data
- stale documentation

---

## 16. Session Handoff Template

When ending a working session, run `/handoff` and refresh the block below.

If the repo state materially changed, also update the relevant sections above so this file remains trustworthy as the first document a new agent opens.

```md
## Session Handoff

- Date:
- Agent:
- What was done:
- Files changed:
- Shopify push status:
- Git status / commit:
- Remaining blockers:
- Recommended next step:
```

Current session handoff:

## Session Handoff

- Date: 2026-04-21
- Agent: Codex
- What was done: Audited the repo, reconciled stale docs against the actual codebase, and created this single-file onboarding/handoff guide.
- Files changed: `CLAUDE.md`, `AGENT_GUIDE.md`
- Shopify push status: Not pushed. Doc-only reconciliation work.
- Git status / commit: Local modifications present in `CLAUDE.md` and `AGENT_GUIDE.md`; no commit created in this session.
- Remaining blockers: Broken marquee, incomplete Shopify Admin collection/image/menu setup, and unfinished core commerce pages.
- Recommended next step: Either fix `sections/presha-marquee.liquid` or do a targeted homepage/admin readiness audit.

---

## 17. Maintenance Note

This file should stay short enough to be practical, but current enough to be trusted.

Update it when any of these change:

- homepage structure
- active navigation/menu assumptions
- latest stable checkpoint
- top unresolved blockers
- major completed features
- best next step

If this file and another doc disagree, verify against code and then update this file.
