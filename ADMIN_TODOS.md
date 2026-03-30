# Presha Trends — Shopify Admin TODOs

> Items that require action in the Shopify Admin panel by the store owner.
> Mark `[x]` when completed.

---

## Header & Announcement Bar (2026-03-27)
- [ ] (Optional) Update the Announcement Bar texts ("Presha Verified Authenticity", etc.) via Theme Editor > Header > Announcement Bar.
- [ ] No action needed for the logo upload — the exact `logo-text-whitey` and `logo-text-blacky` assets have been hardcoded to seamlessly swap on scroll as requested.

---

## Reviews & Press Section (2026-03-27)
- [ ] No admin actions required for this section — all content is hardcoded in the template and editable via Theme Editor
- [ ] (Optional) Update review quotes/names via Theme Editor > Homepage > Reviews & Press section if you want different testimonials
- [ ] (Optional) Update press publication names via Theme Editor if partnerships change

---

## Trust Bar Section (2026-03-28)
- [ ] No strict action needed — the 3 core values (Authenticity, Global Shipping, Exclusive Support) are hardcoded with their exact SVG icons as default states.
- [ ] (Optional) You can swap the icon, change the heading text, or modify the subtext directly from the Theme Editor in the "Trust Bar" section on the Homepage.

---

## Presha Journal Section (2026-03-28)
- [ ] **Action Required:** Go to your Shopify Admin > Online Store > Blog Posts.
- [ ] Create a Blog (e.g. named "Journal" or "News").
- [ ] Create at least 3 featured articles with high-quality Featured Images and short excerpts.
- [ ] Tag the articles appropriately (e.g., "CULTURE", "DESIGN", "GUIDES") so the section fetches the tags to use as the metadata label.
- [ ] Go to Theme Editor > Homepage > "Featured Journal" section over the left sidebar, and select your newly created Blog under the "Blog" setting. This will swap out the static mockup blocks for your live Shopify articles!

---

## Authentication Section (2026-03-28)
- [ ] Action Needed: No functional actions are strictly required because the layout elements are baked into blocks.
- [ ] (Optional): You can modify the "PRESHA VERIFIED" heading, background color, and main image. You can also edit, duplicate, or delete the check-marked feature rows (like "EXPERT MULTI-POINT INSPECTION") in the Theme Editor > Authentication Feature section.

---

## Email Signup Section (2026-03-28)
- [ ] Action Needed: The form is natively integrated with Shopify! Any emails entered here will automatically populate your Shopify Admin > Customers tab with the "newsletter" tag. 
- [ ] (Optional): You can customize the giant display heading, subtext, button label, and placeholder text directly inside the Theme Editor.

---

## Shop by Brand — Logo Strip (2026-03-30)
- [ ] **Action Required — Create collections:** The brand cards link to collection pages. Create these collections in **Shopify Admin → Products → Collections**:
  - `/collections/nike`
  - `/collections/jordan`
  - `/collections/adidas`
  - `/collections/chrome-hearts`
  - `/collections/goyard`
  - `/collections/new-balance`
  - `/collections/on-running`
  - `/collections/yeezy`
- [ ] **Action Required — Replace text-based SVGs:** Chrome Hearts and Yeezy logos are currently text-based SVGs (not actual vector logos). Source proper vector SVG files and replace `assets/brand-chrome-hearts.svg` and `assets/brand-yeezy.svg`.
- [ ] (Optional): Update collection URLs per brand block in Theme Editor if your collection handles differ from above.
- [ ] (Optional): Add or remove brands via Theme Editor → Brand Logos → Add block. Up to 12 brands supported.

---

## Gifts For Her / Him Section (2026-03-30)
- [ ] **Action Required — Upload images:** Go to Theme Editor → Homepage → "Gifts For Her / Him" section. Upload a lifestyle image for each tile (e.g. Goyard bags for "Her", streetwear/sneakers for "Him").
- [ ] **Action Required — Set link URLs:** In each tile block, set the Link to point to your gift collections (e.g. `/collections/gifts-for-her`, `/collections/gifts-for-him`). Create these collections in **Shopify Admin → Products → Collections** if they don't exist yet.
- [ ] (Optional): Update the eyebrow text, heading, or button label per tile via Theme Editor.

---

## Featured Categories Section (2026-03-30)
- [ ] **Action Required — Upload category images:** Go to **Theme Editor → Homepage → Featured Categories** section. For each category block (Air Jordan, Nike, On Running, Onitsuka Tiger, Adidas, New Balance, Yeezy, Asics), click the block and upload a lifestyle photo via **"Category Image"** image picker.
  - Recommended: portrait orientation (3:4 aspect ratio), min 800px wide
  - Lifestyle sneaker photography (feet wearing shoes, editorial-style product shots)
- [ ] **Action Required — Create collections:** The category cards link to collection pages. Create these in **Shopify Admin → Products → Collections** if they don't exist:
  - `/collections/jordan`, `/collections/nike`, `/collections/on-running`, `/collections/onitsuka-tiger`
  - `/collections/adidas`, `/collections/new-balance`, `/collections/yeezy`, `/collections/asics`
- [ ] (Optional): Add, remove, or reorder categories via Theme Editor → Featured Categories → Add/reorder blocks. Up to 10 categories supported.

