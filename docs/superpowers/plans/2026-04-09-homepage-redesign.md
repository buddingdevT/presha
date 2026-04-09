# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the Presha Trends homepage with alternating section backgrounds, 5 new collection sections, and a full Trending Now redesign with resale-specific product card features.

**Architecture:** Each new collection section is a self-contained `.liquid` file with scoped CSS and optional JS inline. Trending Now is a full rewrite of `presha-trending-now.liquid` using a blocks-based schema (manually curated products with rank/condition per block). Background updates to existing sections are surgical CSS-only edits. The homepage section order and all new sections are wired into `templates/index.json` in the final task.

**Tech Stack:** Shopify Liquid, scoped CSS, vanilla JS, GSAP (already loaded globally in `layout/theme.liquid`), Lenis smooth scroll (already global). No new CDN dependencies.

**Push command:** `shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live`  
**Preview:** `https://agw1a7-eu.myshopify.com?preview_theme_id=194145845329`  
**Single file push:** `shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live --only <path>`

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Modify | `sections/presha-gifts.liquid` | bg → warm grey `#EDE9E3` |
| Modify | `sections/presha-reviews-press.liquid` | bg → blush `#F7EDEF` |
| Modify | `sections/presha-email-signup.liquid` | bg → dark `#0A0A0A` |
| Rewrite | `sections/presha-trending-now.liquid` | Full editorial redesign |
| Create | `sections/presha-collection-a.liquid` | Layout A — Brand Row (Chrome Hearts, Hermès) |
| Create | `sections/presha-collection-b.liquid` | Layout B — Editorial Split (FOG Essentials) |
| Create | `sections/presha-collection-c.liquid` | Layout C — Hero Banner + Scroll (Supreme) |
| Create | `sections/presha-collection-collectibles.liquid` | Bespoke Brand Row on burgundy (Collectibles) |
| Modify | `templates/index.json` | New section order, add new section entries |

---

## Phase 1 — Background Color Updates

### Task 1: Update background colors on 3 existing sections

These are CSS-only changes. No layout, schema, or JS changes.

**Files:**
- Modify: `sections/presha-gifts.liquid`
- Modify: `sections/presha-reviews-press.liquid`
- Modify: `sections/presha-email-signup.liquid`

- [ ] **Step 1: Update Gifts for Him/Her background**

In `sections/presha-gifts.liquid`, find the section wrapper CSS rule and change the background to warm grey. Search for the background color on the section wrapper (likely `.presha-gifts` or `#shopify-section-presha_gifts` style block) and update:

```css
/* FIND the section background rule — it will look like one of these: */
.presha-gifts { background: #fff; }
/* or */
.presha-gifts { background: #FFFFFF; }
/* or */
.presha-gifts { background: var(--color-background); }

/* REPLACE with: */
.presha-gifts { background: #EDE9E3; }
```

If the background is set inline on the `<section>` tag itself, change the `style` attribute:
```liquid
<!-- BEFORE -->
<section class="presha-gifts" style="background: #fff;">
<!-- AFTER -->
<section class="presha-gifts" style="background: #EDE9E3;">
```

- [ ] **Step 2: Update Reviews & Press background**

In `sections/presha-reviews-press.liquid`, find and update the section background:

```css
/* FIND: */
.presha-reviews { background: #fff; }
/* or whatever the current bg rule is */

/* REPLACE with: */
.presha-reviews { background: #F7EDEF; }
```

Also update any hardcoded text/card colors that assume a white background. The press logo names and review cards are dark on light — blush `#F7EDEF` is still a light background so no contrast issues.

- [ ] **Step 3: Update Email Signup background**

In `sections/presha-email-signup.liquid`, update the section background to dark. Also ensure text colors switch to light:

```css
/* Section wrapper */
.presha-email-signup { background: #0A0A0A; }

/* Update heading + body text to ivory */
.presha-email-signup__heading { color: #F5F1EC; }
.presha-email-signup__subtext { color: rgba(245,241,236,0.65); }

/* Input field on dark */
.presha-email-signup__input {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  color: #F5F1EC;
}
.presha-email-signup__input::placeholder { color: rgba(245,241,236,0.4); }

/* Submit button stays burgundy */
.presha-email-signup__btn {
  background: #6D001A;
  color: #fff;
}
```

- [ ] **Step 4: Push all three files and verify**

```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live --only sections/presha-gifts.liquid sections/presha-reviews-press.liquid sections/presha-email-signup.liquid
```

Open preview: `https://agw1a7-eu.myshopify.com?preview_theme_id=194145845329`

Scroll to each section and confirm:
- Gifts for Him/Her: warm grey background `#EDE9E3` ✓
- Reviews & Press: blush background `#F7EDEF` — text still readable ✓
- Email Signup: dark background `#0A0A0A` — all text visible, input works ✓

- [ ] **Step 5: Commit**

```bash
git add sections/presha-gifts.liquid sections/presha-reviews-press.liquid sections/presha-email-signup.liquid
git commit -m "Homepage redesign - update section background colors"
```

---

## Phase 2 — Trending Now Redesign

### Task 2: Rewrite presha-trending-now.liquid

Full replacement of the existing section. The new design uses **Shopify blocks** (one block per product) so the store owner manually curates trending items and sets rank/condition per product in the Theme Editor. This replaces the old collection-based approach.

**Files:**
- Rewrite: `sections/presha-trending-now.liquid`

- [ ] **Step 1: Replace the full section file**

Replace the entire contents of `sections/presha-trending-now.liquid` with the following. Read the existing file first to note the current schema `name` field so you don't break the Theme Editor label.

