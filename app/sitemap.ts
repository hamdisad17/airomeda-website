import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo/site';
import {
  listServices,
  listCaseStudies,
  listBlogPosts,
  listBlogCategories,
  listJobs,
} from '@/lib/mdx';

type Url = MetadataRoute.Sitemap[number];

function urlFor(path: string, lastModified?: Date): Url {
  const url = `${SITE.url}${path}`;
  const alternates: Record<string, string> = {};
  if (path.startsWith('/tr')) {
    const enPath = path.replace(/^\/tr/, '/en');
    alternates.tr = `${SITE.url}${path}`;
    alternates.en = `${SITE.url}${enPath}`;
    alternates['x-default'] = `${SITE.url}${path}`;
  } else if (path.startsWith('/en')) {
    const trPath = path.replace(/^\/en/, '/tr');
    alternates.tr = `${SITE.url}${trPath}`;
    alternates.en = `${SITE.url}${path}`;
    alternates['x-default'] = `${SITE.url}${trPath}`;
  }
  return {
    url,
    lastModified,
    changeFrequency: 'weekly',
    priority: path === '/tr' || path === '/en' ? 1.0 : 0.7,
    alternates: { languages: alternates },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    '/',
    '/hizmetler',
    '/calismalarimiz',
    '/blog',
    '/kariyer',
    '/hakkimizda',
    '/iletisim',
    '/kvkk',
    '/cerez-politikasi',
  ];

  const urls: Url[] = [];

  for (const locale of SITE.locales) {
    for (const p of staticPaths) {
      const path = p === '/' ? `/${locale}` : `/${locale}${p}`;
      urls.push(urlFor(path));
    }

    const services = await listServices(locale);
    for (const s of services) urls.push(urlFor(`/${locale}/hizmetler/${s.slug}`));

    const cases = await listCaseStudies(locale);
    for (const c of cases) urls.push(urlFor(`/${locale}/calismalarimiz/${c.slug}`));

    const posts = await listBlogPosts(locale);
    for (const p of posts) {
      urls.push(urlFor(`/${locale}/blog/${p.slug}`, new Date(p.published_at)));
    }

    const cats = await listBlogCategories(locale);
    for (const c of cats) urls.push(urlFor(`/${locale}/blog/kategori/${c}`));

    const jobs = (await listJobs(locale)).filter((j) => j.active);
    for (const j of jobs) urls.push(urlFor(`/${locale}/kariyer/${j.slug}`));
  }

  return urls;
}
