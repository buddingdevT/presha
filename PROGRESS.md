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

---

## 2026-03-30 — Shop by Brand / Brand Logo Strip

**What was built:**
- Full "Shop By Brand" section (`presha-brand-logos.liquid`) with "AUTHENTICATED PARTNERSHIPS" eyebrow + "SHOP BY BRAND" heading, centered
- 8 brand SVG logos integrated from local files: Nike, Air Jordan, Adidas, Chrome Hearts, Goyard, New Balance, On Running, Yeezy
- SVGs copied to `assets/` folder and referenced via `logo_asset` text setting + `asset_url` filter (no manual upload needed)
- Three-tier logo rendering: `logo_asset` (SVG file) → `logo` (image_picker) → text fallback
- White cards (200x130px desktop) with 12px border-radius, 20px internal padding, subtle gray border
- Horizontal scroll on all viewports with hidden scrollbar and scroll-snap
- Hover: card lifts 3px + drop shadow (preserved from original design)
- GSAP ScrollTrigger: heading fades in, cards stagger up on scroll
- Fully responsive: desktop → tablet (180x120) → mobile (150x105)

**Files changed:**
- `sections/presha-brand-logos.liquid` — Rebuilt with SVG asset support, centered heading, card styling
- `templates/index.json` — Updated brand blocks with 8 new brands + logo_asset filenames + eyebrow text
- `assets/brand-nike.svg` — Nike swoosh (vector)
- `assets/brand-air-jordan.svg` — Jumpman silhouette (vector)
- `assets/brand-adidas.svg` — Adidas trefoil (vector)
- `assets/brand-chrome-hearts.svg` — Chrome Hearts (text-based SVG, needs real vector later)
- `assets/brand-goyard.svg` — Goyard crest (vector)
- `assets/brand-new-balance.svg` — NB logo (vector)
- `assets/brand-on-running.svg` — On logo (vector)
- `assets/brand-yeezy.svg` — Yeezy (text-based SVG, needs real vector later)

**Notes:**
- Chrome Hearts and Yeezy SVGs are `<text>` elements, not actual vector logos — replace with proper vector files when available
- Source SVGs live in `brand logos/` folder (not committed to theme)

---

## 2026-03-30 — Featured Categories Section

**What was built:**
- New "Featured Categories" section (`presha-featured-categories.liquid`) matching the user-provided design reference
- Italic serif heading ("Featured Categories") using Cormorant Garamond, left-aligned
- Horizontal scrollable row of portrait (3:4 aspect ratio) category cards
- Each card: rounded corners (12px), lifestyle photo via `image_picker`, category name below in sans-serif
- 8 default categories pre-populated: Air Jordan, Nike, On Running, Onitsuka Tiger, Adidas, New Balance, Yeezy, Asics
- Hover: card lifts 4px + image scales subtly (1.04x), label turns burgundy
- Placeholder gradient shown when no image uploaded
- GSAP ScrollTrigger: heading fades in, cards stagger up on scroll
- Fully responsive: desktop (260px cards) → tablet (220px) → mobile (180px)
- Scroll-snap on all viewports, hidden scrollbar
- Positioned after Presha Authentication section in homepage order

**Files changed:**
- `sections/presha-featured-categories.liquid` — New section file
- `templates/index.json` — Added `presha_featured_categories` section + placed in order after authentication
- `CLAUDE.md` — Updated homepage section tracker

---

## 2026-04-03 — Repo Housekeeping & Design System

**What was added:**
- `.gitignore` — Excludes brand guidelines PDF, `.playwright-mcp/`, `bash.exe.stackdump`, and OS files from version control
- `DESIGN-SYSTEM.md` — Design system source of truth document (v1.0, March 2026) covering brand identity, typography, color, and component guidelines
- `brand logos/` — Source SVG logo files for all 8 brands (Nike, Air Jordan, Adidas, Chrome Hearts, Goyard, New Balance, On Running, Yeezy)
- `madkicks-hero-breakdown.md` — Competitor hero section analysis notes
- `image.png` — Reference image asset

**Config updates (from Shopify admin/editor):**
- `templates/index.json` — Homepage template updated with latest section order and settings
- `sections/header-group.json` — Header section config synced with latest admin settings
- `config/settings_data.json` — Theme settings synced

**Notes:**
- Brand Guidelines PDF (`designassets/Logo/Brand Guidelines Presentation (Presha Trends).pdf`) is intentionally excluded from git via `.gitignore`

---

## 2026-04-03 — Hero Carousel Section