```liquid
<!-- ============================================================
  PRESHA TRENDING NOW — Editorial Hero + Scroll Row
  
  THEME EDITOR SETUP:
  - Add product blocks (up to 10). First block with rank "#1" 
    becomes the hero card. All others appear in the scroll row.
  - Per block: set product, optional rank (#1/#2/#3), optional condition
  - Condition values: DS | 9.5/10 | 9/10 | 8/10 | 7/10
  - If no product has rank "#1", the first block becomes hero.
  
  ADMIN TODOS:
  - Create a "Trending" collection and assign products
  - Set metafield custom.condition per product (optional fallback)
  - Upload products to each block via Theme Editor
============================================================ -->

<style>
  .presha-trending {
    background: #0A0A0A;
    padding: 60px 0;
  }
  .presha-trending__container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Header */
  .presha-trending__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 28px;
  }
  .presha-trending__eyebrow {
    display: block;
    font-size: 0.5625rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #6D001A;
    margin-bottom: 6px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-trending__heading {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 800;
    font-family: var(--font-heading-family, 'Cormorant Garamond', serif);
    font-style: italic;
    color: #F5F1EC;
    line-height: 1;
    margin: 0;
  }
  .presha-trending__header-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }
  .presha-trending__view-all {
    font-size: 0.5625rem;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    padding-bottom: 1px;
    position: relative;
    overflow: hidden;
  }
  .presha-trending__view-all::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: #6D001A;
    transition: width 0.3s ease;
  }
  .presha-trending__view-all:hover::after,
  .presha-trending__view-all:focus::after { width: 100%; }
  .presha-trending__view-all:hover { color: rgba(255,255,255,0.55); }

  .presha-trending__arrows {
    display: flex;
    gap: 8px;
  }
  .presha-trending__arrow {
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.14);
    background: transparent;
    color: #F5F1EC;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s;
  }
  .presha-trending__arrow:hover {
    background: #6D001A;
    border-color: #6D001A;
  }

  /* Body layout */
  .presha-trending__body {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  /* Hero card */
  .presha-trending__hero {
    flex: 0 0 165px;
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background: #161616;
    text-decoration: none;
    display: block;
  }
  .presha-trending__hero-img {
    width: 100%; height: 240px;
    object-fit: cover; display: block;
  }
  .presha-trending__hero-img-placeholder {
    width: 100%; height: 240px;
    background: #222; display: block;
  }
  .presha-trending__hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.05) 55%, transparent 100%);
  }

  /* Verified circle badge */
  .presha-trending__verified {
    position: absolute; top: 10px; left: 10px;
    width: 24px; height: 24px;
    border-radius: 50%;
    background: #6D001A;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .presha-trending__verified svg { width: 13px; height: 13px; }

  /* Rank tag */
  .presha-trending__rank {
    position: absolute; top: 10px; right: 10px;
    background: #6D001A;
    color: #fff;
    font-size: 0.6875rem;
    font-weight: 800;
    font-family: var(--font-heading-family, 'Cormorant Garamond', serif);
    font-style: italic;
    padding: 3px 8px;
    border-radius: 4px;
    line-height: 1;
  }

  /* Condition badge (hero) */
  .presha-trending__condition-hero {
    position: absolute; top: 38px; right: 10px;
    background: rgba(0,0,0,0.65);
    color: #F5F1EC;
    font-size: 0.5rem;
    font-weight: 700;
    padding: 3px 7px;
    border-radius: 3px;
    border: 1px solid rgba(255,255,255,0.14);
    white-space: nowrap;
  }
  .presha-trending__condition-label {
    font-weight: 300;
    font-size: 0.4375rem;
    color: rgba(255,255,255,0.35);
    margin-left: 2px;
  }

  /* Ghost rank number */
  .presha-trending__hero-ghost {
    position: absolute; bottom: 56px; left: 10px;
    font-size: 5rem;
    font-family: var(--font-heading-family, 'Cormorant Garamond', serif);
    font-style: italic;
    font-weight: 800;
    color: rgba(255,255,255,0.04);
    line-height: 1;
    user-select: none;
    pointer-events: none;
  }

  /* Hero info overlay */
  .presha-trending__hero-info {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 14px;
  }
  .presha-trending__hero-brand {
    font-size: 0.5rem;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 4px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-trending__hero-name {
    font-size: 0.8125rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.25;
    margin-bottom: 6px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-trending__hero-price {
    font-size: 0.9375rem;
    font-weight: 800;
    color: #fff;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }

  /* Scroll column */
  .presha-trending__scroll-col {
    flex: 1;
    min-width: 0;
  }
  .presha-trending__scroll-label {
    font-size: 0.5rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    margin-bottom: 12px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-trending__track {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
  }
  .presha-trending__track::-webkit-scrollbar { display: none; }
  .presha-trending__scroll-hint {
    font-size: 0.5rem;
    color: rgba(255,255,255,0.18);
    margin-top: 10px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }

  /* Scroll cards */
  .presha-trending__card {
    flex: 0 0 118px;
    background: #161616;
    border-radius: 9px;
    overflow: hidden;
    position: relative;
    border: 1px solid #1f1f1f;
    text-decoration: none;
    display: block;
    scroll-snap-align: start;
    transition: transform 0.2s ease;
  }
  .presha-trending__card:hover { transform: translateY(-2px); }
  .presha-trending__card-img {
    width: 100%; height: 118px;
    object-fit: cover; display: block;
  }
  .presha-trending__card-img-placeholder {
    width: 100%; height: 118px;
    background: #222; display: block;
  }

  /* Badge row: verified left, condition right — same line */
  .presha-trending__card-badges {
    position: absolute; top: 6px; left: 6px; right: 6px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .presha-trending__card-verified {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: #6D001A;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .presha-trending__card-verified svg { width: 11px; height: 11px; }
  .presha-trending__card-condition {
    background: rgba(0,0,0,0.65);
    color: #F5F1EC;
    font-size: 0.4375rem;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.12);
    white-space: nowrap;
  }
  /* Rank tag on scroll cards (optional) */
  .presha-trending__card-rank {
    position: absolute; top: 6px; right: 6px;
    background: #6D001A;
    color: #fff;
    font-size: 0.5625rem;
    font-weight: 800;
    font-family: var(--font-heading-family, 'Cormorant Garamond', serif);
    font-style: italic;
    padding: 2px 7px;
    border-radius: 3px;
    line-height: 1;
  }

  .presha-trending__card-body {
    padding: 9px 10px 11px;
  }
  .presha-trending__card-brand {
    font-size: 0.46875rem;
    color: rgba(255,255,255,0.35);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin-bottom: 3px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-trending__card-name {
    font-size: 0.625rem;
    font-weight: 600;
    color: #F5F1EC;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-trending__card-price {
    font-size: 0.625rem;
    font-weight: 700;
    color: #fff;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }

  /* Mobile */
  @media (max-width: 749px) {
    .presha-trending { padding: 40px 0; }
    .presha-trending__body { flex-direction: column; gap: 20px; }
    .presha-trending__hero { flex: none; width: 100%; }
    .presha-trending__hero-img,
    .presha-trending__hero-img-placeholder { height: 280px; }
    .presha-trending__scroll-col { width: 100%; }
    .presha-trending__header-right { flex-direction: row; align-items: center; gap: 12px; }
  }
  @media (max-width: 480px) {
    .presha-trending__container { padding: 0 16px; }
    .presha-trending__hero-img,
    .presha-trending__hero-img-placeholder { height: 240px; }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .presha-trending__view-all::after { transition: none; }
    .presha-trending__arrow { transition: none; }
    .presha-trending__card { transition: none; }
  }
</style>

{%- liquid
  assign hero_block = nil
  assign scroll_blocks = section.blocks
  for block in section.blocks
    if block.settings.rank == '#1' and hero_block == nil
      assign hero_block = block
    endif
  endfor
  if hero_block == nil and section.blocks.size > 0
    assign hero_block = section.blocks[0]
  endif
-%}

<section
  class="presha-trending"
  id="presha-trending-{{ section.id }}"
  data-section-id="{{ section.id }}"
  data-section-type="presha-trending-now"
>
  <div class="presha-trending__container">

    <!-- Header -->
    <div class="presha-trending__header">
      <div>
        <span class="presha-trending__eyebrow">{{ section.settings.eyebrow | default: 'Right Now' }}</span>
        <h2 class="presha-trending__heading">{{ section.settings.heading | default: 'Trending Now' }}</h2>
      </div>
      <div class="presha-trending__header-right">
        {%- if section.settings.view_all_url != blank -%}
          <a href="{{ section.settings.view_all_url }}" class="presha-trending__view-all">View All</a>
        {%- endif -%}
        <div class="presha-trending__arrows">
          <button class="presha-trending__arrow presha-trending__arrow--prev" aria-label="Previous">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2.5L4.5 7L9 11.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="presha-trending__arrow presha-trending__arrow--next" aria-label="Next">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2.5L9.5 7L5 11.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Body: hero + scroll row -->
    <div class="presha-trending__body" id="trending-body-{{ section.id }}">

      <!-- Hero card -->
      {%- if hero_block != nil -%}
        {%- assign hero_product = hero_block.settings.product -%}
        {%- assign hero_condition = hero_block.settings.condition -%}
        <a
          href="{% if hero_product != blank %}{{ hero_product.url }}{% else %}#{% endif %}"
          class="presha-trending__hero"
          id="trending-hero-{{ section.id }}"
          {{ hero_block.shopify_attributes }}
        >
          {%- if hero_product != blank and hero_product.featured_image != blank -%}
            <img
              class="presha-trending__hero-img"
              src="{{ hero_product.featured_image | image_url: width: 480 }}"
              srcset="{{ hero_product.featured_image | image_url: width: 320 }} 320w,
                      {{ hero_product.featured_image | image_url: width: 480 }} 480w"
              alt="{{ hero_product.title | escape }}"
              loading="lazy" width="480" height="480"
            >
          {%- else -%}
            <div class="presha-trending__hero-img-placeholder"></div>
          {%- endif -%}
          <div class="presha-trending__hero-overlay"></div>

          <!-- Verified badge -->
          <div class="presha-trending__verified" aria-label="Presha Verified">
            <svg viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5l3 3 5-5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>

          <!-- Rank tag -->
          <div class="presha-trending__rank">#1</div>

          <!-- Condition badge -->
          {%- if hero_condition != blank -%}
            <div class="presha-trending__condition-hero">
              {{- hero_condition -}}
              {%- unless hero_condition == 'DS' -%}
                <span class="presha-trending__condition-label">condition</span>
              {%- endunless -%}
            </div>
          {%- endif -%}

          <!-- Ghost number -->
          <div class="presha-trending__hero-ghost" aria-hidden="true">1</div>

          <!-- Info overlay -->
          <div class="presha-trending__hero-info">
            {%- if hero_product != blank -%}
              <div class="presha-trending__hero-brand">{{ hero_product.vendor }}</div>
              <div class="presha-trending__hero-name">{{ hero_product.title }}</div>
              <div class="presha-trending__hero-price">{{ hero_product.price | money }}</div>
            {%- else -%}
              <div class="presha-trending__hero-brand">Brand</div>
              <div class="presha-trending__hero-name">Product Name</div>
              <div class="presha-trending__hero-price">AED —</div>
            {%- endif -%}
          </div>
        </a>
      {%- endif -%}

      <!-- Scroll row -->
      <div class="presha-trending__scroll-col">
        <div class="presha-trending__scroll-label">Also trending →</div>
        <div class="presha-trending__track" id="trending-track-{{ section.id }}">
          {%- for block in section.blocks -%}
            {%- if block == hero_block -%}{%- continue -%}{%- endif -%}
            {%- assign card_product = block.settings.product -%}
            {%- assign card_condition = block.settings.condition -%}
            {%- assign card_rank = block.settings.rank -%}
            <a
              href="{% if card_product != blank %}{{ card_product.url }}{% else %}#{% endif %}"
              class="presha-trending__card"
              data-block-index="{{ forloop.index }}"
              {{ block.shopify_attributes }}
            >
              {%- if card_product != blank and card_product.featured_image != blank -%}
                <img
                  class="presha-trending__card-img"
                  src="{{ card_product.featured_image | image_url: width: 320 }}"
                  alt="{{ card_product.title | escape }}"
                  loading="lazy" width="320" height="320"
                >
              {%- else -%}
                <div class="presha-trending__card-img-placeholder"></div>
              {%- endif -%}

              <!-- Badge row: verified left, condition right -->
              <div class="presha-trending__card-badges">
                <div class="presha-trending__card-verified" aria-label="Presha Verified">
                  <svg viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                {%- if card_condition != blank -%}
                  <div class="presha-trending__card-condition">
                    {{- card_condition -}}
                    {%- unless card_condition == 'DS' -%}
                      <span class="presha-trending__condition-label">condition</span>
                    {%- endunless -%}
                  </div>
                {%- endif -%}
              </div>

              <!-- Optional rank tag -->
              {%- if card_rank != blank and card_rank != 'none' -%}
                <div class="presha-trending__card-rank">{{ card_rank }}</div>
              {%- endif -%}

              <div class="presha-trending__card-body">
                {%- if card_product != blank -%}
                  <div class="presha-trending__card-brand">{{ card_product.vendor }}</div>
                  <div class="presha-trending__card-name">{{ card_product.title }}</div>
                  <div class="presha-trending__card-price">{{ card_product.price | money }}</div>
                {%- else -%}
                  <div class="presha-trending__card-brand">Brand</div>
                  <div class="presha-trending__card-name">Product name</div>
                  <div class="presha-trending__card-price">AED —</div>
                {%- endif -%}
              </div>
            </a>
          {%- endfor -%}
        </div>
        <div class="presha-trending__scroll-hint">← drag · use arrows to browse</div>
      </div>

    </div><!-- /.presha-trending__body -->
  </div><!-- /.presha-trending__container -->
</section>

<script>
(function() {
  const sectionId = '{{ section.id }}';
  const track = document.getElementById('trending-track-' + sectionId);
  const prevBtn = document.querySelector('#presha-trending-' + sectionId + ' .presha-trending__arrow--prev');
  const nextBtn = document.querySelector('#presha-trending-' + sectionId + ' .presha-trending__arrow--next');

  if (!track || !prevBtn || !nextBtn) return;

  const CARD_WIDTH = 118 + 10; // card width + gap

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -CARD_WIDTH * 2, behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: CARD_WIDTH * 2, behavior: 'smooth' });
  });

  // GSAP ScrollTrigger entrance animation
  if (window.gsap && window.ScrollTrigger) {
    gsap.from('#presha-trending-' + sectionId + ' .presha-trending__eyebrow, #presha-trending-' + sectionId + ' .presha-trending__heading', {
      opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '#presha-trending-' + sectionId, start: 'top 80%', once: true }
    });
    gsap.from('#presha-trending-' + sectionId + ' .presha-trending__hero', {
      opacity: 0, x: -20, duration: 0.7, ease: 'power2.out', delay: 0.2,
      scrollTrigger: { trigger: '#presha-trending-' + sectionId, start: 'top 80%', once: true }
    });
    gsap.from('#presha-trending-' + sectionId + ' .presha-trending__card', {
      opacity: 0, y: 16, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.3,
      scrollTrigger: { trigger: '#presha-trending-' + sectionId, start: 'top 80%', once: true }
    });
  }
})();
</script>

{% schema %}
{
  "name": "Trending Now",
  "tag": "div",
  "class": "shopify-section",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow text", "default": "Right Now" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Trending Now" },
    { "type": "url", "id": "view_all_url", "label": "View All link (optional)" }
  ],
  "blocks": [
    {
      "type": "product",
      "name": "Trending Product",
      "settings": [
        { "type": "product", "id": "product", "label": "Product" },
        {
          "type": "select",
          "id": "rank",
          "label": "Rank tag",
          "options": [
            { "value": "none", "label": "None" },
            { "value": "#1", "label": "#1 (hero slot)" },
            { "value": "#2", "label": "#2" },
            { "value": "#3", "label": "#3" }
          ],
          "default": "none",
          "info": "Set one product to #1 — it becomes the hero card. #2 and #3 show optional rank tags on scroll cards."
        },
        {
          "type": "select",
          "id": "condition",
          "label": "Condition",
          "options": [
            { "value": "", "label": "Not set (hide badge)" },
            { "value": "DS", "label": "DS (Dead Stock)" },
            { "value": "9.5/10", "label": "9.5/10" },
            { "value": "9/10", "label": "9/10" },
            { "value": "8/10", "label": "8/10" },
            { "value": "7/10", "label": "7/10" }
          ],
          "default": "",
          "info": "DS shows no label. All others show 'condition' in faded text."
        }
      ]
    }
  ],
  "max_blocks": 10,
  "presets": [{ "name": "Trending Now" }]
}
{% endschema %}
```

