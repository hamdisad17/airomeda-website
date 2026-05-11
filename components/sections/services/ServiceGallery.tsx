import * as React from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

interface GalleryImage {
  src: string;
  alt: string;
}

interface ServiceGalleryProps {
  images?: GalleryImage[];
}

const DEFAULT_IMAGES: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    alt: 'Yazılım geliştirme ekibi',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    alt: 'Ekip toplantısı',
  },
  {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    alt: 'Geliştirme süreci',
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    alt: 'Dashboard ve analitik',
  },
];

export function ServiceGallery({ images = DEFAULT_IMAGES }: ServiceGalleryProps) {
  return (
    <section className="border-b border-border py-16 md:py-20 bg-muted/20">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium mb-8">
            Projelerden Kareler
          </p>
        </RevealSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px]">
          {images.map((img, i) => (
            <figure
              key={i}
              className={`relative overflow-hidden bg-elevated group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover grayscale-[50%] contrast-[1.05] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