**What was built:**
- New full-bleed hero carousel section (`sections/presha-hero-carousel.liquid`) — Liquid + scoped CSS + GSAP JavaScript, all in one self-contained section file
- 3 slides managed as Shopify blocks: slide image (image_picker), label (text), headline (textarea), CTA text + link — fully editable and reorderable via Theme Editor
- Slide transitions: GSAP crossfade (opacity, 0.8s power2.inOut) + Ken Burns zoom (scale 1→1.08, GPU-composited)
- Text stagger entrance per slide: label → headline → CTA (power3.out, `"-=0.35"` overlap)
- Text exit before slide change: label/headline/CTA individually faded out (0.3s power2.in)
- Animated progress indicators: 64×2px bars, GSAP scaleX 0→1 over slide duration — freeze on hover/touch, resume from exact position
- Discovery rail: 4 default cards as Shopify blocks (unlimited, editable, reorderable) — dark frosted bar pinned to bottom; desktop: flex; mobile: horizontal scroll with snap and hidden scrollbar
- Rail entrance: ScrollTrigger stagger (0.08s) from `opacity:0, y:16`
- Auto-play: 5 s default (theme editor setting), pauses on hover/touchstart, resumes on leave/touchend (400 ms delay for touch)
- `prefers-reduced-motion`: all GSAP animations disabled, instant transitions via `gsap.set`, setTimeout-based autoplay
- Performance: `fetchpriority="high"` + `loading="eager"` on first slide image; `loading="lazy"` on slides 2–3; `will-change: transform` only on active slide image, cleared on deactivate
- Accessibility: `role="region"` + `aria-label`, per-slide `aria-hidden`, indicator `role="tablist"` + `role="tab"` + `aria-selected`, rail link `aria-label` with `| escape` filter
- Shopify theme editor hot-reload: `shopify:section:load` listener with full `_destroy()` cleanup before re-init (kills tweens, clears timers, removes all event listeners)
- Robustness: zero-slide guard, GSAP null guard, tween kill before new transitions (`crossfadeTween`, `textTl`, `progressTween`, `kenBurnsTween`, `gsap.killTweensOf(slides)`)
- Replaced the old `slideshow_thBVtw` and `hero_jVaWmY` placeholder sections in `templates/index.json`

**Files changed:**
- `sections/presha-hero-carousel.liquid` — New section file
- `templates/index.json` — Added `presha_hero_carousel` at position 0; removed old placeholder hero/slideshow sections
- `docs/superpowers/specs/2026-04-03-hero-carousel-design.md` — Approved design spec
- `docs/superpowers/plans/2026-04-03-hero-carousel.md` — Implementation plan
- `docs/backlog/hero-clean-no-rail.md` — Parked: clean no-rail hero variant (toggle via `show_discovery_rail`)

**Notes:**
- Slide images (`slide1.webp`, `slide2.webp`, `slide3.webp`) must be uploaded via Theme Editor image pickers — see ADMIN_TODOS
- Rail card thumbnails also uploaded via Theme Editor per block
- Collections for rail cards need to be created in Shopify Admin — see ADMIN_TODOS

---

## 2026-04-08 — Header Overall Appearance

**What was built:**
- Header height increased from 60px to 72px for more commanding editorial presence
- Nav font bumped to 13px (0.8125rem) with 0.1em letter-spacing for wider tracking
- Scroll separation added: box-shadow + subtle burgundy bottom border (rgba 107,26,42 at 18% opacity) that fade in smoothly (0.35s) when the header is solid, invisible over hero/dark sections. Border uses decomposed longhand properties to preserve the Horizon theme divider system.
- Red hover bug fixed — removed `#ff0000 !important` custom CSS override from header-group.json
- Lenis 1.1.14 smooth scroll added globally with GSAP ScrollTrigger ticker integration

**Files changed:**
- `sections/header-group.json` — red hover removed, font size updated to 0.8125rem
- `sections/header.liquid` — height 72px, letter-spacing, shadow + border separation CSS
- `layout/theme.liquid` — Lenis CDN + init script

**Notes:**
- Letter-spacing selector `.header-menu .menu-list__link` scopes to desktop nav only but affects all levels (top-level + sub-items). Acceptable; revisit if submenu tracking becomes a concern.
- Lenis uses GSAP ticker integration (not ScrollTrigger.scrollerProxy). Works for all current animations; if container-based ScrollTrigger animations are added later, proxy registration will be needed.

---

## 2026-04-09 — Handoff Reconciliation & Authentication Image

