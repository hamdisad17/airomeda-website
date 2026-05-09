import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  href: string;
  className?: string;
  variant?: 'wordmark' | 'monogram';
};

export function Logo({ href, className, variant = 'wordmark' }: Props) {
  return (
    <Link
      href={href}
      aria-label="Airomeda"
      className={cn('group inline-flex items-center gap-2 font-bold tracking-tight', className)}
    >
      <span
        aria-hidden
        className="grid h-7 w-7 place-items-center rounded-md bg-accent text-accent-foreground"
      >
        <span className="text-sm">A</span>
      </span>
      {variant === 'wordmark' && (
        <span className="text-lg leading-none">
          airomeda<span className="text-accent">.</span>
        </span>
      )}
    </Link>
  );
}
