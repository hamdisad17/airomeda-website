import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

const STATS = [
  { value: '28+', label: 'production deployment' },
  { value: '99.994%', label: 'aggregate uptime' },
  { value: '4.2B', label: 'işlenen transaction' },
  { value: '7 yıl', label: 'üretim ortamında' },
];

export function Numbers() {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container as="div">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-wider text-accent">Ölçek</p>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="border-t-2 border-foreground pt-5">
                <p className="text-display-2 font-semibold tracking-tight tabular-nums">{s.value}</p>
                <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
