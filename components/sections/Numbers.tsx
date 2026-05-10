import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { CountUp } from '@/components/motion/CountUp';
import { StaggerGrid } from '@/components/motion/StaggerGrid';

const STATS = [
  { end: 28, suffix: '+', decimals: 0, label: 'production deployment' },
  { end: 99.994, suffix: '%', decimals: 3, label: 'aggregate uptime' },
  { end: 4.2, suffix: 'B', decimals: 1, label: 'işlenen transaction' },
  { end: 7, suffix: ' yıl', decimals: 0, label: 'üretim ortamında' },
];

export function Numbers() {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container as="div">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 05 · at scale'}</p>
          <h2 className="mt-4 max-w-3xl text-display-2 font-semibold tracking-tight">
            Sayılar konuşur. <span className="text-muted-foreground">Bizimkiler de.</span>
          </h2>
        </RevealSection>
        <StaggerGrid className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div data-stagger-item key={s.label} className="bg-background p-8">
              <p className="font-mono text-display-2 font-semibold tracking-tight tabular-nums text-foreground">
                <CountUp end={s.end} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
