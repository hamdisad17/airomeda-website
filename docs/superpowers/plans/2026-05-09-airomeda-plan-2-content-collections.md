# Airomeda Website — Plan 2: Content Collections

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 3 content collections — case studies, blog, careers — with list/detail pages in TR & EN, and replace home page placeholders with real content.

**Architecture:** Same pattern as services in Plan 1 — MDX files under `/content/{case-studies,blog,jobs}/{tr,en}/*.mdx` validated by Zod schemas, loaded by `lib/mdx.ts`. Routes under `/[locale]/(calismalarimiz|blog|kariyer)/...`. Server components by default; pagination/filter via URL params.

**Tech Stack:** Same as Plan 1 — no new deps required.

**Spec:** `docs/superpowers/specs/2026-05-09-airomeda-corporate-website-design.md` §5.2-5.4, §6.

**Out of scope:** Application forms (Plan 3), search functionality (post-launch), admin UI (CMS migration is post-launch).

---

## URL Convention

Plan 1 dropped localized pathnames; both locales share the same URL paths, only differing by locale prefix (`/tr/...` vs `/en/...`):

| Route | TR & EN URL pattern |
| --- | --- |
| Case studies index | `/{locale}/calismalarimiz` |
| Case study detail | `/{locale}/calismalarimiz/[slug]` |
| Blog index | `/{locale}/blog` |
| Blog detail | `/{locale}/blog/[slug]` |
| Blog category | `/{locale}/blog/kategori/[slug]` |
| Careers index | `/{locale}/kariyer` |
| Career detail | `/{locale}/kariyer/[slug]` |

---

## Tasks

### Task 1: Zod schemas for case studies, blog posts, jobs

**Files:**
- Create: `lib/schemas/case-study.ts`, `lib/schemas/blog-post.ts`, `lib/schemas/job.ts`
- Create: `tests/unit/lib/schemas/case-study.test.ts` (TDD)

Define schemas matching spec §6:

- **CaseStudyFrontmatter:** `title, slug, client, industry, year, services[], hero_image, excerpt, metrics[] (each: label + value), testimonial?{quote, author, role}, gallery[]?, related_cases[]`
- **BlogPostFrontmatter:** `title, slug, excerpt, cover, author, published_at, reading_time, categories[]`
- **JobFrontmatter:** `title, slug, location, department, employment_type, posted_at, requirements[], responsibilities[], benefits[], active`

TDD pattern: write 1 test for case study schema (accepts valid, rejects missing required, rejects empty arrays), implement.

### Task 2: Loader extensions in lib/mdx.ts

**Files:**
- Modify: `lib/mdx.ts`
- Create: `tests/unit/lib/mdx-collections.test.ts` (TDD with temp dir fixtures)

Add: `loadCaseStudyContent`, `listCaseStudies`, `loadBlogPostContent`, `listBlogPosts`, `listBlogCategories`, `loadJobContent`, `listJobs`. Mirror the existing `loadServiceFrontmatter` / `listServices` pattern.

### Task 3: Case studies — components, list page, detail page

**Files:**
- Create: `components/case-study/{CaseStudyHero,MetricsBlock,CaseStudyCard,RelatedCases}.tsx`
- Create: `app/[locale]/calismalarimiz/page.tsx` (list)
- Create: `app/[locale]/calismalarimiz/[slug]/page.tsx` (detail)
- Update: `messages/{tr,en}.json` — add `case_studies.{title, subtitle, metric_results, related_label}`

List page:
- Hero with title + subtitle from messages
- Grid of case study cards (image, client, title, excerpt, services tags)
- Filter by service (chip row, optional — defer if complex)

Detail page (template per spec §5.2):
- ServiceHero-like hero with client + project name + tags (industry, year, services)
- Metrics block (3-4 large numbers)
- MDX body (challenge → solution → process → results)
- Testimonial pull-quote (if present)
- RelatedCases (2 items)
- CTABlock at bottom

### Task 4: Case studies content (3 TR + 3 EN)

**Files:** `content/case-studies/{tr,en}/*.mdx` (6 files total)

Author 3 plausible case studies: "PayGate Bankası — Core Banking Modernizasyonu", "Bahis Operatörü — RNG ve Cashier Altyapısı", "Hubert Kozmetik — Headless E-Ticaret Migrasyonu". Each with full frontmatter, 3-4 metrics, body content (challenge / approach / outcome / quote), and EN translation.

Verify: `npm run check:content` extended to also validate case-studies.

