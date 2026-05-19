import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('env-validate', () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    // Wipe every var the inspector inspects so tests start from a known state.
    for (const k of [
      'NEXT_PUBLIC_SITE_URL',
      'SMTP_HOST',
      'SMTP_PORT',
      'SMTP_USER',
      'SMTP_PASS',
      'MAIL_FROM',
      'CONTACT_TO',
      'CAREERS_TO',
      'TURNSTILE_SECRET_KEY',
      'NEXT_PUBLIC_TURNSTILE_SITE_KEY',
      'SENTRY_DSN',
      'NEXT_PUBLIC_SENTRY_DSN',
      'AIROMEDA_DB_PATH',
      'ADMIN_USER',
      'ADMIN_PASS',
      'NEXT_PUBLIC_PLAUSIBLE_DOMAIN',
    ]) {
      delete process.env[k];
    }
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it('flags every required env as missing when env is empty', async () => {
    const { inspectEnv } = await import('@/lib/env-validate');
    const { missingRequired } = inspectEnv();
    expect(missingRequired).toEqual(
      expect.arrayContaining([
        'NEXT_PUBLIC_SITE_URL',
        'SMTP_HOST',
        'SMTP_PORT',
        'SMTP_USER',
        'SMTP_PASS',
        'TURNSTILE_SECRET_KEY',
        'NEXT_PUBLIC_TURNSTILE_SITE_KEY',
      ]),
    );
  });

  it('reports no missing-required when every required env is set', async () => {
    Object.assign(process.env, {
      NEXT_PUBLIC_SITE_URL: 'https://example.test',
      SMTP_HOST: 'smtp.example.test',
      SMTP_PORT: '465',
      SMTP_USER: 'user',
      SMTP_PASS: 'pass',
      TURNSTILE_SECRET_KEY: 'secret',
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: 'site',
    });
    const { inspectEnv } = await import('@/lib/env-validate');
    expect(inspectEnv().missingRequired).toEqual([]);
  });

  it('marks optional envs as not-required regardless of presence', async () => {
    const { inspectEnv } = await import('@/lib/env-validate');
    const { checks } = inspectEnv();
    const sentry = checks.find((c) => c.name === 'SENTRY_DSN');
    expect(sentry?.required).toBe(false);
    const admin = checks.find((c) => c.name === 'ADMIN_USER');
    expect(admin?.required).toBe(false);
  });

  it('returns present=true for set envs and false for unset ones', async () => {
    process.env.SENTRY_DSN = 'https://abc@sentry.test/1';
    const { inspectEnv } = await import('@/lib/env-validate');
    const { checks } = inspectEnv();
    expect(checks.find((c) => c.name === 'SENTRY_DSN')?.present).toBe(true);
    expect(checks.find((c) => c.name === 'NEXT_PUBLIC_SENTRY_DSN')?.present).toBe(false);
  });
});
