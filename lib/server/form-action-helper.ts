import 'server-only';
import { headers } from 'next/headers';
import type { ZodType } from 'zod';
import { verifyTurnstile, isTurnstileConfigured } from '@/lib/turnstile';
import { isMailConfigured } from '@/lib/mail';
import { formRateLimiter } from '@/lib/rate-limit';
import { childLogger } from '@/lib/logger';
import type { FormActionResult } from '@/lib/schemas/forms';

const log = childLogger('form-action');

async function getClientIp(): Promise<string> {
  const h = await headers();
  const xff = h.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0]?.trim();
    if (first) return first;
  }
  return h.get('x-real-ip') ?? '0.0.0.0';
}

export async function runFormAction<T>(opts: {
  schema: ZodType<T>;
  data: unknown;
  turnstileToken: string;
  handler: (parsed: T, ctx: { ip: string }) => Promise<void>;
}): Promise<FormActionResult> {
  // Configuration check first — graceful failure if envs missing
  if (!isMailConfigured() || !isTurnstileConfigured()) {
    return {
      ok: false,
      error: 'config',
      message: 'Form henüz aktif değil. Lütfen e-posta ile iletişime geçin.',
    };
  }

  // Validate
  const parsed = opts.schema.safeParse(opts.data);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.');
      (fieldErrors[path] ??= []).push(issue.message);
    }
    return { ok: false, error: 'validation', fieldErrors };
  }

  // Rate limit
  const ip = await getClientIp();
  if (!formRateLimiter.hit(ip)) {
    return { ok: false, error: 'rate_limit', message: 'Çok fazla deneme, lütfen sonra tekrar.' };
  }

  // Turnstile
  const turnstileOk = await verifyTurnstile(opts.turnstileToken, ip);
  if (!turnstileOk) {
    return { ok: false, error: 'turnstile', message: 'Doğrulama başarısız.' };
  }

  try {
    await opts.handler(parsed.data, { ip });
    log.info({ ip }, 'submission accepted');
    return { ok: true };
  } catch (err) {
    log.error({ err, ip }, 'handler failed');
    return { ok: false, error: 'server', message: 'Beklenmeyen bir hata oluştu.' };
  }
}
