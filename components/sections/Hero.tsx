import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

export async function Hero() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <section className="relative overflow-hidden">
      {/* ambient accent glow — extremely subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[640px] w-[640px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, hsl(48 100% 50% / 0.08) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      <Container as="div" className="relative grid gap-16 py-20 md:py-32 lg:grid-cols-12 lg:gap-12 lg:py-40">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="mb-8 inline-flex items-center gap-3 font-mono text-eyebrow uppercase text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              <span>v.{year}.05</span>
              <span className="text-muted-foreground/50">/</span>
              <span>İstanbul</span>
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-display-1 font-medium tracking-tight">
              {t('home.hero.title')}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-body-lg text-muted-foreground">
              {t('home.hero.subtitle')}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Link
                href="/iletisim"
                className="group relative inline-flex items-center gap-3 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-all duration-200 ease-[var(--ease-out-quint)] hover:-translate-y-px hover:shadow-[0_4px_20px_-4px_hsl(48_100%_50%_/_0.4)]"
              >
                {t('common.primary_cta')}
                <span className="transition-transform duration-200 ease-[var(--ease-out-quint)] group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/calismalarimiz"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                <span className="border-b border-border transition-colors group-hover:border-accent">
                  {t('common.secondary_cta')}
                </span>
                <span className="transition-transform duration-200 ease-[var(--ease-out-quint)] group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right rail: code-spec card */}
        <Reveal delay={320} className="lg:col-span-4">
          <div className="relative rounded-lg border border-border bg-muted/40 p-6 backdrop-blur-sm">
            <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            <p className="mb-4 font-mono text-eyebrow uppercase text-muted-foreground">{'// system spec'}</p>
            <dl className="space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">disciplines</dt>
                <dd className="text-foreground">7</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">production</dt>
                <dd className="text-foreground">2018→{year}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">stack</dt>
                <dd className="text-accent">multi-runtime</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">delivery</dt>
                <dd className="text-foreground">8–16 wk</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">status</dt>
                <dd className="inline-flex items-center gap-2 text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  active
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </Container>

      {/* hairline divider with dot */}
      <div className="relative h-px w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/60" />
      </div>
    </section>
  );
}
