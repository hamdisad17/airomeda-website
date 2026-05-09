import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export async function Hero() {
  const t = await getTranslations();

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--accent)/0.18),transparent_55%)]"
      />
      <Container as="div" className="relative py-24 md:py-36">
        <h1 className="max-w-4xl text-display-1 font-bold leading-[1.05] tracking-tight">
          {t('home.hero.title')}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {t('home.hero.subtitle')}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/iletisim" className={cn(buttonVariants({ size: 'lg' }))}>
            {t('common.primary_cta')}
          </Link>
          <Link
            href="/calismalarimiz"
            className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}
          >
            {t('common.secondary_cta')}
          </Link>
        </div>
      </Container>
    </section>
  );
}
