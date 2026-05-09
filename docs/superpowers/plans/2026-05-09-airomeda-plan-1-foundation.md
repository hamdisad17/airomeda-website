# Airomeda Website — Plan 1: Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the foundation of the Airomeda corporate website — bilingual (TR/EN) Next.js 16 app with design system, MDX infrastructure, layout, home page, 7 service detail pages, and core static pages, deployed to Vercel.

**Architecture:** Single Next.js 16 App Router project. Locales TR (default) and EN routed via `app/[locale]/...` with next-intl. Content lives as MDX files under `/content/...` (per locale) and is parsed at build via gray-matter + remark; frontmatter validated by Zod. Tailwind + shadcn/ui for design system. Vercel for hosting (Fluid Compute defaults).

**Tech Stack:** Next.js 16, TypeScript strict, Turbopack, Tailwind CSS, shadcn/ui (Radix UI), next-intl, MDX (`@next/mdx` + `gray-matter` + `remark-gfm`), Zod, Vitest, Playwright, Vercel.

**Spec:** `docs/superpowers/specs/2026-05-09-airomeda-corporate-website-design.md`

**Out of scope (deferred to later plans):** case studies, blog, careers, all forms, Resend/Turnstile/Blob, sitemap/JSON-LD, OG image generation, KVKK content drafting, Sentry, visual style iteration.

---

## File Structure

### Created in this plan

```
package.json, tsconfig.json, next.config.ts, postcss.config.mjs,
tailwind.config.ts, eslint.config.mjs, .prettierrc, .gitignore,
vercel.ts, vitest.config.ts, playwright.config.ts, .env.local.example, README.md

middleware.ts                                     # locale routing
app/
  layout.tsx                                      # html/body root
  globals.css                                     # tailwind + tokens
  [locale]/
    layout.tsx                                    # locale provider, header/footer
    page.tsx                                      # home
    hizmetler/page.tsx                            # services overview
    hizmetler/[slug]/page.tsx                     # service detail
    hakkimizda/page.tsx                           # about
    iletisim/page.tsx                             # contact (display only)
    kvkk/page.tsx                                 # privacy placeholder
    cerez-politikasi/page.tsx                     # cookies placeholder

i18n/
  routing.ts                                      # locale list + path mapping
  request.ts                                      # next-intl message loader

messages/
  tr.json, en.json                                # UI strings

lib/
  mdx.ts                                          # content loader
  utils.ts                                        # cn() helper
  i18n/slug-map.ts                                # service/page slug TR↔EN
  schemas/
    service.ts                                    # Zod schema for service frontmatter
    page.ts                                       # Zod schema for static pages

components/
  layout/
    Header.tsx, Footer.tsx, MegaMenu.tsx,
    LangSwitcher.tsx, Logo.tsx, Container.tsx
  sections/
    Hero.tsx, ServicesGrid.tsx, IndustryStrip.tsx,
    ProcessSteps.tsx, Testimonials.tsx, FeaturedCase.tsx,
    BlogPreview.tsx, CTABlock.tsx, FAQ.tsx
  service/
    ServiceHero.tsx, ServiceProblemSolution.tsx,
    ServiceCapabilities.tsx, ServiceTechStrip.tsx
  mdx/
    MDXContent.tsx, Callout.tsx, Quote.tsx
  ui/                                             # shadcn primitives (button, accordion, sheet, etc.)

content/
  services/tr/{finans,sans-oyunlari,e-ticaret,entegrasyon,seo-reklam,sosyal-medya,crm}.mdx
  services/en/{finance,gaming,ecommerce,integration,seo-ads,social-media,crm}.mdx
  pages/tr/{hakkimizda,iletisim,kvkk,cerez-politikasi}.mdx
  pages/en/{about,contact,privacy,cookies}.mdx

tests/
  unit/lib/mdx.test.ts
  unit/lib/schemas/service.test.ts
  unit/lib/i18n/slug-map.test.ts
  e2e/locale-routing.spec.ts
  e2e/home.spec.ts
  e2e/service-page.spec.ts
```

---

## Milestone 1 — Project Bootstrap (Tasks 1–5)

### Task 1: Initialize Next.js 16 project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/globals.css`, `app/page.tsx` (temporary)

- [ ] **Step 1: Run create-next-app non-interactively**

```bash
npx --yes create-next-app@latest . \
  --typescript --eslint --tailwind --app \
  --src-dir=false --turbopack --import-alias "@/*" \
  --use-npm --no-git --skip-install
```

If the command refuses because the directory is non-empty, pass `--reset` (newer scaffolders) or temporarily move `docs/`, `.gitignore`, `.git/` aside, run the scaffolder, then restore them. Verify the scaffolder created `package.json`, `app/layout.tsx`, `app/page.tsx`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `app/globals.css`.

- [ ] **Step 2: Pin Next.js 16 and install**

Edit `package.json` so `"next": "^16.0.0"`, `"react": "^19"`, `"react-dom": "^19"`. Then:

```bash
npm install
```

Expected: install completes; `node_modules/next/package.json` shows `"version": "16.x.x"`.

- [ ] **Step 3: Tighten tsconfig**

Replace the `compilerOptions` in `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Sanity check the dev server boots**

```bash
npm run dev -- --port 3000 &
sleep 6
curl -sf -o /dev/null -w "%{http_code}\n" http://localhost:3000
kill %1 2>/dev/null || true
```

Expected: prints `200`. Kill the dev server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: bootstrap Next.js 16 app with strict TypeScript"
```

---

### Task 2: Add ESLint + Prettier baseline

**Files:**
- Create/Modify: `eslint.config.mjs`, `.prettierrc`, `.prettierignore`, `package.json` (scripts)

- [ ] **Step 1: Install Prettier and Tailwind plugin**

```bash
npm install --save-dev prettier prettier-plugin-tailwindcss eslint-config-prettier
```

- [ ] **Step 2: Write Prettier config**

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Create `.prettierignore`:

```
.next
node_modules
.vercel
public
content
messages
*.lock
```

- [ ] **Step 3: Extend ESLint with prettier compat**

Open `eslint.config.mjs` (created by create-next-app). After the existing `next` config entries, append `import("eslint-config-prettier")` so Prettier's rules win. Final file:

```js
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];

export default eslintConfig;
```

- [ ] **Step 4: Add scripts**

In `package.json`, set the `scripts` block to include:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit"
  }
}
```

- [ ] **Step 5: Verify lint + typecheck pass**

```bash
npm run lint
npm run typecheck
npm run format
```

Expected: no errors, all pass.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: add eslint + prettier baseline and scripts"
```

---

### Task 3: Add testing infrastructure (Vitest + Playwright)

**Files:**
- Create: `vitest.config.ts`, `playwright.config.ts`, `tests/.gitkeep`, `tests/setup.ts`
- Modify: `package.json`, `.gitignore`

- [ ] **Step 1: Install test dependencies**

```bash
npm install --save-dev vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @vitejs/plugin-react @playwright/test
npx playwright install --with-deps chromium
```

- [ ] **Step 2: Create Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.{test,spec}.{ts,tsx}'],
    globals: true,
    css: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
});
```

- [ ] **Step 3: Create test setup**

Create `tests/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 4: Create Playwright config**

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev -- --port 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
    timeout: 120_000,
  },
});
```

- [ ] **Step 5: Add test scripts**

In `package.json` `scripts`, add:

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test"
}
```

- [ ] **Step 6: Add Playwright artifacts to gitignore**

Append to `.gitignore`:

```
playwright-report/
test-results/
```

- [ ] **Step 7: Sanity test**

Create `tests/unit/sanity.test.ts`:

```ts
import { describe, it, expect } from 'vitest';

describe('sanity', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run:

```bash
npm test
```

Expected: 1 passed.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "test: add vitest + playwright infrastructure with sanity test"
```

---

### Task 4: Add Vercel TypeScript config

**Files:**
- Create: `vercel.ts`, `.env.local.example`

- [ ] **Step 1: Install @vercel/config**

```bash
npm install --save-dev @vercel/config
```

- [ ] **Step 2: Create vercel.ts**

Create `vercel.ts`:

```ts
import { type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  framework: 'nextjs',
  buildCommand: 'npm run build',
  installCommand: 'npm install',
  redirects: [],
  rewrites: [],
  headers: [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      ],
    },
  ],
};
```

- [ ] **Step 3: Create env example**

Create `.env.local.example`:

```
# === Plan 1 ===
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# === Plan 3 (placeholder, not used yet) ===
# RESEND_API_KEY=
# RESEND_FROM=Airomeda <noreply@airomeda.com>
# CONTACT_TO=sales@airomeda.com
# CAREERS_TO=careers@airomeda.com
# TURNSTILE_SECRET_KEY=
# NEXT_PUBLIC_TURNSTILE_SITE_KEY=
# BLOB_READ_WRITE_TOKEN=
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: add vercel.ts config and env example"
```

---

### Task 5: Update root README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write project README**

Create `README.md`:

