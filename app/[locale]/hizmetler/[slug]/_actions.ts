'use server';

import { runFormAction } from '@/lib/server/form-action-helper';
import { DemoRequestSchema } from '@/lib/schemas/forms';
import { sendMail } from '@/lib/mail';
import { insertLead } from '@/lib/db';
import type { FormActionResult } from '@/lib/schemas/forms';

export async function submitDemoRequest(input: {
  name: string;
  email: string;
  company?: string;
  message: string;
  service: 'finance' | 'gaming' | 'ecommerce' | 'integration' | 'seo-ads' | 'social-media' | 'crm' | 'corporate-web';
  turnstileToken: string;
}): Promise<FormActionResult> {
  return runFormAction({
    schema: DemoRequestSchema,
    data: input,
    turnstileToken: input.turnstileToken,
    async handler(parsed, { ip }) {
      try {
        insertLead({
          type: 'demo',
          name: parsed.name,
          email: parsed.email,
          payload: parsed,
          ip,
          serviceSlug: parsed.service,
        });
      } catch (err) {
        console.error('[lead-insert] demo', err);
      }

      const to = process.env.CONTACT_TO ?? 'sales@airomeda.com';
      await sendMail({
        to,
        subject: `Demo talebi (${parsed.service}) — ${parsed.name}`,
        text: [
          `Hizmet: ${parsed.service}`,
          `İsim: ${parsed.name}`,
          `E-posta: ${parsed.email}`,
          parsed.company ? `Şirket: ${parsed.company}` : null,
          '',
          parsed.message,
        ]
          .filter(Boolean)
          .join('\n'),
        replyTo: parsed.email,
      });
      await sendMail({
        to: parsed.email,
        subject: 'Demo talebiniz alındı',
        text: `Merhaba ${parsed.name},\n\nDemo talebinizi aldık. 24 saat içinde size dönüş yapacağız.\n\nAiromeda Ekibi`,
      });
    },
  });
}
