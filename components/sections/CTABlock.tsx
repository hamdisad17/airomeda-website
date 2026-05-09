import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export async function CTABlock() {
  const t = await getTranslations('home.cta');
  const tc = await getTranslations('common');

  return (
    <section>
      <Container as="div" className="py-20">
        <div className="rounded-lg border border-border bg-muted/30 p-10 text-center md:p-16">
          <h2 className="text-display-2 font-semibold tracking-tight">{t('title')}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t('subtitle')}</p>
          <div className="mt-8 flex justify-center">
            <Link href="/iletisim" className={cn(buttonVariants({ size: 'lg' }))}>
              {tc('primary_cta')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
