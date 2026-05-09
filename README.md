# Airomeda Website

Bilingual (TR/EN) Next.js 16 corporate website for Airomeda. Hosted on a Hostinger VPS.

## Stack

Next.js 16 App Router, TypeScript strict, Tailwind CSS v4, shadcn/ui, MDX, next-intl, Vitest, Playwright. Runs on Node.js 24 + PM2 + nginx.

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
| `npm run build` | Production build (standalone output) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Prettier write |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright E2E tests |
| `npm run check:content` | Validate MDX frontmatter |

## Content

- Services: `content/services/{tr,en}/*.mdx`
- Static pages: `content/pages/{tr,en}/*.mdx`

## Status

| Plan | Status | Notes |
| --- | --- | --- |
| 1. Foundation | ✅ Done | Bilingual marketing shell, home + 7 service pages, static pages, CI + deploy workflows |
| 2. Content collections | ⏳ Next | Case studies, blog, careers (lists + details) |
| 3. Forms & integrations | ⏳ | SMTP mail, Turnstile, file upload, contact/demo/career forms |
| 4. SEO + polish + launch | ⏳ | Sitemap, hreflang, JSON-LD, analytics, KVKK, prod deploy |

## Deployment (Hostinger VPS)

Production runs on a Hostinger VPS — Node.js 24 + PM2 (cluster) + nginx reverse proxy + Let's Encrypt.

### One-time server setup

Follow `deploy/setup-server.md` to provision a fresh Ubuntu 22.04+ KVM. It installs Node 24, PM2, nginx, sets up the `deploy` user, applies the firewall, and links nginx + SSL.

### Continuous deploys

Pushing to `main` triggers `.github/workflows/deploy.yml`, which:

1. Runs `npm ci` + `npm run build` (standalone output)
2. rsyncs the standalone bundle to `/var/www/airomeda/releases/<sha>-<run>` on the VPS
3. Symlinks `/var/www/airomeda/current` → the new release
4. Reloads PM2 (`pm2 reload ecosystem.config.cjs`)
5. Smoke-checks `https://<PUBLIC_HOSTNAME>/`

#### Required GitHub secrets / variables

| Kind | Name | Purpose |
| --- | --- | --- |
| Secret | `VPS_SSH_PRIVATE_KEY` | OpenSSH private key (matches the public key in `/home/deploy/.ssh/authorized_keys`) |
| Variable | `VPS_HOST` | VPS IP or hostname |
| Variable | `VPS_USER` | SSH user (default `deploy`) |
| Variable | `VPS_PORT` | SSH port (default `22`) |
| Variable | `PUBLIC_HOSTNAME` | Domain for smoke check (e.g. `airomeda.com`) |
| Variable | `NEXT_PUBLIC_SITE_URL` | Public origin used at build time (e.g. `https://airomeda.com`) |

### Manual deploy

```bash
npm ci
npm run build
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
rsync -az --delete .next/standalone/ deploy@<VPS_HOST>:/var/www/airomeda/releases/$(date +%Y%m%d%H%M%S)/
ssh deploy@<VPS_HOST> '
  RELEASE=$(ls -td /var/www/airomeda/releases/*/ | head -1)
  ln -sfn $RELEASE /var/www/airomeda/current
  pm2 reload /var/www/airomeda/current/ecosystem.config.cjs --update-env || \
    pm2 start /var/www/airomeda/current/ecosystem.config.cjs
'
```

## Spec & Plans

See `docs/superpowers/specs/` and `docs/superpowers/plans/`.
