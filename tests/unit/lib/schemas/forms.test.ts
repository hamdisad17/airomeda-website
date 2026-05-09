import { describe, it, expect } from 'vitest';
import {
  ContactFormSchema,
  DemoRequestSchema,
  JobApplicationSchema,
} from '@/lib/schemas/forms';

describe('ContactFormSchema', () => {
  const valid = {
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    message: 'Merhaba, projemiz için bir görüşme talep ediyoruz. Detaylar için aramayı bekliyorum.',
    turnstileToken: 'abc',
  };

  it('accepts valid input', () => {
    expect(ContactFormSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects short message', () => {
    expect(ContactFormSchema.safeParse({ ...valid, message: 'short' }).success).toBe(false);
  });

  it('rejects invalid email', () => {
    expect(ContactFormSchema.safeParse({ ...valid, email: 'no-at-sign' }).success).toBe(false);
  });

  it('rejects missing turnstile token', () => {
    const { turnstileToken: _, ...rest } = valid;
    expect(ContactFormSchema.safeParse(rest).success).toBe(false);
  });

  it('accepts empty company string', () => {
    expect(ContactFormSchema.safeParse({ ...valid, company: '' }).success).toBe(true);
  });
});

describe('DemoRequestSchema', () => {
  const valid = {
    name: 'Ali Demir',
    email: 'ali@example.com',
    message: 'Finans modülü için demo görüşmesi talep ediyoruz, bu hafta uygunsanız.',
    turnstileToken: 'tk',
    service: 'finance' as const,
  };

  it('accepts valid input', () => {
    expect(DemoRequestSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects unknown service', () => {
    expect(DemoRequestSchema.safeParse({ ...valid, service: 'unknown' }).success).toBe(false);
  });
});

describe('JobApplicationSchema', () => {
  const valid = {
    name: 'Mert Aydın',
    email: 'mert@example.com',
    cover_letter:
      'Merhaba, Senior Backend rolüne başvurmak istiyorum. 8 yıllık JVM tecrübem ve fintech alanında 3 yıllık çalışmam var.',
    job_slug: 'senior-backend-engineer-jvm',
    turnstileToken: 'tk',
  };

  it('accepts valid input', () => {
    expect(JobApplicationSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects short cover_letter', () => {
    expect(JobApplicationSchema.safeParse({ ...valid, cover_letter: 'no' }).success).toBe(false);
  });

  it('accepts empty optional fields', () => {
    expect(
      JobApplicationSchema.safeParse({ ...valid, phone: '', linkedin_url: '' }).success,
    ).toBe(true);
  });
});
