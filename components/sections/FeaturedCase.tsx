import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { listCaseStudies } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

export async function FeaturedCase({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'case_studies' });
  const cases = (await listCaseStudies(locale)).sort((a, b) => b.year - a.year);
  const featured = cases[0];

  if (!featured) {
    return (
      <section className="border-b border-border">
        <Container as="div" className="py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t('title')}
          </p>
          <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/10 p-12 text-center text-muted-foreground">
            (Henüz vaka çalışması eklenmedi.)
          </div>
        </Container>
      </section>
    );
  }

  const headline = featured.metrics[0];

  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t('title')}
        </p>
        <Link
          href={`/calismalarimiz/${featured.slug}`}
          className="mt-6 grid gap-8 rounded-lg border border-border bg-muted/20 p-8 transition-colors hover:border-accent hover:bg-muted/40 md:grid-cols-2 md:p-12"
        >
          <div>
            <p className="text-sm font-semibold text-accent">{featured.client}</p>
            <h3 className="mt-3 text-display-2 font-bold leading-tight tracking-tight">
              {featured.title}
            </h3>
            <p className="mt-4 text-muted-foreground">{featured.excerpt}</p>
            <span className="mt-6 inline-block text-sm font-medium text-accent">Detay →</span>
          </div>
          {headline && (
            <div className="flex flex-col items-start justify-center md:items-end">
              <span className="text-[clamp(3rem,8vw,6rem)] font-bold leading-none text-accent">
                {headline.value}
              </span>
              <span className="mt-3 text-sm text-muted-foreground">{headline.label}</span>
            </div>
          )}
        </Link>
      </Container>
    </section>
  );
}
