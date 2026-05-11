import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { StaggerGrid } from '@/components/motion/StaggerGrid';
import { TiltCard } from '@/components/motion/TiltCard';
import { listCaseStudies } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

export async function CaseStudies({ locale }: { locale: Locale }) {
  const cases = (await listCaseStudies(locale)).sort((a, b) => b.year - a.year);
  if (cases.length === 0) return null;

  const featured = cases[0]!;
  const rest = cases.slice(1, 3);
  const t = await getTranslations({ locale, namespace: 'home.selected_work' });

  return (
    <section id="case-studies" className="border-b border-border py-24 md:py-32">
      <Container as="div">
        <RevealSection>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">
                Başarı Hikayeleri
              </p>
              <h2 className="mt-4 text-display-2 font-semibold tracking-tight">{t('title')}</h2>
            </div>
            <Link
              href="/calismalarimiz"
              className="hidden text-xs uppercase tracking-wider text-accent hover:underline md:inline-block"
            >
              Tüm çalışmalar →
            </Link>
          </div>
        </RevealSection>

        {/* Featured case */}
        <RevealSection delay={0.1}>
          <TiltCard className="mt-16" intensity={2}>
          <Link
            href={`/calismalarimiz/${featured.slug}`}
            className="group block border border-border bg-elevated transition-colors hover:border-accent"
          >
            <div className="grid gap-0 lg:grid-cols-12">
              <div className="p-8 lg:col-span-7 md:p-12">
                <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">{featured.client}</p>
                <h3 className="mt-4 text-display-3 font-semibold tracking-tight">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-xl text-body-lg text-muted-foreground">
                  {featured.excerpt}
                </p>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
                  <span>{featured.industry}</span>
                  <span>·</span>
                  <span>{featured.year}</span>
                  <span>·</span>
                  <span>{featured.services.join(' · ')}</span>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase text-foreground transition-colors group-hover:text-accent">
                  [ case study ]{' '}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
              <div className="border-t border-border bg-muted/40 p-8 md:p-12 lg:col-span-5 lg:border-l lg:border-t-0">
                <ul className="grid grid-cols-2 gap-x-6 gap-y-8">
                  {featured.metrics.slice(0, 4).map((m) => (
                    <li key={m.label}>
                      <p className="font-mono text-2xl font-semibold tracking-tight tabular-nums text-foreground">
                        {m.value}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">{m.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
          </TiltCard>
        </RevealSection>

        {/* Remaining two */}
        {rest.length > 0 && (
          <StaggerGrid className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((c) => (
              <TiltCard
                data-stagger-item
                key={c.slug}
                intensity={3}
              >
                <Link
                  href={`/calismalarimiz/${c.slug}`}
                  className="group block border border-border bg-elevated p-8 transition-colors hover:border-accent"
                >
                  <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">{c.client}</p>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-x-4 text-xs text-muted-foreground">
                    <span>{c.industry}</span>
                    <span>·</span>
                    <span>{c.year}</span>
                  </div>
                </Link>
              </TiltCard>
            ))}
          </StaggerGrid>
        )}
      </Container>
    </section>
  );
}
