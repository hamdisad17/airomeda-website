import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const CARDS = [
  {
    icon: '⬡',
    title: "Production'da çalış",
    body: 'Her proje canlı ortamda, gerçek kullanıcılarla. Kafa karışıklığı değil, gerçek sorumluluk.',
  },
  {
    icon: '◈',
    title: 'Devir teslim et',
    body: 'Kodu teslim ettikten sonra sahip çık. Onboarding, maintainability ve döküman da işin parçası.',
  },
  {
    icon: '◉',
    title: 'Audit-ready kod yaz',
    body: 'Fintech ve iGaming regülasyonları kod kalitesini zorunlu kılar. Siz de bu disipline alışırsınız.',
  },
  {
    icon: '◧',
    title: "İstanbul'dan dünyaya",
    body: "İstanbul'dan global müşterilere hizmet veriyoruz. Remote-first kültür, global etki.",
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
