import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Logo } from './Logo';
import { LangSwitcher } from './LangSwitcher';
import { Container } from './Container';
import { MegaMenu } from './MegaMenu';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import type { Locale } from '@/i18n/routing';

export async function Header() {
  const t = await getTranslations('nav');
  const locale = (await getLocale()) as Locale;
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <Container as="div" className="flex h-14 items-center justify-between">
        <Logo href="/" />
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          <MegaMenu locale={locale} />
          <Link
            href="/calismalarimiz"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t('work')}
          </Link>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t('blog')}
          </Link>
          <Link
            href="/hakkimizda"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t('about')}
          </Link>
          <Link
            href="/kariyer"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t('careers')}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitcher />
          <ThemeToggle />
          <Link
            href="/iletisim"
            className="hidden md:inline-flex items-center gap-1.5 bg-accent px-3.5 py-2 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90"
          >
            Konuşalım <span>→</span>
          </Link>
        </div>
      </Container>
    </header>
  );
}
