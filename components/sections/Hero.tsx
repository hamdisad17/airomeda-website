import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';
import { TerminalDemo } from '@/components/mockups/TerminalDemo';

export async function Hero() {
  const t = await getTranslations();
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Subtle accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(189 100% 50% / 0.18), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <Container as="div" className="relative pt-20 pb-24 md:pt-32 md:pb-36">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 border border-border px-3 py-1 font-mono text-eyebrow uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                <span className="text-foreground">v.2026.05</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">production</span>
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-8 text-display-1 font-semibold tracking-tight">
                {t('home.hero.title')}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-body-lg text-muted-foreground">
                {t('home.hero.subtitle')}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/iletisim"
                  className="group inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-all duration-200 ease-[var(--ease-out-quint)] hover:opacity-90 hover:shadow-[0_0_30px_-5px_hsl(189_100%_50%_/_0.5)]"
                >
                  {t('common.primary_cta')}
                  <span>→</span>
                </Link>
                <Link
                  href="/calismalarimiz"
                  className="group inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {t('common.secondary_cta')}
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={320}>
            <TerminalDemo />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