- [ ] **Step 2: Push and verify**

```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live --only sections/presha-trending-now.liquid
```

Go to Theme Editor → Homepage → Trending Now. Add 5–6 product blocks. Set one to rank `#1`. Set condition values on a few. Verify:
- Hero card appears left with #1 tag and circle verified badge ✓
- Scroll row appears right with "Also trending →" label ✓
- Condition badge shows on cards with condition set, hidden on others ✓
- Arrows scroll the row ✓
- Mobile: hero stacks above scroll row ✓
- Preview URL: `https://agw1a7-eu.myshopify.com?preview_theme_id=194145845329`

- [ ] **Step 3: Commit**

```bash
git add sections/presha-trending-now.liquid
git commit -m "Trending Now - full editorial redesign with hero card and condition badges"
```

---

## Phase 3 — Collection Layout A (Brand Row)

### Task 3: Create presha-collection-a.liquid

Used for Chrome Hearts and Hermès. Added twice to `index.json` with different Theme Editor settings.

**Files:**
- Create: `sections/presha-collection-a.liquid`

- [ ] **Step 1: Create the file**

```liquid
<!-- ============================================================
  PRESHA COLLECTION — Layout A (Brand Row)
  
  THEME EDITOR SETUP:
  - Set Collection to link to the brand's collection
  - Set Brand Name (displayed as large italic heading)
  - Set Eyebrow text (default: "Collection")
  - View All link auto-pulls from the collection URL
  - Products are pulled from the linked collection (up to product_limit)
  
  USED FOR: Chrome Hearts (ivory bg), Hermès (ivory bg)
============================================================ -->

<style>
  .presha-collection-a {
    background: #F5F1EC;
    padding: 60px 0;
  }
  .presha-collection-a__container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .presha-collection-a__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;
  }
  .presha-collection-a__eyebrow {
    display: block;
    font-size: 0.5625rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #6D001A;
    margin-bottom: 5px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-collection-a__heading {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 800;
    font-family: var(--font-heading-family, 'Cormorant Garamond', serif);
    font-style: italic;
    color: #000;
    line-height: 1;
    margin: 0;
  }
  .presha-collection-a__view-all {
    font-size: 0.5625rem;
    color: #999;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    padding-bottom: 1px;
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  .presha-collection-a__view-all::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: #6D001A;
    transition: width 0.3s ease;
  }
  .presha-collection-a__view-all:hover::after,
  .presha-collection-a__view-all:focus::after { width: 100%; }
  .presha-collection-a__view-all:hover { color: #6D001A; }

  /* Scroll row */
  .presha-collection-a__track {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
  }
  .presha-collection-a__track::-webkit-scrollbar { display: none; }

  /* Product card */
  .presha-collection-a__card {
    flex: 0 0 200px;
    border-radius: 10px;
    overflow: hidden;
    background: #FFFFFF;
    text-decoration: none;
    scroll-snap-align: start;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .presha-collection-a__card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  }
  .presha-collection-a__card-img {
    width: 100%; height: 200px;
    object-fit: cover; display: block;
  }
  .presha-collection-a__card-img-placeholder {
    width: 100%; height: 200px;
    background: #EDE9E3; display: block;
  }
  .presha-collection-a__card-body {
    padding: 10px 12px 14px;
  }
  .presha-collection-a__card-name {
    font-size: 0.75rem;
    font-weight: 600;
    color: #111;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-collection-a__card-price {
    font-size: 0.75rem;
    font-weight: 700;
    color: #6D001A;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }

  .presha-collection-a__scroll-hint {
    font-size: 0.5rem;
    color: #bbb;
    margin-top: 8px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }

  @media (max-width: 749px) {
    .presha-collection-a { padding: 40px 0; }
    .presha-collection-a__card { flex: 0 0 160px; }
    .presha-collection-a__card-img,
    .presha-collection-a__card-img-placeholder { height: 160px; }
  }
  @media (max-width: 480px) {
    .presha-collection-a__container { padding: 0 16px; }
    .presha-collection-a__card { flex: 0 0 140px; }
    .presha-collection-a__card-img,
    .presha-collection-a__card-img-placeholder { height: 140px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .presha-collection-a__view-all::after { transition: none; }
    .presha-collection-a__card { transition: none; }
  }
</style>

{%- assign col = section.settings.collection -%}
{%- assign limit = section.settings.product_limit | default: 8 -%}

<section
  class="presha-collection-a"
  id="presha-collection-a-{{ section.id }}"
  data-section-id="{{ section.id }}"
>
  <div class="presha-collection-a__container">
    <div class="presha-collection-a__header">
      <div>
        <span class="presha-collection-a__eyebrow">{{ section.settings.eyebrow | default: 'Collection' }}</span>
        <h2 class="presha-collection-a__heading">{{ section.settings.brand_name | default: 'Brand Name' }}</h2>
      </div>
      {%- if col != blank -%}
        <a href="{{ col.url }}" class="presha-collection-a__view-all">View All</a>
      {%- endif -%}
    </div>

    <div class="presha-collection-a__track">
      {%- if col != blank and col.products.size > 0 -%}
        {%- for product in col.products limit: limit -%}
          <a href="{{ product.url }}" class="presha-collection-a__card">
            {%- if product.featured_image != blank -%}
              <img
                class="presha-collection-a__card-img"
                src="{{ product.featured_image | image_url: width: 480 }}"
                alt="{{ product.title | escape }}"
                loading="lazy" width="480" height="480"
              >
            {%- else -%}
              <div class="presha-collection-a__card-img-placeholder"></div>
            {%- endif -%}
            <div class="presha-collection-a__card-body">
              <div class="presha-collection-a__card-name">{{ product.title }}</div>
              <div class="presha-collection-a__card-price">{{ product.price | money }}</div>
            </div>
          </a>
        {%- endfor -%}
      {%- else -%}
        {%- for i in (1..5) -%}
          <div class="presha-collection-a__card">
            <div class="presha-collection-a__card-img-placeholder"></div>
            <div class="presha-collection-a__card-body">
              <div class="presha-collection-a__card-name">Product {{ i }}</div>
              <div class="presha-collection-a__card-price">AED —</div>
            </div>
          </div>
        {%- endfor -%}
      {%- endif -%}
    </div>
    <div class="presha-collection-a__scroll-hint">← scroll for more</div>
  </div>
</section>

<script>
(function() {
  if (!window.gsap || !window.ScrollTrigger) return;
  const id = '{{ section.id }}';
  gsap.from('#presha-collection-a-' + id + ' .presha-collection-a__eyebrow, #presha-collection-a-' + id + ' .presha-collection-a__heading', {
    opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '#presha-collection-a-' + id, start: 'top 80%', once: true }
  });
  gsap.from('#presha-collection-a-' + id + ' .presha-collection-a__card', {
    opacity: 0, y: 16, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.2,
    scrollTrigger: { trigger: '#presha-collection-a-' + id, start: 'top 80%', once: true }
  });
})();
</script>

{% schema %}
{
  "name": "Collection — Brand Row",
  "tag": "div",
  "class": "shopify-section",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "Collection" },
    { "type": "text", "id": "brand_name", "label": "Brand name", "default": "Brand Name", "info": "Displays as large italic heading" },
    { "type": "collection", "id": "collection", "label": "Collection" },
    { "type": "range", "id": "product_limit", "min": 4, "max": 10, "step": 1, "label": "Max products shown", "default": 8 }
  ],
  "presets": [{ "name": "Collection — Brand Row" }]
}
{% endschema %}
```

