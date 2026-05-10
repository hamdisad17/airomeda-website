import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ href, className }: { href: string; className?: string }) {
  return (
    <Link href={href} aria-label="Airomeda" className={cn('group inline-flex items-center gap-2', className)}>
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-accent-foreground text-sm font-bold">A</span>
      <span className="text-base font-semibold tracking-tight text-foreground">Airomeda</span>
    </Link>
  );
}
