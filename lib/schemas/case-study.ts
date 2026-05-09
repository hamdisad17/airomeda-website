import { z } from 'zod';

export const MetricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const TestimonialSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  role: z.string().min(1),
});

export const CaseStudyFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  client: z.string().min(1),
  industry: z.string().min(1),
  year: z.number().int().min(2000).max(2100),
  services: z.array(z.string().min(1)).min(1),
  hero_image: z.string().min(1),
  excerpt: z.string().min(1),
  metrics: z.array(MetricSchema).min(1).max(6),
  testimonial: TestimonialSchema.optional(),
  gallery: z.array(z.string()).default([]),
  related_cases: z.array(z.string()).default([]),
});

export type CaseStudyFrontmatter = z.infer<typeof CaseStudyFrontmatterSchema>;
