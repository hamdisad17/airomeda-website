'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delayPerWord?: number;
  baseDelay?: number;
};

export function WordReveal({
  children,
  className,
  as: As = 'span',
  delayPerWord = 80,
  baseDelay = 0,
}: Props) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = children.split(' ');

  return (
    <As ref={ref as never} className={cn('inline-block', className)}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline">
          <span
            style={{
              transitionDelay: `${baseDelay + i * delayPerWord}ms`,
              transform: visible ? 'translateY(0)' : 'translateY(110%)',
              opacity: visible ? 1 : 0,
              transition:
                'transform 900ms var(--ease-out-quint), opacity 900ms var(--ease-out-quint)',
              display: 'inline-block',
              willChange: 'transform',
            }}
          >
            {w}
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </As>
  );
}
