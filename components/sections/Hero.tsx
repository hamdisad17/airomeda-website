import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { KineticHeadline } from '@/components/sections/KineticHeadline';
import { AiroOrb } from '@/components/visuals/AiroOrb';

export async function Hero() {
  const t = await getTranslations();
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[92vh] cosmic-bg shooting-stars"
    >
      <div aria-hidden className="absolute inset-0 stars-bg pointer-events-none" />
      <div aria-hidden className="absolute inset-0 neon-grid pointer-events-none opacity-30 mix-blend-screen" />

      {/* Floating cosmic orbs as decorative planets */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 left-[8%] w-24 h-24 cosmic-orb opacity-80 hidden md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-32 right-[6%] w-16 h-16 cosmic-orb opacity-70 hidden md:block"
        style={{ animationDelay: '2s' }}
      />

      {/* Big violet glow blob (planet aura) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[36rem] w-[36rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgb(168 85 247 / 0.35), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-32 h-[32rem] w-[32rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgb(0 212 255 / 0.30), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <Container as="div" className="relative pt-20 pb-24 md:pt-32 md:pb-36">
        <div className="grid items-center gap-12 lg:gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0 text-center lg:text-left">
            {/* Eyebrow pill — glass with cyan ping */}
            <span className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-1.5 text-eyebrow uppercase tracking-wider relative z-10">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-neon-cyan)] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-neon-cyan)]" />
              </span>
              <span className="text-foreground">{t('home.hero.eyebrow') || 'Yapay Zeka · Gelecek · Şimdi'}</span>
            </span>

            <KineticHeadline
              words={t.raw('home.hero.kinetic_words') as string[]}
              connector={t('home.hero.kinetic_connector')}
              tailLine={t('home.hero.title')}
            />

            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-base md:text-body-lg text-muted-foreground leading-relaxed">
              {t('home.hero.subtitle')}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <MagneticButton>
                <Link
                  href="/iletisim"
                  className="group relative inline-flex items-center gap-2 px-7 py-4 text-sm md:text-base font-semibold text-white overflow-hidden rounded-full transition-all duration-300 ease-[var(--ease-out-quint)] glow-cyan-md hover:glow-cyan-lg"
                  style={{
                    background:
                      'linear-gradient(120deg, var(--color-neon-cyan) 0%, var(--color-neon-violet) 100%)',
                  }}
                >
                  <span className="relative z-10">{t('common.primary_cta')}</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </MagneticButton>
              <Link
                href="/calismalarimiz"
                className="group inline-flex items-center gap-2 glass-panel rounded-full px-7 py-4 text-sm md:text-base font-medium text-foreground transition-all hover:text-[var(--color-neon-cyan)]"
              >
                {t('common.secondary_cta')}
              </Link>
            </div>

            {/* Trust dots — minimal */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs md:text-sm text-muted-foreground">
              {['11 yıl deneyim', '36 uzman ekip', '130+ ülke', '7/24 destek'].map((label) => (
                <span key={label} className="flex items-center gap-1.5">
                  <span className="text-neon font-semibold">✦</span>
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Mascot — Airo character with cosmic halo */}
          <div className="relative flex items-center justify-center">
            <AiroOrb className="w-[24rem] h-[24rem] md:w-[40rem] md:h-[40rem]" />
          </div>
        </div>
      </Container>

      {/* Bottom edge gradient line */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-neon-violet) 30%, var(--color-neon-cyan) 70%, transparent)',
          opacity: 0.5,
        }}
      />
    </section>
  );
}
