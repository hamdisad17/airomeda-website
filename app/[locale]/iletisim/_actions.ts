'use server';

import { runFormAction } from '@/lib/server/form-action-helper';
import { ContactFormSchema } from '@/lib/schemas/forms';
import { sendMail } from '@/lib/mail';
import { insertLead } from '@/lib/db';
import type { FormActionResult } from '@/lib/schemas/forms';

export async function submitContact(input: {
  name: string;
  email: string;
  company?: string;
  message: string;
  turnstileToken: string;
}): Promise<FormActionResult> {
  return runFormAction({
    schema: ContactFormSchema,
    data: input,
    turnstileToken: input.turnstileToken,
    async handler(parsed, { ip }) {
      // Persist lead first — never let a DB error block the email send
      try {
        insertLead({
          type: 'contact',
          name: parsed.name,
          email: parsed.email,
          payload: parsed,
          ip,
        });
      } catch (err) {
        console.error('[lead-insert] contact', err);
      }

      const to = process.env.CONTACT_TO ?? 'sales@airomeda.com';
      const subject = `Yeni iletişim — ${parsed.name}`;
      const text = [
        `İsim: ${parsed.name}`,
        `E-posta: ${parsed.email}`,
        parsed.company ? `Şirket: ${parsed.company}` : null,
        '',
        parsed.message,
      ]
        .filter(Boolean)
        .join('\n');

      // Notify internal
      await sendMail({ to, subject, text, replyTo: parsed.email });

      // Confirm to user
      await sendMail({
        to: parsed.email,
        subject: 'Mesajınızı aldık',
        text: `Merhaba ${parsed.name},\n\nMesajınızı aldık. 24 saat içinde dönüş yapacağız.\n\nAiromeda Ekibi`,
      });
    },
  });
}
