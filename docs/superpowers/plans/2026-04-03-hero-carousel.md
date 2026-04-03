# Hero Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `presha-hero-carousel.liquid` — a full-bleed GSAP-powered hero carousel with crossfade + Ken Burns transitions, animated progress bar indicators, and a dark discovery rail — all managed as Shopify blocks.

**Architecture:** Single custom Liquid section (`sections/presha-hero-carousel.liquid`) containing scoped `<style>` and `<script>` blocks. Slides and rail cards are separate Shopify block types, giving the store owner full theme-editor control. GSAP (already on CDN in `theme.liquid`) handles all animation. Section is added to `templates/index.json` at position 0, replacing the placeholder slideshow.

**Tech Stack:** Shopify Liquid, CSS (scoped), GSAP 3 + ScrollTrigger (CDN, already loaded), Vanilla JS (ES6 class), WebP images via Shopify image_url filter.

**Spec:** `docs/superpowers/specs/2026-04-03-hero-carousel-design.md`

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `sections/presha-hero-carousel.liquid` | Full section: Liquid markup, scoped CSS, GSAP JS, Shopify schema |
| Modify | `templates/index.json` | Add section at position 0; remove old slideshow/hero from order |
| Modify | `PROGRESS.md` | Log completed work |
| Modify | `ADMIN_TODOS.md` | Image upload instructions, collection handle setup |

---

## Task 1 — Scaffold section file and wire into homepage

**Files:**
- Create: `sections/presha-hero-carousel.liquid`
- Modify: `templates/index.json`

- [ ] **Step 1: Create the scaffolded section file**

Create `sections/presha-hero-carousel.liquid` with this exact content:

```liquid
{% comment %} ============================================================
  PRESHA HERO CAROUSEL
  Custom full-bleed hero carousel with GSAP crossfade + Ken Burns
  Slides and rail cards are Shopify blocks — fully theme-editor managed
  Spec: docs/superpowers/specs/2026-04-03-hero-carousel-design.md
============================================================ {% endcomment %}

{%- assign slide_blocks = section.blocks | where: "type", "slide" -%}
{%- assign rail_blocks  = section.blocks | where: "type", "rail_card" -%}

<section
  class="presha-hero"
  id="presha-hero-{{ section.id }}"
  role="region"
  aria-label="Hero slideshow"
  data-autoplay-speed="{{ section.settings.autoplay_speed | default: 5000 }}"
>
  <p style="color:white;padding:40px;background:#6D001A;font-family:sans-serif;">
    ✓ Presha Hero Carousel — scaffold loaded. Blocks: {{ section.blocks.size }}
  </p>
</section>

<style>
  .presha-hero {
    position: relative;
    width: 100%;
    min-height: 200px;
  }
</style>

{% schema %}
{
  "name": "Presha Hero Carousel",
  "settings": [
    {
      "type": "number",
      "id": "autoplay_speed",
      "label": "Slide duration (ms)",
      "default": 5000,
      "info": "How long each slide is shown before advancing. Default: 5000ms (5 seconds)."
    },
    {
      "type": "checkbox",
      "id": "show_discovery_rail",
      "label": "Show discovery rail",
      "default": true,
      "info": "Show the dark 'Shop By' bar overlaid at the bottom of the hero."
    }
  ],
  "blocks": [
    {
      "type": "slide",
      "name": "Slide",
      "limit": 6,
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Slide image",
          "info": "Recommended: landscape, minimum 1920×1080px, WebP format."
        },
        {
          "type": "text",
          "id": "label",
          "label": "Label (overline)",
          "default": "New Arrival",
          "info": "Short uppercase label above the headline. E.g. 'New Arrival', 'LA Exclusive'."
        },
        {
          "type": "textarea",
          "id": "headline",
          "label": "Headline",
          "default": "Own the Dark"
        },
        {
          "type": "text",
          "id": "cta_text",
          "label": "CTA button text",
          "default": "Shop Now"
        },
        {
          "type": "url",
          "id": "cta_link",
          "label": "CTA button link"
        }
      ]
    },
    {
      "type": "rail_card",
      "name": "Rail Card",
      "settings": [
        {
          "type": "image_picker",
          "id": "image",
          "label": "Thumbnail image",
          "info": "Recommended: square, minimum 120×120px."
        },
        {
          "type": "text",
          "id": "label",
          "label": "Top label",
          "default": "SHOP BY",
          "info": "Small uppercase label above the name. E.g. 'SHOP BY', 'EXPLORE'."
        },
        {
          "type": "text",
          "id": "name",
          "label": "Category / brand name",
          "default": "Trending Now"
        },
        {
          "type": "url",
          "id": "link",
          "label": "Link"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Presha Hero Carousel",
      "blocks": [
        { "type": "slide", "settings": { "label": "New Arrival",   "headline": "Own the Dark",             "cta_text": "Shop Air Jordan 4"    } },
        { "type": "slide", "settings": { "label": "LA Exclusive",  "headline": "Not for Everyone",         "cta_text": "Shop the Collection"  } },
        { "type": "slide", "settings": { "label": "Now At Presha", "headline": "Five Colors. One Obsession","cta_text": "Shop Goyard"          } },
        { "type": "rail_card", "settings": { "label": "SHOP BY", "name": "Trending Now"        } },
        { "type": "rail_card", "settings": { "label": "SHOP BY", "name": "Pokémon Collectibles" } },
        { "type": "rail_card", "settings": { "label": "SHOP BY", "name": "Rare Find"           } },
        { "type": "rail_card", "settings": { "label": "SHOP BY", "name": "Loewe × On"          } }
      ]
    }
  ]
}
{% endschema %}
```

