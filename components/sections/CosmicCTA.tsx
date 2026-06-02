import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { AiroOrb } from '@/components/visuals/AiroOrb';

export async function CosmicCTA() {
  const t = await getTranslations();
  return (
    <section className="relative overflow-hidden py-24 md:py-32 cosmic-bg shooting-stars">
      <div aria-hidden className="absolute inset-0 stars-bg pointer-events-none" />

      {/* Giant central glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-[40rem] w-[40rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgb(168 85 247 / 0.30) 0%, rgb(0 212 255 / 0.20) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <Container as="div" className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.7fr] max-w-5xl mx-auto">
          <div className="text-center lg:text-left">
            <p className="text-eyebrow uppercase tracking-wider neon-text-cyan font-semibold">
              Sıra sizde
            </p>
            <h2
              className="mt-5 font-semibold tracking-tight text-foreground"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.02,
              }}
            >
              Geleceği <span className="text-neon">birlikte inşa</span> edelim.
            </h2>
            <p className="mt-6 text-base md:text-body-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              İlk görüşmemiz ücretsiz. İhtiyaçlarınızı 30 dakikada konuşur,
              size özel bir yol haritası çıkartırız.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link
                href="/iletisim"
                className="group relative inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-full transition-all duration-300 glow-cyan-md hover:glow-cyan-lg"
                style={{
                  background:
                    'linear-gradient(120deg, var(--color-neon-cyan) 0%, var(--color-neon-violet) 100%)',
                }}
              >
                {t('common.primary_cta')}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/fiyatlar"
                className="inline-flex items-center gap-2 glass-panel rounded-full px-8 py-4 text-base font-medium text-foreground transition-all hover:text-[var(--color-neon-cyan)]"
              >
                Fiyatlara göz at
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <AiroOrb className="w-72 h-72 md:w-[26rem] md:h-[26rem]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