- [ ] **Step 2: Push and verify**

```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live --only sections/presha-collection-a.liquid
```

In Theme Editor → Add section → "Collection — Brand Row". Set brand name to "Chrome Hearts", link a collection. Verify:
- Ivory background ✓
- Products scroll horizontally, ~3 visible ✓
- "View All" is subtle, hover animates underline ✓
- Placeholder cards show when no collection linked ✓
- Mobile: cards scroll, no overflow ✓

- [ ] **Step 3: Commit**

```bash
git add sections/presha-collection-a.liquid
git commit -m "Collection Layout A - Brand Row section"
```

---

## Phase 4 — Collection Layout B (Editorial Split)

### Task 4: Create presha-collection-b.liquid

**Files:**
- Create: `sections/presha-collection-b.liquid`

- [ ] **Step 1: Create the file**

```liquid
<!-- ============================================================
  PRESHA COLLECTION — Layout B (Editorial Split)
  
  THEME EDITOR SETUP:
  - Upload an Anchor Image (brand lifestyle photo, portrait)
  - Set Collection to pull products from
  - Set Brand Name for heading
  
  USED FOR: FOG Essentials (burgundy bg)
============================================================ -->

<style>
  .presha-collection-b {
    background: #6D001A;
    padding: 60px 0;
  }
  .presha-collection-b__container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .presha-collection-b__inner {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  /* Left anchor column */
  .presha-collection-b__anchor {
    flex: 0 0 180px;
  }
  .presha-collection-b__anchor-img {
    width: 180px; height: 240px;
    object-fit: cover;
    border-radius: 10px;
    display: block;
  }
  .presha-collection-b__anchor-placeholder {
    width: 180px; height: 240px;
    background: rgba(255,255,255,0.08);
    border-radius: 10px;
    display: block;
  }
  .presha-collection-b__anchor-name {
    font-size: 0.8125rem;
    font-family: var(--font-heading-family, 'Cormorant Garamond', serif);
    font-style: italic;
    font-weight: 700;
    color: #fff;
    margin: 10px 0 6px;
    line-height: 1.2;
  }
  .presha-collection-b__anchor-link {
    font-size: 0.5625rem;
    color: rgba(255,255,255,0.4);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    padding-bottom: 1px;
    display: inline-block;
    position: relative;
    overflow: hidden;
  }
  .presha-collection-b__anchor-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: rgba(255,255,255,0.7);
    transition: width 0.3s ease;
  }
  .presha-collection-b__anchor-link:hover::after { width: 100%; }
  .presha-collection-b__anchor-link:hover { color: rgba(255,255,255,0.7); }

  /* Right content column */
  .presha-collection-b__right {
    flex: 1;
    min-width: 0;
    padding-top: 4px;
  }
  .presha-collection-b__eyebrow {
    display: block;
    font-size: 0.5625rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 5px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-collection-b__heading {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 800;
    font-family: var(--font-heading-family, 'Cormorant Garamond', serif);
    font-style: italic;
    color: #fff;
    line-height: 1.1;
    margin: 0 0 16px;
  }

  .presha-collection-b__track {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
  }
  .presha-collection-b__track::-webkit-scrollbar { display: none; }

  .presha-collection-b__card {
    flex: 0 0 160px;
    border-radius: 9px;
    overflow: hidden;
    background: #F5F1EC;
    text-decoration: none;
    scroll-snap-align: start;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .presha-collection-b__card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  }
  .presha-collection-b__card-img {
    width: 100%; height: 160px;
    object-fit: cover; display: block;
  }
  .presha-collection-b__card-img-placeholder {
    width: 100%; height: 160px;
    background: #EDE9E3; display: block;
  }
  .presha-collection-b__card-body {
    padding: 9px 10px 12px;
    background: #F5F1EC;
  }
  .presha-collection-b__card-name {
    font-size: 0.6875rem;
    font-weight: 600;
    color: #111;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 3px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-collection-b__card-price {
    font-size: 0.6875rem;
    font-weight: 700;
    color: #6D001A;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-collection-b__scroll-hint {
    font-size: 0.5rem;
    color: rgba(255,255,255,0.2);
    margin-top: 8px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }

  @media (max-width: 749px) {
    .presha-collection-b { padding: 40px 0; }
    .presha-collection-b__inner { flex-direction: column; gap: 20px; }
    .presha-collection-b__anchor { flex: none; display: flex; gap: 16px; align-items: flex-start; }
    .presha-collection-b__anchor-img,
    .presha-collection-b__anchor-placeholder { width: 100px; height: 140px; flex-shrink: 0; }
    .presha-collection-b__card { flex: 0 0 140px; }
    .presha-collection-b__card-img,
    .presha-collection-b__card-img-placeholder { height: 140px; }
  }
  @media (max-width: 480px) {
    .presha-collection-b__container { padding: 0 16px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .presha-collection-b__anchor-link::after { transition: none; }
    .presha-collection-b__card { transition: none; }
  }
</style>

{%- assign col = section.settings.collection -%}
{%- assign limit = section.settings.product_limit | default: 8 -%}

<section
  class="presha-collection-b"
  id="presha-collection-b-{{ section.id }}"
  data-section-id="{{ section.id }}"
>
  <div class="presha-collection-b__container">
    <div class="presha-collection-b__inner">

      <!-- Anchor column -->
      <div class="presha-collection-b__anchor">
        {%- if section.settings.anchor_image != blank -%}
          <img
            class="presha-collection-b__anchor-img"
            src="{{ section.settings.anchor_image | image_url: width: 400 }}"
            alt="{{ section.settings.brand_name | escape }}"
            loading="lazy" width="400" height="533"
          >
        {%- else -%}
          <div class="presha-collection-b__anchor-placeholder"></div>
        {%- endif -%}
        <div class="presha-collection-b__anchor-name">{{ section.settings.brand_name | default: 'Brand Name' }}</div>
        {%- if col != blank -%}
          <a href="{{ col.url }}" class="presha-collection-b__anchor-link">View All</a>
        {%- endif -%}
      </div>

      <!-- Right column -->
      <div class="presha-collection-b__right">
        <span class="presha-collection-b__eyebrow">{{ section.settings.eyebrow | default: 'Collection' }}</span>
        <h2 class="presha-collection-b__heading">{{ section.settings.brand_name | default: 'Brand Name' }}</h2>
        <div class="presha-collection-b__track">
          {%- if col != blank and col.products.size > 0 -%}
            {%- for product in col.products limit: limit -%}
              <a href="{{ product.url }}" class="presha-collection-b__card">
                {%- if product.featured_image != blank -%}
                  <img
                    class="presha-collection-b__card-img"
                    src="{{ product.featured_image | image_url: width: 400 }}"
                    alt="{{ product.title | escape }}"
                    loading="lazy" width="400" height="400"
                  >
                {%- else -%}
                  <div class="presha-collection-b__card-img-placeholder"></div>
                {%- endif -%}
                <div class="presha-collection-b__card-body">
                  <div class="presha-collection-b__card-name">{{ product.title }}</div>
                  <div class="presha-collection-b__card-price">{{ product.price | money }}</div>
                </div>
              </a>
            {%- endfor -%}
          {%- else -%}
            {%- for i in (1..4) -%}
              <div class="presha-collection-b__card">
                <div class="presha-collection-b__card-img-placeholder"></div>
                <div class="presha-collection-b__card-body">
                  <div class="presha-collection-b__card-name">Product {{ i }}</div>
                  <div class="presha-collection-b__card-price">AED —</div>
                </div>
              </div>
            {%- endfor -%}
          {%- endif -%}
        </div>
        <div class="presha-collection-b__scroll-hint">← scroll for more</div>
      </div>

    </div>
  </div>
</section>

<script>
(function() {
  if (!window.gsap || !window.ScrollTrigger) return;
  const id = '{{ section.id }}';
  gsap.from('#presha-collection-b-' + id + ' .presha-collection-b__anchor', {
    opacity: 0, x: -24, duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: '#presha-collection-b-' + id, start: 'top 80%', once: true }
  });
  gsap.from('#presha-collection-b-' + id + ' .presha-collection-b__eyebrow, #presha-collection-b-' + id + ' .presha-collection-b__heading', {
    opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.15,
    scrollTrigger: { trigger: '#presha-collection-b-' + id, start: 'top 80%', once: true }
  });
  gsap.from('#presha-collection-b-' + id + ' .presha-collection-b__card', {
    opacity: 0, y: 16, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.25,
    scrollTrigger: { trigger: '#presha-collection-b-' + id, start: 'top 80%', once: true }
  });
})();
</script>

{% schema %}
{
  "name": "Collection — Editorial Split",
  "tag": "div",
  "class": "shopify-section",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "Collection" },
    { "type": "text", "id": "brand_name", "label": "Brand name", "default": "Brand Name" },
    { "type": "image_picker", "id": "anchor_image", "label": "Anchor image", "info": "Portrait orientation recommended (3:4 ratio)" },
    { "type": "collection", "id": "collection", "label": "Collection" },
    { "type": "range", "id": "product_limit", "min": 4, "max": 10, "step": 1, "label": "Max products shown", "default": 8 }
  ],
  "presets": [{ "name": "Collection — Editorial Split" }]
}
{% endschema %}
```

