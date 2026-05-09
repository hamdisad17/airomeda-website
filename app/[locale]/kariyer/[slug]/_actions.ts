'use server';

import { headers } from 'next/headers';
import { JobApplicationSchema } from '@/lib/schemas/forms';
import { sendMail } from '@/lib/mail';
import { verifyTurnstile, isTurnstileConfigured } from '@/lib/turnstile';
import { isMailConfigured } from '@/lib/mail';
import { formRateLimiter } from '@/lib/rate-limit';
import type { FormActionResult } from '@/lib/schemas/forms';

const MAX_CV_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export async function submitJobApplication(formData: FormData): Promise<FormActionResult> {
  if (!isMailConfigured() || !isTurnstileConfigured()) {
    return {
      ok: false,
      error: 'config',
      message: 'Form henüz aktif değil. careers@airomeda.com adresine yazabilirsiniz.',
    };
  }

  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') ?? '',
    linkedin_url: formData.get('linkedin_url') ?? '',
    cover_letter: formData.get('cover_letter'),
    job_slug: formData.get('job_slug'),
    turnstileToken: formData.get('turnstileToken'),
  };

  const parsed = JobApplicationSchema.safeParse(data);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.');
      (fieldErrors[path] ??= []).push(issue.message);
    }
    return { ok: false, error: 'validation', fieldErrors };
  }

  const cv = formData.get('cv');
  if (!(cv instanceof File) || cv.size === 0) {
    return { ok: false, error: 'validation', fieldErrors: { cv: ['cv_required'] } };
  }
  if (cv.size > MAX_CV_SIZE) {
    return { ok: false, error: 'validation', fieldErrors: { cv: ['cv_size'] } };
  }
  if (!ALLOWED_TYPES.has(cv.type)) {
    return { ok: false, error: 'validation', fieldErrors: { cv: ['cv_type'] } };
  }

  // IP + rate limit
  const h = await headers();
  const ip =
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? h.get('x-real-ip') ?? '0.0.0.0';
  if (!formRateLimiter.hit(ip)) {
    return { ok: false, error: 'rate_limit', message: 'Çok fazla deneme.' };
  }

  if (!(await verifyTurnstile(parsed.data.turnstileToken, ip))) {
    return { ok: false, error: 'turnstile', message: 'Doğrulama başarısız.' };
  }

  try {
    const cvBytes = Buffer.from(await cv.arrayBuffer());
    const to = process.env.CAREERS_TO ?? 'careers@airomeda.com';
    await sendMail({
      to,
      subject: `Başvuru — ${parsed.data.job_slug} — ${parsed.data.name}`,
      text: [
        `Pozisyon: ${parsed.data.job_slug}`,
        `İsim: ${parsed.data.name}`,
        `E-posta: ${parsed.data.email}`,
        parsed.data.phone ? `Telefon: ${parsed.data.phone}` : null,
        parsed.data.linkedin_url ? `LinkedIn: ${parsed.data.linkedin_url}` : null,
        '',
        '--- Ön yazı ---',
        parsed.data.cover_letter,
      ]
        .filter(Boolean)
        .join('\n'),
      replyTo: parsed.data.email,
      attachments: [
        {
          filename: cv.name,
          content: cvBytes,
          contentType: cv.type,
        },
      ],
    });
    await sendMail({
      to: parsed.data.email,
      subject: 'Başvurunuzu aldık',
      text: `Merhaba ${parsed.data.name},\n\nBaşvurunuzu aldık. Uygunluğunuz değerlendirilince size dönüş yapacağız.\n\nAiromeda Ekibi`,
    });
    return { ok: true };
  } catch (err) {
    console.error('[submitJobApplication]', err);
    return { ok: false, error: 'server', message: 'Beklenmeyen bir hata oluştu.' };
  }
}
