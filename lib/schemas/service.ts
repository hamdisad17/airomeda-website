import { z } from 'zod';

export const CapabilitySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const FaqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const ServiceFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  hero_subtitle: z.string().min(1),
  capabilities: z.array(CapabilitySchema).min(1),
  tech_stack: z.array(z.string().min(1)).min(1),
  faq: z.array(FaqItemSchema).default([]),
  cta_text: z.string().min(1),
  related_cases: z.array(z.string()).default([]),
});

export type ServiceFrontmatter = z.infer<typeof ServiceFrontmatterSchema>;