````markdown
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
````

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add project README"
```

---

## Milestone 2 — Design System Tokens (Tasks 6–9)

### Task 6: Define color and typography tokens in Tailwind

**Files:**
- Modify: `tailwind.config.ts`, `app/globals.css`

- [ ] **Step 1: Install Inter font helper deps**

```bash
npm install @next/font
```

(Note: in Next.js 16+ this is `next/font` built-in — no package install actually needed. Skip if `next/font/google` resolves directly.)

- [ ] **Step 2: Replace tailwind.config.ts**

Overwrite `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', md: '2rem', lg: '3rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        border: 'hsl(var(--border) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-2': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        lg: '0.75rem',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Replace app/globals.css**

Overwrite `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Defaults: dark corporate. Foreground/background are HSL triplets. */
    --background: 215 50% 7%;        /* deep navy/graphite */
    --foreground: 0 0% 98%;
    --muted: 215 20% 16%;
    --muted-foreground: 215 15% 70%;
    --accent: 24 95% 53%;            /* orange #f97316 */
    --accent-foreground: 0 0% 100%;
    --border: 215 20% 18%;
    --ring: 24 95% 53%;
  }

  html {
    color-scheme: dark;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: 'cv11', 'ss01';
  }

  ::selection {
    background: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }
}
```

- [ ] **Step 4: Wire Inter in root layout**

Replace `app/layout.tsx`:

```tsx
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a1628',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Airomeda', template: '%s · Airomeda' },
  description: 'Airomeda — Bilişim teknolojileri çözümleri.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Verify dev server still boots and styles apply**

Replace `app/page.tsx` temporarily with:

```tsx
export default function Page() {
  return (
    <main className="container py-24">
      <h1 className="font-sans text-display-1 font-bold">Airomeda</h1>
      <p className="mt-4 text-muted-foreground">Tokens canlı.</p>
      <button className="mt-6 rounded-lg bg-accent px-5 py-3 text-accent-foreground">
        CTA preview
      </button>
    </main>
  );
}
```

```bash
npm run dev -- --port 3000 &
sleep 6
curl -sf http://localhost:3000 | grep -q "Tokens canlı" && echo OK
kill %1 2>/dev/null || true
```

Expected: prints `OK`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: define design tokens (colors, typography) in tailwind"
```

---

### Task 7: Add cn() utility and Container component

**Files:**
- Create: `lib/utils.ts`, `components/layout/Container.tsx`

- [ ] **Step 1: Install dependencies**

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 2: Write cn helper**

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: Write Container**

Create `components/layout/Container.tsx`:

```tsx
import { cn } from '@/lib/utils';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'header' | 'footer' | 'main';
};

export function Container({ as: As = 'div', className, ...rest }: Props) {
  return <As className={cn('container', className)} {...rest} />;
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add cn() util and Container component"
```

---

### Task 8: Initialize shadcn/ui and install primitives

**Files:**
- Modify: `components.json` (created by shadcn)
- Create: `components/ui/button.tsx`, `components/ui/accordion.tsx`, `components/ui/sheet.tsx`, `components/ui/navigation-menu.tsx`

- [ ] **Step 1: Init shadcn**

```bash
npx --yes shadcn@latest init -d -y
```

If prompted interactively, accept defaults: TypeScript, RSC=yes, style=default, base=neutral, css var=yes, alias `@/components`, alias `@/lib/utils`. The `-d -y` flags should make this non-interactive; if your shadcn version errors, run `npx shadcn@latest init` and answer those prompts.

- [ ] **Step 2: Add primitives needed across the site**

```bash
npx --yes shadcn@latest add button accordion sheet navigation-menu separator badge card
```

- [ ] **Step 3: Verify primitives compile**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: initialize shadcn/ui with core primitives"
```

---

### Task 9: Define brand Logo component

**Files:**
- Create: `components/layout/Logo.tsx`

- [ ] **Step 1: Write Logo component**

Create `components/layout/Logo.tsx`:

```tsx
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  className?: string;
  variant?: 'wordmark' | 'monogram';
};

export function Logo({ href, className, variant = 'wordmark' }: Props) {
  return (
    <Link
      href={href}
      aria-label="Airomeda"
      className={cn('group inline-flex items-center gap-2 font-bold tracking-tight', className)}
    >
      <span
        aria-hidden
        className="grid h-7 w-7 place-items-center rounded-md bg-accent text-accent-foreground"
      >
        <span className="text-sm">A</span>
      </span>
      {variant === 'wordmark' && (
        <span className="text-lg leading-none">
          airomeda<span className="text-accent">.</span>
        </span>
      )}
    </Link>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Logo.tsx
git commit -m "feat: add Logo component"
```

---

## Milestone 3 — i18n Foundation (Tasks 10–14)

### Task 10: Install and configure next-intl

**Files:**
- Create: `i18n/routing.ts`, `i18n/request.ts`, `messages/tr.json`, `messages/en.json`
- Modify: `next.config.ts`

- [ ] **Step 1: Install next-intl**

```bash
npm install next-intl
```

- [ ] **Step 2: Define routing**

Create `i18n/routing.ts`:

```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: { mode: 'as-needed' },
  pathnames: {
    '/': '/',
    '/hizmetler': { tr: '/hizmetler', en: '/services' },
    '/hizmetler/[slug]': { tr: '/hizmetler/[slug]', en: '/services/[slug]' },
    '/calismalarimiz': { tr: '/calismalarimiz', en: '/work' },
    '/calismalarimiz/[slug]': { tr: '/calismalarimiz/[slug]', en: '/work/[slug]' },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/kariyer': { tr: '/kariyer', en: '/careers' },
    '/kariyer/[slug]': { tr: '/kariyer/[slug]', en: '/careers/[slug]' },
    '/hakkimizda': { tr: '/hakkimizda', en: '/about' },
    '/iletisim': { tr: '/iletisim', en: '/contact' },
    '/kvkk': { tr: '/kvkk', en: '/privacy' },
    '/cerez-politikasi': { tr: '/cerez-politikasi', en: '/cookies' },
  },
});

export type Locale = (typeof routing.locales)[number];
```

- [ ] **Step 3: Define message loader**

Create `i18n/request.ts`:

```ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 4: Wire next.config.ts**

Replace `next.config.ts`:

```ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    typedRoutes: false,
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**.airomeda.com' }],
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Initial messages**

Create `messages/tr.json`:

```json
{
  "common": {
    "primary_cta": "Demo Talep Et",
    "secondary_cta": "Çalışmalarımız",
    "read_more": "Daha fazla",
    "all_services": "Tüm hizmetler"
  },
  "nav": {
    "services": "Hizmetler",
    "work": "Çalışmalarımız",
    "blog": "Blog",
    "about": "Hakkımızda",
    "careers": "Kariyer",
    "contact": "İletişim"
  },
  "footer": {
    "tagline": "Bilişim teknolojileri ortağınız.",
    "company": "Şirket",
    "services": "Hizmetler",
    "legal": "Yasal",
    "kvkk": "KVKK",
    "cookies": "Çerez Politikası",
    "rights": "Tüm hakları saklıdır."
  },
  "home": {
    "hero": {
      "title": "Karmaşık olanı, basit kıl.",
      "subtitle": "Finans, iGaming, e-ticaret ve daha fazlası için uçtan uca yazılım."
    },
    "services_section": { "title": "Hizmetlerimiz", "subtitle": "Yedi disiplin, tek standart." },
    "industries": { "title": "Çalıştığımız sektörler" },
    "process": {
      "title": "Nasıl çalışırız",
      "steps": {
        "discovery": { "title": "Keşif", "description": "İhtiyacı ve bağlamı netleştiririz." },
        "design": { "title": "Tasarım", "description": "Çözümü mimarisinden arayüzüne kurarız." },
        "build": { "title": "Geliştirme", "description": "Hızla ve test ederek inşa ederiz." },
        "support": { "title": "Destek", "description": "Yayın sonrasında yanınızda kalırız." }
      }
    },
    "cta": { "title": "Projenizi konuşalım.", "subtitle": "24 saat içinde dönüş yaparız." }
  }
}
```

Create `messages/en.json`:

```json
{
  "common": {
    "primary_cta": "Request Demo",
    "secondary_cta": "Our Work",
    "read_more": "Read more",
    "all_services": "All services"
  },
  "nav": {
    "services": "Services",
    "work": "Work",
    "blog": "Blog",
    "about": "About",
    "careers": "Careers",
    "contact": "Contact"
  },
  "footer": {
    "tagline": "Your software partner.",
    "company": "Company",
    "services": "Services",
    "legal": "Legal",
    "kvkk": "Privacy",
    "cookies": "Cookies",
    "rights": "All rights reserved."
  },
  "home": {
    "hero": {
      "title": "Make the complex, simple.",
      "subtitle": "End-to-end software for finance, iGaming, commerce and beyond."
    },
    "services_section": { "title": "Our services", "subtitle": "Seven disciplines, one standard." },
    "industries": { "title": "Industries we serve" },
    "process": {
      "title": "How we work",
      "steps": {
        "discovery": { "title": "Discovery", "description": "We clarify the need and context." },
        "design": { "title": "Design", "description": "We shape the solution end to end." },
        "build": { "title": "Build", "description": "We ship fast, with tests." },
        "support": { "title": "Support", "description": "We stay with you after launch." }
      }
    },
    "cta": { "title": "Let's talk about your project.", "subtitle": "We respond within 24 hours." }
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: configure next-intl with TR/EN routing and base messages"
```

---

### Task 11: Add locale middleware

**Files:**
- Create: `middleware.ts`

- [ ] **Step 1: Write middleware**

Create `middleware.ts`:

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

- [ ] **Step 2: Verify build still works**

```bash
npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add middleware.ts
git commit -m "feat: add locale-aware middleware"
```

---

### Task 12: Create app/[locale] layout shell

**Files:**
- Create: `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`
- Delete: `app/page.tsx`

- [ ] **Step 1: Delete the temporary root page**

```bash
rm app/page.tsx
```

- [ ] **Step 2: Write the locale layout**

Create `app/[locale]/layout.tsx`:

```tsx
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);

  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
```

- [ ] **Step 3: Update root layout to set HTML lang dynamically**

Replace `app/layout.tsx`:

```tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a1628',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Airomeda', template: '%s · Airomeda' },
  description: 'Airomeda — Bilişim teknolojileri çözümleri.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const localeHeader = h.get('x-next-intl-locale');
  const locale =
    localeHeader && (routing.locales as readonly string[]).includes(localeHeader)
      ? localeHeader
      : routing.defaultLocale;

  return (
    <html lang={locale} className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Add a placeholder home**

Create `app/[locale]/page.tsx`:

```tsx
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home.hero');

  return (
    <main className="container py-24">
      <h1 className="text-display-1 font-bold">{t('title')}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t('subtitle')}</p>
    </main>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add app/[locale] layout shell with locale-aware HTML lang"
```

---

### Task 13: Write E2E test for locale routing

**Files:**
- Create: `tests/e2e/locale-routing.spec.ts`

- [ ] **Step 1: Write test**

Create `tests/e2e/locale-routing.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test('TR is default locale at /', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Karmaşık');
});

test('EN locale at /en', async ({ page }) => {
  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('complex');
});

test('Unknown locale 404s', async ({ page }) => {
  const response = await page.goto('/de', { waitUntil: 'commit' });
  expect(response?.status()).toBe(404);
});
```

- [ ] **Step 2: Run E2E**

```bash
npm run test:e2e
```

Expected: 3 passed.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "test: e2e for locale routing"
```

---

### Task 14: Slug map utility for service URLs

**Files:**
- Create: `lib/i18n/slug-map.ts`, `tests/unit/lib/i18n/slug-map.test.ts`

- [ ] **Step 1: Write the failing test first**

Create `tests/unit/lib/i18n/slug-map.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { getServiceSlugInLocale, SERVICE_SLUGS } from '@/lib/i18n/slug-map';

describe('slug-map', () => {
  it('exports the 7 service entries', () => {
    expect(SERVICE_SLUGS).toHaveLength(7);
  });

  it('maps tr→en finans', () => {
    expect(getServiceSlugInLocale('finans', 'tr', 'en')).toBe('finance');
  });

  it('maps en→tr finance', () => {
    expect(getServiceSlugInLocale('finance', 'en', 'tr')).toBe('finans');
  });

  it('returns undefined when slug not found', () => {
    expect(getServiceSlugInLocale('unknown', 'tr', 'en')).toBeUndefined();
  });

  it('returns same slug if same locale', () => {
    expect(getServiceSlugInLocale('finans', 'tr', 'tr')).toBe('finans');
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npm test
```

Expected: errors that `@/lib/i18n/slug-map` cannot be resolved.

- [ ] **Step 3: Implement**

Create `lib/i18n/slug-map.ts`:

```ts
import type { Locale } from '@/i18n/routing';

export type ServiceKey =
  | 'finance'
  | 'gaming'
  | 'ecommerce'
  | 'integration'
  | 'seo-ads'
  | 'social-media'
  | 'crm';

type ServiceEntry = {
  key: ServiceKey;
  slugs: Record<Locale, string>;
};

export const SERVICE_SLUGS: readonly ServiceEntry[] = [
  { key: 'finance', slugs: { tr: 'finans', en: 'finance' } },
  { key: 'gaming', slugs: { tr: 'sans-oyunlari', en: 'gaming' } },
  { key: 'ecommerce', slugs: { tr: 'e-ticaret', en: 'ecommerce' } },
  { key: 'integration', slugs: { tr: 'entegrasyon', en: 'integration' } },
  { key: 'seo-ads', slugs: { tr: 'seo-reklam', en: 'seo-ads' } },
  { key: 'social-media', slugs: { tr: 'sosyal-medya', en: 'social-media' } },
  { key: 'crm', slugs: { tr: 'crm', en: 'crm' } },
] as const;

export function getServiceSlugInLocale(
  slug: string,
  fromLocale: Locale,
  toLocale: Locale,
): string | undefined {
  const entry = SERVICE_SLUGS.find((e) => e.slugs[fromLocale] === slug);
  return entry?.slugs[toLocale];
}

export function getServiceByKey(key: ServiceKey, locale: Locale): string {
  const entry = SERVICE_SLUGS.find((e) => e.key === key);
  if (!entry) throw new Error(`Unknown service key: ${key}`);
  return entry.slugs[locale];
}

export function listServiceSlugs(locale: Locale): string[] {
  return SERVICE_SLUGS.map((e) => e.slugs[locale]);
}
```

- [ ] **Step 4: Run — expect pass**

```bash
npm test
```

Expected: 5 passed (in slug-map suite).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add service slug map between TR and EN"
```

---

## Milestone 4 — Layout Components (Tasks 15–18)

### Task 15: LangSwitcher component

**Files:**
- Create: `components/layout/LangSwitcher.tsx`

- [ ] **Step 1: Implement**

Create `components/layout/LangSwitcher.tsx`:

```tsx
'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const LABELS: Record<string, string> = { tr: 'TR', en: 'EN' };

export function LangSwitcher({ className }: { className?: string }) {
  const current = useLocale();
  const pathname = usePathname();

  return (
    <div className={cn('flex items-center gap-1 text-xs font-medium', className)}>
      {(['tr', 'en'] as const).map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          aria-current={current === loc ? 'page' : undefined}
          className={cn(
            'rounded px-2 py-1 transition-colors',
            current === loc ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {LABELS[loc]}
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create i18n navigation helpers**

Create `i18n/navigation.ts`:

```ts
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

- [ ] **Step 3: Typecheck**

```bash
npm run typecheck
```

Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add LangSwitcher and typed i18n navigation helpers"
```

---

### Task 16: Header with primary nav

**Files:**
- Create: `components/layout/Header.tsx`

- [ ] **Step 1: Implement**

Create `components/layout/Header.tsx`:

```tsx
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Logo } from './Logo';
import { LangSwitcher } from './LangSwitcher';
import { Container } from './Container';

export async function Header() {
  const t = await getTranslations('nav');
  const items = [
    { href: '/hizmetler' as const, label: t('services') },
    { href: '/calismalarimiz' as const, label: t('work') },
    { href: '/blog' as const, label: t('blog') },
    { href: '/hakkimizda' as const, label: t('about') },
    { href: '/kariyer' as const, label: t('careers') },
    { href: '/iletisim' as const, label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container as="div" className="flex h-16 items-center justify-between">
        <Logo href="/" />
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitcher />
        </div>
      </Container>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Header.tsx
git commit -m "feat: add desktop Header with primary nav and LangSwitcher"
```

---

### Task 17: Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Implement**

Create `components/layout/Footer.tsx`:

```tsx
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from './Container';
import { Logo } from './Logo';

export async function Footer() {
  const t = await getTranslations('footer');
  const tnav = await getTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-background">
      <Container as="div" className="py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo href="/" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t('tagline')}</p>
          </div>
          <FooterColumn title={t('company')}>
            <FooterLink href="/hakkimizda">{tnav('about')}</FooterLink>
            <FooterLink href="/kariyer">{tnav('careers')}</FooterLink>
            <FooterLink href="/iletisim">{tnav('contact')}</FooterLink>
            <FooterLink href="/blog">{tnav('blog')}</FooterLink>
          </FooterColumn>
          <FooterColumn title={t('services')}>
            <FooterLink href="/hizmetler">{tnav('services')}</FooterLink>
          </FooterColumn>
          <FooterColumn title={t('legal')}>
            <FooterLink href="/kvkk">{t('kvkk')}</FooterLink>
            <FooterLink href="/cerez-politikasi">{t('cookies')}</FooterLink>
          </FooterColumn>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {year} Airomeda. {t('rights')}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href as never}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Footer with company/services/legal columns"
```

---

### Task 18: Wire Header + Footer into [locale]/layout

**Files:**
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Update layout**

Replace `app/[locale]/layout.tsx`:

```tsx
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing, type Locale } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as Locale);

  return (
    <NextIntlClientProvider>
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
```

- [ ] **Step 2: Verify dev server boots, header renders**

```bash
npm run dev -- --port 3000 &
sleep 6
curl -sf http://localhost:3000 | grep -q "airomeda" && echo OK
kill %1 2>/dev/null || true
```

Expected: prints `OK`.

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/layout.tsx
git commit -m "feat: render Header and Footer in locale layout"
```

---

## Milestone 5 — MDX Content Infrastructure (Tasks 19–24)

### Task 19: Install MDX dependencies

**Files:**
- Modify: `package.json`, `next.config.ts`

- [ ] **Step 1: Install**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter remark-gfm rehype-slug zod
```

- [ ] **Step 2: Wire MDX in next.config.ts**

Replace `next.config.ts`:

```ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: { typedRoutes: false },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**.airomeda.com' }],
  },
};

export default withNextIntl(withMDX(nextConfig));
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: install MDX, gray-matter, remark/rehype plugins, zod"
```

---

### Task 20: Zod schemas for content frontmatter

**Files:**
- Create: `lib/schemas/service.ts`, `lib/schemas/page.ts`, `tests/unit/lib/schemas/service.test.ts`

- [ ] **Step 1: Write the failing schema test**

Create `tests/unit/lib/schemas/service.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { ServiceFrontmatterSchema } from '@/lib/schemas/service';

const valid = {
  title: 'Finans Yazılımları',
  slug: 'finans',
  excerpt: 'Bankacılık ve finans için özel çözümler.',
  hero_subtitle: 'Düzenlenmiş alanlar için güvenli yazılım.',
  capabilities: [
    { title: 'Core Banking', description: 'Hesap, işlem, mutabakat.' },
    { title: 'Ödeme Sistemleri', description: 'PSP entegrasyonları.' },
  ],
  tech_stack: ['PostgreSQL', 'Kafka', 'Node.js'],
  faq: [{ question: 'Ne kadar sürer?', answer: 'Kapsama göre 6-12 hafta.' }],
  cta_text: 'Demo Talep Et',
};

describe('ServiceFrontmatterSchema', () => {
  it('accepts valid frontmatter', () => {
    const result = ServiceFrontmatterSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('rejects missing title', () => {
    const { title: _t, ...rest } = valid;
    const result = ServiceFrontmatterSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('rejects empty capabilities', () => {
    const result = ServiceFrontmatterSchema.safeParse({ ...valid, capabilities: [] });
    expect(result.success).toBe(false);
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npm test
```

Expected: cannot resolve `@/lib/schemas/service`.

- [ ] **Step 3: Implement service schema**

Create `lib/schemas/service.ts`:

```ts
import { z } from 'zod';

export const CapabilitySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const FaqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const ServiceFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  hero_subtitle: z.string().min(1),
  capabilities: z.array(CapabilitySchema).min(1),
  tech_stack: z.array(z.string().min(1)).min(1),
  faq: z.array(FaqItemSchema).default([]),
  cta_text: z.string().min(1),
  related_cases: z.array(z.string()).default([]),
});

export type ServiceFrontmatter = z.infer<typeof ServiceFrontmatterSchema>;
```

- [ ] **Step 4: Implement page schema**

Create `lib/schemas/page.ts`:

```ts
import { z } from 'zod';

export const PageFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
});

export type PageFrontmatter = z.infer<typeof PageFrontmatterSchema>;
```

- [ ] **Step 5: Run — expect pass**

```bash
npm test
```

Expected: 3 passed (in service schema suite).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Zod schemas for service + page frontmatter"
```

---

### Task 21: Content loader

**Files:**
- Create: `lib/mdx.ts`, `tests/unit/lib/mdx.test.ts`, `content/services/tr/.gitkeep`

- [ ] **Step 1: Write the failing test**

Create `tests/unit/lib/mdx.test.ts`:

```ts
import { describe, expect, it, beforeAll } from 'vitest';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { loadServiceFrontmatter, listServices } from '@/lib/mdx';

const FIXTURE_DIR = path.join(process.cwd(), 'content/services/tr');

beforeAll(async () => {
  await fs.mkdir(FIXTURE_DIR, { recursive: true });
  await fs.writeFile(
    path.join(FIXTURE_DIR, '__test-finans.mdx'),
    `---
title: Finans Yazılımları
slug: __test-finans
excerpt: Test
hero_subtitle: Test
capabilities:
  - { title: A, description: B }
tech_stack: [Node.js]
cta_text: CTA
---

# Body
`,
    'utf-8',
  );
});

describe('mdx loader', () => {
  it('loads frontmatter for a single service', async () => {
    const fm = await loadServiceFrontmatter('__test-finans', 'tr');
    expect(fm.title).toBe('Finans Yazılımları');
  });

  it('returns null for missing service', async () => {
    const fm = await loadServiceFrontmatter('does-not-exist', 'tr');
    expect(fm).toBeNull();
  });

  it('lists services for a locale', async () => {
    const list = await listServices('tr');
    expect(list.some((s) => s.slug === '__test-finans')).toBe(true);
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npm test
```

Expected: cannot resolve `@/lib/mdx`.

- [ ] **Step 3: Implement loader**

Create `lib/mdx.ts`:

```ts
import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
  ServiceFrontmatterSchema,
  type ServiceFrontmatter,
} from '@/lib/schemas/service';
import {
  PageFrontmatterSchema,
  type PageFrontmatter,
} from '@/lib/schemas/page';
import type { Locale } from '@/i18n/routing';

const ROOT = path.join(process.cwd(), 'content');

async function readMdxFile(filePath: string): Promise<{ data: unknown; content: string } | null> {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return matter(raw);
  } catch {
    return null;
  }
}

export async function loadServiceFrontmatter(
  slug: string,
  locale: Locale,
): Promise<ServiceFrontmatter | null> {
  const file = path.join(ROOT, 'services', locale, `${slug}.mdx`);
  const parsed = await readMdxFile(file);
  if (!parsed) return null;
  const result = ServiceFrontmatterSchema.safeParse(parsed.data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${file}: ${result.error.message}`);
  }
  return result.data;
}

export async function loadServiceContent(
  slug: string,
  locale: Locale,
): Promise<{ frontmatter: ServiceFrontmatter; body: string } | null> {
  const file = path.join(ROOT, 'services', locale, `${slug}.mdx`);
  const parsed = await readMdxFile(file);
  if (!parsed) return null;
  const result = ServiceFrontmatterSchema.safeParse(parsed.data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${file}: ${result.error.message}`);
  }
  return { frontmatter: result.data, body: parsed.content };
}

export async function listServices(locale: Locale): Promise<ServiceFrontmatter[]> {
  const dir = path.join(ROOT, 'services', locale);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  const slugs = entries
    .filter((e) => e.endsWith('.mdx') && !e.startsWith('_'))
    .map((e) => e.replace(/\.mdx$/, ''));
  const all = await Promise.all(slugs.map((s) => loadServiceFrontmatter(s, locale)));
  return all.filter((x): x is ServiceFrontmatter => x !== null);
}

export async function loadPageContent(
  slug: string,
  locale: Locale,
): Promise<{ frontmatter: PageFrontmatter; body: string } | null> {
  const file = path.join(ROOT, 'pages', locale, `${slug}.mdx`);
  const parsed = await readMdxFile(file);
  if (!parsed) return null;
  const result = PageFrontmatterSchema.safeParse(parsed.data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${file}: ${result.error.message}`);
  }
  return { frontmatter: result.data, body: parsed.content };
}
```

- [ ] **Step 4: Run — expect pass**

```bash
npm test
```

Expected: 3 passed (in mdx suite).

- [ ] **Step 5: Clean up the test fixture**

```bash
rm -f content/services/tr/__test-finans.mdx
```

Modify `tests/unit/lib/mdx.test.ts` to use a temp dir instead so it doesn't write into the real content dir. Replace the test file's `beforeAll` block to write into `os.tmpdir()` and update `loadServiceFrontmatter` to accept an optional `rootOverride` parameter:

In `lib/mdx.ts`, add an internal `setContentRoot` for tests:

```ts
let CONTENT_ROOT = path.join(process.cwd(), 'content');
export function __setContentRootForTests(root: string) {
  CONTENT_ROOT = root;
}
```

Then replace every `ROOT` reference with `CONTENT_ROOT`. Re-run tests.

- [ ] **Step 6: Final test re-run**

```bash
npm test
```

Expected: all pass; no leftover fixture files in `content/`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add MDX content loader with frontmatter validation"
```

---

### Task 22: MDX components for content rendering

**Files:**
- Create: `components/mdx/MDXContent.tsx`, `components/mdx/Callout.tsx`, `components/mdx/Quote.tsx`

- [ ] **Step 1: Implement Callout**

Create `components/mdx/Callout.tsx`:

```tsx
import { cn } from '@/lib/utils';

type Props = {
  variant?: 'info' | 'warn';
  title?: string;
  children: React.ReactNode;
};

export function Callout({ variant = 'info', title, children }: Props) {
  return (
    <div
      className={cn(
        'my-6 rounded-lg border p-4',
        variant === 'info' && 'border-accent/30 bg-accent/10',
        variant === 'warn' && 'border-yellow-500/30 bg-yellow-500/10',
      )}
    >
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
```

- [ ] **Step 2: Implement Quote**

Create `components/mdx/Quote.tsx`:

```tsx
type Props = { author?: string; role?: string; children: React.ReactNode };

export function Quote({ author, role, children }: Props) {
  return (
    <figure className="my-8 rounded-lg border border-border bg-muted/30 p-6">
      <blockquote className="text-lg italic text-foreground">{children}</blockquote>
      {(author || role) && (
        <figcaption className="mt-4 text-sm text-muted-foreground">
          — {author}
          {role && <span>, {role}</span>}
        </figcaption>
      )}
    </figure>
  );
}
```

- [ ] **Step 3: Implement MDXContent renderer**

Create `components/mdx/MDXContent.tsx`:

```tsx
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Callout } from './Callout';
import { Quote } from './Quote';

const components = {
  Callout,
  Quote,
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="mt-12 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="mt-8 text-xl font-semibold tracking-tight" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="mt-4 leading-7 text-muted-foreground" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a className="text-accent underline-offset-4 hover:underline" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="mt-4 list-disc pl-6 text-muted-foreground" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="mt-4 list-decimal pl-6 text-muted-foreground" {...props} />
  ),
};

export async function MDXContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });
  return <div className="prose-invert">{content}</div>;
}
```

- [ ] **Step 4: Install next-mdx-remote**

```bash
npm install next-mdx-remote
```

- [ ] **Step 5: Typecheck**

```bash
npm run typecheck
```

Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add MDX rendering components (Callout, Quote, MDXContent)"
```

---

### Task 23: Author Turkish service MDX content (all 7)

**Files:**
- Create: `content/services/tr/finans.mdx`, `sans-oyunlari.mdx`, `e-ticaret.mdx`, `entegrasyon.mdx`, `seo-reklam.mdx`, `sosyal-medya.mdx`, `crm.mdx`

- [ ] **Step 1: Author finans.mdx (template + full content example)**

Create `content/services/tr/finans.mdx`:

```mdx
---
title: Finans Yazılımları
slug: finans
excerpt: Düzenlenmiş finans alanları için, güvenli ve denetlenebilir yazılım.
hero_subtitle: Bankacılık, ödeme ve fintech ürünleri için uçtan uca yazılım çözümleri.
capabilities:
  - title: Core Banking modülleri
    description: Hesap, işlem, mutabakat, raporlama altyapısı.
  - title: Ödeme sistemleri entegrasyonları
    description: PSP, kart, havale, swift ve fast hatları.
  - title: KYC / AML
    description: Onboarding, kimlik doğrulama, risk skorlama.
  - title: Mobil ve web bankacılık
    description: Native ve PWA istemciler, biyometrik giriş.
tech_stack:
  - PostgreSQL
  - Kafka
  - Node.js
  - Java
  - Kubernetes
faq:
  - question: BDDK / TCMB uyumlu yazılım üretiyor musunuz?
    answer: Evet. Düzenleyici gereksinimleri proje başında haritalandırır, denetlenebilir bir mimariyle teslim ederiz.
  - question: Mevcut core banking sistemimize entegre olur musunuz?
    answer: Evet. ISO 8583, ISO 20022, REST ve mesajlaşma tabanlı entegrasyonları yaparız.
  - question: Tipik bir teslim süresi nedir?
    answer: Kapsama göre 8-16 hafta. İlk faz 4 hafta içinde demo edilebilir bir parçayla başlar.
cta_text: Finans projeniz için bizimle konuşun
related_cases: []
---

## Neden Airomeda?

Finans alanı, hata maliyetinin en yüksek olduğu sektörlerden biri. Biz bu nedenle her finans projesini regülasyon haritasıyla başlatır, mimari kararlarımızı denetlenebilirlik üzerinden kuruyoruz.

<Callout title="Bizim yaklaşımımız">
Düzenleyici gereklilikler önce, hız sonra. Ama düzenli teslim ederiz.
</Callout>

## Hangi sorunları çözüyoruz?

- Mevcut core banking sistemlerinin modernizasyonu
- Yeni dijital bankacılık ürünlerinin sıfırdan inşası
- PSP, kart kuruluşları ve düzenleyiciler ile entegrasyonlar
- Compliance ve raporlama altyapıları
```

- [ ] **Step 2: Author the remaining 6 MDX files using the same structure**

Create the following files. Each must have the same frontmatter shape as `finans.mdx` (title, slug, excerpt, hero_subtitle, capabilities[], tech_stack[], faq[], cta_text). Use this body template for each, replacing the marketing copy with content appropriate to each service:

```mdx
## Neden Airomeda?

[2-3 paragraflık anlatım — bu hizmet alanında deneyimimiz, yaklaşımımız]

<Callout title="Bizim yaklaşımımız">
[Tek cümlede metodolojinin özü]
</Callout>

## Hangi sorunları çözüyoruz?

- [Sorun 1]
- [Sorun 2]
- [Sorun 3]
- [Sorun 4]
```

Files to create:

- `content/services/tr/sans-oyunlari.mdx` — slug: `sans-oyunlari`, title: `Şans Oyunları & iGaming`. Capabilities: Lisanslı platform altyapısı, RNG ve oyun motorları, Ödeme & cashier, Risk yönetimi & KYC. Tech: Kubernetes, Redis, Postgres, Go, RabbitMQ.
- `content/services/tr/e-ticaret.mdx` — slug: `e-ticaret`, title: `E-Ticaret Yazılımları`. Capabilities: Headless storefront, Sepet ve checkout, ERP/PIM/WMS entegrasyonları, Pazaryeri entegrasyonları. Tech: Next.js, Shopify Hydrogen, GraphQL, Algolia, ElasticSearch.
- `content/services/tr/entegrasyon.mdx` — slug: `entegrasyon`, title: `Entegrasyon Yazılımları`. Capabilities: API gateway tasarımı, ERP entegrasyonları, EDI/B2B mesajlaşma, Webhook ve event streaming. Tech: Kafka, RabbitMQ, REST/GraphQL, OpenAPI, Apache Camel.
- `content/services/tr/seo-reklam.mdx` — slug: `seo-reklam`, title: `SEO ve Reklam Çalışmaları`. Capabilities: Teknik SEO denetimi, İçerik stratejisi, Google Ads & Meta Ads yönetimi, Performans pazarlaması. Tech: Google Analytics 4, GTM, Looker Studio, Search Console, Ahrefs.
- `content/services/tr/sosyal-medya.mdx` — slug: `sosyal-medya`, title: `Sosyal Medya Yönetimi`. Capabilities: Strateji & içerik takvimi, Görsel/video üretimi, Topluluk yönetimi, Influencer/işbirliği. Tech: Meta Business Suite, Buffer, Canva, Adobe CC, TikTok Studio.
- `content/services/tr/crm.mdx` — slug: `crm`, title: `CRM Yazılımları`. Capabilities: Müşteri 360 modeli, Kampanya otomasyonu, Segmentasyon ve skorlama, Loyalty modülleri. Tech: PostgreSQL, Redis, Node.js, Salesforce, HubSpot.

For each file, write 2-3 short paragraphs of Turkish marketing copy under the headings shown in the template — content should be specific to that service domain. Keep tone consistent with `finans.mdx`.

- [ ] **Step 3: Verify each file passes frontmatter validation**

Add a temporary script `scripts/check-content.ts`:

```ts
import { listServices } from '@/lib/mdx';

(async () => {
  for (const locale of ['tr', 'en'] as const) {
    try {
      const services = await listServices(locale);
      console.log(`[${locale}] ${services.length} services loaded`);
      for (const s of services) console.log(`  ✓ ${s.slug} — ${s.title}`);
    } catch (err) {
      console.error(`[${locale}] FAILED:`, err);
      process.exit(1);
    }
  }
})();
```

Add a script entry in `package.json`:

```json
{
  "scripts": {
    "check:content": "tsx scripts/check-content.ts"
  }
}
```

```bash
npm install --save-dev tsx
npm run check:content
```

Expected: prints `[tr] 7 services loaded` with all 7 slugs listed.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "content: author 7 Turkish service MDX pages"
```

---

### Task 24: Author English service MDX content (all 7)

**Files:**
- Create: `content/services/en/finance.mdx`, `gaming.mdx`, `ecommerce.mdx`, `integration.mdx`, `seo-ads.mdx`, `social-media.mdx`, `crm.mdx`

- [ ] **Step 1: Author each EN file as 1:1 translation**

Create each file as the English translation of its TR counterpart:

| TR file              | EN file                         | EN slug         |
|----------------------|---------------------------------|-----------------|
| finans.mdx           | content/services/en/finance.mdx | finance         |
| sans-oyunlari.mdx    | gaming.mdx                      | gaming          |
| e-ticaret.mdx        | ecommerce.mdx                   | ecommerce       |
| entegrasyon.mdx      | integration.mdx                 | integration     |
| seo-reklam.mdx       | seo-ads.mdx                     | seo-ads         |
| sosyal-medya.mdx     | social-media.mdx                | social-media    |
| crm.mdx              | crm.mdx                         | crm             |

For each, translate `title`, `excerpt`, `hero_subtitle`, `capabilities` (`title`+`description`), `faq` items, `cta_text`, and the body. Keep `tech_stack` identical (proper nouns). Use the new EN slug in the frontmatter.

Example head of `content/services/en/finance.mdx`:

```mdx
---
title: Financial Software
slug: finance
excerpt: Secure, auditable software for regulated finance.
hero_subtitle: End-to-end software for banking, payments and fintech.
capabilities:
  - title: Core Banking modules
    description: Accounts, transactions, reconciliation, reporting.
  ...
```

Body translation should match the TR body's structure: `## Why Airomeda?`, `<Callout title="Our approach">`, `## What problems do we solve?`.

- [ ] **Step 2: Verify with content checker**

```bash
npm run check:content
```

Expected: prints `[tr] 7 services loaded` and `[en] 7 services loaded`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "content: author 7 English service MDX pages"
```

---

## Milestone 6 — Home Page (Tasks 25–30)

### Task 25: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Implement**

Create `components/sections/Hero.tsx`:

```tsx
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

export async function Hero() {
  const t = await getTranslations();

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.18),transparent_55%)]"
      />
      <Container as="div" className="relative py-24 md:py-36">
        <h1 className="max-w-4xl text-display-1 font-bold leading-[1.05] tracking-tight">
          {t('home.hero.title')}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {t('home.hero.subtitle')}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/iletisim">{t('common.primary_cta')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/calismalarimiz">{t('common.secondary_cta')}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section"
```

---

### Task 26: ServicesGrid section

**Files:**
- Create: `components/sections/ServicesGrid.tsx`

- [ ] **Step 1: Implement**

Create `components/sections/ServicesGrid.tsx`:

```tsx
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { listServices } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

export async function ServicesGrid({ locale }: { locale: Locale }) {
  const t = await getTranslations('home.services_section');
  const services = await listServices(locale);

  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-display-2 font-semibold tracking-tight">{t('title')}</h2>
          <p className="mt-3 text-muted-foreground">{t('subtitle')}</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={{ pathname: '/hizmetler/[slug]', params: { slug: s.slug } }}
                className="group flex h-full flex-col rounded-lg border border-border bg-muted/20 p-6 transition-colors hover:border-accent hover:bg-muted/40"
              >
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.excerpt}</p>
                <span className="mt-4 text-sm font-medium text-accent">
                  Detay →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ServicesGrid.tsx
git commit -m "feat: add ServicesGrid pulling from MDX content"
```

---

### Task 27: ProcessSteps section

**Files:**
- Create: `components/sections/ProcessSteps.tsx`

- [ ] **Step 1: Implement**

Create `components/sections/ProcessSteps.tsx`:

```tsx
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';

const STEP_KEYS = ['discovery', 'design', 'build', 'support'] as const;

export async function ProcessSteps() {
  const t = await getTranslations('home.process');

  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <h2 className="text-display-2 font-semibold tracking-tight">{t('title')}</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {STEP_KEYS.map((key, i) => (
            <li key={key} className="rounded-lg border border-border bg-muted/20 p-6">
              <span className="text-sm font-mono text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{t(`steps.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`steps.${key}.description`)}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ProcessSteps.tsx
git commit -m "feat: add ProcessSteps section"
```

---

### Task 28: IndustryStrip + Testimonials placeholders

**Files:**
- Create: `components/sections/IndustryStrip.tsx`, `components/sections/Testimonials.tsx`, `components/sections/FeaturedCase.tsx`, `components/sections/BlogPreview.tsx`, `components/sections/CTABlock.tsx`

- [ ] **Step 1: IndustryStrip**

Create `components/sections/IndustryStrip.tsx`:

```tsx
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';

const INDUSTRIES = [
  'Finance',
  'iGaming',
  'E-Commerce',
  'Insurance',
  'Manufacturing',
  'Public Sector',
  'Retail',
  'SaaS',
];

export async function IndustryStrip() {
  const t = await getTranslations('home.industries');

  return (
    <section className="border-b border-border">
      <Container as="div" className="py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t('title')}
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-base font-medium text-foreground/80">
          {INDUSTRIES.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Testimonials (placeholder data, real quotes added later)**

Create `components/sections/Testimonials.tsx`:

```tsx
import { Container } from '@/components/layout/Container';

const QUOTES = [
  {
    quote: 'Airomeda ekibi 4 ayda ödeme altyapımızı yenileyip canlıya aldı. Hız ve kalite el ele geldi.',
    author: 'Ad Soyad',
    role: 'CTO, Müşteri A',
  },
  {
    quote: 'iGaming entegrasyonlarımızı stabil ve denetlenebilir hâle getirdiler.',
    author: 'Ad Soyad',
    role: 'Director of Engineering, Müşteri B',
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <ul className="grid gap-6 md:grid-cols-2">
          {QUOTES.map((q) => (
            <li key={q.author} className="rounded-lg border border-border bg-muted/20 p-6">
              <blockquote className="text-base italic">“{q.quote}”</blockquote>
              <p className="mt-4 text-sm text-muted-foreground">
                — {q.author}, {q.role}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: FeaturedCase + BlogPreview placeholders (replaced in Plan 2)**

Create `components/sections/FeaturedCase.tsx`:

```tsx
import { Container } from '@/components/layout/Container';

export function FeaturedCase() {
  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Öne çıkan vaka
        </p>
        <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/10 p-12 text-center text-muted-foreground">
          (Vaka çalışmaları Plan 2'de eklenecek.)
        </div>
      </Container>
    </section>
  );
}
```

Create `components/sections/BlogPreview.tsx`:

```tsx
import { Container } from '@/components/layout/Container';

export function BlogPreview() {
  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Son yazılar
        </p>
        <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/10 p-12 text-center text-muted-foreground">
          (Blog Plan 2'de eklenecek.)
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: CTABlock**

Create `components/sections/CTABlock.tsx`:

```tsx
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

export async function CTABlock() {
  const t = await getTranslations('home.cta');
  const tc = await getTranslations('common');

  return (
    <section>
      <Container as="div" className="py-20">
        <div className="rounded-lg border border-border bg-muted/30 p-10 text-center md:p-16">
          <h2 className="text-display-2 font-semibold tracking-tight">{t('title')}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t('subtitle')}</p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg">
              <Link href="/iletisim">{tc('primary_cta')}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add IndustryStrip, Testimonials, FeaturedCase, BlogPreview, CTABlock placeholders"
```

---

### Task 29: Compose home page

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Update home page**

Replace `app/[locale]/page.tsx`:

```tsx
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Hero } from '@/components/sections/Hero';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { IndustryStrip } from '@/components/sections/IndustryStrip';
import { FeaturedCase } from '@/components/sections/FeaturedCase';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { Testimonials } from '@/components/sections/Testimonials';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { CTABlock } from '@/components/sections/CTABlock';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ServicesGrid locale={locale} />
      <IndustryStrip />
      <FeaturedCase />
      <ProcessSteps />
      <Testimonials />
      <BlogPreview />
      <CTABlock />
    </>
  );
}
```

- [ ] **Step 2: Run dev server, verify home page**

```bash
npm run dev -- --port 3000 &
sleep 6
curl -sf http://localhost:3000 | grep -q "Hizmetlerimiz" && echo OK_TR
curl -sf http://localhost:3000/en | grep -q "Our services" && echo OK_EN
kill %1 2>/dev/null || true
```

Expected: prints `OK_TR` and `OK_EN`.

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "feat: compose home page from sections"
```

---

### Task 30: Home E2E test

**Files:**
- Create: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Write test**

Create `tests/e2e/home.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test('TR home renders 7 service cards', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Hizmetlerimiz' })).toBeVisible();
  const cards = page.locator('section').filter({ has: page.getByRole('heading', { name: 'Hizmetlerimiz' }) }).getByRole('link');
  await expect(cards).toHaveCount(7);
});

test('EN home renders 7 service cards', async ({ page }) => {
  await page.goto('/en');
  await expect(page.getByRole('heading', { name: 'Our services' })).toBeVisible();
});

test('Home shows hero CTAs', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Demo Talep Et' }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Çalışmalarımız' }).first()).toBeVisible();
});
```

- [ ] **Step 2: Run E2E**

```bash
npm run test:e2e
```

Expected: all home tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/home.spec.ts
git commit -m "test: e2e for home page sections"
```

---

## Milestone 7 — Service Pages (Tasks 31–35)

### Task 31: Service detail components

**Files:**
- Create: `components/service/ServiceHero.tsx`, `components/service/ServiceCapabilities.tsx`, `components/service/ServiceTechStrip.tsx`, `components/service/ServiceFAQ.tsx`

- [ ] **Step 1: ServiceHero**

Create `components/service/ServiceHero.tsx`:

```tsx
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

type Props = {
  title: string;
  subtitle: string;
  ctaText: string;
};

export function ServiceHero({ title, subtitle, ctaText }: Props) {
  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20 md:py-28">
        <h1 className="max-w-3xl text-display-2 font-bold tracking-tight">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/iletisim">{ctaText}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: ServiceCapabilities**

Create `components/service/ServiceCapabilities.tsx`:

```tsx
import { Container } from '@/components/layout/Container';
import type { ServiceFrontmatter } from '@/lib/schemas/service';

export function ServiceCapabilities({ items }: { items: ServiceFrontmatter['capabilities'] }) {
  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <h2 className="text-display-2 font-semibold tracking-tight">Yetkinliklerimiz</h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <li key={item.title} className="rounded-lg border border-border bg-muted/20 p-6">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: ServiceTechStrip**

Create `components/service/ServiceTechStrip.tsx`:

```tsx
import { Container } from '@/components/layout/Container';

export function ServiceTechStrip({ items }: { items: string[] }) {
  return (
    <section className="border-b border-border">
      <Container as="div" className="py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Kullandığımız teknolojiler
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-base font-medium text-foreground/80">
          {items.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
```

- [ ] **Step 4: ServiceFAQ (use shadcn accordion)**

Create `components/service/ServiceFAQ.tsx`:

```tsx
import { Container } from '@/components/layout/Container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { ServiceFrontmatter } from '@/lib/schemas/service';

export function ServiceFAQ({ items }: { items: ServiceFrontmatter['faq'] }) {
  if (items.length === 0) return null;

  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <h2 className="text-display-2 font-semibold tracking-tight">Sıkça sorulan sorular</h2>
        <Accordion type="single" collapsible className="mt-10">
          {items.map((item, i) => (
            <AccordionItem key={item.question} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add service detail components (Hero, Capabilities, TechStrip, FAQ)"
```

---

### Task 32: Service detail page

**Files:**
- Create: `app/[locale]/hizmetler/[slug]/page.tsx`

- [ ] **Step 1: Implement page**

Create `app/[locale]/hizmetler/[slug]/page.tsx`:

```tsx
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { listServices, loadServiceContent } from '@/lib/mdx';
import { MDXContent } from '@/components/mdx/MDXContent';
import { ServiceHero } from '@/components/service/ServiceHero';
import { ServiceCapabilities } from '@/components/service/ServiceCapabilities';
import { ServiceTechStrip } from '@/components/service/ServiceTechStrip';
import { ServiceFAQ } from '@/components/service/ServiceFAQ';
import { CTABlock } from '@/components/sections/CTABlock';
import { Container } from '@/components/layout/Container';

export async function generateStaticParams() {
  const params: { locale: Locale; slug: string }[] = [];
  for (const locale of routing.locales) {
    const services = await listServices(locale);
    for (const s of services) params.push({ locale, slug: s.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = await loadServiceContent(slug, locale);
  if (!content) return {};
  return {
    title: content.frontmatter.title,
    description: content.frontmatter.excerpt,
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const content = await loadServiceContent(slug, locale);
  if (!content) notFound();

  return (
    <>
      <ServiceHero
        title={content.frontmatter.title}
        subtitle={content.frontmatter.hero_subtitle}
        ctaText={content.frontmatter.cta_text}
      />
      <Container as="article" className="prose-invert max-w-3xl py-20">
        <MDXContent source={content.body} />
      </Container>
      <ServiceCapabilities items={content.frontmatter.capabilities} />
      <ServiceTechStrip items={content.frontmatter.tech_stack} />
      <ServiceFAQ items={content.frontmatter.faq} />
      <CTABlock />
    </>
  );
}
```

- [ ] **Step 2: Run dev, verify Finans page renders**

```bash
npm run dev -- --port 3000 &
sleep 6
curl -sf http://localhost:3000/hizmetler/finans | grep -q "Finans Yazılımları" && echo OK_TR
curl -sf http://localhost:3000/en/services/finance | grep -q "Financial Software" && echo OK_EN
kill %1 2>/dev/null || true
```

Expected: prints `OK_TR` and `OK_EN`.

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/hizmetler/[slug]/page.tsx
git commit -m "feat: add service detail page"
```

---

### Task 33: Service overview page (/hizmetler)

**Files:**
- Create: `app/[locale]/hizmetler/page.tsx`

- [ ] **Step 1: Implement**

Create `app/[locale]/hizmetler/page.tsx`:

```tsx
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/layout/Container';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { CTABlock } from '@/components/sections/CTABlock';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('services') };
}

export default async function ServicesIndex({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Container as="section" className="py-20">
        <h1 className="text-display-1 font-bold tracking-tight">Hizmetlerimiz</h1>
      </Container>
      <ServicesGrid locale={locale} />
      <CTABlock />
    </>
  );
}
```

- [ ] **Step 2: Localize the title via messages**

Add to `messages/tr.json` under `services_index`:

```json
"services_index": { "title": "Hizmetlerimiz" }
```

Add to `messages/en.json`:

```json
"services_index": { "title": "Our services" }
```

Update the page to use `getTranslations` for the title:

```tsx
const t = await getTranslations({ locale, namespace: 'services_index' });
// ...
<h1>{t('title')}</h1>
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add /hizmetler overview page with all services"
```

---

### Task 34: Service E2E

**Files:**
- Create: `tests/e2e/service-page.spec.ts`

- [ ] **Step 1: Write test**

Create `tests/e2e/service-page.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

const TR_SLUGS = [
  'finans',
  'sans-oyunlari',
  'e-ticaret',
  'entegrasyon',
  'seo-reklam',
  'sosyal-medya',
  'crm',
];

test.describe('TR service pages', () => {
  for (const slug of TR_SLUGS) {
    test(`renders /hizmetler/${slug}`, async ({ page }) => {
      const res = await page.goto(`/hizmetler/${slug}`);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Yetkinliklerimiz' })).toBeVisible();
    });
  }
});

test('EN service page (/en/services/finance) renders', async ({ page }) => {
  await page.goto('/en/services/finance');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Financial Software');
});

test('Unknown service slug 404s', async ({ page }) => {
  const res = await page.goto('/hizmetler/yok-boyle-bir-hizmet', { waitUntil: 'commit' });
  expect(res?.status()).toBe(404);
});
```

- [ ] **Step 2: Run**

```bash
npm run test:e2e
```

Expected: all service tests pass.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/service-page.spec.ts
git commit -m "test: e2e for service detail pages (all 7 TR + sample EN)"
```

---

### Task 35: MegaMenu — services dropdown in Header

**Files:**
- Create: `components/layout/MegaMenu.tsx`
- Modify: `components/layout/Header.tsx`

- [ ] **Step 1: Implement MegaMenu (server component, lists services)**

Create `components/layout/MegaMenu.tsx`:

```tsx
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { listServices } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

export async function MegaMenu({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'nav' });
  const services = await listServices(locale);

  return (
    <div className="group relative">
      <button
        type="button"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        aria-haspopup="menu"
      >
        {t('services')} ▾
      </button>
      <div className="invisible absolute left-1/2 z-50 mt-3 w-[640px] -translate-x-1/2 rounded-lg border border-border bg-background p-4 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="grid grid-cols-2 gap-1">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={{ pathname: '/hizmetler/[slug]', params: { slug: s.slug } }}
                className="block rounded p-3 hover:bg-muted"
              >
                <span className="font-medium">{s.title}</span>
                <span className="mt-1 block text-xs text-muted-foreground line-clamp-2">
                  {s.excerpt}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire MegaMenu into Header**

Replace `components/layout/Header.tsx`:

```tsx
import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Logo } from './Logo';
import { LangSwitcher } from './LangSwitcher';
import { Container } from './Container';
import { MegaMenu } from './MegaMenu';
import type { Locale } from '@/i18n/routing';

export async function Header() {
  const t = await getTranslations('nav');
  const locale = (await getLocale()) as Locale;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container as="div" className="flex h-16 items-center justify-between">
        <Logo href="/" />
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          <MegaMenu locale={locale} />
          <Link href="/calismalarimiz" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t('work')}
          </Link>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t('blog')}
          </Link>
          <Link href="/hakkimizda" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t('about')}
          </Link>
          <Link href="/kariyer" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t('careers')}
          </Link>
          <Link href="/iletisim" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t('contact')}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitcher />
        </div>
      </Container>
    </header>
  );
}
```

- [ ] **Step 3: Visual smoke test**

```bash
npm run dev -- --port 3000 &
sleep 6
curl -sf http://localhost:3000 | grep -q "Hizmetler ▾" && echo OK
kill %1 2>/dev/null || true
```

Expected: `OK`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add services MegaMenu in Header"
```