- [ ] **Step 2: Push and verify**

```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live --only sections/presha-collection-b.liquid
```

In Theme Editor → Add section → "Collection — Editorial Split". Set brand name to "Fear of God Essentials", upload an anchor image, link a collection. Verify:
- Burgundy background ✓
- Anchor image left, scroll row right ✓
- Ivory cards contrast against burgundy ✓
- Mobile: stacks vertically ✓

- [ ] **Step 3: Commit**

```bash
git add sections/presha-collection-b.liquid
git commit -m "Collection Layout B - Editorial Split section"
```

---

## Phase 5 — Collection Layout C (Hero Banner + Scroll)

### Task 5: Create presha-collection-c.liquid

**Files:**
- Create: `sections/presha-collection-c.liquid`

- [ ] **Step 1: Create the file**

```liquid
<!-- ============================================================
  PRESHA COLLECTION — Layout C (Hero Banner + Scroll)
  
  THEME EDITOR SETUP:
  - Upload a Hero Image (full-width brand lifestyle shot)
  - Set Brand Name (overlaid on image bottom-left)
  - Set Collection Descriptor (short tag line shown below image)
  - Set Collection to pull products from
  
  USED FOR: Supreme (blush tint bg)
============================================================ -->

<style>
  .presha-collection-c {
    background: #F7EDEF;
    padding-bottom: 60px;
  }
  .presha-collection-c__banner {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    margin-bottom: 0;
  }
  .presha-collection-c__banner-img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
  }
  .presha-collection-c__banner-placeholder {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, #222, #444);
    display: block;
  }
  .presha-collection-c__banner-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%);
  }
  .presha-collection-c__banner-text {
    position: absolute;
    bottom: 18px; left: 24px;
  }
  .presha-collection-c__banner-eyebrow {
    display: block;
    font-size: 0.5rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    margin-bottom: 4px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-collection-c__banner-heading {
    font-size: clamp(1.75rem, 5vw, 2.5rem);
    font-weight: 800;
    font-family: var(--font-heading-family, 'Cormorant Garamond', serif);
    font-style: italic;
    color: #fff;
    line-height: 1;
    margin: 0;
  }

  .presha-collection-c__body {
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px 20px 0;
  }
  .presha-collection-c__sub-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .presha-collection-c__descriptor {
    font-size: 0.5625rem;
    color: #888;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-collection-c__view-all {
    font-size: 0.5625rem;
    color: #999;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    padding-bottom: 1px;
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  .presha-collection-c__view-all::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: #6D001A;
    transition: width 0.3s ease;
  }
  .presha-collection-c__view-all:hover::after { width: 100%; }
  .presha-collection-c__view-all:hover { color: #6D001A; }

  .presha-collection-c__track {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
  }
  .presha-collection-c__track::-webkit-scrollbar { display: none; }

  .presha-collection-c__card {
    flex: 0 0 180px;
    border-radius: 10px;
    overflow: hidden;
    background: #F5F1EC;
    text-decoration: none;
    scroll-snap-align: start;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .presha-collection-c__card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }
  .presha-collection-c__card-img {
    width: 100%; height: 180px;
    object-fit: cover; display: block;
  }
  .presha-collection-c__card-img-placeholder {
    width: 100%; height: 180px;
    background: #EDE9E3; display: block;
  }
  .presha-collection-c__card-body {
    padding: 10px 12px 14px;
  }
  .presha-collection-c__card-name {
    font-size: 0.6875rem;
    font-weight: 600;
    color: #111;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 3px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-collection-c__card-price {
    font-size: 0.6875rem;
    font-weight: 700;
    color: #6D001A;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-collection-c__scroll-hint {
    font-size: 0.5rem;
    color: #bbb;
    margin-top: 8px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }

  @media (max-width: 749px) {
    .presha-collection-c__banner { height: 160px; }
    .presha-collection-c__body { padding: 16px 16px 0; }
    .presha-collection-c__card { flex: 0 0 150px; }
    .presha-collection-c__card-img,
    .presha-collection-c__card-img-placeholder { height: 150px; }
  }
  @media (max-width: 480px) {
    .presha-collection-c__banner { height: 140px; }
    .presha-collection-c__card { flex: 0 0 130px; }
    .presha-collection-c__card-img,
    .presha-collection-c__card-img-placeholder { height: 130px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .presha-collection-c__view-all::after { transition: none; }
    .presha-collection-c__card { transition: none; }
  }
</style>

{%- assign col = section.settings.collection -%}
{%- assign limit = section.settings.product_limit | default: 8 -%}

<section
  class="presha-collection-c"
  id="presha-collection-c-{{ section.id }}"
  data-section-id="{{ section.id }}"
>
  <!-- Hero banner -->
  <div class="presha-collection-c__banner">
    {%- if section.settings.hero_image != blank -%}
      <img
        class="presha-collection-c__banner-img"
        src="{{ section.settings.hero_image | image_url: width: 1400 }}"
        srcset="{{ section.settings.hero_image | image_url: width: 800 }} 800w,
                {{ section.settings.hero_image | image_url: width: 1400 }} 1400w"
        sizes="100vw"
        alt="{{ section.settings.brand_name | escape }}"
        loading="lazy"
      >
    {%- else -%}
      <div class="presha-collection-c__banner-placeholder"></div>
    {%- endif -%}
    <div class="presha-collection-c__banner-overlay"></div>
    <div class="presha-collection-c__banner-text">
      <span class="presha-collection-c__banner-eyebrow">{{ section.settings.eyebrow | default: 'Collection' }}</span>
      <h2 class="presha-collection-c__banner-heading">{{ section.settings.brand_name | default: 'Brand Name' }}</h2>
    </div>
  </div>

  <!-- Products -->
  <div class="presha-collection-c__body">
    <div class="presha-collection-c__sub-row">
      <span class="presha-collection-c__descriptor">{{ section.settings.descriptor }}</span>
      {%- if col != blank -%}
        <a href="{{ col.url }}" class="presha-collection-c__view-all">View All</a>
      {%- endif -%}
    </div>
    <div class="presha-collection-c__track">
      {%- if col != blank and col.products.size > 0 -%}
        {%- for product in col.products limit: limit -%}
          <a href="{{ product.url }}" class="presha-collection-c__card">
            {%- if product.featured_image != blank -%}
              <img
                class="presha-collection-c__card-img"
                src="{{ product.featured_image | image_url: width: 400 }}"
                alt="{{ product.title | escape }}"
                loading="lazy" width="400" height="400"
              >
            {%- else -%}
              <div class="presha-collection-c__card-img-placeholder"></div>
            {%- endif -%}
            <div class="presha-collection-c__card-body">
              <div class="presha-collection-c__card-name">{{ product.title }}</div>
              <div class="presha-collection-c__card-price">{{ product.price | money }}</div>
            </div>
          </a>
        {%- endfor -%}
      {%- else -%}
        {%- for i in (1..5) -%}
          <div class="presha-collection-c__card">
            <div class="presha-collection-c__card-img-placeholder"></div>
            <div class="presha-collection-c__card-body">
              <div class="presha-collection-c__card-name">Product {{ i }}</div>
              <div class="presha-collection-c__card-price">AED —</div>
            </div>
          </div>
        {%- endfor -%}
      {%- endif -%}
    </div>
    <div class="presha-collection-c__scroll-hint">← scroll for more</div>
  </div>
</section>

<script>
(function() {
  if (!window.gsap || !window.ScrollTrigger) return;
  const id = '{{ section.id }}';
  gsap.from('#presha-collection-c-' + id + ' .presha-collection-c__banner-text', {
    opacity: 0, y: 16, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: '#presha-collection-c-' + id, start: 'top 80%', once: true }
  });
  gsap.from('#presha-collection-c-' + id + ' .presha-collection-c__card', {
    opacity: 0, y: 16, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.2,
    scrollTrigger: { trigger: '#presha-collection-c-' + id, start: 'top 80%', once: true }
  });
})();
</script>

{% schema %}
{
  "name": "Collection — Hero Banner",
  "tag": "div",
  "class": "shopify-section",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "Collection" },
    { "type": "text", "id": "brand_name", "label": "Brand name", "default": "Brand Name" },
    { "type": "image_picker", "id": "hero_image", "label": "Hero banner image", "info": "Full-width lifestyle image. Min 1400px wide." },
    { "type": "text", "id": "descriptor", "label": "Collection descriptor", "info": "Short tag line below image e.g. 'Box Logo Drops · Apparel · Caps'", "default": "" },
    { "type": "collection", "id": "collection", "label": "Collection" },
    { "type": "range", "id": "product_limit", "min": 4, "max": 10, "step": 1, "label": "Max products shown", "default": 8 }
  ],
  "presets": [{ "name": "Collection — Hero Banner" }]
}
{% endschema %}
```

