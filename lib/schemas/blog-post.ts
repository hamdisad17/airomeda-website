import { z } from 'zod';

export const BlogPostFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  cover: z.string().min(1),
  author: z.string().min(1),
  published_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD format required'),
  reading_time: z.number().int().positive(),
  categories: z.array(z.string().min(1)).min(1),
});

export type BlogPostFrontmatter = z.infer<typeof BlogPostFrontmatterSchema>;
