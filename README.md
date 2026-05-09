# Airomeda Website

Bilingual (TR/EN) Next.js 16 corporate website for Airomeda.

## Stack
Next.js 16 App Router, TypeScript strict, Tailwind CSS, shadcn/ui, MDX, next-intl, Vitest, Playwright, Vercel.

## Develop

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open http://localhost:3000 (TR default) and http://localhost:3000/en.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Prettier write |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright E2E tests |

## Content

- Services: `content/services/{tr,en}/*.mdx`
- Static pages: `content/pages/{tr,en}/*.mdx`

## Status

| Plan | Status | Notes |
| --- | --- | --- |
| 1. Foundation | ✅ Done | Bilingual marketing shell, home + 7 service pages, static pages, CI workflow |
| 2. Content collections | ⏳ Next | Case studies, blog, careers (lists + details) |
| 3. Forms & integrations | ⏳ | Resend, Turnstile, Blob, contact/demo/career forms |
| 4. SEO + polish + launch | ⏳ | Sitemap, hreflang, JSON-LD, analytics, KVKK, prod deploy |

## Deployment

Plan 1 deployment to Vercel preview is pending the user installing the Vercel CLI:

```bash
npm i -g vercel
vercel login
vercel link --yes --project airomeda-website
vercel env pull .env.local
vercel
```

Once linked, every push to `feat/plan-1-foundation` produces a preview URL.

## Spec & Plans
See `docs/superpowers/specs/` and `docs/superpowers/plans/`.
