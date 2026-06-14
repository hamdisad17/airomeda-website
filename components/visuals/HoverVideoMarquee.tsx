'use client';
import * as React from 'react';
import Image from 'next/image';

interface MarqueeItem { src: string; title: string; client: string; duration: string; }
const ITEMS: MarqueeItem[] = [
  { src: '/cases/fortuneris-hero.svg', title: 'Yatırım Platformu', client: 'Fortuneris', duration: '3:42' },
  { src: '/cases/topratebet-hero.svg', title: 'iGaming Platformu', client: 'TopRateBet', duration: '4:12' },
  { src: '/cases/airomeda-markets-hero.svg', title: 'Pazaryeri SaaS', client: 'Airomeda Markets', duration: '2:48' },
  { src: '/cases/airomedata-hero.svg', title: 'Lead Bulma Platformu', client: 'Airomedata', duration: '3:18' },
];

export function HoverVideoMarquee() {
  return (
    <div className="overflow-hidden border-y border-border bg-elevated/40 py-8">
      <div className="flex w-max gap-4 animate-marquee-slow">
        {[...ITEMS, ...ITEMS].map((it, i) => (
          <div key={i} className="group relative w-80 flex-shrink-0 cursor-pointer border border-border bg-background overflow-hidden">
            <div className="relative aspect-video overflow-hidden">
              <Image src={it.src} alt={`${it.client} — ${it.title}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="320px" unoptimized/>
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
