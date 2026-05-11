'use client';
import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { LangSwitcher } from './LangSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface MobileMenuButtonProps {
  navItems: { label: string; href: string }[];
  servicesLabel: string;
  contactLabel: string;
  servicesItems: { slug: string; title: string }[];
}

export function MobileMenuButton({
  navItems,
  servicesLabel,
  contactLabel,
  servicesItems,
}: MobileMenuButtonProps) {
  const [open, setOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  // Lock body scroll when menu is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Hamburger button — only shown on mobile (md:hidden) */}
      <button
        type="button"
        aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
      >
        <span
          className={`block h-px w-5 bg-foreground origin-center transition-transform duration-300 ${
            open ? 'translate-y-[5px] rotate-45' : ''
          }`}
        />
        <span
          className={`block h-px w-5 bg-foreground transition-opacity duration-300 ${
            open ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-px w-5 bg-foreground origin-center transition-transform duration-300 ${
            open ? '-translate-y-[5px] -rotate-45' : ''
          }`}
        />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-x-0 top-14 z-30 border-b border-border bg-background transition-all duration-300 md:hidden ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col divide-y divide-border overflow-y-auto max-h-[calc(100dvh-3.5rem)]">
          {/* Services accordion */}
          <div>
            <button
              type="button"
              className="flex w-full items-center justify-between px-5 py-4 text-base font-medium text-foreground"
              onClick={() => setServicesOpen((v) => !v)}
            >
              <span>{servicesLabel}</span>
              <span
                className={`text-muted-foreground transition-transform duration-200 ${
                  servicesOpen ? 'rotate-180' : ''
                }`}
              >
                ▾
              </span>
            </button>
            {servicesOpen && (
              <ul className="border-t border-border bg-muted/30 px-5 py-2">
                {servicesItems.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/hizmetler/${s.slug}`}
                      onClick={() => setOpen(false)}
                      className="block py-2.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Regular nav items */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as never}
              onClick={() => setOpen(false)}
              className="flex items-center px-5 py-4 text-base font-medium text-foreground hover:text-accent"
            >
              {item.label}
            </Link>
          ))}

          {/* Contact CTA */}
          <div className="p-5">
            <Link
              href="/iletisim"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-1.5 bg-accent px-4 py-3 text-sm font-medium text-accent-foreground"
            >
              {contactLabel} <span>→</span>
            </Link>
          </div>

          {/* Lang + theme */}
          <div className="flex items-center justify-between px-5 py-4">
            <LangSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </>
  );
}
