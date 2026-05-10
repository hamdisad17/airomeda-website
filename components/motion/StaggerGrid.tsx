'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type Props = React.HTMLAttributes<HTMLDivElement> & {
  itemSelector?: string;
  stagger?: number;
  yFrom?: number;
};

export function StaggerGrid({
  itemSelector = '[data-stagger-item]',
  stagger = 0.08,
  yFrom = 24,
  children,
  className,
  ...rest
}: Props) {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(itemSelector);
    gsap.fromTo(
      items,
      { y: yFrom, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none none' },
      },
    );
  }, { scope: ref });

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
