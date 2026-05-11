import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { CountUp } from '@/components/motion/CountUp';
import { StaggerGrid } from '@/components/motion/StaggerGrid';

const STATS = [
  { end: 180, suffix: '+', decimals: 0, label: 'tamamlanmış proje' },
  { end: 85, suffix: '+', decimals: 0, label: 'mutlu müşteri' },
  { end: 36, suffix: '', decimals: 0, label: 'kişilik uzman ekip' },
  { end: 11, suffix: ' yıl', decimals: 0, label: 'sektör deneyimi' },
];

export function Numbers() {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container as="div">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 05 · rakamlarla biz'}</p>
          <h2 className="mt-4 max-w-3xl text-display-2 font-semibold tracking-tight">
            11 yıllık deneyim, <span className="text-muted-foreground">sayılarla.</span>
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
