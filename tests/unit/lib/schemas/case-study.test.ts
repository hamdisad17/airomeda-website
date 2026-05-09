import { describe, expect, it } from 'vitest';
import { CaseStudyFrontmatterSchema } from '@/lib/schemas/case-study';

const valid = {
  title: 'PayGate Core Banking Modernizasyonu',
  slug: 'paygate-core-banking',
  client: 'PayGate Bankası',
  industry: 'Finans',
  year: 2025,
  services: ['finance'],
  hero_image: '/cases/paygate-hero.jpg',
  excerpt: 'Legacy core banking ETK modernizasyonu.',
  metrics: [{ label: 'Transaction throughput', value: '5x' }],
};

describe('CaseStudyFrontmatterSchema', () => {
  it('accepts valid case study', () => {
    expect(CaseStudyFrontmatterSchema.safeParse(valid).success).toBe(true);
  });
  it('rejects missing year', () => {
    const { year: _y, ...rest } = valid;
    expect(CaseStudyFrontmatterSchema.safeParse(rest).success).toBe(false);
  });
  it('rejects empty metrics', () => {
    expect(CaseStudyFrontmatterSchema.safeParse({ ...valid, metrics: [] }).success).toBe(false);
  });
  it('defaults related_cases and gallery to empty arrays', () => {
    const r = CaseStudyFrontmatterSchema.safeParse(valid);
    if (r.success) {
      expect(r.data.related_cases).toEqual([]);
      expect(r.data.gallery).toEqual([]);
    }
  });
});
