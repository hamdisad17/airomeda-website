import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ href, className }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      aria-label="Airomeda"
      className={cn('group inline-flex items-center gap-2 font-semibold tracking-tight', className)}
    >
      <span className="grid h-7 w-7 place-items-center bg-accent text-accent-foreground text-sm font-bold">
        A
      </span>
      <span className="text-base text-foreground">airomeda</span>
    </Link>
  );
}
