import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ href, className }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      aria-label="Airomeda anasayfa"
      className={cn('inline-flex items-center', className)}
    >
      {/* Dark mode logo (default) */}
      <Image
        src="/brand/logo-dark.png"
        alt="Airomeda"
        width={1277}
        height={211}
        priority
        className="h-8 w-auto md:h-9 block light:hidden"
      />
      {/* Light mode logo */}
      <Image
        src="/brand/logo-light.png"
        alt="Airomeda"
        width={1408}
        height={232}
        priority
        className="h-8 w-auto md:h-9 hidden light:block"
      />
    </Link>
  );
}
