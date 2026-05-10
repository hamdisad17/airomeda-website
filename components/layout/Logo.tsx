import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ href, className }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      aria-label="Airomeda"
      className={cn('group inline-flex items-baseline gap-1 font-display text-lg', className)}
      style={{ fontVariationSettings: "'opsz' 24, 'wdth' 100, 'wght' 600" }}
    >
      <span className="text-ink">airomeda</span>
      <span className="inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-coral transition-transform duration-200 ease-[var(--ease-out-quint)] group-hover:scale-125" />
    </Link>
  );
}
