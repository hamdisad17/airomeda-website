import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { listCaseStudies } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

export async function CaseStudies({ locale }: { locale: Locale }) {
  const cases = (await listCaseStudies(locale)).sort((a, b) => b.year - a.year).slice(0, 3);
  if (cases.length === 0) return null;
  const t = await getTranslations({ locale, namespace: 'home.selected_work' });

  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container as="div">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-eyebrow uppercase text-accent">{'// 08 · çalışmalarımız'}</p>
            <h2 className="mt-4 text-display-2 font-semibold tracking-tight">{t('title')}</h2>
          </div>
          <Link
            href="/calismalarimiz"
            className="hidden font-mono text-sm text-muted-foreground hover:text-accent transition-colors md:inline-block"
          >
            tümünü gör →
          </Link>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <li key={c.slug} className="bg-background">
              <Reveal delay={i * 80}>
                <Link
                  href={`/calismalarimiz/${c.slug}`}
                  className="group block h-full p-7 transition-colors hover:bg-muted/40"
                >
                  <p className="font-mono text-eyebrow uppercase text-accent">{c.client}</p>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                    {c.metrics.slice(0, 2).map((m) => (
                      <span key={m.label} className="flex items-baseline gap-1.5">
                        <span className="text-base font-semibold text-foreground tabular-nums">{m.value}</span>
                        <span>{m.label}</span>
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 font-mono text-xs uppercase text-muted-foreground transition-colors group-hover:text-accent">
                    [ open ] <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
