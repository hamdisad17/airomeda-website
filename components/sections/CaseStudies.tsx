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
            <p className="text-xs font-medium uppercase tracking-wider text-accent">Çalışmalarımız</p>
            <h2 className="mt-3 text-display-2 font-semibold tracking-tight">{t('title')}</h2>
          </div>
          <Link href="/calismalarimiz" className="hidden text-sm font-medium text-accent hover:underline md:inline-block">
            Tümünü gör →
          </Link>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 80}>
                <Link
                  href={`/calismalarimiz/${c.slug}`}
                  className="group block rounded-xl border border-border bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-accent">{c.client}</p>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                    {c.metrics.slice(0, 2).map((m) => (
                      <span key={m.label} className="flex items-baseline gap-1.5">
                        <span className="text-base font-semibold text-foreground tabular-nums">{m.value}</span>
                        <span>{m.label}</span>
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