---

## Milestone 8 — Static Pages + Deployment (Tasks 36–40)

### Task 36: Static page route + content

**Files:**
- Create: `app/[locale]/hakkimizda/page.tsx`, `app/[locale]/iletisim/page.tsx`, `app/[locale]/kvkk/page.tsx`, `app/[locale]/cerez-politikasi/page.tsx`
- Create: `content/pages/tr/hakkimizda.mdx`, `iletisim.mdx`, `kvkk.mdx`, `cerez-politikasi.mdx`
- Create: `content/pages/en/about.mdx`, `contact.mdx`, `privacy.mdx`, `cookies.mdx`

- [ ] **Step 1: Author TR static MDX content**

Create `content/pages/tr/hakkimizda.mdx`:

```mdx
---
title: Hakkımızda
slug: hakkimizda
description: Airomeda — bilişim teknolojileri ortağınız.
---

# Hakkımızda

Airomeda, finans, iGaming, e-ticaret ve daha fazlası için yazılım geliştiren bir bilişim teknolojileri şirketidir.

## Vizyonumuz

Karmaşık olanı, basit kılmak.

## Misyonumuz

Müşterilerimiz için güvenli, ölçeklenebilir ve sürdürülebilir yazılım çözümleri üretmek.
```

Create `content/pages/tr/iletisim.mdx`:

```mdx
---
title: İletişim
slug: iletisim
description: Bize ulaşın.
---

# İletişim

E-posta: hello@airomeda.com

(İletişim formu Plan 3'te eklenecek.)
```

Create `content/pages/tr/kvkk.mdx`:

```mdx
---
title: KVKK Aydınlatma Metni
slug: kvkk
---

# KVKK Aydınlatma Metni

Bu sayfa Plan 4'te yasal metinle güncellenecektir.
```

Create `content/pages/tr/cerez-politikasi.mdx`:

```mdx
---
title: Çerez Politikası
slug: cerez-politikasi
---

# Çerez Politikası

Bu sayfa Plan 4'te yasal metinle güncellenecektir.
```

- [ ] **Step 2: Author EN static MDX content (1:1 translations)**

Create `content/pages/en/about.mdx`:

```mdx
---
title: About
slug: about
description: Airomeda — your software partner.
---

# About

Airomeda is a software company building products for finance, iGaming, e-commerce and beyond.

## Vision

Make the complex, simple.

## Mission

Build secure, scalable and sustainable software for our customers.
```

Create `content/pages/en/contact.mdx`:

```mdx
---
title: Contact
slug: contact
description: Get in touch.
---

# Contact

Email: hello@airomeda.com

(Contact form will be added in Plan 3.)
```

