import * as React from 'react';

interface PullquoteProps {
  children: React.ReactNode;
  attribution?: string;
  role?: string;
}

export function Pullquote({ children, attribution, role }: PullquoteProps) {
  return (
    <blockquote className="relative border-l-2 border-accent pl-8 py-4 my-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-px top-0 bottom-0"
        style={{ background: 'linear-gradient(to bottom, hsl(189 100% 50% / 0.4), hsl(189 100% 50% / 0.05))' }}
      />
      <p
        className="text-xl md:text-2xl font-semibold tracking-tight text-foreground leading-snug"
        style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
      >
        <span className="text-accent">&ldquo;</span>
        {children}
        <span className="text-accent">&rdquo;</span>
      </p>
      {attribution && (
        <footer className="mt-4 font-mono text-xs text-muted-foreground uppercase tracking-wider">
          — {attribution}
          {role && <span className="text-muted-foreground/60"> · {role}</span>}
        </footer>
      )}
    </blockquote>
  );
}