### Task 5: Replace home FeaturedCase placeholder with real data

**Files:** Modify `components/sections/FeaturedCase.tsx`

Pull the most recent case study (sorted by year desc), show large hero image + client + title + 1 highlighted metric + "Detay →" link.

### Task 6: Blog — components, list page, category page, detail page

**Files:**
- Create: `components/blog/{BlogCard,BlogList,CategoryFilter,BlogMeta}.tsx`
- Create: `app/[locale]/blog/page.tsx` (list with optional `?kategori=xx` filter)
- Create: `app/[locale]/blog/[slug]/page.tsx` (detail)
- Create: `app/[locale]/blog/kategori/[slug]/page.tsx` (category-filtered list)
- Update: `messages/{tr,en}.json` — add `blog.{title, subtitle, by_author, min_read, categories_label, all_categories, no_posts}`

List page features:
- 12 posts per page
- Category filter chips at top
- Sort by published_at desc
- Pagination via `?sayfa=N` (don't over-engineer — basic prev/next)

Detail page features (per spec §5.3):
- Cover image, title, author, date, reading time, category tags
- MDX body with full styling (h2/h3/p/lists/code/Callout/Quote)
- Social share buttons (text-only links: Twitter/X, LinkedIn, copy URL)
- Related posts (3 from same category)

### Task 7: Blog content (5 TR + 5 EN)

**Files:** `content/blog/{tr,en}/*.mdx` (10 files total)

5 plausible blog posts spanning Airomeda's expertise: 2 finance/banking, 1 iGaming, 1 e-commerce, 1 thought-leadership (technology trends). Each ~500-800 words. Categories: `finans`, `igaming`, `e-ticaret`, `teknoloji`, `süreç`.

### Task 8: Replace home BlogPreview placeholder with real data

**Files:** Modify `components/sections/BlogPreview.tsx`

Show 3 most recent blog posts as cards (cover, title, excerpt, date).

### Task 9: Careers — components, list page, detail page

**Files:**
- Create: `components/careers/{JobCard,JobList,JobMeta,TeamCultureSection}.tsx`
- Create: `app/[locale]/kariyer/page.tsx` (list grouped by department + team culture intro)
- Create: `app/[locale]/kariyer/[slug]/page.tsx` (detail with placeholder for application form)
- Update: `messages/{tr,en}.json` — add `careers.{title, subtitle, team_culture, our_values[3], benefits_title, no_open_positions, apply_cta}`

List page features:
- Team culture / values intro section (3 value cards)
- Active jobs grouped by `department`, sorted by `posted_at` desc
- Each job card: title, department, location, employment_type, "Detay →"

Detail page features (per spec §5.4):
- Hero: title, location, department, employment_type, posted_at
- MDX body: about the role
- Sections: Sorumluluklar, Aranan nitelikler, Sunulanlar (from frontmatter arrays)
- Application form placeholder block — `<div>` with text "Başvuru formu Plan 3'te eklenecek." for now
- Inactive jobs (`active: false`) return 404

### Task 10: Careers content (3 TR + 3 EN)

**Files:** `content/jobs/{tr,en}/*.mdx` (6 files total)

3 plausible roles: "Senior Backend Engineer (Java/Kotlin)", "Senior Frontend Engineer (React/Next.js)", "Product Designer". Each with 5-7 responsibilities, 5-8 requirements, 5-7 benefits. EN translations.

### Task 11: E2E tests + content checker extension

**Files:**
- Create: `tests/e2e/case-studies.spec.ts`, `tests/e2e/blog.spec.ts`, `tests/e2e/careers.spec.ts`
- Modify: `scripts/check-content.ts` — also list case-studies, blog, jobs

Each spec: list page renders with N items, sample detail page returns 200 with H1 visible, unknown slug 404s. ~3 tests per file.

### Task 12: Run full check + push to deploy

```
npm run lint && npm run typecheck && npm test && npm run test:e2e && npm run build
git push origin main   # auto-deploys via GitHub Actions
```

Verify production:
- https://airomeda.com/tr/calismalarimiz
- https://airomeda.com/tr/blog
- https://airomeda.com/tr/kariyer

---

## Self-Review

**Spec coverage:** §5.2, §5.3, §5.4, §6 collections fully covered. Application forms remain in Plan 3.

**Placeholders:** None remaining at end of Plan 2 (FeaturedCase + BlogPreview both replaced with real data).

**Type consistency:** All collection schemas inferred via `z.infer<typeof Schema>`. Loaders return `null` on missing.
