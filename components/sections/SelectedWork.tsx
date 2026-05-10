import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { listCaseStudies } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export async function SelectedWork({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'home.selected_work' });
  const cases = (await listCaseStudies(locale)).sort((a, b) => b.year - a.year);
  const featured = cases[0];
  if (!featured) return null;

  return (
    <section className="relative">
      <Container as="div" className="py-24 md:py-32">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">
              {'// 04 — selected work'}
            </p>
            <h2
              className="mt-4 font-medium tracking-tight"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1,
                letterSpacing: '-0.025em',
              }}
            >
              {t('title')}
            </h2>
          </div>
          <Link
            href="/calismalarimiz"
            className="hidden font-mono text-xs text-accent hover:underline md:inline-block"
          >
            view all →
          </Link>
        </div>

        <Reveal>
          <Link href={`/calismalarimiz/${featured.slug}`} className="group block">
            <div className="grid gap-12 border-t border-border pt-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-mono text-eyebrow uppercase text-accent">{featured.client}</p>
                <h3
                  className="mt-4 font-medium tracking-tight"
                  style={{
                    fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.025em',
                  }}
                >
                  {featured.title}
                </h3>
                <p className="mt-6 max-w-xl text-body-lg text-muted-foreground">
                  {featured.excerpt}
                </p>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-eyebrow uppercase text-muted-foreground">
                  <span>{featured.industry}</span>
                  <span>·</span>
                  <span>{featured.year}</span>
                  <span>·</span>
                  <span>{featured.services.join(' · ')}</span>
                </div>
                <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
                  case study
                  <span className="transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>

              <div className="lg:col-span-5">
                <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
                  {featured.metrics.slice(0, 4).map((m) => (
                    <li key={m.label} className="bg-background p-6">
                      <p className="font-mono text-eyebrow uppercase text-muted-foreground">
                        {m.label}
                      </p>
                      <p className="mt-3 font-mono text-3xl font-medium text-accent tabular-nums">
                        {m.value}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