- [ ] **Step 2: Add the section to `templates/index.json`**

Open `templates/index.json`. In the `"sections"` object, add a new entry for `presha_hero_carousel`. Then in the `"order"` array, insert `"presha_hero_carousel"` at position 0 and remove `"slideshow_thBVtw"` and `"hero_jVaWmY"` from the order (keep their data in `sections` — just pull them out of `order`).

The sections object gets this new entry (alongside all existing entries):
```json
"presha_hero_carousel": {
  "type": "presha-hero-carousel",
  "blocks": {},
  "block_order": [],
  "settings": {
    "autoplay_speed": 5000,
    "show_discovery_rail": true
  }
}
```

The order array becomes:
```json
"order": [
  "presha_hero_carousel",
  "presha_marquee",
  "presha_brand_logos",
  "presha_gifts",
  "presha_trending",
  "1769647631664937e5",
  "blocks_fdCed7",
  "product_list_fa6P9H",
  "product_list_jFQpmj",
  "product_list_i3bdF7",
  "presha_authentication",
  "presha_featured_categories",
  "presha_featured_journal",
  "presha_reviews_press",
  "presha_email_signup",
  "presha_trust_bar"
]
```

- [ ] **Step 3: Push to Shopify and verify scaffold renders**

```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --only sections/presha-hero-carousel.liquid --only templates/index.json --allow-live
```

Open: `https://agw1a7-eu.myshopify.com?preview_theme_id=194145845329`

Expected: Burgundy banner at the top of the homepage reading "✓ Presha Hero Carousel — scaffold loaded."

- [ ] **Step 4: Commit**

```bash
git add sections/presha-hero-carousel.liquid templates/index.json
git commit -m "Hero Carousel - scaffold section wired into homepage"
```

---

## Task 2 — Slide HTML markup + full CSS

**Files:**
- Modify: `sections/presha-hero-carousel.liquid`

- [ ] **Step 1: Replace the scaffold body with full Liquid slide markup**

Replace the entire content of `sections/presha-hero-carousel.liquid` with this (schema stays identical — do not change it):

