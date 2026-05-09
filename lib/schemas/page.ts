import { z } from 'zod';

export const PageFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
});

export type PageFrontmatter = z.infer<typeof PageFrontmatterSchema>;
