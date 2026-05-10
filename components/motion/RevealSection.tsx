'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type Props = React.HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'article';
  delay?: number;
};

export function RevealSection({ as: As = 'div', delay = 0, className, children, ...rest }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        delay,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      },
    );
  }, { scope: ref });
  return (
    <As ref={ref as never} className={className} {...rest}>
      {children}
    </As>
  );
}
