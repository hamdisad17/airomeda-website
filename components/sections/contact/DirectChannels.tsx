import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const CHANNELS = [
  {
    icon: '◉',
    label: 'WhatsApp',
    description: 'Hızlı sorular ve ön değerlendirme için direkt mesaj',
    href: 'https://wa.me/905300000000',
    cta: 'Mesaj gönder →',
  },
  {
    icon: '◈',
    label: 'Brief e-posta',
    description: 'Proje detayları ve teknik brief için',
    href: 'mailto:brief@airomeda.com',
    cta: 'brief@airomeda.com',
  },
  {
    icon: '⬡',
    label: 'Brief PDF',
    description: 'Yapılandırılmış brief şablonumuzu indirin, doldurun',
    href: '/brief-template.pdf',
    cta: 'PDF indir →',
  },
  {
    icon: '◧',
    label: 'Keşif görüşmesi',
    description: '30 dakika ücretsiz · kapsam değerlendirme',
    href: 'https://cal.com/airomeda',
    cta: 'Takvime bak →',
  },
];

export function DirectChannels() {
  return (
    <RevealSection as="section" className="border-b border-border">
      <Container as="div" className="py-16 md:py-20">
        <p className="font-mono text-eyebrow uppercase text-accent mb-10">{'// doğrudan kanallar'}</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((ch, i) => (
            <RevealSection key={ch.label} delay={i * 0.07}>
              <a
                href={ch.href}
                target={ch.href.startsWith('http') ? '_blank' : undefined}
                rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex flex-col h-full border border-border bg-elevated/20 hover:bg-elevated/60 hover:border-accent/50 transition-colors p-6"
              >
                <span className="text-2xl text-accent mb-4">{ch.icon}</span>
                <h3 className="font-semibold text-foreground mb-2">{ch.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {ch.description}
                </p>
                <span className="mt-4 font-mono text-[10px] uppercase tracking-wider text-accent group-hover:translate-x-1 transition-transform inline-block">
                  {ch.cta}
                </span>
              </a>
            </RevealSection>
          ))}
        </div>
      </Container>
    </RevealSection>
  );
}
