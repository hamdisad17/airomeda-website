import { describe, it, expect, beforeEach, vi } from 'vitest';

// Polyfill localStorage in jsdom — vitest setup already provides window
// but storage is a fresh slate for every test.
beforeEach(() => {
  window.localStorage.clear();
});

describe('consent', () => {
  it('returns null when nothing is stored', async () => {
    const { readConsent } = await import('@/lib/consent');
    expect(readConsent()).toBeNull();
  });

  it('persists analytics + marketing toggles and round-trips them', async () => {
    const { writeConsent, readConsent } = await import('@/lib/consent');
    writeConsent({ analytics: true, marketing: false });
    const state = readConsent();
    expect(state).not.toBeNull();
    expect(state?.necessary).toBe(true);
    expect(state?.analytics).toBe(true);
    expect(state?.marketing).toBe(false);
    expect(typeof state?.decidedAt).toBe('string');
  });

  it('invalidates stored consent when the version mismatches', async () => {
    window.localStorage.setItem(
      'airomeda-consent-v1',
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: false,
        decidedAt: new Date().toISOString(),
        version: 999, // future / incompatible
      }),
    );
    const { readConsent } = await import('@/lib/consent');
    expect(readConsent()).toBeNull();
  });

  it('dispatches a custom event on write so listeners can rerun', async () => {
    const { writeConsent } = await import('@/lib/consent');
    const listener = vi.fn();
    window.addEventListener('airomeda-consent-changed', listener);
    writeConsent({ analytics: false, marketing: true });
    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener('airomeda-consent-changed', listener);
  });

  it('survives localStorage being unavailable', async () => {
    // Some browsers (private mode Safari, embedded webviews) throw on
    // setItem. The helper must swallow the error, not propagate it.
    const setItemSpy = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('quota exceeded');
      });
    const { writeConsent } = await import('@/lib/consent');
    expect(() => writeConsent({ analytics: true, marketing: true })).not.toThrow();
    setItemSpy.mockRestore();
  });
});
