import { getTranslations, getLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Logo } from './Logo';
import { LangSwitcher } from './LangSwitcher';
import { Container } from './Container';
import { MegaMenu } from './MegaMenu';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { CommandPaletteButton } from './CommandPaletteButton';
import { MobileMenuButton } from './MobileMenuButton';
import { listServices } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

export async function Header() {
  const t = await getTranslations('nav');
  const locale = (await getLocale()) as Locale;
  const services = await listServices(locale);

  const navItems = [
    { label: t('work'), href: '/calismalarimiz' },
    { label: t('pricing'), href: '/fiyatlar' },
    { label: t('blog'), href: '/blog' },
    { label: t('about'), href: '/hakkimizda' },
    { label: t('careers'), href: '/kariyer' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-xl">
      <Container as="div" className="flex h-14 items-center justify-between">
        <Logo href="/" />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          <MegaMenu locale={locale} />
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as never}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-3">
          <CommandPaletteButton />
          <LangSwitcher />
          <ThemeToggle />
          <Link
            href="/iletisim"
            className="btn-brand hover:btn-brand-hover group inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold"
          >
            {t('contact')} <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {/* Mobile right side — cmd palette + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <CommandPaletteButton mobile />
          <MobileMenuButton
            navItems={navItems}
            servicesLabel={t('services')}
            contactLabel={t('contact')}
            servicesItems={services.map((s) => ({ slug: s.slug, title: s.title }))}
          />
        </div>
      </Container>
    </header>
  );
}
