import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const CARDS = [
  {
    icon: '⬡',
    title: 'Production sistemi yönet',
    body: '47 production sistem, 280+ aylık deployment. Gerçek yük, gerçek sorumluluk — kafa karıştırıcı sandbox ortamı yok.',
  },
  {
    icon: '◈',
    title: 'Devir teslim standartlarında çalış',
    body: "Kod IP müşterinin. Bu yüzden belgelendirme, test kapsamı ve maintainability her sprint'te birinci sınıf kriter.",
  },
  {
    icon: '◉',
    title: 'Regülasyonla kod yaz',
    body: 'BDDK, MASAK, eCOGRA — finans ve iGaming regülasyonları kod kalitesini zorunlu kılıyor. Bu disiplin kariyer boyu fayda sağlar.',
  },
  {
    icon: '◧',
    title: 'Büyüyen ekipte yer al',
    body: '5 açık pozisyon. Çalışan başına 12.000 TL konferans bütçesi. Maslak İstanbul veya İzmir ofisi ya da tam uzaktan.',
  },
];

export function WhyJoin() {
  return (
    <RevealSection as="section" className="border-b border-border">
      <Container as="div" className="py-20">
        <p className="font-mono text-eyebrow uppercase text-accent mb-4">{'// neden airomeda?'}</p>
        <h2
          className="font-semibold tracking-tight text-foreground mb-12"
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em' }}
        >
          Sıradan bir yazılım şirketi değil.
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <RevealSection key={card.title} delay={i * 0.08}>
              <div className="group border border-border bg-elevated/20 hover:bg-elevated/50 hover:border-accent/40 transition-colors p-6 h-full">
                <span className="block text-2xl text-accent mb-4">{card.icon}</span>
                <h3 className="font-semibold text-foreground tracking-tight mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </Container>
    </RevealSection>
  );
}
