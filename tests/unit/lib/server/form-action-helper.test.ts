import { describe, it, expect, beforeEach, vi } from 'vitest';
import { z } from 'zod';

// Mock everything the helper reaches into. We test the helper's
// orchestration, not the real Turnstile / SMTP / Next headers stack.
vi.mock('next/headers', () => ({
  headers: async () => ({
    get: (k: string) => (k === 'x-forwarded-for' ? '203.0.113.1' : null),
  }),
}));

const mailConfigured = vi.fn(() => true);
const turnstileConfigured = vi.fn(() => true);
const verifyTurnstile = vi.fn(async () => true);
const rateLimitHit = vi.fn(() => true);

vi.mock('@/lib/mail', () => ({
  isMailConfigured: () => mailConfigured(),
  sendMail: vi.fn(async () => {}),
}));
vi.mock('@/lib/turnstile', () => ({
  isTurnstileConfigured: () => turnstileConfigured(),
  verifyTurnstile: (...args: unknown[]) => verifyTurnstile(...(args as [string, string])),
}));
vi.mock('@/lib/rate-limit', () => ({
  formRateLimiter: { hit: (k: string) => rateLimitHit(k) },
}));
vi.mock('@/lib/logger', () => ({
  childLogger: () => ({ info: vi.fn(), warn: vi.fn(), error: vi.fn() }),
}));

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
});

describe('runFormAction', () => {
  beforeEach(() => {
    mailConfigured.mockReturnValue(true);
    turnstileConfigured.mockReturnValue(true);
    verifyTurnstile.mockResolvedValue(true);
    rateLimitHit.mockReturnValue(true);
  });

  it('returns config error when mail is not configured', async () => {
    mailConfigured.mockReturnValueOnce(false);
    const { runFormAction } = await import('@/lib/server/form-action-helper');
    const handler = vi.fn(async () => {});
    const result = await runFormAction({
      schema,
      data: { name: 'Ali', email: 'a@b.com' },
      turnstileToken: 'tk',
      handler,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe('config');
    expect(handler).not.toHaveBeenCalled();
  });

  it('returns config error when Turnstile is not configured', async () => {
    turnstileConfigured.mockReturnValueOnce(false);
    const { runFormAction } = await import('@/lib/server/form-action-helper');
    const result = await runFormAction({
      schema,
      data: { name: 'Ali', email: 'a@b.com' },
      turnstileToken: 'tk',
      handler: vi.fn(),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe('config');
  });

  it('returns validation error with fieldErrors for bad input', async () => {
    const { runFormAction } = await import('@/lib/server/form-action-helper');
    const result = await runFormAction({
      schema,
      data: { name: 'A', email: 'not-an-email' },
      turnstileToken: 'tk',
      handler: vi.fn(),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe('validation');
      expect(result.fieldErrors).toBeDefined();
      expect(Object.keys(result.fieldErrors ?? {})).toEqual(
        expect.arrayContaining(['name', 'email']),
      );
    }
  });

  it('returns rate_limit error when limiter rejects the IP', async () => {
    rateLimitHit.mockReturnValueOnce(false);
    const { runFormAction } = await import('@/lib/server/form-action-helper');
    const handler = vi.fn(async () => {});
    const result = await runFormAction({
      schema,
      data: { name: 'Ali', email: 'a@b.com' },
      turnstileToken: 'tk',
      handler,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe('rate_limit');
    expect(handler).not.toHaveBeenCalled();
  });

  it('returns turnstile error when verification fails', async () => {
    verifyTurnstile.mockResolvedValueOnce(false);
    const { runFormAction } = await import('@/lib/server/form-action-helper');
    const handler = vi.fn(async () => {});
    const result = await runFormAction({
      schema,
      data: { name: 'Ali', email: 'a@b.com' },
      turnstileToken: 'tk',
      handler,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe('turnstile');
    expect(handler).not.toHaveBeenCalled();
  });

  it('returns server error when handler throws', async () => {
    const { runFormAction } = await import('@/lib/server/form-action-helper');
    const result = await runFormAction({
      schema,
      data: { name: 'Ali', email: 'a@b.com' },
      turnstileToken: 'tk',
      handler: async () => {
        throw new Error('boom');
      },
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe('server');
  });

  it('returns ok and calls handler with parsed data + ip on happy path', async () => {
    const { runFormAction } = await import('@/lib/server/form-action-helper');
    const handler = vi.fn(async () => {});
    const result = await runFormAction({
      schema,
      data: { name: 'Ali', email: 'a@b.com' },
      turnstileToken: 'tk',
      handler,
    });
    expect(result).toEqual({ ok: true });
    expect(handler).toHaveBeenCalledWith(
      { name: 'Ali', email: 'a@b.com' },
      { ip: '203.0.113.1' },
    );
  });
});
