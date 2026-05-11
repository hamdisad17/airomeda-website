import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { ImageRevealCard } from '@/components/visuals/ImageRevealCard';

const GALLERY_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    alt: 'Ekip çalışması',
    label: 'kod review',
    caption: 'Pair programming sessiyonu',
  },
  {
    src: 'https://images.unsplash.com/photo-1590402494611-212e7bbfaf98?w=800&q=80',
    alt: 'Whiteboard session',
    label: 'mimari',
    caption: 'Sistem tasarım workshop',
  },
  {
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    alt: 'Ekip toplantısı',
    label: 'haftalık',
    caption: 'All-hands toplantısı',
  },
  {
    src: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&q=80',
    alt: 'Ofis',
    label: 'istanbul',
    caption: 'İstanbul ofisimiz',
  },
  {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    alt: 'Kod yazımı',
    label: 'delivery',
    caption: 'Feature shipping günü',
  },
  {
    src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    alt: 'Konferans',
    label: 'konferans',
    caption: 'KubeCon 2025',
  },
];

export function CultureGallery() {
  return (
    <RevealSection as="section" className="border-b border-border">
      <Container as="div" className="py-16 md:py-20">
        <p className="font-mono text-eyebrow uppercase text-accent mb-10">{'// stüdyo kültürü'}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <RevealSection key={img.src} delay={i * 0.06}>
              <ImageRevealCard
                src={img.src}
                alt={img.alt}
                label={img.label}
                caption={img.caption}
              />
            </RevealSection>
          ))}
        </div>
      </Container>
    </RevealSection>
  );
}
