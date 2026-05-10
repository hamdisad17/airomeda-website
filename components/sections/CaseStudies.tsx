import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { StaggerGrid } from '@/components/motion/StaggerGrid';
import { listCaseStudies } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

export async function CaseStudies({ locale }: { locale: Locale }) {
  const cases = (await listCaseStudies(locale)).sort((a, b) => b.year - a.year);
  if (cases.length === 0) return null;

  const featured = cases[0]!;
  const rest = cases.slice(1, 3);
  const t = await getTranslations({ locale, namespace: 'home.selected_work' });

  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container as="div">
        <RevealSection>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-eyebrow uppercase text-muted-foreground">05 — Selected work</p>
              <h2 className="mt-4 text-display-2 font-medium tracking-tight">{t('title')}</h2>
            </div>
            <Link
              href="/calismalarimiz"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-accent md:inline-block"
            >
              All work →
            </Link>
          </div>
        </RevealSection>

        {/* Featured case */}
        <RevealSection delay={0.1}>
          <Link
            href={`/calismalarimiz/${featured.slug}`}
            className="group mt-16 block border border-border bg-elevated transition-colors hover:border-accent"
          >
            <div className="grid gap-0 lg:grid-cols-12">
              <div className="p-8 lg:col-span-7 md:p-12">
                <p className="text-eyebrow uppercase text-accent">{featured.client}</p>
                <h3 className="mt-4 text-display-3 font-medium tracking-tight">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-xl text-body-lg text-muted-foreground">
                  {featured.excerpt}
                </p>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
                  <span>{featured.industry}</span>
                  <span>·</span>
                  <span>{featured.year}</span>
                  <span>·</span>
                  <span>{featured.services.join(' · ')}</span>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-accent">
                  View case study{' '}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
              <div className="border-t border-border bg-muted/40 p-8 md:p-12 lg:col-span-5 lg:border-l lg:border-t-0">
                <ul className="grid grid-cols-2 gap-x-6 gap-y-8">
                  {featured.metrics.slice(0, 4).map((m) => (
                    <li key={m.label}>
                      <p className="text-2xl font-medium tracking-tight tabular-nums text-foreground">
                        {m.value}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">{m.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        </RevealSection>

        {/* Remaining two */}
        {rest.length > 0 && (
          <StaggerGrid className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((c) => (
              <Link
                data-stagger-item
                key={c.slug}
                href={`/calismalarimiz/${c.slug}`}
                className="group block border border-border bg-elevated p-8 transition-colors hover:border-accent"
              >
                <p className="text-eyebrow uppercase text-accent">{c.client}</p>
                <h3 className="mt-3 text-lg font-medium tracking-tight">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-x-4 text-xs text-muted-foreground">
                  <span>{c.industry}</span>
                  <span>·</span>
                  <span>{c.year}</span>
                </div>
              </Link>
            ))}
          </StaggerGrid>
        )}
      </Container>
    </section>
  );
}
