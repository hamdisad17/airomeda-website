import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { TextReveal } from '@/components/motion/TextReveal';
import { MagneticButton } from '@/components/motion/MagneticButton';

export async function CTASection() {
  const t = await getTranslations('home.cta');
  const tc = await getTranslations('common');
  return (
    <section className="relative overflow-hidden border-t border-border py-32 md:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, hsl(180 45% 55% / 0.08), transparent 70%)',
        }}
      />

      <Container as="div" className="relative">
        <p className="text-eyebrow uppercase text-muted-foreground">07 — Start a conversation</p>
        <h2
          className="mt-8 max-w-5xl text-display-1 font-medium tracking-tight"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          <TextReveal as="span">{t('title')}</TextReveal>
          <br />
          <span className="text-accent">
            <TextReveal as="span" delay={0.4}>
              {t('subtitle')}
            </TextReveal>
          </span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <MagneticButton>
            <Link
              href="/iletisim"
              className="group inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all duration-300 ease-[var(--ease-out-quint)]"
            >
              {tc('primary_cta')} <span>→</span>
            </Link>
          </MagneticButton>
          <a
            href="mailto:hello@airomeda.com"
            className="text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            hello@airomeda.com
          </a>
        </div>

        <div className="mt-20 grid gap-x-12 gap-y-6 border-t border-border pt-10 text-sm text-muted-foreground md:grid-cols-3">
          <div>
            <p className="text-foreground font-medium">İlk görüşme</p>
            <p className="mt-1">30 dk ücretsiz · kapsam değerlendirme</p>
          </div>
          <div>
            <p className="text-foreground font-medium">NDA</p>
            <p className="mt-1">İki yönlü imzalama · veri sıkıdır</p>
          </div>
          <div>
            <p className="text-foreground font-medium">Cevap süresi</p>
            <p className="mt-1">24 saat içinde · hello@airomeda.com</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
