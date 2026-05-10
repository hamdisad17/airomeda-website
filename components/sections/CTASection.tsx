import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { TextReveal } from '@/components/motion/TextReveal';
import { MagneticButton } from '@/components/motion/MagneticButton';

export async function CTASection() {
  const t = await getTranslations('home.cta');
  const tc = await getTranslations('common');
  return (
    <section id="cta" className="relative overflow-hidden border-t border-border py-32 md:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 animate-cta-pulse"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 30%, hsl(189 100% 50% / 0.25), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(189 100% 50% / 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 80%)',
        }}
      />

      <Container as="div" className="relative">
        <p className="font-mono text-eyebrow uppercase text-accent">{'// 09 · konuşalım'}</p>
        <h2
          className="mt-8 max-w-5xl text-display-1 font-semibold tracking-tight"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          <TextReveal as="span">{t('title')}</TextReveal>
          <br />
          <span className="text-accent">
            <TextReveal as="span" delay={0.4}>{t('subtitle')}</TextReveal>
          </span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <MagneticButton>
            <Link
              href="/iletisim"
              className="group inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all duration-200 hover:shadow-[0_0_40px_-5px_hsl(189_100%_50%_/_0.6)]"
            >
              {tc('primary_cta')} <span>→</span>
            </Link>
          </MagneticButton>
          <a
            href="mailto:hello@airomeda.com"
            className="font-mono text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            hello@airomeda.com →
          </a>
        </div>

        <div className="mt-20 grid gap-x-12 gap-y-6 border-t border-border pt-10 font-mono text-xs text-muted-foreground md:grid-cols-3">
          <div>
            <p className="text-foreground">İlk görüşme</p>
            <p className="mt-1">30 dk ücretsiz · kapsam değerlendirme</p>
          </div>
          <div>
            <p className="text-foreground">NDA</p>
            <p className="mt-1">İki yönlü imzalama · veri sıkıdır</p>
          </div>
          <div>
            <p className="text-foreground">Cevap süresi</p>
            <p className="mt-1">24 saat içinde · hello@airomeda.com</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
