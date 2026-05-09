import { describe, expect, it } from 'vitest';
import { ServiceFrontmatterSchema } from '@/lib/schemas/service';

const valid = {
  title: 'Finans Yazılımları',
  slug: 'finans',
  excerpt: 'Bankacılık ve finans için özel çözümler.',
  hero_subtitle: 'Düzenlenmiş alanlar için güvenli yazılım.',
  capabilities: [
    { title: 'Core Banking', description: 'Hesap, işlem, mutabakat.' },
    { title: 'Ödeme Sistemleri', description: 'PSP entegrasyonları.' },
  ],
  tech_stack: ['PostgreSQL', 'Kafka', 'Node.js'],
  faq: [{ question: 'Ne kadar sürer?', answer: 'Kapsama göre 6-12 hafta.' }],
  cta_text: 'Demo Talep Et',
};

describe('ServiceFrontmatterSchema', () => {
  it('accepts valid frontmatter', () => {
    const result = ServiceFrontmatterSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('rejects missing title', () => {
    const { title: _t, ...rest } = valid;
    const result = ServiceFrontmatterSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('rejects empty capabilities', () => {
    const result = ServiceFrontmatterSchema.safeParse({ ...valid, capabilities: [] });
    expect(result.success).toBe(false);
  });
});
