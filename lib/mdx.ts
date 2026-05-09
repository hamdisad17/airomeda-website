import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
  ServiceFrontmatterSchema,
  type ServiceFrontmatter,
} from '@/lib/schemas/service';
import {
  PageFrontmatterSchema,
  type PageFrontmatter,
} from '@/lib/schemas/page';
import {
  CaseStudyFrontmatterSchema,
  type CaseStudyFrontmatter,
} from '@/lib/schemas/case-study';
import {
  BlogPostFrontmatterSchema,
  type BlogPostFrontmatter,
} from '@/lib/schemas/blog-post';
import { JobFrontmatterSchema, type JobFrontmatter } from '@/lib/schemas/job';
import type { Locale } from '@/i18n/routing';

let CONTENT_ROOT = path.join(process.cwd(), 'content');

export function __setContentRootForTests(root: string) {
  CONTENT_ROOT = root;
}

async function readMdxFile(filePath: string): Promise<{ data: unknown; content: string } | null> {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return matter(raw);
  } catch {
    return null;
  }
}

export async function loadServiceFrontmatter(
  slug: string,
  locale: Locale,
): Promise<ServiceFrontmatter | null> {
  const file = path.join(CONTENT_ROOT, 'services', locale, `${slug}.mdx`);
  const parsed = await readMdxFile(file);
  if (!parsed) return null;
  const result = ServiceFrontmatterSchema.safeParse(parsed.data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${file}: ${result.error.message}`);
  }
  return result.data;
}

export async function loadServiceContent(
  slug: string,
  locale: Locale,
): Promise<{ frontmatter: ServiceFrontmatter; body: string } | null> {
  const file = path.join(CONTENT_ROOT, 'services', locale, `${slug}.mdx`);
  const parsed = await readMdxFile(file);
  if (!parsed) return null;
  const result = ServiceFrontmatterSchema.safeParse(parsed.data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${file}: ${result.error.message}`);
  }
  return { frontmatter: result.data, body: parsed.content };
}

export async function listServices(locale: Locale): Promise<ServiceFrontmatter[]> {
  const dir = path.join(CONTENT_ROOT, 'services', locale);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  const slugs = entries
    .filter((e) => e.endsWith('.mdx') && !e.startsWith('_'))
    .map((e) => e.replace(/\.mdx$/, ''));
  const all = await Promise.all(slugs.map((s) => loadServiceFrontmatter(s, locale)));
  return all.filter((x): x is ServiceFrontmatter => x !== null);
}

export async function loadPageContent(
  slug: string,
  locale: Locale,
): Promise<{ frontmatter: PageFrontmatter; body: string } | null> {
  const file = path.join(CONTENT_ROOT, 'pages', locale, `${slug}.mdx`);
  const parsed = await readMdxFile(file);
  if (!parsed) return null;
  const result = PageFrontmatterSchema.safeParse(parsed.data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${file}: ${result.error.message}`);
  }
  return { frontmatter: result.data, body: parsed.content };
}

// ---------------------------------------------------------------------------
// Case Studies
// ---------------------------------------------------------------------------

export async function loadCaseStudyContent(
  slug: string,
  locale: Locale,
): Promise<{ frontmatter: CaseStudyFrontmatter; body: string } | null> {
  const file = path.join(CONTENT_ROOT, 'case-studies', locale, `${slug}.mdx`);
  const parsed = await readMdxFile(file);
  if (!parsed) return null;
  const result = CaseStudyFrontmatterSchema.safeParse(parsed.data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${file}: ${result.error.message}`);
  }
  return { frontmatter: result.data, body: parsed.content };
}

export async function listCaseStudies(locale: Locale): Promise<CaseStudyFrontmatter[]> {
  const dir = path.join(CONTENT_ROOT, 'case-studies', locale);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  const slugs = entries
    .filter((e) => e.endsWith('.mdx') && !e.startsWith('_'))
    .map((e) => e.replace(/\.mdx$/, ''));
  const all = await Promise.all(
    slugs.map(async (s) => {
      const file = path.join(dir, `${s}.mdx`);
      const parsed = await readMdxFile(file);
      if (!parsed) return null;
      const result = CaseStudyFrontmatterSchema.safeParse(parsed.data);
      return result.success ? result.data : null;
    }),
  );
  return all.filter((x): x is CaseStudyFrontmatter => x !== null);
}

// ---------------------------------------------------------------------------
// Blog Posts
// ---------------------------------------------------------------------------

export async function loadBlogPostContent(
  slug: string,
  locale: Locale,
): Promise<{ frontmatter: BlogPostFrontmatter; body: string } | null> {
  const file = path.join(CONTENT_ROOT, 'blog', locale, `${slug}.mdx`);
  const parsed = await readMdxFile(file);
  if (!parsed) return null;
  const result = BlogPostFrontmatterSchema.safeParse(parsed.data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${file}: ${result.error.message}`);
  }
  return { frontmatter: result.data, body: parsed.content };
}

export async function listBlogPosts(locale: Locale): Promise<BlogPostFrontmatter[]> {
  const dir = path.join(CONTENT_ROOT, 'blog', locale);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  const slugs = entries
    .filter((e) => e.endsWith('.mdx') && !e.startsWith('_'))
    .map((e) => e.replace(/\.mdx$/, ''));
  const all = await Promise.all(
    slugs.map(async (s) => {
      const file = path.join(dir, `${s}.mdx`);
      const parsed = await readMdxFile(file);
      if (!parsed) return null;
      const result = BlogPostFrontmatterSchema.safeParse(parsed.data);
      return result.success ? result.data : null;
    }),
  );
  return all.filter((x): x is BlogPostFrontmatter => x !== null);
}

export async function listBlogCategories(locale: Locale): Promise<string[]> {
  const posts = await listBlogPosts(locale);
  const set = new Set<string>();
  for (const p of posts) for (const c of p.categories) set.add(c);
  return Array.from(set).sort();
}

// ---------------------------------------------------------------------------
// Jobs
// ---------------------------------------------------------------------------

export async function loadJobContent(
  slug: string,
  locale: Locale,
): Promise<{ frontmatter: JobFrontmatter; body: string } | null> {
  const file = path.join(CONTENT_ROOT, 'jobs', locale, `${slug}.mdx`);
  const parsed = await readMdxFile(file);
  if (!parsed) return null;
  const result = JobFrontmatterSchema.safeParse(parsed.data);
  if (!result.success) {
    throw new Error(`Invalid frontmatter in ${file}: ${result.error.message}`);
  }
  return { frontmatter: result.data, body: parsed.content };
}

export async function listJobs(locale: Locale): Promise<JobFrontmatter[]> {
  const dir = path.join(CONTENT_ROOT, 'jobs', locale);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  const slugs = entries
    .filter((e) => e.endsWith('.mdx') && !e.startsWith('_'))
    .map((e) => e.replace(/\.mdx$/, ''));
  const all = await Promise.all(
    slugs.map(async (s) => {
      const file = path.join(dir, `${s}.mdx`);
      const parsed = await readMdxFile(file);
      if (!parsed) return null;
      const result = JobFrontmatterSchema.safeParse(parsed.data);
      return result.success ? result.data : null;
    }),
  );
  return all.filter((x): x is JobFrontmatter => x !== null);
}
