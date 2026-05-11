import { CustomerLogo } from '@/components/visuals/CustomerLogo';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const LOGOS = [
  { v: 'paygate', industry: 'Fintech' },
  { v: 'bahis', industry: 'iGaming' },
  { v: 'hubert', industry: 'E-Ticaret' },
  { v: 'topratebet', industry: 'iGaming' },
  { v: 'pazarliman', industry: 'Marketplace' },
  { v: 'entegrasys', industry: 'Entegrasyon' },
  { v: 'markaco', industry: 'Marka & Pazarlama' },
  { v: 'studio', industry: 'Dijital Ajans' },
] as const;

const doubled = [...LOGOS, ...LOGOS];

export function CustomerLogos() {
  return (
    <section className="border-b border-border py-20">
      <Container as="div">
        <RevealSection>
          <p className="text-center font-mono text-eyebrow uppercase text-muted-foreground">
            {"2014'ten beri 85+ aktif müşteri · 180+ tamamlanmış proje · 130+ ülkeye hizmet"}
          </p>
        </RevealSection>
      </Container>
      <div
        className="mt-12 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="flex w-max items-center gap-16 animate-marquee-slow whitespace-nowrap">
          {doubled.map((l, i) => (
            <span
              key={`${l.v}-${i}`}
              className="group relative inline-flex flex-col items-center text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              <CustomerLogo variant={l.v} />
              <span className="absolute top-full mt-2 text-[10px] uppercase tracking-wider text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                {l.industry}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
