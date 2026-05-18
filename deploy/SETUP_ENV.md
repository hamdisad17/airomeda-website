# Production Env Setup — Hostinger VPS

This file lists every environment variable the production runtime expects, where to obtain it, and where to put it on the VPS.

All secrets live in **`/var/www/airomeda/shared/.env.production`** on the VPS. PM2 loads this file via `--env-file` (see `ecosystem.config.cjs`). The file is never in source control.

After editing the env file, reload PM2:

```bash
pm2 reload /var/www/airomeda/current/ecosystem.config.cjs --update-env
```

Verify with:

```bash
curl -s http://127.0.0.1:3010/api/health | jq   # after Y6 lands
pm2 logs airomeda-website --lines 5             # look for [env] line
```

---

## Required for site to function

| Variable | Where to get it | Example |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your canonical URL | `https://airomeda.com` |

---

## Required for forms to work

If any of these are missing the contact/demo/career forms return "Form henüz aktif değil" and no email is sent.

### SMTP (Hostinger panel → Mail → Email Accounts → SMTP)

| Variable | Value |
|---|---|
| `SMTP_HOST` | `smtp.hostinger.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `hello@airomeda.com` |
| `SMTP_PASS` | The account password |
| `MAIL_FROM` | `Airomeda <hello@airomeda.com>` |
| `CONTACT_TO` | `sales@airomeda.com` |
| `CAREERS_TO` | `careers@airomeda.com` |

### Cloudflare Turnstile (spam protection)

1. Go to https://dash.cloudflare.com → Turnstile → Add site
2. Hostname: `airomeda.com` (add `www.airomeda.com` too)
3. Widget mode: Managed
4. Copy the Site Key and Secret Key

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public key from Cloudflare |
| `TURNSTILE_SECRET_KEY` | Private key from Cloudflare |

`NEXT_PUBLIC_TURNSTILE_SITE_KEY` is also baked into the build at deploy time — set it as a GitHub repo variable too (Settings → Environments → production → Variables) so `.github/workflows/deploy.yml` picks it up.

---

## Optional but strongly recommended

### Sentry error tracking

1. Create a Next.js project at https://sentry.io
2. Copy the DSN URL

| Variable | Notes |
|---|---|
| `SENTRY_DSN` | Server-side only |
| `NEXT_PUBLIC_SENTRY_DSN` | Same DSN, exposed to browser bundle for client errors |

Without DSN the SDK is initialised but disabled — no events sent.

---

## Example `.env.production`

```bash
# Core
NEXT_PUBLIC_SITE_URL=https://airomeda.com

# Forms — SMTP
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=hello@airomeda.com
SMTP_PASS=REDACTED
MAIL_FROM=Airomeda <hello@airomeda.com>
CONTACT_TO=sales@airomeda.com
CAREERS_TO=careers@airomeda.com

# Forms — Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAA...
TURNSTILE_SECRET_KEY=0x4AAA...

# Observability
SENTRY_DSN=https://...@o123.ingest.sentry.io/456
NEXT_PUBLIC_SENTRY_DSN=https://...@o123.ingest.sentry.io/456
```

Set permissions: `chmod 600 /var/www/airomeda/shared/.env.production`
