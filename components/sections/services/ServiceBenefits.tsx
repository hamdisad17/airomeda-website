import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

interface Benefit {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ServiceBenefitsProps {
  benefits?: Benefit[];
}

const CHECK_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
    <path d="M9 12l2 2 4-4" />
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const DEFAULT_BENEFITS: Benefit[] = [
  {
    title: 'Hızlı ve güvenilir teslim',
    description: 'İlk görüşmeden itibaren iki haftada somut ilerleme. Söz verilen tarihlere uyuyoruz.',
    icon: CHECK_ICON,
  },
  {
    title: 'İşinize özel tasarım',
    description: 'Hazır şablon değil, işletmenizin ihtiyaçlarına göre sıfırdan tasarlanan çözümler.',
    icon: CHECK_ICON,
  },
  {
    title: 'Yazılım tamamen sizin',
    description: 'Teslim edilen yazılım, belgeleri ve kaynak koduyla birlikte tamamen size aittir.',
    icon: CHECK_ICON,
  },
  {
    title: '7/24 destek',
    description: 'Teslim sonrasında da yanınızdayız. Sorunlar anında çözülür, değişiklikler hızla uygulanır.',
    icon: CHECK_ICON,
  },
];

export function ServiceBenefits({ benefits = DEFAULT_BENEFITS }: ServiceBenefitsProps) {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <Container as="div">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// faydalar'}</p>
          <h2
            className="mt-4 font-semibold tracking-tight text-foreground"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em' }}
          >
            Size ne kazandırır?
          </h2>
        </RevealSection>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <RevealSection key={b.title} delay={i * 0.08}>
              <div className="border border-border bg-elevated p-7 h-full flex flex-col gap-4">
                <div className="text-accent">{b.icon ?? CHECK_ICON}</div>
                <h3 className="font-semibold tracking-tight text-foreground">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
