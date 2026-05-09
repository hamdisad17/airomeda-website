import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createRateLimiter } from '@/lib/rate-limit';

describe('rate-limit', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
  });

  it('allows up to max hits and blocks the (max+1)-th', () => {
    const rl = createRateLimiter({ capacity: 100, windowMs: 60_000, max: 3 });
    expect(rl.hit('1.1.1.1')).toBe(true);
    expect(rl.hit('1.1.1.1')).toBe(true);
    expect(rl.hit('1.1.1.1')).toBe(true);
    expect(rl.hit('1.1.1.1')).toBe(false);
  });

  it('isolates buckets per key', () => {
    const rl = createRateLimiter({ capacity: 100, windowMs: 60_000, max: 1 });
    expect(rl.hit('1.1.1.1')).toBe(true);
    expect(rl.hit('2.2.2.2')).toBe(true);
    expect(rl.hit('1.1.1.1')).toBe(false);
  });

  it('resets after windowMs has passed', () => {
    const rl = createRateLimiter({ capacity: 100, windowMs: 60_000, max: 1 });
    expect(rl.hit('1.1.1.1')).toBe(true);
    expect(rl.hit('1.1.1.1')).toBe(false);
    vi.advanceTimersByTime(60_001);
    expect(rl.hit('1.1.1.1')).toBe(true);
  });
});
