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
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur">
      <Container as="div" className="flex h-16 items-center justify-between">
        <Logo href="/" />
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          <MegaMenu locale={locale} />
          {(
            [
              { href: '/calismalarimiz' as const, label: t('work') },
              { href: '/blog' as const, label: t('blog') },
              { href: '/hakkimizda' as const, label: t('about') },
              { href: '/kariyer' as const, label: t('careers') },
            ] as const
          ).map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="font-display text-sm text-ink/80 hover:text-coral transition-colors"
              style={{ fontVariationSettings: "'opsz' 24, 'wdth' 100, 'wght' 500" }}
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <LangSwitcher />
          <Link
            href="/iletisim"
            className="hidden md:inline-block bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-coral transition-colors"
          >
            {t('contact')}
          </Link>
        </div>
      </Container>
    </header>
  );
}
