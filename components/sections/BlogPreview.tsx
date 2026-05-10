import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { listBlogPosts } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&w=1200&q=85';

export async function BlogPreview({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = (await listBlogPosts(locale))
    .sort((a, b) => b.published_at.localeCompare(a.published_at))
    .slice(0, 3);

  return (
    <section className="bg-paper py-24 md:py-32">
      <Container as="div" className="mb-16 flex items-end justify-between">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.2em] text-ink/60">
            — Notes · 08
          </p>
          <h2
            className="font-display mt-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              fontVariationSettings: "'opsz' 96, 'wdth' 100, 'wght' 500",
            }}
          >
            {t('title')}
          </h2>
        </div>
        <Link
          href="/blog"
          className="hidden font-display text-xs uppercase tracking-[0.2em] text-ink/70 hover:text-coral md:inline-block"
        >
          all notes →
        </Link>
      </Container>
      <Container as="div">
        {posts.length > 0 ? (
          <ul className="grid gap-x-6 gap-y-12 md:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="img-cine relative aspect-[4/3] overflow-hidden bg-bone">
                    <Image
                      src={FALLBACK_IMG}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="mt-5 font-display text-xs uppercase tracking-[0.2em] text-ink/60">
                    {p.categories.join(' · ')} ·{' '}
                    {new Date(p.published_at).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </p>
                  <h3
                    className="font-display mt-3 transition-colors group-hover:text-coral"
                    style={{
                      fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.015em',
                      fontVariationSettings: "'opsz' 36, 'wdth' 100, 'wght' 500",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink/60">{t('no_posts')}</p>
        )}
      </Container>
    </section>
  );
}