```liquid
{% comment %} ============================================================
  PRESHA HERO CAROUSEL
  Spec: docs/superpowers/specs/2026-04-03-hero-carousel-design.md
============================================================ {% endcomment %}

{%- assign slide_blocks = section.blocks | where: "type", "slide" -%}
{%- assign rail_blocks  = section.blocks | where: "type", "rail_card" -%}

<section
  class="presha-hero"
  id="presha-hero-{{ section.id }}"
  role="region"
  aria-label="Hero slideshow"
  data-autoplay-speed="{{ section.settings.autoplay_speed | default: 5000 }}"
>

  {%- if slide_blocks.size > 0 -%}

    {% comment %} ── SLIDES ── {% endcomment %}
    <div class="presha-hero__slides">
      {%- for block in slide_blocks -%}
        {%- assign is_first = forloop.first -%}
        <div
          class="presha-hero__slide{% if is_first %} is-active{% endif %}"
          aria-hidden="{% if is_first %}false{% else %}true{% endif %}"
          {{ block.shopify_attributes }}
        >
          {%- if block.settings.image != blank -%}
            {%- if is_first -%}
              {{
                block.settings.image
                | image_url: width: 3840
                | image_tag:
                  class: 'presha-hero__slide-img',
                  widths: '750, 1100, 1500, 1780, 2000, 3000, 3840',
                  sizes: '100vw',
                  fetchpriority: 'high',
                  loading: 'eager',
                  alt: block.settings.headline
              }}
            {%- else -%}
              {{
                block.settings.image
                | image_url: width: 3840
                | image_tag:
                  class: 'presha-hero__slide-img',
                  widths: '750, 1100, 1500, 1780, 2000, 3000, 3840',
                  sizes: '100vw',
                  loading: 'lazy',
                  alt: block.settings.headline
              }}
            {%- endif -%}
          {%- else -%}
            <div class="presha-hero__slide-img presha-hero__slide-img--placeholder"></div>
          {%- endif -%}

          <div class="presha-hero__overlay" aria-hidden="true"></div>
          <div class="presha-hero__overlay-bottom" aria-hidden="true"></div>

          <div class="presha-hero__content">
            {%- if block.settings.label != blank -%}
              <span class="presha-hero__label">{{ block.settings.label }}</span>
            {%- endif -%}
            {%- if block.settings.headline != blank -%}
              <h2 class="presha-hero__headline">{{ block.settings.headline }}</h2>
            {%- endif -%}
            {%- if block.settings.cta_text != blank -%}
              <a
                href="{{ block.settings.cta_link | default: '#' }}"
                class="presha-hero__cta"
              >{{ block.settings.cta_text }}</a>
            {%- endif -%}
          </div>
        </div>
      {%- endfor -%}
    </div>

    {% comment %} ── PROGRESS INDICATORS ── {% endcomment %}
    {%- if slide_blocks.size > 1 -%}
      <div class="presha-hero__indicators" role="tablist" aria-label="Slide indicators">
        {%- for block in slide_blocks -%}
          <button
            class="presha-hero__indicator{% if forloop.first %} is-active{% endif %}"
            role="tab"
            aria-selected="{% if forloop.first %}true{% else %}false{% endif %}"
            aria-label="Go to slide {{ forloop.index }}"
            data-slide-index="{{ forloop.index0 }}"
          >
            <span class="presha-hero__indicator-fill"></span>
          </button>
        {%- endfor -%}
      </div>
    {%- endif -%}

  {%- endif -%}

  {% comment %} ── DISCOVERY RAIL ── {% endcomment %}
  {%- if section.settings.show_discovery_rail and rail_blocks.size > 0 -%}
    <nav class="presha-hero__rail" aria-label="Shop by category">
      <div class="presha-hero__rail-inner">
        {%- for block in rail_blocks -%}
          <a
            href="{{ block.settings.link | default: '#' }}"
            class="presha-hero__rail-card"
            aria-label="{{ block.settings.label | default: 'Shop' }} {{ block.settings.name }}"
            {{ block.shopify_attributes }}
          >
            <div class="presha-hero__rail-thumb">
              {%- if block.settings.image != blank -%}
                {{
                  block.settings.image
                  | image_url: width: 120
                  | image_tag:
                    class: 'presha-hero__rail-img',
                    widths: '60, 120',
                    sizes: '52px',
                    loading: 'lazy',
                    alt: block.settings.name
                }}
              {%- else -%}
                <div class="presha-hero__rail-img--placeholder"></div>
              {%- endif -%}
            </div>
            <div class="presha-hero__rail-text">
              <span class="presha-hero__rail-label">{{ block.settings.label | default: 'SHOP BY' }}</span>
              <span class="presha-hero__rail-name">{{ block.settings.name }}</span>
            </div>
          </a>
        {%- endfor -%}
      </div>
    </nav>
  {%- endif -%}

</section>
```

- [ ] **Step 2: Add the scoped CSS block**

Immediately after the closing `</section>` and before `{% schema %}`, insert this full `<style>` block:

