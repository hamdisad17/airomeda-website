import { describe, expect, it } from 'vitest';
import { getServiceSlugInLocale, SERVICE_SLUGS } from '@/lib/i18n/slug-map';

describe('slug-map', () => {
  it('exports the 8 service entries', () => {
    expect(SERVICE_SLUGS).toHaveLength(8);
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
