'use client';
import * as React from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  rotate: number;
  colSpan: number;
  aspectClass: string;
  offsetY?: number;
}

const IMAGES: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=85',
    alt: 'Code editor',
    caption: 'Bankacılık Platformu · İstanbul',
    rotate: -1.5,
    colSpan: 5,
    aspectClass: 'aspect-[4/5]',
    offsetY: 0,
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85',
    alt: 'Finance dashboard',
    caption: 'PayGate · Finans Platformu',
    rotate: 1.2,
    colSpan: 4,
    aspectClass: 'aspect-[3/4]',
    offsetY: 80,
  },
  {
    src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=85',
    alt: 'Laptop workspace',
    caption: 'Maslak İstanbul · Kat 12',
    rotate: -1,
    colSpan: 3,
    aspectClass: 'aspect-square',
    offsetY: 40,
  },
  {
    src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&q=85',
    alt: 'Code review session',
    caption: 'sprint review · 28 mühendis',
    rotate: 2,
    colSpan: 4,
    aspectClass: 'aspect-[4/3]',
    offsetY: 120,
  },
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85',
    alt: 'Network infrastructure',
    caption: 'Altyapı · Küresel Ağ',
    rotate: -0.8,
    colSpan: 3,
    aspectClass: 'aspect-[3/4]',
    offsetY: 30,
  },
];

function GalleryCard({ img }: { img: GalleryImage }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="relative overflow-hidden bg-elevated group"
      style={{
        gridColumn: `span ${img.colSpan}`,
        transform: `rotate(${hovered ? img.rotate * 0.5 : img.rotate}deg) translateY(${img.offsetY ?? 0}px)`,
        transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1), z-index 0ms',
        zIndex: hovered ? 20 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={img.aspectClass}>
        <div className="relative w-full h-full">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className={`object-cover transition-all duration-700 ${hovered ? 'grayscale-0 scale-105' : 'grayscale-[50%] scale-100'}`}
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(to top, hsl(240 10% 3.5% / 0.8) 0%, transparent 50%)',
              opacity: hovered ? 1 : 0,
            }}
          />
          <figcaption
            className="absolute bottom-3 left-3 right-3 text-[10px] uppercase tracking-wider text-foreground transition-all duration-400"
            style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)' }}
          >
            {img.caption}
          </figcaption>
        </div>
      </div>
    </div>
  );
}

export function AsymmetricGallery() {
  return (
    <section className="border-b border-border py-20 md:py-28 overflow-hidden">
      <Container as="div">
        <RevealSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Stüdyodan</p>
              <h2
                className="mt-4 font-semibold tracking-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
              >
                Maslak&apos;tan kareler.
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">47 kişi · İstanbul + İzmir</p>
          </div>
        </RevealSection>

        {/* Desktop: asymmetric grid */}
        <div className="hidden md:grid grid-cols-12 gap-4 relative" style={{ minHeight: '600px' }}>
          {IMAGES.map((img, i) => (
            <GalleryCard key={i} img={img} />
          ))}
        </div>

        {/* Mobile: simple 2-col grid */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {IMAGES.map((img, i) => (
            <div key={i} className="relative overflow-hidden bg-elevated aspect-square">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover grayscale-[40%]"
                sizes="50vw"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
