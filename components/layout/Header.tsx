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

  const links = [
    { href: '/calismalarimiz' as const, label: t('work') },
    { href: '/blog' as const, label: t('blog') },
    { href: '/hakkimizda' as const, label: t('about') },
    { href: '/kariyer' as const, label: t('careers') },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <Container as="div" className="flex h-14 items-center justify-between">
        <Logo href="/" />
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          <MegaMenu locale={locale} />
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LangSwitcher />
          <Link
            href="/iletisim"
            className="hidden rounded-md border border-border px-3 py-1.5 text-sm font-medium text-foreground transition-all duration-200 ease-[var(--ease-out-quint)] hover:-translate-y-px hover:border-accent hover:text-accent md:inline-block"
          >
            {t('contact')}
          </Link>
        </div>
      </Container>
    </header>
  );
}
