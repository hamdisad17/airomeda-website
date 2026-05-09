# Hosting Pivot — Vercel → Hostinger VPS

**Date:** 2026-05-09
**Owner:** Taha (Airomeda)
**Status:** Adopted mid Plan 1 execution

## Decision

Production is on a **Hostinger VPS / KVM** (Node.js 24, PM2 cluster, nginx reverse proxy, Let's Encrypt SSL). Vercel is **not** used.

## Why

The company already operates Hostinger VPS infrastructure. Vercel-specific features (Fluid Compute, Marketplace integrations, preview deploys) are replaced with VPS-equivalent open tooling.

## What changes vs. the original spec

| Original (Vercel) | Adopted (Hostinger VPS) |
| --- | --- |
| `vercel.ts` config | `next.config.ts` (`output: 'standalone'`) + `ecosystem.config.cjs` (PM2) + `deploy/nginx.conf.example` |
| Vercel Marketplace Resend | SMTP via `nodemailer` (Hostinger SMTP, or any provider) |
| Vercel Blob (file upload) | S3-compatible object storage (Hostinger Object Storage, AWS S3, Cloudflare R2) |
| Vercel Analytics + Speed Insights | Plausible (self-hosted or paid) or Umami |
| `next/og` dynamic OG | Same — works fine on standalone Node |
| Vercel preview URLs | GitHub Actions deploy to a `staging` subdomain on the same VPS (later) |
| `vercel env pull` | GitHub Actions secrets/variables → `/var/www/airomeda/shared/.env.production` |

## Files affected by the pivot (Plan 1)

Removed:
- `vercel.ts` (deleted)
- `@vercel/config` dev dep (uninstalled)

Added:
- `next.config.ts` — `output: 'standalone'`
- `ecosystem.config.cjs` — PM2 cluster config
- `deploy/nginx.conf.example` — reverse proxy + SSL + caching
- `deploy/setup-server.md` — first-time server bootstrap runbook
- `.github/workflows/deploy.yml` — push-to-main → SSH/rsync → PM2 reload
- README — Hostinger deploy section

## Pending Plan 3 substitutions

When Plan 3 (Forms & integrations) is written, substitute:
- **Mail:** `nodemailer` + SMTP (replace `resend`)
- **File upload:** `@aws-sdk/client-s3` + S3-compatible bucket (replace `@vercel/blob`)
- **Spam protection:** Cloudflare Turnstile — already platform-agnostic, no change
- **Rate limiting:** Redis (Hostinger or Upstash) or simple in-memory + LRU (replace `Vercel Runtime Cache`)

## Server connection details (TBD)

The user shared a public SSH key but VPS connection details (host, port, user, deploy path) have not been collected yet. Required before the deploy workflow can run end-to-end:

- `VPS_HOST`
- `VPS_USER` (recommend `deploy`)
- `VPS_PORT` (default 22)
- `PUBLIC_HOSTNAME`
- `VPS_SSH_PRIVATE_KEY` (GitHub Actions secret, must match the server's `authorized_keys`)