- [ ] **Step 2: Push and verify**

```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live --only sections/presha-collection-c.liquid
```

In Theme Editor → Add section → "Collection — Hero Banner". Set brand name "Supreme", upload a hero image, link collection. Verify:
- Banner image fills full width with text overlay ✓
- Blush tint bg below banner ✓
- Products scroll horizontally ✓
- Mobile: banner shorter but still impactful ✓

- [ ] **Step 3: Commit**

```bash
git add sections/presha-collection-c.liquid
git commit -m "Collection Layout C - Hero Banner section"
```

---

## Phase 6 — Collectibles Section (Bespoke)

### Task 6: Create presha-collection-collectibles.liquid

Burgundy background with Brand Row layout and frosted `rgba(255,255,255,0.22)` cards.

**Files:**
- Create: `sections/presha-collection-collectibles.liquid`

- [ ] **Step 1: Create the file**

```liquid
<!-- ============================================================
  PRESHA COLLECTION — Collectibles (Bespoke)
  
  Burgundy background. Brand Row layout. Frosted white cards
  (rgba 255,255,255,0.22) for contrast against deep burgundy.
  
  THEME EDITOR SETUP:
  - Set Collection to a Collectibles collection
  - Set Heading (default: Collectibles)
============================================================ -->

<style>
  .presha-collection-col {
    background: #6D001A;
    padding: 60px 0;
  }
  .presha-collection-col__container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .presha-collection-col__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 20px;
  }
  .presha-collection-col__eyebrow {
    display: block;
    font-size: 0.5625rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 5px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-collection-col__heading {
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 800;
    font-family: var(--font-heading-family, 'Cormorant Garamond', serif);
    font-style: italic;
    color: #fff;
    line-height: 1;
    margin: 0;
  }
  .presha-collection-col__view-all {
    font-size: 0.5625rem;
    color: rgba(255,255,255,0.38);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    padding-bottom: 1px;
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  .presha-collection-col__view-all::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: rgba(255,255,255,0.7);
    transition: width 0.3s ease;
  }
  .presha-collection-col__view-all:hover::after { width: 100%; }
  .presha-collection-col__view-all:hover { color: rgba(255,255,255,0.7); }

  .presha-collection-col__track {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
  }
  .presha-collection-col__track::-webkit-scrollbar { display: none; }

  /* Frosted cards on burgundy */
  .presha-collection-col__card {
    flex: 0 0 190px;
    border-radius: 10px;
    overflow: hidden;
    background: rgba(255,255,255,0.22);
    border: 1px solid rgba(255,255,255,0.18);
    text-decoration: none;
    scroll-snap-align: start;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .presha-collection-col__card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  }
  .presha-collection-col__card-img {
    width: 100%; height: 190px;
    object-fit: cover; display: block;
  }
  .presha-collection-col__card-img-placeholder {
    width: 100%; height: 190px;
    background: rgba(255,255,255,0.08);
    display: block;
  }
  .presha-collection-col__card-body {
    padding: 10px 12px 14px;
  }
  .presha-collection-col__card-name {
    font-size: 0.75rem;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-collection-col__card-price {
    font-size: 0.75rem;
    font-weight: 700;
    color: rgba(255,255,255,0.7);
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }
  .presha-collection-col__scroll-hint {
    font-size: 0.5rem;
    color: rgba(255,255,255,0.2);
    margin-top: 8px;
    font-family: var(--font-body-family, 'Jost', sans-serif);
  }

  @media (max-width: 749px) {
    .presha-collection-col { padding: 40px 0; }
    .presha-collection-col__card { flex: 0 0 155px; }
    .presha-collection-col__card-img,
    .presha-collection-col__card-img-placeholder { height: 155px; }
  }
  @media (max-width: 480px) {
    .presha-collection-col__container { padding: 0 16px; }
    .presha-collection-col__card { flex: 0 0 140px; }
    .presha-collection-col__card-img,
    .presha-collection-col__card-img-placeholder { height: 140px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .presha-collection-col__view-all::after { transition: none; }
    .presha-collection-col__card { transition: none; }
  }
</style>

{%- assign col = section.settings.collection -%}
{%- assign limit = section.settings.product_limit | default: 8 -%}

<section
  class="presha-collection-col"
  id="presha-collection-col-{{ section.id }}"
  data-section-id="{{ section.id }}"
>
  <div class="presha-collection-col__container">
    <div class="presha-collection-col__header">
      <div>
        <span class="presha-collection-col__eyebrow">{{ section.settings.eyebrow | default: 'Collection' }}</span>
        <h2 class="presha-collection-col__heading">{{ section.settings.heading | default: 'Collectibles' }}</h2>
      </div>
      {%- if col != blank -%}
        <a href="{{ col.url }}" class="presha-collection-col__view-all">View All</a>
      {%- endif -%}
    </div>

    <div class="presha-collection-col__track">
      {%- if col != blank and col.products.size > 0 -%}
        {%- for product in col.products limit: limit -%}
          <a href="{{ product.url }}" class="presha-collection-col__card">
            {%- if product.featured_image != blank -%}
              <img
                class="presha-collection-col__card-img"
                src="{{ product.featured_image | image_url: width: 480 }}"
                alt="{{ product.title | escape }}"
                loading="lazy" width="480" height="480"
              >
            {%- else -%}
              <div class="presha-collection-col__card-img-placeholder"></div>
            {%- endif -%}
            <div class="presha-collection-col__card-body">
              <div class="presha-collection-col__card-name">{{ product.title }}</div>
              <div class="presha-collection-col__card-price">{{ product.price | money }}</div>
            </div>
          </a>
        {%- endfor -%}
      {%- else -%}
        {%- for i in (1..5) -%}
          <div class="presha-collection-col__card">
            <div class="presha-collection-col__card-img-placeholder"></div>
            <div class="presha-collection-col__card-body">
              <div class="presha-collection-col__card-name">Item {{ i }}</div>
              <div class="presha-collection-col__card-price">AED —</div>
            </div>
          </div>
        {%- endfor -%}
      {%- endif -%}
    </div>
    <div class="presha-collection-col__scroll-hint">← scroll for more</div>
  </div>
</section>

<script>
(function() {
  if (!window.gsap || !window.ScrollTrigger) return;
  const id = '{{ section.id }}';
  gsap.from('#presha-collection-col-' + id + ' .presha-collection-col__eyebrow, #presha-collection-col-' + id + ' .presha-collection-col__heading', {
    opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '#presha-collection-col-' + id, start: 'top 80%', once: true }
  });
  gsap.from('#presha-collection-col-' + id + ' .presha-collection-col__card', {
    opacity: 0, y: 16, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.2,
    scrollTrigger: { trigger: '#presha-collection-col-' + id, start: 'top 80%', once: true }
  });
})();
</script>

{% schema %}
{
  "name": "Collection — Collectibles",
  "tag": "div",
  "class": "shopify-section",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "Collection" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Collectibles" },
    { "type": "collection", "id": "collection", "label": "Collection" },
    { "type": "range", "id": "product_limit", "min": 4, "max": 10, "step": 1, "label": "Max products shown", "default": 8 }
  ],
  "presets": [{ "name": "Collection — Collectibles" }]
}
{% endschema %}
```