```liquid
<style>
/* ============================================================
   PRESHA HERO CAROUSEL — scoped styles
   Breakpoints: 749px (tablet), 480px (mobile)
============================================================ */

/* ── Container ── */
.presha-hero {
  position: relative;
  width: 100%;
  height: 92svh;        /* svh = accounts for mobile browser chrome */
  min-height: 500px;
  overflow: hidden;
  background: #0a0a0a;
}

/* ── Slides stack ── */
.presha-hero__slides {
  position: absolute;
  inset: 0;
}

.presha-hero__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  z-index: 0;
  pointer-events: none;
}

.presha-hero__slide.is-active {
  opacity: 1;
  z-index: 1;
  pointer-events: auto;
}

/* ── Slide image ── */
.presha-hero__slide-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}

.presha-hero__slide-img--placeholder {
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
}

/* ── Gradient overlays ── */
.presha-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.62) 0%,
    rgba(0, 0, 0, 0.22) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
}

.presha-hero__overlay-bottom {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.40) 0%,
    transparent 35%
  );
  z-index: 1;
}

/* ── Slide content block ── */
.presha-hero__content {
  position: absolute;
  bottom: 20%;
  left: 5%;
  z-index: 2;
  max-width: 600px;
}

/* ── Label pill ── */
.presha-hero__label {
  display: inline-block;
  font-family: var(--font-body--family, 'Jost', sans-serif);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #6d001a;
  background: rgba(255, 255, 255, 0.92);
  padding: 3px 10px;
  margin-bottom: 14px;
}

/* ── Headline ── */
.presha-hero__headline {
  display: block;
  font-family: var(--font-heading--family, 'Cormorant Garamond', Georgia, serif);
  font-size: clamp(36px, 6vw, 80px);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin: 0 0 20px;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.28);
}

/* ── CTA button ── */
.presha-hero__cta {
  display: inline-block;
  font-family: var(--font-body--family, 'Jost', sans-serif);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ffffff;
  background: #6d001a;
  padding: 13px 28px;
  border-radius: 0;
  border: none;
  text-decoration: none;
  min-height: 44px;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.presha-hero__cta:hover {
  background: #580015;
  color: #ffffff;
  text-decoration: none;
}

/* ── Progress indicators ── */
.presha-hero__indicators {
  position: absolute;
  bottom: calc(90px + 18px);   /* rail height + gap */
  left: 5%;
  z-index: 3;
  display: flex;
  gap: 8px;
  align-items: center;
}

.presha-hero__indicator {
  display: block;
  width: 64px;
  height: 2px;
  background: rgba(255, 255, 255, 0.28);
  border: none;
  border-radius: 1px;
  padding: 0;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  /* Extend tap target on mobile without changing visual size */
  -webkit-tap-highlight-color: transparent;
}

.presha-hero__indicator::before {
  content: '';
  position: absolute;
  top: -10px;
  bottom: -10px;
  left: 0;
  right: 0;
}

.presha-hero__indicator-fill {
  position: absolute;
  inset: 0;
  background: #ffffff;
  border-radius: 1px;
  transform: scaleX(0);
  transform-origin: left center;
}

/* ── Discovery rail ── */
.presha-hero__rail {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
  background: rgba(10, 10, 10, 0.90);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  z-index: 3;
}

.presha-hero__rail-inner {
  display: flex;
  height: 100%;
}

.presha-hero__rail-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.07);
  text-decoration: none;
  cursor: pointer;
  transition: background 0.25s ease;
  min-width: 0;
}

.presha-hero__rail-card:last-child {
  border-right: none;
}

.presha-hero__rail-card:hover {
  background: rgba(255, 255, 255, 0.04);
  text-decoration: none;
}

.presha-hero__rail-thumb {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #1a1a1a;
}

.presha-hero__rail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.presha-hero__rail-img--placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #222 0%, #333 100%);
}

.presha-hero__rail-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.presha-hero__rail-label {
  display: block;
  font-family: var(--font-body--family, 'Jost', sans-serif);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #888888;
  line-height: 1;
}

.presha-hero__rail-name {
  display: block;
  font-family: var(--font-body--family, 'Jost', sans-serif);
  font-size: 13px;
  font-weight: 400;
  color: #f5f1ec;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ============================================================
   RESPONSIVE
============================================================ */

/* Tablet (≤ 1024px) */
@media screen and (max-width: 1024px) {
  .presha-hero__rail-card {
    padding: 0 14px;
    gap: 10px;
  }
}

/* Mobile (≤ 749px) */
@media screen and (max-width: 749px) {
  .presha-hero {
    height: 92svh;
    min-height: 480px;
  }

  .presha-hero__content {
    bottom: 22%;
    left: 5%;
    max-width: 85vw;
  }

  .presha-hero__cta {
    padding: 11px 20px;
    font-size: 10px;
  }

  /* Rail: horizontal scroll on mobile */
  .presha-hero__rail {
    height: 68px;
  }

  .presha-hero__rail-inner {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .presha-hero__rail-inner::-webkit-scrollbar {
    display: none;
  }

  .presha-hero__rail-card {
    flex: 0 0 auto;
    min-width: 148px;
    scroll-snap-align: start;
    padding: 0 14px;
    border-right: 1px solid rgba(255, 255, 255, 0.07);
  }

  .presha-hero__rail-card:last-child {
    border-right: none;
  }

  .presha-hero__rail-thumb {
    width: 36px;
    height: 36px;
  }

  .presha-hero__rail-name {
    font-size: 11px;
  }

  /* Indicators above shorter rail */
  .presha-hero__indicators {
    bottom: calc(68px + 14px);
  }

  /* Shorter indicators on mobile */
  .presha-hero__indicator {
    width: 40px;
  }
}

/* Small mobile (≤ 480px) */
@media screen and (max-width: 480px) {
  .presha-hero__headline {
    font-size: clamp(32px, 9vw, 48px);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .presha-hero__slide-img {
    transition: none !important;
  }
}
</style>
```

