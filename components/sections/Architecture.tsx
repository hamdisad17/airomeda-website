'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/layout/Container';

gsap.registerPlugin(ScrollTrigger);

const NODES = [
  { name: 'PSP / Card',     x: 20, y: 20 },
  { name: 'KYC / AML',     x: 80, y: 20 },
  { name: 'Core Banking',  x: 8,  y: 50 },
  { name: 'ERP / WMS',     x: 92, y: 50 },
  { name: 'Gaming Eng.',   x: 20, y: 80 },
  { name: 'BDDK / TCMB',   x: 80, y: 80 },
  { name: 'CDP / Analytics', x: 50, y: 10 },
  { name: 'Ad Platforms',  x: 50, y: 90 },
];

export function Architecture() {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const lines = ref.current.querySelectorAll<SVGPathElement>('.conn-line');
      const dots = ref.current.querySelectorAll<SVGCircleElement>('.conn-dot');
      const centerCircle = ref.current.querySelector<SVGCircleElement>('.center-pulse');

      gsap.set(lines, { strokeDashoffset: 300, strokeDasharray: 300 });
      gsap.to(lines, {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      gsap.fromTo(
        dots,
        { scale: 0, opacity: 0, transformOrigin: 'center center' },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        },
      );

      if (centerCircle) {
        gsap.to(centerCircle, {
          scale: 1.3,
          opacity: 0.4,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: '50px 50px',
        });
      }
    },
    { scope: ref },
  );

  return (
    <section className="border-b border-border bg-muted/30 py-24 md:py-32">
      <Container as="div">
      <div ref={ref}>
        <div className="mb-16 max-w-3xl">
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 04 · integration'}</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
            Mevcut yığınınızla konuşur, vermek istediğiniz şey kadar veri alır.
          </h2>
          <p className="mt-4 text-body-lg text-muted-foreground">
            8 yıllık yapılandırılmış entegrasyon deneyimi. PSP, KYC, ERP, core banking, gaming
            providers, regülatör bağlantıları — production&apos;da hepsi bizim üzerimizden geçti.
          </p>
        </div>

        <div className="relative aspect-[2/1] w-full border border-border bg-background overflow-hidden">
          {/* SVG lines and dots */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            {NODES.map((n, i) => {
              const cx = (50 + n.x) / 2;
              const cy = (50 + n.y) / 2 - 8;
              return (
                <path
                  key={`line-${i}`}
                  className="conn-line"
                  d={`M50,50 Q${cx},${cy} ${n.x},${n.y}`}
                  stroke="hsl(189 100% 50%)"
                  strokeWidth="0.15"
                  strokeOpacity="0.55"
                  fill="none"
                />
              );
            })}
            {NODES.map((n, i) => (
              <circle
                key={`dot-${i}`}
                className="conn-dot"
                cx={n.x}
                cy={n.y}
                r="0.8"
                fill="hsl(189 100% 50%)"
              />
            ))}
            {/* Pulsing outer ring */}
            <circle
              className="center-pulse"
              cx="50"
              cy="50"
              r="4.5"
              fill="none"
              stroke="hsl(189 100% 50%)"
              strokeWidth="0.4"
              strokeOpacity="0.6"
            />
            {/* Solid center dot */}
            <circle
              cx="50"
              cy="50"
              r="2.5"
              fill="hsl(189 100% 50%)"
              stroke="hsl(189 100% 50% / 0.3)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Node labels positioned over SVG */}
          {NODES.map((n, i) => (
            <div
              key={`label-${i}`}
              className="absolute font-mono text-xs text-muted-foreground"
              style={{
                left: `${n.x}%`,
                top: `${n.y}%`,
                transform: 'translate(-50%, calc(-50% - 20px))',
              }}
            >
              <span className="border border-border bg-background px-2 py-1 whitespace-nowrap">
                {n.name}
              </span>
            </div>
          ))}

          {/* Center label */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-4 text-center">
            <p className="font-semibold tracking-tight">
              airomeda<span className="text-accent">.</span>
            </p>
            <p className="font-mono text-xs text-muted-foreground">core platform</p>
          </div>
        </div>
      </div>
      </Container>
    </section>
  );
}