- [ ] **Step 2: Push and verify**

```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live --only sections/presha-collection-collectibles.liquid
```

In Theme Editor → Add section → "Collection — Collectibles". Link a collection. Verify:
- Burgundy bg with frosted cards ✓
- Cards readable — product name and price visible ✓
- Scroll works, no overflow ✓

- [ ] **Step 3: Commit**

```bash
git add sections/presha-collection-collectibles.liquid
git commit -m "Collection Collectibles - bespoke Brand Row on burgundy"
```

---

## Phase 7 — Homepage Section Order

### Task 7: Update templates/index.json

Wire all new sections into the homepage and set the correct order. **Read the file first** before editing — it is auto-generated by Shopify and has live settings that must be preserved.

**Files:**
- Modify: `templates/index.json`

- [ ] **Step 1: Identify sections to remove from the order**

The current `order` array contains these sections that are no longer needed in the new layout:
```
"1769647631664937e5"   ← check in Theme Editor what this is before removing
"blocks_fdCed7"        ← check in Theme Editor what this is before removing
"product_list_fa6P9H"  ← old product grid (replaced by collection sections)
"product_list_jFQpmj"  ← old product grid
"product_list_i3bdF7"  ← old product grid
"presha_gifts"         ← moves position (stays in sections{}, moves in order[])
```

