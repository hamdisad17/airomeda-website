# Airomeda Website — Plan 4: SEO + Polish + Launch

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development.

**Goal:** Make the site production-launch-ready: search engines can crawl and rank it, social shares look professional, legal pages have real content, performance is sound, and post-launch monitoring is in place.

**Architecture:** Pure additions on top of Plan 1-3. No infra changes. SEO via Next.js metadata APIs (`generateMetadata`, `app/sitemap.ts`, `app/robots.ts`); structured data via inline `<script type="application/ld+json">`; OG images via `next/og`; KVKK pages via real MDX; cookie consent via lightweight client component.

**Tech additions:** None mandatory. Optional: Umami self-hosted analytics on VPS (deferred — separate work item).

**Spec:** §9 SEO/analytics/performans, §10 Görsel stil, §13 Pre-launch.

**Out of scope (post-launch):** Self-hosted analytics, A/B testing, search functionality, multi-language Arabic/Russian.

---

## Tasks

### Task 1 — Sitemap + robots + canonical + hreflang

**Files:**
- Create: `app/sitemap.ts` — dynamic XML sitemap covering all locales, services, case studies, blog posts, jobs, static pages
- Create: `app/robots.ts` — robots.txt with sitemap reference, crawl rules
- Modify: `app/[locale]/layout.tsx` — emit `<link rel="alternate" hreflang="..." />` for every page (TR ↔ EN ↔ x-default)
- Modify: `app/[locale]/**/page.tsx` (each) — add canonical URL to `generateMetadata`

`app/sitemap.ts` enumerates:
- Static: `/`, `/hizmetler`, `/calismalarimiz`, `/blog`, `/kariyer`, `/hakkimizda`, `/iletisim`, `/kvkk`, `/cerez-politikasi` × 2 locales = 18 URLs
- Dynamic: services (7×2=14), case studies (3×2=6), blog (5×2=10), blog categories (~5×2=10), active jobs (3×2=6) = 46 URLs
- Total: ~64 URLs in sitemap.

`hreflang` strategy: for any URL `/tr/<path>`, emit alternates pointing to `/en/<path>` (and vice-versa). Default `x-default` points to `/tr/<path>` (Turkish first since target market).

### Task 2 — JSON-LD structured data

**Files:**
- Create: `lib/seo/jsonld.ts` — typed builders for `Organization`, `WebSite`, `BreadcrumbList`, `Service`, `Article`, `JobPosting`
- Create: `components/seo/JsonLd.tsx` — renders `<script type="application/ld+json">{...}</script>`
- Modify: `app/[locale]/layout.tsx` — emit `Organization` + `WebSite` once on every page
- Modify: `app/[locale]/hizmetler/[slug]/page.tsx` — emit `Service` schema
- Modify: `app/[locale]/calismalarimiz/[slug]/page.tsx` — emit `Article` (case studies are articles per Schema.org)
- Modify: `app/[locale]/blog/[slug]/page.tsx` — emit `Article`
- Modify: `app/[locale]/kariyer/[slug]/page.tsx` — emit `JobPosting`
- Modify: All detail pages — emit `BreadcrumbList`

Reference: schema.org/docs/full.html. Keep schemas minimal but valid; validate via https://validator.schema.org/ post-deploy.

### Task 3 — Enhanced metadata + Open Graph

**Files:**
- Modify: each page's `generateMetadata` to include:
  - `openGraph.title`, `openGraph.description`, `openGraph.type` (`'website'` for index, `'article'` for blog/case study/job)
  - `openGraph.url` (canonical)
  - `openGraph.siteName: 'Airomeda'`
  - `openGraph.locale: 'tr_TR'` or `'en_US'`
  - `twitter.card: 'summary_large_image'`, `twitter.title`, `twitter.description`
  - `alternates.canonical` and `alternates.languages`

### Task 4 — Dynamic OG image generation

**Files:**
- Create: `app/[locale]/opengraph-image.tsx` (root locale OG, used by home + index pages)
- Create: `app/[locale]/hizmetler/[slug]/opengraph-image.tsx` (service-specific)
- Create: `app/[locale]/calismalarimiz/[slug]/opengraph-image.tsx`
- Create: `app/[locale]/blog/[slug]/opengraph-image.tsx`
- Create: `app/[locale]/kariyer/[slug]/opengraph-image.tsx`

Use `ImageResponse` from `next/og`. 1200×630 px. Layout: large title (from page) + Airomeda wordmark + accent color stripe. Solid color background (no external image deps so it builds reliably in CI).

### Task 5 — KVKK + Çerez Politikası real content

**Files:**
- Modify: `content/pages/tr/kvkk.mdx` — real GDPR/KVKK aydınlatma metni (Turkish legal text)
- Modify: `content/pages/en/privacy.mdx` — English equivalent
- Modify: `content/pages/tr/cerez-politikasi.mdx` — real cookie policy (TR)
- Modify: `content/pages/en/cookies.mdx` — same (EN)

Content structure: data controller info, what we collect (form fields, server logs, cookies), purposes, legal basis, retention, third parties (Resend, Cloudflare Turnstile), data subject rights (KVKK Article 11), contact for requests, last updated date.

### Task 6 — Cookie consent banner (KVKK)

**Files:**
- Create: `components/legal/CookieConsent.tsx` (`'use client'`, localStorage-backed)
- Modify: `app/[locale]/layout.tsx` — render banner at root
- Modify: `messages/{tr,en}.json` — add `cookie_consent.{title, body, accept, decline, manage_link}`

Banner shows on first visit only (localStorage flag). "Accept" stores consent. "Decline" stores rejection. Link to `/cerez-politikasi`. Currently the only cookies set are `NEXT_LOCALE` (functional, doesn't need consent under GDPR) and Turnstile (essential for forms). So this is informational, not blocking — banner just informs and provides a link to learn more.

### Task 7 — Performance + Lighthouse pass

**Files:**
- Modify: any pages with rendering issues identified

Run Lighthouse against production for: home, service detail, case study detail, blog post, job detail. Fix:
- Image optimization (use `next/image` for all images including in MDX content if any)
- Font loading: `next/font` already used — verify subsetting
- LCP element identified and prioritized
- Layout shift (CLS) zero

Target: All Lighthouse scores ≥ 90 on each category (Performance, Accessibility, Best Practices, SEO).

### Task 8 — Final deploy + post-launch verification

```bash
npm run lint && npm run typecheck && npm test && npm run test:e2e && npm run build
git push origin main
```

Verify:
- Sitemap reachable: `https://airomeda.com/sitemap.xml` returns valid XML with all URLs
- robots.txt: `https://airomeda.com/robots.txt`
- Schema validator: https://validator.schema.org/#url=https%3A%2F%2Fairomeda.com%2Ftr%2Fhizmetler%2Ffinans (manual)
- OG previews: Slack/Twitter validators showing correct image+title
- Submit sitemap to Google Search Console + Bing Webmaster Tools (manual)

---

## Self-review

- All search engines have crawl/index hints (sitemap, robots, canonical, hreflang)
- All page types have appropriate JSON-LD
- Social previews look professional
- Legal pages have real content (KVKK + Cookie)
- KVKK cookie consent banner present
- Performance acceptable
- Production verified
