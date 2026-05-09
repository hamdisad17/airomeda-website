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

## Spec & Plans
See `docs/superpowers/specs/` and `docs/superpowers/plans/`.