Create `content/pages/en/privacy.mdx`:

```mdx
---
title: Privacy Policy
slug: privacy
---

# Privacy Policy

This page will be updated with the legal text in Plan 4.
```

Create `content/pages/en/cookies.mdx`:

```mdx
---
title: Cookie Policy
slug: cookies
---

# Cookie Policy

This page will be updated with the legal text in Plan 4.
```

- [ ] **Step 3: Add a generic page-by-slug renderer used by all four routes**

Create helper `lib/page-route.ts`:

```ts
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { loadPageContent } from '@/lib/mdx';
import { MDXContent } from '@/components/mdx/MDXContent';
import { Container } from '@/components/layout/Container';
import type { Locale } from '@/i18n/routing';

const SLUG_BY_LOCALE: Record<string, Record<Locale, string>> = {
  about: { tr: 'hakkimizda', en: 'about' },
  contact: { tr: 'iletisim', en: 'contact' },
  privacy: { tr: 'kvkk', en: 'privacy' },
  cookies: { tr: 'cerez-politikasi', en: 'cookies' },
};

export async function renderStaticPage(
  page: keyof typeof SLUG_BY_LOCALE,
  locale: Locale,
) {
  setRequestLocale(locale);
  const slug = SLUG_BY_LOCALE[page][locale];
  const content = await loadPageContent(slug, locale);
  if (!content) notFound();
  return (
    <Container as="article" className="prose-invert max-w-3xl py-20">
      <MDXContent source={content.body} />
    </Container>
  );
}

export async function staticPageMetadata(
  page: keyof typeof SLUG_BY_LOCALE,
  locale: Locale,
) {
  const slug = SLUG_BY_LOCALE[page][locale];
  const content = await loadPageContent(slug, locale);
  if (!content) return {};
  return {
    title: content.frontmatter.title,
    description: content.frontmatter.description,
  };
}
```