- [ ] **Step 3: Push and verify**

```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --only sections/presha-hero-carousel.liquid --allow-live
```

Open preview. Expected:
- Full-viewport height dark section at top of page
- All slides stacked (only slide 1 visible because `.is-active` sets `opacity: 1`)
- Slide 1 shows the uploaded image (or dark placeholder if no image yet)
- Label, headline, CTA visible in bottom-left of the hero
- Discovery rail visible as dark bar at the bottom
- No JS errors in browser console

If no images have been uploaded yet, the placeholder backgrounds will show — this is correct.

- [ ] **Step 4: Commit**

```bash
git add sections/presha-hero-carousel.liquid
git commit -m "Hero Carousel - full markup and CSS, static (no animations yet)"
```

---

## Task 3 — GSAP carousel JavaScript

**Files:**
- Modify: `sections/presha-hero-carousel.liquid`

- [ ] **Step 1: Add the GSAP script block**

After the closing `</style>` tag and before `{% schema %}`, insert this `<script>` block:

```liquid
<script>
(function () {
  'use strict';

  /* ============================================================
     PreshaHeroCarousel
     Manages crossfade + Ken Burns + progress bars + autoplay
  ============================================================ */
  class PreshaHeroCarousel {
    constructor(el) {
      this.el          = el;
      this.slides      = Array.from(el.querySelectorAll('.presha-hero__slide'));
      this.indicators  = Array.from(el.querySelectorAll('.presha-hero__indicator'));
      this.fills       = Array.from(el.querySelectorAll('.presha-hero__indicator-fill'));
      this.speed       = parseInt(el.dataset.autoplaySpeed, 10) || 5000;
      this.current     = 0;
      this.progressTween  = null;
      this.kenBurnsTween  = null;
      this.isPaused    = false;
      this.reducedMotion  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (this.slides.length < 2) {
        // Single slide — still run Ken Burns, skip carousel logic
        this._startKenBurns(this.slides[0]);
        return;
      }

      this._bindEvents();
      this._activateSlide(0, true);
    }

    /* ── Event binding ── */
    _bindEvents() {
      // Pause on hover (desktop)
      this.el.addEventListener('mouseenter', () => this._pause());
      this.el.addEventListener('mouseleave', () => this._resume());

      // Pause on touch (mobile)
      this.el.addEventListener('touchstart', () => this._pause(), { passive: true });
      this.el.addEventListener('touchend',   () => {
        // Short delay so user can tap CTA without immediately resuming
        setTimeout(() => this._resume(), 400);
      }, { passive: true });

      // Indicator clicks
      this.indicators.forEach((btn, i) => {
        btn.addEventListener('click', () => this._goTo(i));
      });
    }

    /* ── Activate a slide by index ── */
    _activateSlide(index, isFirst = false) {
      const outgoingIndex = this.current;
      const outgoing      = this.slides[outgoingIndex];
      const incoming      = this.slides[index];

      // Kill running tweens
      if (this.progressTween) { this.progressTween.kill(); this.progressTween = null; }
      if (this.kenBurnsTween) { this.kenBurnsTween.kill(); this.kenBurnsTween = null; }

      this.current = index;

      /* ── Update indicators ── */
      this.indicators.forEach((btn, i) => {
        const isActive = i === index;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Fills: previous slides = fully filled (white), future = empty
      this.fills.forEach((fill, i) => {
        gsap.set(fill, { scaleX: i < index ? 1 : 0 });
      });

      /* ── Exit outgoing slide (skip on first load) ── */
      if (!isFirst) {
        const outContent = outgoing.querySelector('.presha-hero__content');
        const outImg     = outgoing.querySelector('.presha-hero__slide-img');

        if (!this.reducedMotion) {
          // Fade out text first
          gsap.to(outContent, { opacity: 0, duration: 0.3, ease: 'power2.in' });

          // Crossfade: outgoing fades out
          gsap.to(outgoing, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              outgoing.classList.remove('is-active');
              outgoing.setAttribute('aria-hidden', 'true');
              gsap.set(outgoing, { zIndex: 0 });
              // Clean up will-change on deactivated image
              if (outImg) outImg.style.willChange = 'auto';
            }
          });
        } else {
          gsap.set(outgoing, { opacity: 0, zIndex: 0 });
          outgoing.classList.remove('is-active');
          outgoing.setAttribute('aria-hidden', 'true');
        }
      }

      /* ── Activate incoming slide ── */
      gsap.set(incoming, { zIndex: 2 });
      incoming.classList.add('is-active');
      incoming.setAttribute('aria-hidden', 'false');

      if (!this.reducedMotion && !isFirst) {
        gsap.fromTo(incoming, { opacity: 0 }, {
          opacity: 1, duration: 0.8, ease: 'power2.inOut',
          onComplete: () => gsap.set(incoming, { zIndex: 1 })
        });
      } else {
        gsap.set(incoming, { opacity: 1, zIndex: 1 });
      }

      /* ── Ken Burns on incoming image ── */
      this._startKenBurns(incoming);

      /* ── Text entrance on incoming ── */
      const inContent  = incoming.querySelector('.presha-hero__content');
      const label      = incoming.querySelector('.presha-hero__label');
      const headline   = incoming.querySelector('.presha-hero__headline');
      const cta        = incoming.querySelector('.presha-hero__cta');
      const textEls    = [label, headline, cta].filter(Boolean);

      gsap.set(inContent, { opacity: 1 });
      gsap.set(textEls, { opacity: 0, y: 0 });

      if (!this.reducedMotion) {
        const delay = isFirst ? 0.4 : 0.55;
        const tl = gsap.timeline({ delay });
        if (label)    tl.fromTo(label,    { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
        if (headline) tl.fromTo(headline, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
        if (cta)      tl.fromTo(cta,      { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
      } else {
        gsap.set(textEls, { opacity: 1, y: 0 });
      }

      /* ── Progress bar fill ── */
      const activeFill = this.fills[index];
      if (activeFill) {
        if (!this.reducedMotion) {
          this.progressTween = gsap.fromTo(activeFill,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: this.speed / 1000,
              ease: 'none',
              onComplete: () => this._next()
            }
          );
        } else {
          // No animation — use plain timeout
          gsap.set(activeFill, { scaleX: 1 });
          this._autoplayTimeout = setTimeout(() => this._next(), this.speed);
        }
      }
    }

    /* ── Ken Burns on a slide's image ── */
    _startKenBurns(slide) {
      const img = slide.querySelector('.presha-hero__slide-img');
      if (!img || this.reducedMotion) return;
      img.style.willChange = 'transform';
      gsap.set(img, { scale: 1 });
      this.kenBurnsTween = gsap.to(img, {
        scale: 1.08,
        duration: this.speed / 1000,
        ease: 'none'
      });
    }

    /* ── Advance to next slide ── */
    _next() {
      this._goTo((this.current + 1) % this.slides.length);
    }

    /* ── Jump to slide by index ── */
    _goTo(index) {
      if (index === this.current) return;
      this._activateSlide(index);
    }

    /* ── Pause autoplay ── */
    _pause() {
      if (this.isPaused) return;
      this.isPaused = true;
      if (this.progressTween)  this.progressTween.pause();
      if (this.kenBurnsTween)  this.kenBurnsTween.pause();
      if (this._autoplayTimeout) clearTimeout(this._autoplayTimeout);
    }

    /* ── Resume autoplay ── */
    _resume() {
      if (!this.isPaused) return;
      this.isPaused = false;
      if (this.progressTween) this.progressTween.resume();
      if (this.kenBurnsTween) this.kenBurnsTween.resume();
    }
  }

  /* ── Rail card entrance (ScrollTrigger) ── */
  function initRailEntrance() {
    const cards = document.querySelectorAll('.presha-hero__rail-card');
    if (!cards.length || !window.ScrollTrigger) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.presha-hero',
          start: 'top 90%',
          once: true
        }
      }
    );
  }

  /* ── Init ── */
  function init() {
    if (typeof gsap === 'undefined') {
      console.warn('[PreshaHero] GSAP not loaded — animations skipped.');
      return;
    }

    document.querySelectorAll('.presha-hero').forEach(el => {
      new PreshaHeroCarousel(el);
    });

    initRailEntrance();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── Shopify theme editor live reload ── */
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', (e) => {
      if (e.target.querySelector('.presha-hero')) init();
    });
  }

})();
</script>
```

