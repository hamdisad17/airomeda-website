import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

export async function Manifesto() {
  const t = await getTranslations('home.manifesto');
  return (
    <section className="relative bg-muted py-24 md:py-44">
      <Container as="div">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-3">
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">— Manifesto</p>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-9">
            <p
              className="font-display"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
                lineHeight: 1.18,
                letterSpacing: '-0.018em',
                fontVariationSettings: "'opsz' 72, 'SOFT' 30, 'wght' 400",
              }}
            >
              <span>{t('lead')}</span>
              <span className="text-muted-foreground"> {t('extension')}</span>
            </p>

            <div className="mt-16 grid gap-10 md:grid-cols-3">
              <div className="border-t border-border pt-6">
                <p
                  className="font-display"
                  style={{ fontSize: '2.5rem', lineHeight: 1, fontVariationSettings: "'opsz' 36, 'SOFT' 20, 'wght' 400" }}
                >01</p>
                <p className="mt-4 font-medium">{t('p1_title')}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('p1_body')}</p>
              </div>
              <div className="border-t border-border pt-6">
                <p
                  className="font-display"
                  style={{ fontSize: '2.5rem', lineHeight: 1, fontVariationSettings: "'opsz' 36, 'SOFT' 20, 'wght' 400" }}
                >02</p>
                <p className="mt-4 font-medium">{t('p2_title')}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('p2_body')}</p>
              </div>
              <div className="border-t border-border pt-6">
                <p
                  className="font-display"
                  style={{ fontSize: '2.5rem', lineHeight: 1, fontVariationSettings: "'opsz' 36, 'SOFT' 20, 'wght' 400" }}
                >03</p>
                <p className="mt-4 font-medium">{t('p3_title')}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t('p3_body')}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
