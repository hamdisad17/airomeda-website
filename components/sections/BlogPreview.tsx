import { Container } from '@/components/layout/Container';
import { Link } from '@/i18n/navigation';
import { listBlogPosts } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { BlogCard } from '@/components/blog/BlogCard';

export async function BlogPreview({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = (await listBlogPosts(locale))
    .sort((a, b) => b.published_at.localeCompare(a.published_at))
    .slice(0, 3);

  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-display-2 font-semibold tracking-tight">{t('title')}</h2>
          <Link href="/blog" className="text-sm font-medium text-accent hover:underline">
            {t('all_categories')} →
          </Link>
        </div>
        {posts.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">{t('no_posts')}</p>
        )}
      </Container>
    </section>
  );
}
