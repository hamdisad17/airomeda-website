# Airomeda Website — Plan 3: Forms & Integrations

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development.

**Goal:** Add 3 working forms (contact, demo request, career application with CV upload) backed by SMTP mail delivery + Cloudflare Turnstile spam protection + in-memory rate limiting.

**Architecture:**
- Server Actions for form submission (Next.js native, no separate API routes needed)
- React Hook Form + Zod (same schema runs client and server)
- `nodemailer` for SMTP delivery (Hostinger SMTP or any provider)
- Cloudflare Turnstile (platform-agnostic, free, low friction)
- CV files: streamed directly as **email attachments** — no persistent storage. Eliminates S3/Blob/local-disk complexity. Cap 5 MB.
- Rate limit: in-memory LRU per IP, 5 submissions / hour (acceptable since 8 PM2 cluster instances ≈ 40/hr effective max — still adequate spam ceiling).

**Tech stack additions:** `nodemailer`, `@types/nodemailer`, `react-hook-form`, `@hookform/resolvers`, `lru-cache`, `react-turnstile` (or use `@marsidev/react-turnstile` if active).

**Spec:** §8 Form ve entegrasyonlar.

**Out of scope:** Customer portal, CRM webhook integrations (deferred), CV persistence beyond email attachment.

---

## Tasks

### Task 1: Form infrastructure (Zod schemas, mail client, Turnstile, rate limit)

**Files:**
- Create: `lib/schemas/forms.ts` — Zod schemas for 3 forms + server-action result type
- Create: `lib/mail.ts` — nodemailer transporter + send helpers
- Create: `lib/turnstile.ts` — server-side Turnstile siteverify helper
- Create: `lib/rate-limit.ts` — IP-based LRU bucket (`hit(ip): boolean`)
- Create: `lib/server/form-action-helper.ts` — wraps a server action with: parse → Turnstile → rate-limit → handler
- Modify: `.env.local.example` — already has SMTP/Turnstile placeholders, fine
- Add deps: `nodemailer @types/nodemailer react-hook-form @hookform/resolvers lru-cache @marsidev/react-turnstile`

Schemas (in `lib/schemas/forms.ts`):

```ts
import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(150),
  company: z.string().max(150).optional(),
  message: z.string().min(20).max(5000),
  turnstileToken: z.string().min(1),
});

export const DemoRequestSchema = ContactFormSchema.extend({
  service: z.enum([
    'finance', 'gaming', 'ecommerce', 'integration',
    'seo-ads', 'social-media', 'crm',
  ]),
});

export const JobApplicationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(150),
  phone: z.string().max(40).optional(),
  linkedin_url: z.string().url().max(500).optional(),
  cover_letter: z.string().min(50).max(5000),
  job_slug: z.string().min(1).max(100),
  turnstileToken: z.string().min(1),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;
export type DemoRequestInput = z.infer<typeof DemoRequestSchema>;
export type JobApplicationInput = z.infer<typeof JobApplicationSchema>;

export type FormActionResult =
  | { ok: true }
  | { ok: false; error: 'validation' | 'turnstile' | 'rate_limit' | 'server'; message?: string };
```

Mail client uses env: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `CONTACT_TO`, `CAREERS_TO`.

Turnstile verification: POST to `https://challenges.cloudflare.com/turnstile/v0/siteverify` with `secret` (env: `TURNSTILE_SECRET_KEY`) + `response` (token from client).

Rate limit: 5 hits / IP / 60 min. Cache key = IP from `x-forwarded-for` header (first entry, trimmed).

### Task 2: Contact form on /iletisim

**Files:**
- Create: `components/forms/ContactForm.tsx` (`'use client'`)
- Create: `components/forms/TurnstileWidget.tsx` (`'use client'`, wraps `@marsidev/react-turnstile`)
- Create: `components/forms/FormField.tsx` (label + input + error helper)
- Create: `app/[locale]/iletisim/_actions.ts` — server action `submitContact`
- Modify: `app/[locale]/iletisim/page.tsx` — render `<ContactForm>` below the static MDX
- Modify: `messages/{tr,en}.json` — add `contact_form.{name, email, company, message, submit, success, errors.*}`