**What was updated:**
- Reconciled `HANDOFF.md`, `CLAUDE.md`, and `ADMIN_TODOS.md` with owner-confirmed project state:
  - Hero carousel slide images (`slide1.webp`, `slide2.webp`, `slide3.webp`) are uploaded in Theme Editor.
  - Gifts For Her / Him, Email Signup, Trending Now, and Footer are built, but future edits are still expected.
  - Shop by Brand should follow the current Theme Editor brand list, not the older 8-brand SVG-only handoff list.
  - Chrome Hearts and Yeezy now use Theme Editor uploaded images on the homepage brand strip, so the old text-SVG replacement note no longer applies there.
- Kept `HANDOFF.md` as the canonical AI handoff file.
- Updated the Presha Authentication section fallback image to use the local theme asset `auth4.webp`.

**Files changed:**
- `HANDOFF.md` — Added and updated as the canonical handoff document
- `CLAUDE.md` — Updated homepage tracker statuses
- `ADMIN_TODOS.md` — Marked hero slide uploads and brand logo placeholder issue as resolved
- `PROGRESS.md` — Added this reconciliation entry
- `.gitignore` — Ignored local `.superpowers/` brainstorm/server state
- `sections/presha-authentication.liquid` — Updated fallback image to `auth4.webp`
- `assets/auth4.webp` — Added authentication image asset
- `designassets/auth4.webp`, `designassets/autht1.webp`, `designassets/slide1.webp`, `designassets/slide2.webp`, `designassets/slide3.webp` — Added current designer assets

**Notes:**
- Scrolling Marquee remains the highest-priority functional issue.
- `presha-gifts.liquid`, `presha-email-signup.liquid`, `presha-trending-now.liquid`, and `presha-footer.liquid` should be treated as built sections with future refinement expected.

---

## 2026-04-09 — Header Nav Hover Underline

**What was built:**
- Added a design-system aligned hover state for top-level desktop nav links using burgundy `#6D001A` on solid/scrolled header states.
- Added an animated underline that fills left-to-right on hover, keyboard focus, active page links, and open mega-menu links.
- Preserved contrast over the transparent hero header by switching the underline/text hover treatment to white until the mega menu opens.
- Added a subtle inset separator on the mega-menu panel and strengthened the header row divider while a mega menu is active.
- Added `prefers-reduced-motion` handling for the underline/color micro-interaction.

**Files changed:**
- `sections/header.liquid` — Header nav hover, active, underline, and mega-menu separation CSS

**Notes:**
- No Shopify Admin action required.

---

## 2026-04-09 - Scrolling Marquee CSS Loop Attempt

**What was built:**
- Replaced the JS `requestAnimationFrame` marquee loop with a CSS keyframe animation.
- Rendered the marquee content twice in Liquid so the track can loop cleanly with `translate3d(-50%, 0, 0)`.
- Added a scoped Shopify section wrapper overflow override so the full-width strip can control its own clipping.
- Kept the existing Theme Editor `speed`, background color, text color, and block content settings intact.
- Added hover pause support for pointer devices and `prefers-reduced-motion` handling.
- Updated the marquee font stack to prioritize Gilroy with existing theme fallbacks.

**Files changed:**
- `sections/presha-marquee.liquid` - CSS-driven marquee loop and cleanup of the previous runtime animation script
- `PROGRESS.md` - Added this progress entry

**Notes:**
- No Shopify Admin action required.
- Owner reviewed the Shopify preview and confirmed the marquee is still not working; leave this as an open issue for the next pass.
- `shopify theme check sections/presha-marquee.liquid` is not supported by the installed CLI command shape.
- Repo-wide `shopify theme check` was attempted but timed out before returning results; `git diff --check` passed.


---

## 2026-04-09 - Policy Pages and Footer Legal Links

**What was built:**
- Added a reusable `presha-policy-page` section for editorial policy/legal pages, using Soft Ivory background, black body text, burgundy overline/accent treatment, and Gilroy-first body typography.
- Added editable `Privacy Policy` content via the `page.privacy-policy` alternate template.
- Added editable `Terms of Service` content via the `page.terms-of-service` alternate template.
- Updated footer Privacy Policy and Terms of Service links to point to `/pages/privacy-policy` and `/pages/terms-of-service`.
- Liquid-commented the `Track Order` footer link under Support and the `Careers` footer link under Company so they do not render for now.
- Updated `ADMIN_TODOS.md` with required Shopify Admin page creation and template assignment steps.

**Files changed:**
- `sections/presha-policy-page.liquid` - New reusable editable policy page section
- `templates/page.privacy-policy.json` - New Privacy Policy alternate page template
- `templates/page.terms-of-service.json` - New Terms of Service alternate page template
- `sections/presha-footer.liquid` - Footer legal links updated; Track Order and Careers commented out
- `ADMIN_TODOS.md` - Added required Admin steps for creating policy pages
- `PROGRESS.md` - Added this progress entry

