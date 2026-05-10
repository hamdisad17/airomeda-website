'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function CountUp({ end, duration = 2, decimals = 0, suffix = '', prefix = '', className }: Props) {
  const ref = React.useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const target = { val: 0 };
    gsap.to(target, {
      val: end,
      duration,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      onUpdate() {
        if (ref.current) ref.current.textContent = prefix + target.val.toFixed(decimals) + suffix;
      },
    });
  }, { scope: ref });

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
