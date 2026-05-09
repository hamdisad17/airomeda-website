import { cn } from '@/lib/utils';

type Props = {
  variant?: 'info' | 'warn';
  title?: string;
  children: React.ReactNode;
};

export function Callout({ variant = 'info', title, children }: Props) {
  return (
    <div
      className={cn(
        'my-6 rounded-lg border p-4',
        variant === 'info' && 'border-accent/30 bg-accent/10',
        variant === 'warn' && 'border-yellow-500/30 bg-yellow-500/10',
      )}
    >
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  );
}
