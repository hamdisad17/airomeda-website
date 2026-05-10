'use client';
import * as React from 'react';

type TiltCardProps = React.HTMLAttributes<HTMLDivElement> & {
  intensity?: number;
};

export function TiltCard({ children, className = '', intensity = 4, ...rest }: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(1200px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(0)`;
  }
  function onLeave() {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1200px) rotateY(0) rotateX(0) translateZ(0)';
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      {...rest}
    >
      {children}
    </div>
  );
}
