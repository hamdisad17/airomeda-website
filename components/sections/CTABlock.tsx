import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

export async function CTABlock() {
  const t = await getTranslations('home.cta');
  const tc = await getTranslations('common');
  return (
    <section className="relative">
      <Container as="div" className="py-24 md:py-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-lg border border-border bg-muted/30 px-8 py-16 md:px-16 md:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 80% 20%, hsl(48 100% 50% / 0.08) 0%, transparent 50%)',
              }}
            />
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">{'// next step'}</p>
            <h2 className="mt-6 max-w-3xl text-display-2 font-medium tracking-tight">
              {t('title')}
            </h2>
            <p className="mt-4 max-w-xl text-body-lg text-muted-foreground">{t('subtitle')}</p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/iletisim"
                className="group inline-flex items-center gap-3 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-all duration-200 ease-[var(--ease-out-quint)] hover:-translate-y-px hover:shadow-[0_4px_20px_-4px_hsl(48_100%_50%_/_0.4)]"
              >
                {tc('primary_cta')}
                <span className="transition-transform duration-200 ease-[var(--ease-out-quint)] group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