- [ ] **Step 2: Push and verify animations**

```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --only sections/presha-hero-carousel.liquid --allow-live
```

Open preview. Check all of the following:

1. **Slide 1 visible on load** — label, headline, CTA animate in from below after ~0.4s
2. **Ken Burns active** — slide 1 image slowly zooms in (subtle, not jarring)
3. **Progress bar fills** — the first indicator bar fills left-to-right over 5s
4. **Auto-advance** — after 5s, slide crossfades to slide 2, bar 1 snaps to full, bar 2 begins filling
5. **Hover pause** — hover the hero → progress bar freezes mid-fill, image stops zooming
6. **Hover resume** — move mouse off → both resume from exactly where they stopped
7. **Indicator click** — clicking bar 2 or bar 3 jumps to that slide immediately
8. **Rail cards** — fade up on page load (may need to scroll slightly if hero is below fold)
9. **Console** — no JS errors

- [ ] **Step 3: Commit**

```bash
git add sections/presha-hero-carousel.liquid
git commit -m "Hero Carousel - GSAP crossfade, Ken Burns, progress bars, autoplay"
```

---

## Task 4 — Upload images and configure blocks in theme editor

**Files:** None (Shopify admin only)

- [ ] **Step 1: Open the theme editor**

Navigate to: `https://agw1a7-eu.myshopify.com/admin/themes/194145845329/editor`

