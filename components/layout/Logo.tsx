import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  className?: string;
};

export function Logo({ href, className }: Props) {
  return (
    <Link
      href={href}
      aria-label="Airomeda"
      className={cn(
        'group inline-flex items-baseline gap-0 text-base font-medium tracking-tight',
        className,
      )}
    >
      <span className="font-mono text-foreground">airomeda</span>
      <span
        className="ml-px inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-accent transition-transform duration-200 ease-[var(--ease-out-quint)] group-hover:scale-125"
      />
    </Link>
  );
}
