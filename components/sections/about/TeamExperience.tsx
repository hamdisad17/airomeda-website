import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const EXPERIENCE = [
  { name: 'Ziraat Bankası', sector: 'Bankacılık', mark: 'ZB' },
  { name: 'Ziraat Teknoloji', sector: 'Fintech', mark: 'ZT' },
  { name: 'Kumtel A.Ş.', sector: 'Beyaz eşya · ERP', mark: 'KM' },
  { name: 'Aras Kargo', sector: 'Lojistik', mark: 'AK' },
  { name: 'HSD Core Labs', sector: 'Sağlık AI', mark: 'HSD' },
  { name: 'Kodland', sector: 'Eğitim teknolojisi', mark: 'KD' },
  { name: 'Wide Game Studio', sector: 'Oyun · AR/VR', mark: 'WG' },
  { name: 'TS Digital', sector: 'Dijital pazarlama', mark: 'TS' },
  { name: 'Excellence Talks', sector: 'Uluslararası medya (Belçika)', mark: 'ET' },
  { name: 'Kolektif Teknoloji Grubu', sector: 'IT · CMMI sertifikalı', mark: 'KT' },
];

export function TeamExperience() {
  return (
    <section className="border-b border-border bg-elevated/30 py-20 md:py-28 relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, hsl(189 100% 50% / 0.06), transparent 70%)',
        }}
      />
      <Container as="div" className="relative">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Ekibimizin Deneyimi</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
            Ekibimizdeki uzmanlar
            <br />
            nerelerde görev aldı?
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
            Airomeda kadrosundaki profesyoneller; Türkiye&apos;nin önde gelen kurumlarından
            uluslararası medya kuruluşlarına kadar geniş bir yelpazede deneyim sahibi. Bu birikim,
            müşterilerimize sektörlerin işleyişini içeriden bilen çözümler tasarlama gücü veriyor.
          </p>
        </RevealSection>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px overflow-hidden border border-border bg-border">
          {EXPERIENCE.map((e) => (
            <div
              key={e.name}
              className="bg-background p-6 flex flex-col items-start hover:bg-elevated/40 transition-colors"
            >
              <span className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">
                {e.mark}
              </span>
              <p className="mt-3 text-sm font-semibold text-foreground">{e.name}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-accent">
                {e.sector}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 font-mono text-xs text-muted-foreground italic">
          * Bu kurumlar Airomeda&apos;nın doğrudan müşterisi değildir. Ekibimizdeki uzmanların
          geçmiş profesyonel deneyimlerini yansıtır.
        </p>
      </Container>
    </section>
  );
}