- [ ] **Step 4: Implement the four page routes**

Create `app/[locale]/hakkimizda/page.tsx`:

```tsx
import type { Locale } from '@/i18n/routing';
import { renderStaticPage, staticPageMetadata } from '@/lib/page-route';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return staticPageMetadata('about', locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return renderStaticPage('about', locale);
}
```

Repeat the same shape for the other three. Create `app/[locale]/iletisim/page.tsx`:

```tsx
import type { Locale } from '@/i18n/routing';
import { renderStaticPage, staticPageMetadata } from '@/lib/page-route';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return staticPageMetadata('contact', locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return renderStaticPage('contact', locale);
}
```

Create `app/[locale]/kvkk/page.tsx`:

```tsx
import type { Locale } from '@/i18n/routing';
import { renderStaticPage, staticPageMetadata } from '@/lib/page-route';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return staticPageMetadata('privacy', locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return renderStaticPage('privacy', locale);
}
```

Create `app/[locale]/cerez-politikasi/page.tsx`:

```tsx
import type { Locale } from '@/i18n/routing';
import { renderStaticPage, staticPageMetadata } from '@/lib/page-route';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return staticPageMetadata('cookies', locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return renderStaticPage('cookies', locale);
}
```

- [ ] **Step 5: Verify pages render**