- [ ] **Step 2: Add the hero carousel section**

In the left panel, click **Add section** → find **Presha Hero Carousel** → click Add. Drag it to position 1 (top of the page, above the marquee). If the old slideshow/hero sections are still showing, hide or remove them from the page.

- [ ] **Step 3: Add and configure slide blocks**

Click the **Presha Hero Carousel** section → click **Add block** → **Slide**. Add 3 slides:

| Slide | Image to upload | Label | Headline | CTA text |
|---|---|---|---|---|
| 1 | `designassets/slide1.webp` | New Arrival | Own the Dark | Shop Air Jordan 4 |
| 2 | `designassets/slide2.webp` | LA Exclusive | Not for Everyone | Shop the Collection |
| 3 | `designassets/slide3.webp` | Now At Presha | Five Colors. One Obsession | Shop Goyard |

For CTA links: set to the closest matching collection (or `#` as placeholder until collections exist).

- [ ] **Step 4: Add and configure rail card blocks**

Click **Add block** → **Rail Card**. Add 4 cards:

| Rail card | Label | Name | Link |
|---|---|---|---|
| 1 | SHOP BY | Trending Now | `/collections/trending` or `#` |
| 2 | SHOP BY | Pokémon Collectibles | `/collections/pokemon` or `#` |
| 3 | SHOP BY | Rare Find | `/collections/rare-find` or `#` |
| 4 | SHOP BY | Loewe × On | `/collections/loewe-x-on` or `#` |

For now, upload any relevant product/lifestyle image for the rail card thumbnails (square crop preferred). These can be swapped later seasonally.

- [ ] **Step 5: Save and preview**

Click **Save** in the theme editor. Open: `https://agw1a7-eu.myshopify.com?preview_theme_id=194145845329`

Expected: Full hero with slide images, text content, animated progress bars, and rail with thumbnails.

---

## Task 5 — Update PROGRESS.md, ADMIN_TODOS.md, final commit and push

**Files:**
- Modify: `PROGRESS.md`
- Modify: `ADMIN_TODOS.md`

- [ ] **Step 1: Append to PROGRESS.md**

Add this entry at the bottom of `PROGRESS.md`:

```markdown
---

## 2026-04-03 — Hero Carousel

**What was built:**
- New custom section `presha-hero-carousel.liquid` — full-bleed GSAP hero carousel
- 3-slide carousel with crossfade (0.8s) + Ken Burns zoom (1.0→1.08 over slide duration)
- Animated progress bar indicators: 64px × 2px, GSAP-driven fill left-to-right, pauses on hover/touch
- Auto-play at 5s (configurable via theme editor: "Slide duration (ms)")
- Dark discovery rail overlaid at bottom (90px desktop / 68px mobile)
- Rail cards are Shopify blocks — unlimited count, fully editable and reorderable via theme editor
- Mobile: same image smart-cropped via `object-fit: cover`; rail horizontally scrollable with scroll-snap
- All slide content (label, headline, CTA, image, link) editable via theme editor blocks
- `fetchpriority="high"` on first slide image; slides 2+ lazy-loaded
- `prefers-reduced-motion` respected — animations disabled, plain timeout used instead
- ARIA: `role="region"`, `role="tablist"`, `aria-hidden` per slide, descriptive `aria-label` per rail link
- Rail card entrance animated via GSAP ScrollTrigger stagger
- Shopify theme editor live reload supported

**Files changed:**
- `sections/presha-hero-carousel.liquid` — New section
- `templates/index.json` — Added `presha_hero_carousel` at position 0; removed old slideshow/hero from order

**Notes:**
- Clean hero variant (no rail) is parked in `docs/backlog/hero-clean-no-rail.md`
- Rail card links use `#` as placeholder until collections are created in Shopify admin
- The Glamore (brand display font) requires license purchase — Cormorant Garamond used as fallback per design system spec
```

- [ ] **Step 2: Append to ADMIN_TODOS.md**

Add the following items:

```markdown
## Hero Carousel

