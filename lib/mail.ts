import nodemailer, { type Transporter } from 'nodemailer';

let cachedTransporter: Transporter | null = null;
let transporterReady = false;

function getTransporter(): Transporter | null {
  if (cachedTransporter || transporterReady) return cachedTransporter;
  transporterReady = true;
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) {
    return null;
  }
  cachedTransporter = nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: { user, pass },
  });
  return cachedTransporter;
}

export function isMailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS,
  );
}

type Attachment = { filename: string; content: Buffer; contentType?: string };

export async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  attachments?: Attachment[];
}): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) {
    throw new Error('SMTP not configured');
  }
  const from = process.env.MAIL_FROM ?? 'Airomeda <noreply@airomeda.com>';
  await transporter.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    replyTo: opts.replyTo,
    attachments: opts.attachments,
  });
}
