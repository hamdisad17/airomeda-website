'use client';
import * as React from 'react';
import gsap from 'gsap';

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  strength?: number;
};

export function MagneticButton({ children, strength = 25, className, ...rest }: Props) {
  const wrap = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: x * (strength / 100), y: y * (strength / 100), duration: 0.6, ease: 'power3.out' });
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [strength]);

  return (
    <span ref={wrap} className={className} style={{ display: 'inline-block' }} {...rest}>
      {children}
    </span>
  );
}
