import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Logo } from './Logo';
import { LangSwitcher } from './LangSwitcher';
import { Container } from './Container';

export async function Header() {
  const t = await getTranslations('nav');
  const items = [
    { href: '/hizmetler' as const, label: t('services') },
    { href: '/calismalarimiz' as const, label: t('work') },
    { href: '/blog' as const, label: t('blog') },
    { href: '/hakkimizda' as const, label: t('about') },
    { href: '/kariyer' as const, label: t('careers') },
    { href: '/iletisim' as const, label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container as="div" className="flex h-16 items-center justify-between">
        <Logo href="/" />
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitcher />
        </div>
      </Container>
    </header>
  );
}
