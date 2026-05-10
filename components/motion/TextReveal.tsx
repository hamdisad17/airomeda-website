'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
};

export function TextReveal({ children, className, as: As = 'span', delay = 0, stagger = 0.06 }: Props) {
  const ref = React.useRef<HTMLElement>(null);
  const words = children.split(' ');

  useGSAP(() => {
    if (!ref.current) return;
    const spans = ref.current.querySelectorAll('.word > span');
    const rect = ref.current.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight * 0.9;

    if (inViewport) {
      gsap.fromTo(
        spans,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger, ease: 'power3.out', delay },
      );
    } else {
      gsap.fromTo(
        spans,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger,
          ease: 'power3.out',
          delay,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    }
  }, { scope: ref });

  return React.createElement(
    As,
    { ref: ref as never, className },
    words.map((w, i) => (
      <span key={i} className="word" style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'baseline' }}>
        <span style={{ display: 'inline-block', willChange: 'transform' }}>{w}</span>
        {i < words.length - 1 && ' '}
      </span>
    )),
  );
}
