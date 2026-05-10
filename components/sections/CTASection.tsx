import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';

export async function CTASection() {
  const t = await getTranslations('home.cta');
  const tc = await getTranslations('common');
  return (
    <section className="relative overflow-hidden border-t border-border py-32 md:py-44">
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, hsl(189 100% 50% / 0.2), transparent 70%)',
        }}
      />
      <Container as="div" className="relative">
        <p className="font-mono text-eyebrow uppercase text-accent">{'// 10 · start'}</p>
        <h2
          className="mt-8 max-w-5xl text-display-1 font-semibold tracking-tight"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          {t('title')} <span className="text-accent">{t('subtitle')}</span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <Link
            href="/iletisim"
            className="group inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_40px_-5px_hsl(189_100%_50%_/_0.5)]"
          >
            {tc('primary_cta')} <span>→</span>
          </Link>
          <a
            href="mailto:hello@airomeda.com"
            className="font-mono text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            hello@airomeda.com
          </a>
        </div>
      </Container>
    </section>
  );
}
