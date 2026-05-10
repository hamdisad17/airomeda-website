import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';

export async function CTASection() {
  const t = await getTranslations('home.cta');
  const tc = await getTranslations('common');
  return (
    <section className="relative overflow-hidden bg-foreground text-background py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(circle at 50% 0%, hsl(244 76% 59% / 0.4), transparent 60%)' }}
      />
      <Container as="div" className="relative text-center">
        <h2 className="mx-auto max-w-3xl text-display-1 font-semibold tracking-tight">
          {t('title')} <span className="text-accent">{t('subtitle')}</span>
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-all duration-200 hover:bg-[hsl(244_76%_53%)] hover:shadow-[0_8px_30px_-4px_hsl(244_76%_59%_/_0.5)]"
          >
            {tc('primary_cta')} <span>→</span>
          </Link>
          <a href="mailto:hello@airomeda.com" className="text-sm text-background/80 hover:text-accent">
            hello@airomeda.com
          </a>
        </div>
      </Container>
    </section>
  );
}
