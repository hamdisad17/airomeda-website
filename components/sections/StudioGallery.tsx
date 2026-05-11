'use client';
import * as React from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

interface ImgSpec {
  src: string;
  alt: string;
  span?: 'tall' | 'wide' | 'sq';
  caption?: string;
}

const IMAGES: ImgSpec[] = [
  {
    src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=85',
    alt: 'Yazılım geliştirme',
    span: 'tall',
    caption: 'Yazılım geliştirme · İstanbul ofisi',
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=85',
    alt: 'Proje dashboard',
    span: 'wide',
    caption: 'Müşteri projeleri · canlı takip',
  },
  {
    src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=85',
    alt: 'Ofis ortamı',
    span: 'sq',
    caption: 'İstanbul ofisimiz',
  },
  {
    src: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=900&q=85',
    alt: 'Sunucu altyapısı',
    span: 'tall',
    caption: 'Güvenilir altyapı · kesintisiz hizmet',
  },
  {
    src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=85',
    alt: 'Ekip çalışması',
    span: 'sq',
    caption: 'Proje değerlendirmesi · 36 kişilik ekip',
  },
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85',
    alt: 'Teknoloji altyapısı',
    span: 'wide',
    caption: 'Tüm dünya · 130+ ülke · 7/24',
  },
];

export function StudioGallery() {
  return (
    <section className="border-b border-border py-20 md:py-28 relative">
      <Container as="div">
        <RevealSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Stüdyodan</p>
              <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
                Stüdyodan kareler.
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">İstanbul · Türkiye</p>
          </div>
        </RevealSection>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px] md:auto-rows-[200px]">
          {IMAGES.map((img, i) => {
            const span = img.span;
            const cls =
              span === 'tall'
                ? 'row-span-2'
                : span === 'wide'
                  ? 'col-span-2'
                  : '';
            return (
              <figure
                key={i}
                className={`relative overflow-hidden bg-elevated group ${cls}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover grayscale-[60%] contrast-[1.05] transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {img.caption && (
                  <figcaption className="absolute bottom-3 left-3 right-3 font-mono text-[10px] uppercase tracking-wider text-foreground opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