- [ ] Upload `designassets/slide1.webp` to Slide 1 image picker in theme editor
- [ ] Upload `designassets/slide2.webp` to Slide 2 image picker in theme editor
- [ ] Upload `designassets/slide3.webp` to Slide 3 image picker in theme editor
- [ ] Upload square thumbnail images to each of the 4 rail card blocks
- [ ] Create Shopify collections: `trending`, `pokemon`, `rare-find`, `loewe-x-on`
- [ ] Update rail card links once collection handles are confirmed
- [ ] Update slide CTA links once relevant collection handles are confirmed
- [ ] Remove old `slideshow_thBVtw` and `hero_jVaWmY` sections from theme editor if still showing
```

- [ ] **Step 3: Update CLAUDE.md hero tracker**

In `CLAUDE.md`, find the homepage section tracker and change:

```
3. - [ ] Hero Section
```

to:

```
3. - [x] Hero Section (presha-hero-carousel.liquid — 3 slides, GSAP crossfade + Ken Burns, discovery rail)
```

- [ ] **Step 4: Final commit**

```bash
git add sections/presha-hero-carousel.liquid templates/index.json PROGRESS.md ADMIN_TODOS.md CLAUDE.md
git commit -m "Hero Carousel - complete build with GSAP animations, discovery rail, theme editor controls"
```

- [ ] **Step 5: Push to Shopify**

```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live
```

- [ ] **Step 6: Verify preview one final time**

Open: `https://agw1a7-eu.myshopify.com?preview_theme_id=194145845329`

Final checklist:
- [ ] Slide images load correctly (no broken images)
- [ ] Label, headline, CTA animate in on load
- [ ] Ken Burns zoom visible on first slide
- [ ] Progress bars fill and advance carousel automatically
- [ ] Hover pauses — resume resumes from mid-fill position
- [ ] Indicator clicks jump to that slide
- [ ] Rail thumbnails show, hover state applies
- [ ] Mobile: hero fills viewport, text readable, rail scrolls horizontally
- [ ] No console errors
- [ ] Lighthouse/PageSpeed: no LCP regression (first slide has `fetchpriority="high"`)

- [ ] **Step 7: Push to GitHub**

```bash
git push origin main
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered in |
|---|---|
| Full-bleed 92svh hero | Task 2 CSS `.presha-hero` |
| Crossfade transition 0.8s power2.inOut | Task 3 JS `_activateSlide` |
| Ken Burns scale 1→1.08 over slide duration | Task 3 JS `_startKenBurns` |
| Progress bars 64px × 2px animated fill | Task 2 CSS + Task 3 JS progressTween |
| Auto-play 5s configurable | Task 1 schema + Task 3 JS `this.speed` |
| Pause on hover/touch | Task 3 JS `_bindEvents`, `_pause`, `_resume` |
| Text entrance stagger (label → headline → CTA) | Task 3 JS timeline |
| Text exit before crossfade | Task 3 JS outContent fade |
| Discovery rail overlaid at bottom | Task 2 markup + CSS |
| Rail as Shopify blocks (unlimited) | Task 1 schema `rail_card` block |
| Rail card: image picker, label, name, link | Task 1 schema settings |
| Desktop rail: flex row with dividers | Task 2 CSS `.presha-hero__rail-inner` |
| Mobile rail: horizontal scroll + scroll-snap | Task 2 CSS `@media ≤749px` |
| Same image smart crop mobile | Task 2 CSS `object-fit: cover` |
| `fetchpriority="high"` on first slide | Task 2 Liquid `is_first` branch |
| `loading="lazy"` on slides 2+ | Task 2 Liquid else branch |
| `will-change` scoped to active slide only | Task 3 JS `_startKenBurns` + cleanup |
| ARIA roles and attributes | Task 2 markup |
| `prefers-reduced-motion` | Task 3 JS `this.reducedMotion` |
| Rail entrance ScrollTrigger stagger | Task 3 JS `initRailEntrance` |
| Theme editor live reload | Task 3 JS `shopify:section:load` |
| PROGRESS.md updated | Task 5 Step 1 |
| ADMIN_TODOS.md updated | Task 5 Step 2 |
| CLAUDE.md tracker updated | Task 5 Step 3 |

**Placeholder scan:** No TBDs, no "implement later", no vague steps. All code is complete. ✅

**Type consistency:** `_activateSlide`, `_startKenBurns`, `_pause`, `_resume`, `_next`, `_goTo` — all defined and called consistently. `progressTween`, `kenBurnsTween` — killed before reassignment in every path. ✅
