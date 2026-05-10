import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { GradientMesh } from '@/components/visuals/GradientMesh';
import { FinanceDashboard } from '@/components/mockups/FinanceDashboard';

export async function Hero() {
  const t = await getTranslations();
  return (
    <section className="relative overflow-hidden border-b border-border">
      <GradientMesh />
      <Container as="div" className="relative pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"></span>
                </span>
                Production-grade · Türkiye
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-display-1 font-semibold tracking-tight">
                {t('home.hero.title')}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-lg text-body-lg text-muted-foreground">
                {t('home.hero.subtitle')}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-all duration-200 ease-[var(--ease-out-quint)] hover:bg-[hsl(244_76%_53%)] hover:shadow-[0_8px_20px_-4px_hsl(244_76%_59%_/_0.4)]"
                >
                  {t('common.primary_cta')}
                  <span>→</span>
                </Link>
                <Link
                  href="/calismalarimiz"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {t('common.secondary_cta')}
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={320}>
            <FinanceDashboard />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