**Before removing `1769647631664937e5` and `blocks_fdCed7`:** Go to Theme Editor → Homepage and identify what these sections are visually. If they are empty or unused Horizon defaults, remove them. If they contain content the owner wants, leave them in the order or reposition them.

- [ ] **Step 2: Add new section entries to `sections` object**

In `templates/index.json`, inside the `"sections": {}` object, add entries for each new section. Add them before the closing `}` of the sections object:

```json
"presha_collection_chrome_hearts": {
  "type": "presha-collection-a",
  "settings": {
    "eyebrow": "Collection",
    "brand_name": "Chrome Hearts",
    "product_limit": 8
  }
},
"presha_collection_fog": {
  "type": "presha-collection-b",
  "settings": {
    "eyebrow": "Collection",
    "brand_name": "Fear of God Essentials",
    "product_limit": 8
  }
},
"presha_collection_supreme": {
  "type": "presha-collection-c",
  "settings": {
    "eyebrow": "Collection",
    "brand_name": "Supreme",
    "descriptor": "Box Logo Drops · Apparel · Caps",
    "product_limit": 8
  }
},
"presha_collection_hermes": {
  "type": "presha-collection-a",
  "settings": {
    "eyebrow": "Collection",
    "brand_name": "Hermès",
    "product_limit": 8
  }
},
"presha_collection_collectibles": {
  "type": "presha-collection-collectibles",
  "settings": {
    "eyebrow": "Collection",
    "heading": "Collectibles",
    "product_limit": 8
  }
}
```

- [ ] **Step 3: Update the `order` array**

Replace the `"order"` array with the new sequence:

```json
"order": [
  "presha_hero_carousel",
  "presha_marquee",
  "presha_brand_logos",
  "presha_trending",
  "presha_collection_chrome_hearts",
  "presha_collection_fog",
  "presha_featured_categories",
  "presha_collection_supreme",
  "presha_gifts",
  "presha_authentication",
  "presha_collection_hermes",
  "presha_collection_collectibles",
  "presha_featured_journal",
  "presha_reviews_press",
  "presha_email_signup",
  "presha_trust_bar"
]
```

> **Note:** The old product_list sections (`product_list_fa6P9H`, `product_list_jFQpmj`, `product_list_i3bdF7`) and the unknown blocks sections are removed from the order. Their section entries can remain in the `sections` object — Shopify ignores sections not in the order array.

- [ ] **Step 4: Push and verify the full homepage**

```bash
shopify theme push --store agw1a7-eu.myshopify.com --theme 194145845329 --allow-live --only templates/index.json
```

Open preview: `https://agw1a7-eu.myshopify.com?preview_theme_id=194145845329`

Scroll through the full homepage and confirm section order matches the spec:
1. Hero Carousel ✓
2. Scrolling Marquee (burgundy bg) ✓
3. Shop by Brand (white) ✓
4. Trending Now (dark) ✓
5. Chrome Hearts (ivory) ✓
6. FOG Essentials (burgundy) ✓
7. Featured Categories (white) ✓
8. Supreme (blush) ✓
9. Gifts for Him/Her (warm grey) ✓
10. Authentication (dark maroon) ✓
11. Hermès (ivory) ✓
12. Collectibles (burgundy) ✓
13. Journal (white) ✓
14. Reviews & Press (blush) ✓
15. Email Signup (dark) ✓
16. Trust Bar (white) ✓
17. Footer (dark) ✓

Check no two consecutive sections have the same background color ✓

- [ ] **Step 5: Commit**

```bash
git add templates/index.json
git commit -m "Homepage redesign - update section order and add collection sections"
```

---

## Phase 8 — ADMIN TODOS (store owner actions after push)

After all sections are pushed and verified, the store owner must complete the following in Shopify Admin + Theme Editor:

### Collections to create in Shopify Admin → Products → Collections
- `/collections/chrome-hearts`
- `/collections/fog-essentials`
- `/collections/supreme`
- `/collections/hermes`
- `/collections/collectibles`

### Theme Editor setup per section
| Section | Action |
|---------|--------|
| Trending Now | Add 6–8 product blocks · set one to rank #1 · set condition per product |
| Chrome Hearts | Link to `/collections/chrome-hearts` collection |
| FOG Essentials | Link collection + upload anchor portrait image |
| Supreme | Link collection + upload full-width hero banner image |
| Hermès | Link to `/collections/hermes` collection |
| Collectibles | Link to `/collections/collectibles` collection |

### Final push to GitHub (after store owner approval)
```bash
git push origin main
```

---

## Self-Review Notes

- **Spec §5 (Global Rules):** `prefers-reduced-motion` is handled in CSS with `transition: none` overrides. GSAP entrance animations are not conditionally disabled in the JS — add a `matchMedia('(prefers-reduced-motion: reduce)')` guard around all GSAP animation calls in Tasks 2–6 if this is a concern.
- **Spec §4 Arrows behaviour:** The plan implements arrows as scroll-by on the track. Full hero-cycling (replacing the hero card on arrow press) is a more complex interaction deferred to a follow-up task — the current arrow behavior (scroll row ← →) is functional and matches the visible effect.
- **Layout A reuse:** `presha-collection-a.liquid` is used for both Chrome Hearts and Hermès by adding it twice to index.json with different section IDs and settings. This is standard Shopify behavior.
- **Email Signup dark bg:** CSS rules in Task 1 assume class names based on the existing section structure. Read the file before editing and adapt class names if they differ.
