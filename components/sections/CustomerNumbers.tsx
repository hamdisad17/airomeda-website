import { Container } from '@/components/layout/Container';
import { CountUp } from '@/components/motion/CountUp';
import { RevealSection } from '@/components/motion/RevealSection';

const STATS = [
  { value: 11, suffix: ' yıl', label: 'Sektör deneyimi' },
  { value: 36, suffix: ' kişi', label: 'Uzman ekibimiz' },
  { value: 180, suffix: '+', label: 'Tamamlanan proje' },
  { value: 85, suffix: '+', label: 'Mutlu müşteri' },
  { value: 130, suffix: '+', label: 'Ülkede hizmet' },
  { value: 7, suffix: '/24', label: 'Destek hattı' },
];

export function CustomerNumbers() {
  return (
    <section className="border-b border-border py-20 md:py-28 bg-elevated/30">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Sayılarla Airomeda</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight max-w-3xl">
            Müşterilerimiz neden bizi tercih ediyor?
          </h2>
        </RevealSection>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-px overflow-hidden border border-border bg-border">
          {STATS.map((s) => (
            <div key={s.label} className="bg-background p-8 text-center md:text-left">
              <div className="text-5xl md:text-6xl font-semibold tabular-nums tracking-tight text-foreground">
                <CountUp end={s.value} />{s.suffix}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
