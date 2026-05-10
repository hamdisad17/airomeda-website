import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

export async function Manifesto() {
  const t = await getTranslations('home.manifesto');
  return (
    <section className="relative">
      <Container as="div" className="py-32 md:py-44">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="font-mono text-eyebrow uppercase text-muted-foreground sticky top-32">
              {'// 00 — manifesto'}
            </p>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-9">
            <p
              className="font-medium tracking-tight"
              style={{
                fontSize: 'clamp(1.75rem, 3.6vw, 3.25rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.022em',
              }}
            >
              {t('lead')}{' '}
              <span className="text-muted-foreground">{t('extension')}</span>
            </p>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="border-t border-border pt-5">
                <p className="font-mono text-eyebrow uppercase text-accent">{'/ 01'}</p>
                <p className="mt-3 font-medium">{t('p1_title')}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t('p1_body')}</p>
              </div>
              <div className="border-t border-border pt-5">
                <p className="font-mono text-eyebrow uppercase text-accent">{'/ 02'}</p>
                <p className="mt-3 font-medium">{t('p2_title')}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t('p2_body')}</p>
              </div>
              <div className="border-t border-border pt-5">
                <p className="font-mono text-eyebrow uppercase text-accent">{'/ 03'}</p>
                <p className="mt-3 font-medium">{t('p3_title')}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t('p3_body')}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
