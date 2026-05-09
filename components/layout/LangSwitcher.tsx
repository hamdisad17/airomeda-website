'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const LABELS: Record<string, string> = { tr: 'TR', en: 'EN' };

export function LangSwitcher({ className }: { className?: string }) {
  const current = useLocale();
  const pathname = usePathname();

  return (
    <div className={cn('flex items-center gap-1 text-xs font-medium', className)}>
      {(['tr', 'en'] as const).map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          aria-current={current === loc ? 'page' : undefined}
          className={cn(
            'rounded px-2 py-1 transition-colors',
            current === loc
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {LABELS[loc]}
        </Link>
      ))}
    </div>
  );
}