**Notes:**
- Theme code cannot create Shopify Admin page records by itself. The owner must create the two pages and assign the new templates before the footer links resolve.
- Policy copy was later rewritten as Presha-specific customer-facing copy.
- File-scoped `shopify theme check --path` runs timed out before returning results; local JSON parsing and `git diff --check` passed.

---

## 2026-04-09 - Policy Pages Final Copy and Page Editor Support

**What was built:**
- Pulled the latest GitHub state and Shopify Theme Editor state before making changes.
- Updated the reusable `presha-policy-page` section so it can render Shopify Admin page body content when it exists, while keeping the curated theme-template clauses as the fallback.
- Removed storefront-facing temporary-copy and legal-review messaging from the policy section defaults and policy templates.
- Rewrote the Privacy Policy copy for Presha Trends as a Dubai-based luxury streetwear, sneaker, accessories and collectibles storefront.
- Rewrote the Terms of Service copy for Presha Trends with resale/authentication, order, delivery, returns, IP and UAE governing-law language.
- Updated `ADMIN_TODOS.md` to mark the Privacy Policy and Terms of Service URLs as resolved.

**Files changed:**
- `sections/presha-policy-page.liquid` - Added page-editor content rendering support and cleaned policy section defaults
- `templates/page.privacy-policy.json` - Replaced generic copy with Presha-specific privacy policy text
- `templates/page.terms-of-service.json` - Replaced generic copy with Presha-specific terms text
- `ADMIN_TODOS.md` - Marked policy URLs resolved and documented the Page Editor editing path
- `PROGRESS.md` - Added this progress entry

**Notes:**
- If the Shopify page body is blank, the template renders the built-in policy clauses. If the admin adds body content in the page editor, that page body takes priority.

---

## 2026-04-09 - Policy Pages Contact Email

**What was updated:**
- Added `preshatrends@gmail.com` as the customer contact email in the Privacy Policy and Terms of Service template copy.

**Files changed:**
- `templates/page.privacy-policy.json` - Privacy choices and contact clauses now use `preshatrends@gmail.com`
- `templates/page.terms-of-service.json` - Terms governing-law and contact clauses now use `preshatrends@gmail.com`
- `PROGRESS.md` - Added this progress entry

---

## 2026-04-09 - Shipping Policy Page

**What was built:**
- Added a dedicated `Shipping Policy` page template using the reusable `presha-policy-page` section.
- Wrote Presha-specific shipping policy copy covering order processing, dispatch timing, delivery estimates, duties, address accuracy, tracking, courier handoff and restricted destinations.
- Kept page-editor support consistent with the other legal pages: if the Shopify page body has content, that body content will render instead of the template clauses.
- Updated `ADMIN_TODOS.md` with the Shipping Policy page/template assignment step.

**Files changed:**
- `templates/page.shipping-policy.json` - New Shipping Policy page template with curated fallback copy
- `ADMIN_TODOS.md` - Added Shipping Policy page/template assignment step
- `PROGRESS.md` - Added this progress entry

---

## 2026-04-09 - Authentication UI Refresh

**What was built:**
- Refined the Presha Authentication section UI to better match the design system without changing the section structure or settings model.
- Replaced the off-brand heavy heading treatment with a Gilroy-first editorial heading stack.
- Improved the dark section presentation with warmer ivory text, a subtle surface overlay and stronger spacing rhythm.
- Reworked the guarantee badge into a sharper premium accent block and tightened the image presentation.
- Redesigned the feature list into cleaner divided rows with framed burgundy icons and more readable supporting copy.
- Updated the CTA to a pill button with the correct hover color and stronger polish on mobile and desktop.

**Files changed:**
- `sections/presha-authentication.liquid` - Authentication section visual refresh
- `PROGRESS.md` - Added this progress entry

---

## 2026-04-09 - Authentication Page

**What was built:**
- Added a dedicated Presha Authentication page section and page template for `/pages/authentication`.
- Built a branded authentication page with a strong hero, trust highlights, verification process steps and assurance copy.
- Linked the homepage Authentication section CTA to `/pages/authentication` in the homepage template.
- Confirmed the footer Support link already points to `/pages/authentication`.
- Updated `ADMIN_TODOS.md` with the page creation and template assignment step.
- Owner approved the layout for now and wants to revisit some of the color/design choices later.

**Files changed:**
- `sections/presha-authentication-page.liquid` - New dedicated Authentication page section
- `templates/page.authentication.json` - New Authentication page template
- `templates/index.json` - Homepage Authentication CTA now links to `/pages/authentication`
- `ADMIN_TODOS.md` - Added Authentication page admin step
- `PROGRESS.md` - Added this progress entry
