import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { TerminalDemo } from '@/components/mockups/TerminalDemo';
import { ParticleField } from '@/components/visuals/ParticleField';
import { FlowField } from '@/components/visuals/FlowField';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { KineticHeadline } from '@/components/sections/KineticHeadline';
import { RecentShipments } from '@/components/sections/RecentShipments';

export async function Hero() {
  const t = await getTranslations();
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border mesh-bg"
    >
      {/* Animated neon grid + brand flow field + particles, layered */}
      <div aria-hidden className="absolute inset-0 neon-grid pointer-events-none" />
      <FlowField />
      <ParticleField />

      {/* Glow blobs add image-#10-style violet+cyan depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgb(168 85 247 / 0.30), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgb(0 212 255 / 0.22), transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <Container as="div" className="relative pt-16 pb-20 md:pt-32 md:pb-36">
        <div className="grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
          <div className="min-w-0">
            <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-border bg-elevated/50 backdrop-blur-sm px-3 py-1 text-eyebrow uppercase tracking-wider">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              <span className="text-foreground">11 yıl</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">36 uzman · 130+ ülke</span>
            </span>

            <KineticHeadline
              words={t.raw('home.hero.kinetic_words') as string[]}
              connector={t('home.hero.kinetic_connector')}
              tailLine={t('home.hero.title')}
            />

            <p className="mt-5 max-w-xl text-base md:text-body-lg text-muted-foreground">
              {t('home.hero.subtitle')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton>
                <Link
                  href="/iletisim"
                  className="btn-brand hover:btn-brand-hover group inline-flex items-center gap-2 rounded-xl px-5 py-3 md:px-6 md:py-3.5 text-sm font-semibold"
                >
                  {t('common.primary_cta')}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </MagneticButton>
              <Link
                href="/calismalarimiz"
                className="group inline-flex items-center gap-2 rounded-xl border border-border bg-elevated/40 px-5 py-3 md:px-6 md:py-3.5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
              >
                {t('common.secondary_cta')}
              </Link>
            </div>

            {/* Trust mini-line */}
            <div className="mt-10 flex flex-wrap items-center gap-x-4 md:gap-x-8 gap-y-1.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="text-accent">✓</span>
                <span>11 yıl deneyim</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-accent">✓</span>
                <span>36 kişilik ekip</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-accent">✓</span>
                <span>130+ ülkeye hizmet</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-accent">✓</span>
                <span>7/24 destek</span>
              </span>
            </div>

            {/* Recent shipments rotating indicator */}
            <RecentShipments />
          </div>

          {/* Terminal demo — wrapped in glass + neon halo (image #10 vibe) */}
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-3xl opacity-60"
              style={{
                background:
                  'radial-gradient(ellipse 70% 70% at 50% 50%, rgb(0 212 255 / 0.28), rgb(168 85 247 / 0.20) 50%, transparent 75%)',
                filter: 'blur(30px)',
              }}
            />
            <div className="relative glass-panel rounded-2xl overflow-hidden glow-cyan-sm">
              <TerminalDemo />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