`submitContact` action:
1. Parse with `ContactFormSchema`
2. Verify Turnstile
3. Rate limit
4. Send email to `process.env.CONTACT_TO` (subject: "Yeni iletişim — <name>")
5. Send confirmation reply to user (subject: "Mesajınızı aldık")
6. Return `FormActionResult`

### Task 3: Demo form on each service detail page

**Files:**
- Create: `components/forms/DemoForm.tsx` (`'use client'`)
- Create: `app/[locale]/hizmetler/[slug]/_actions.ts` — server action `submitDemoRequest`
- Modify: `app/[locale]/hizmetler/[slug]/page.tsx` — replace the bottom CTA's link with `<DemoForm serviceKey={derived from slug} />`
- Modify: `lib/i18n/slug-map.ts` — already exposes service key derivation; reuse it
- Modify: `messages/{tr,en}.json` — add `demo_form.{title, name, email, company, message, submit, success}`

The demo form is the contact form + a hidden `service` field auto-set from the URL slug.

### Task 4: Career application form replaces placeholder

**Files:**
- Create: `components/forms/JobApplicationForm.tsx` (`'use client'`, includes file input)
- Create: `app/[locale]/kariyer/[slug]/_actions.ts` — server action `submitJobApplication`
- Modify: `app/[locale]/kariyer/[slug]/page.tsx` — replace the "Başvuru formu Plan 3'te eklenecek" block with `<JobApplicationForm jobSlug={slug} jobTitle={frontmatter.title} />`
- Modify: `messages/{tr,en}.json` — add `application_form.{name, email, phone, linkedin_url, cover_letter, cv_upload, submit, success, errors.cv_size, errors.cv_type}`

`submitJobApplication` action:
1. Parse with `JobApplicationSchema`
2. Verify Turnstile
3. Rate limit (separate bucket or shared, keep shared)
4. Read `cv` File from FormData; reject if > 5 MB OR type not in `[application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document]`
5. Read CV bytes, attach to mail to `CAREERS_TO`
6. Confirmation reply to applicant
7. Return result

### Task 5: E2E tests

**Files:**
- Create: `tests/e2e/forms.spec.ts`

Tests (don't actually submit — that requires real Turnstile + SMTP):
- Contact form: rendering, client-side validation (empty submit → errors visible)
- Demo form: same
- Job application: same + file input present + 5 MB note visible
- Submit with mock Turnstile token (skip actual SMTP — requires real env). Use Playwright `page.route()` to mock the `/turnstile/v0/siteverify` and `mailto` endpoints if needed.

For unit tests:
- Create: `tests/unit/lib/rate-limit.test.ts` — verify hit/miss/reset
- Create: `tests/unit/lib/schemas/forms.test.ts` — verify each schema

### Task 6: Deploy + secrets

**Tasks for the user (collected, then I set via gh CLI):**
- SMTP credentials (Hostinger or other): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `CONTACT_TO`, `CAREERS_TO`
- Cloudflare Turnstile site for airomeda.com → `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

Set as GitHub Actions Variables (the public ones) + Secrets (the secret ones), AND also write to `/var/www/airomeda/shared/.env.production` on the server so PM2 instances pick them up.

After secrets in place:
```
npm run lint && npm run typecheck && npm test && npm run build
git push origin main
```

Deploy auto-runs. Production verify: submit each form via curl/browser, check that emails arrive.

If user doesn't have credentials yet, the forms render but submission shows a graceful error message — not a hard crash. Implementation should degrade to "submit unavailable" if SMTP env vars are missing.

---

## Self-review

- 3 forms with consistent UX (RHF + Zod + Turnstile + rate limit)
- No persistent file storage — CV streams to email attachment
- Server actions, not API routes
- Build green; existing E2E (28 tests) still pass; new E2E (4-6 tests) added
- Configurable to no-SMTP environment without crashing
