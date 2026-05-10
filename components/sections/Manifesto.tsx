import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { WordReveal } from '@/components/ui/WordReveal';

export async function Manifesto() {
  const t = await getTranslations('home.manifesto');
  return (
    <section className="bg-paper py-32 md:py-44">
      <Container as="div">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-ink/60">
              — Manifesto · 01
            </p>
          </div>
          <div className="lg:col-span-9">
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.035em',
                fontVariationSettings: "'opsz' 96, 'wdth' 100, 'wght' 500",
              }}
            >
              <WordReveal>{t('lead')}</WordReveal>
            </h2>
            <p
              className="mt-12 max-w-3xl text-ink/70"
              style={{ fontSize: 'clamp(1.125rem, 1.6vw, 1.4rem)', lineHeight: 1.55 }}
            >
              {t('extension')}
            </p>
            <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-3">
              {(['p1', 'p2', 'p3'] as const).map((k, i) => (
                <div key={k} className="border-t-2 border-ink pt-5">
                  <p
                    className="font-display text-coral"
                    style={{
                      fontSize: '3rem',
                      lineHeight: 1,
                      fontVariationSettings: "'opsz' 36, 'wdth' 75, 'wght' 700",
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p
                    className="mt-4 font-display text-xl"
                    style={{ fontVariationSettings: "'opsz' 24, 'wdth' 100, 'wght' 500" }}
                  >
                    {t(`${k}_title`)}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{t(`${k}_body`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
