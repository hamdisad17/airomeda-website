import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(150),
  company: z.string().max(150).optional().or(z.literal('')),
  message: z.string().min(20).max(5000),
  turnstileToken: z.string().min(1),
});

export const DemoRequestSchema = ContactFormSchema.extend({
  service: z.enum([
    'finance',
    'gaming',
    'ecommerce',
    'integration',
    'seo-ads',
    'social-media',
    'crm',
  ]),
});

export const JobApplicationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(150),
  phone: z.string().max(40).optional().or(z.literal('')),
  linkedin_url: z.string().url().max(500).optional().or(z.literal('')),
  cover_letter: z.string().min(50).max(5000),
  job_slug: z.string().min(1).max(100),
  turnstileToken: z.string().min(1),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;
export type DemoRequestInput = z.infer<typeof DemoRequestSchema>;
export type JobApplicationInput = z.infer<typeof JobApplicationSchema>;

export type FormActionResult =
  | { ok: true }
  | {
      ok: false;
      error: 'validation' | 'turnstile' | 'rate_limit' | 'server' | 'config';
      message?: string;
      fieldErrors?: Record<string, string[]>;
    };
