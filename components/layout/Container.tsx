import { cn } from '@/lib/utils';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'header' | 'footer' | 'main';
};

export function Container({ as: As = 'div', className, ...rest }: Props) {
  return <As className={cn('container', className)} {...rest} />;
}
