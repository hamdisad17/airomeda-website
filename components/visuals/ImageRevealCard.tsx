'use client';
import * as React from 'react';
import Image from 'next/image';

interface ImageRevealCardProps {
  src: string;
  alt: string;
  label?: string;
  caption?: string;
  href?: string;
}

export function ImageRevealCard({ src, alt, label, caption, href }: ImageRevealCardProps) {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag href={href as string | undefined} className="group relative block overflow-hidden bg-elevated border border-border">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={src} alt={alt} fill
          className="object-cover grayscale-[60%] contrast-[1.05] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 33vw"
          unoptimized={src.startsWith('https://')}
        />
        <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{ background: 'linear-gradient(180deg, transparent 50%, hsl(240 10% 3.5% / 0.85))' }}/>
        {label && (
          <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-wider text-foreground bg-elevated/70 backdrop-blur-sm border border-border px-2 py-1">
            {label}
          </span>
        )}
      </div>
      {caption && (
        <div className="p-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-accent">
            {caption}
          </p>
        </div>
      )}
    </Tag>
  );
}
