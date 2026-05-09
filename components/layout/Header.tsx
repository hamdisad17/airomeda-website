import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Logo } from './Logo';
import { LangSwitcher } from './LangSwitcher';
import { Container } from './Container';
import { MegaMenu } from './MegaMenu';
import type { Locale } from '@/i18n/routing';

export async function Header() {
  const t = await getTranslations('nav');
  const locale = (await getLocale()) as Locale;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container as="div" className="flex h-16 items-center justify-between">
        <Logo href="/" />
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          <MegaMenu locale={locale} />
          <Link href="/calismalarimiz" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t('work')}
          </Link>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t('blog')}
          </Link>
          <Link href="/hakkimizda" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t('about')}
          </Link>
          <Link href="/kariyer" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t('careers')}
          </Link>
          <Link href="/iletisim" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            {t('contact')}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitcher />
        </div>
      </Container>
    </header>
  );
}