```bash
npm run dev -- --port 3000 &
sleep 6
curl -sf http://localhost:3000/hakkimizda | grep -q "Hakkımızda" && echo OK1
curl -sf http://localhost:3000/iletisim | grep -q "İletişim" && echo OK2
curl -sf http://localhost:3000/en/about | grep -q "About" && echo OK3
kill %1 2>/dev/null || true
```

Expected: prints `OK1`, `OK2`, `OK3`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add static pages (about, contact, privacy, cookies) in TR + EN"
```

---

### Task 37: Run full check (lint + typecheck + tests + build)

**Files:** none

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

Expected: pass.

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: pass.

- [ ] **Step 3: Run unit tests**

```bash
npm test
```

Expected: all pass.

- [ ] **Step 4: Run E2E tests**

```bash
npm run test:e2e
```

Expected: all pass.

- [ ] **Step 5: Run production build**

```bash
npm run build
```

Expected: build succeeds. Note any pages that the build prerenders (should include all 7 services × 2 locales = 14 service detail pages, plus home, services index, about, contact, kvkk, cookies in both locales).

- [ ] **Step 6: If everything green, commit nothing — just confirm**

```bash
echo "Plan 1 quality gates green."
```

---

### Task 38: Set up Vercel project (preview deploy)

**Files:** none (CLI-driven)

- [ ] **Step 1: Make sure Vercel CLI is available**

The user was instructed at session start to run `npm i -g vercel`. Verify:

```bash
vercel --version
```

If not installed, ask the user to run `npm i -g vercel` and authenticate with `vercel login`. Block until they confirm.

- [ ] **Step 2: Link project**

```bash
vercel link --yes --project airomeda-website
```

Follow prompts to choose scope. Resulting `.vercel/project.json` should NOT be committed (`.gitignore` already excludes `.vercel`).

- [ ] **Step 3: Pull env (creates .env.local from Vercel)**

```bash
vercel env pull .env.local
```

If no envs exist remotely yet, copy from `.env.local.example`:

```bash
cp .env.local.example .env.local
```

- [ ] **Step 4: First preview deploy**

```bash
vercel --prebuilt false
```

Expected: deploy succeeds, prints a preview URL.

- [ ] **Step 5: Smoke-check the preview URL**

Visit the URL printed by `vercel`. Verify:
- TR home loads, all 7 service cards visible
- EN locale via `/en` works
- Click into one service detail page; verify content renders
- About / Contact pages load
- LangSwitcher works
- Lighthouse perf score > 90 (Chrome devtools)

If any of these fail, file a follow-up task with the specific failure before proceeding.

- [ ] **Step 6: No commit — just record the preview URL**

Note the preview URL in the team channel or PR description.

---

### Task 39: Add CI workflow

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Write workflow**

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run build
      - name: Install Playwright
        run: npx playwright install --with-deps chromium
      - run: npm run test:e2e
        env:
          CI: 'true'
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add github actions workflow (lint, typecheck, test, build, e2e)"
```

---

### Task 40: Final summary + handoff to Plan 2

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update README with the deploy URL placeholder and progress table**

Append to `README.md`:

```markdown
## Status

| Plan | Status | Notes |
| --- | --- | --- |
| 1. Foundation | ✅ Done | Bilingual marketing shell, home + 7 service pages, static pages, Vercel preview |
| 2. Content collections | ⏳ Next | Case studies, blog, careers (lists + details) |
| 3. Forms & integrations | ⏳ | Resend, Turnstile, Blob, contact/demo/career forms |
| 4. SEO + polish + launch | ⏳ | Sitemap, hreflang, JSON-LD, analytics, KVKK, prod deploy |

Preview: <fill-in-after-task-38>
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: update README with plan status"
```

---

## Self-Review

This section is the author's check after writing the plan.

**Spec coverage check:**
- §3 Sayfa haritası — covered: home, /hizmetler, /hizmetler/[slug] (×7), /hakkimizda, /iletisim, /kvkk, /cerez-politikasi. Case studies, blog, careers explicitly deferred to Plan 2.
- §4 Anasayfa bölümleri — Hero, ServicesGrid, IndustryStrip, FeaturedCase (placeholder), ProcessSteps, Testimonials, BlogPreview (placeholder), CTABlock. Covered.
- §5 Sayfa şablonları — Service template (Tasks 31–32) covered. Case study + blog + career templates explicitly Plan 2.
- §6 İçerik modeli — service + page schemas in this plan. Other collections in Plan 2.
- §7 i18n — TR/EN, next-intl, slug map: covered.
- §8 Forms & integrations — Plan 3.
- §9 SEO/analytics — basic metadata only here; sitemap/JSON-LD/OG image generation in Plan 4.
- §10 Görsel stil — default tokens applied; iteration in Plan 4.
- §11 Yığın & klasör — covered.

**Placeholder scan:** No "TBD" / "implement later" without concrete content. Tasks 23/24/36 do leave the marketing copy to the engineer's judgment (with structure provided), which is acceptable — they have a complete template + 1 fully written example.

**Type consistency:** `Locale`, `ServiceFrontmatter`, `PageFrontmatter`, `MDXContent` (component + helper), `loadServiceFrontmatter`, `loadServiceContent`, `listServices`, `loadPageContent` are defined once and reused with the same names.

**Scope check:** Single delivery unit — a deployable bilingual marketing site with home, 7 service pages, and static pages. Subsequent plans build on this foundation.

---

## Execution Handoff

Plan complete and saved. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
