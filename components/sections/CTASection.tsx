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
          background:
            'radial-gradient(ellipse 55% 50% at 35% 25%, rgb(20 184 166 / 0.28), transparent 70%), radial-gradient(ellipse 50% 45% at 72% 35%, rgb(129 140 248 / 0.22), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, rgb(20 184 166 / 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 80%)',
        }}
      />

      <Container as="div" className="relative">
        <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">İletişim</p>
        <h2
          className="mt-8 max-w-5xl text-display-1 font-semibold tracking-tight"
          style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
        >
          <TextReveal as="span">{t('title')}</TextReveal>
          <br />
          <span className="text-gradient">
            <TextReveal as="span" delay={0.4}>{t('subtitle')}</TextReveal>
          </span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <MagneticButton>
            <Link
              href="/iletisim"
              className="btn-brand hover:btn-brand-hover group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold"
            >
              {tc('primary_cta')} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </MagneticButton>
          <a
            href="mailto:brief@airomeda.com"
            className="font-mono text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            brief@airomeda.com →
          </a>
        </div>

        <div className="mt-20 grid gap-x-12 gap-y-6 border-t border-border pt-10 text-xs text-muted-foreground md:grid-cols-3">
          <div>
            <p className="text-foreground">İlk görüşme</p>
            <p className="mt-1">30 dk ücretsiz · ihtiyaçlarınızı dinleriz · hızlı değerlendirme</p>
          </div>
          <div>
            <p className="text-foreground">Yanıt süresi</p>
            <p className="mt-1">24 saat içinde · hello@airomeda.com</p>
          </div>
          <div>
            <p className="text-foreground">Destek</p>
            <p className="mt-1">7/24 destek · 130+ ülkeye hizmet · Türkçe ve İngilizce</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
