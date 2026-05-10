import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

export async function CTABlock() {
  const t = await getTranslations('home.cta');
  const tc = await getTranslations('common');
  return (
    <section className="relative">
      <Container as="div" className="py-32 md:py-44">
        <div className="border-t border-border pt-16">
          <Reveal>
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">
              {'// 09 — start'}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="mt-6 max-w-4xl font-medium tracking-tight"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
              }}
            >
              {t('title')} <span className="text-muted-foreground">{t('subtitle')}</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/iletisim"
                className="group inline-flex items-center gap-3 rounded-md bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_-8px_hsl(48_100%_50%_/_0.5)]"
              >
                {tc('primary_cta')}
                <span className="transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <span className="font-mono text-xs text-muted-foreground">
                {'// hello@airomeda.com'}
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
