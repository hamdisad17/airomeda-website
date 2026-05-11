'use client';
import * as React from 'react';
import Image from 'next/image';

interface MarqueeItem { src: string; title: string; client: string; duration: string; }
const ITEMS: MarqueeItem[] = [
  { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', title: 'Bankacılık Platformu', client: 'PayGate', duration: '3:42' },
  { src: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=600&q=80', title: 'Oyun Platformu', client: 'Bahis.io', duration: '4:12' },
  { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80', title: 'E-Ticaret Mağazası', client: 'Hubert', duration: '2:48' },
  { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', title: 'Sistem Entegrasyonu', client: 'Entegrasys', duration: '3:18' },
];

export function HoverVideoMarquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-elevated/40 py-8">
      <div className="flex w-max gap-4 animate-marquee-slow">
        {[...ITEMS, ...ITEMS].map((it, i) => (
          <div key={i} className="group relative w-80 flex-shrink-0 cursor-pointer border border-border bg-background overflow-hidden">
            <div className="relative aspect-video overflow-hidden">
              <Image src={it.src} alt="" fill className="object-cover grayscale-[50%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110" sizes="320px" unoptimized/>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-14 w-14 border-2 border-accent bg-elevated/60 backdrop-blur-md flex items-center justify-center">
                  <span className="ml-1" style={{ borderLeft: '10px solid #14B8A6', borderTop: '6px solid transparent', borderBottom: '6px solid transparent' }}/>
                </div>
              </div>
            </div>
            <div className="p-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-accent">{it.client}</p>
                <p className="mt-0.5 text-sm font-semibold tracking-tight text-foreground">{it.title}</p>
              </div>
              <p className="text-[10px] text-muted-foreground tabular-nums">{it.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
