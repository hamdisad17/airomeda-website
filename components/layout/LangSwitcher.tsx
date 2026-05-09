'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const LABELS: Record<string, string> = { tr: 'TR', en: 'EN' };

export function LangSwitcher({ className }: { className?: string }) {
  const current = useLocale();
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className={cn('flex items-center gap-1 text-xs font-medium', className)}>
      {(['tr', 'en'] as const).map((loc) => (
        <Link
          key={loc}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          href={{ pathname: pathname as any, params: params as any }}
          locale={loc}
          aria-current={current === loc ? 'page' : undefined}
          className={cn(
            'rounded px-2 py-1 transition-colors',
            current === loc ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {LABELS[loc]}
        </Link>
      ))}
    </div>
  );
}
