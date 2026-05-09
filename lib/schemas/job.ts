import { z } from 'zod';

export const JobFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  location: z.string().min(1),
  department: z.string().min(1),
  employment_type: z.enum(['full-time', 'part-time', 'contract', 'internship']),
  posted_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  requirements: z.array(z.string().min(1)).min(1),
  responsibilities: z.array(z.string().min(1)).min(1),
  benefits: z.array(z.string().min(1)).min(1),
  active: z.boolean().default(true),
});

export type JobFrontmatter = z.infer<typeof JobFrontmatterSchema>;
