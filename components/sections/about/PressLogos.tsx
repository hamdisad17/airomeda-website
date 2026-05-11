import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const EXPERIENCE = [
  { name: 'Ziraat Bankası', sector: 'Bankacılık', slug: 'ziraat' },
  { name: 'Ziraat Teknoloji', sector: 'Fintech', slug: 'ziraat-teknoloji' },
  { name: 'Kumtel A.Ş.', sector: 'Beyaz Eşya · ERP', slug: 'kumtel' },
  { name: 'Aras Kargo', sector: 'Lojistik', slug: 'aras' },
  { name: 'HSD Core Labs', sector: 'Sağlık AI', slug: 'hsd' },
  { name: 'Kodland', sector: 'Eğitim Teknolojisi', slug: 'kodland' },
  { name: 'Wide Game Studio', sector: 'Oyun · AR/VR', slug: 'widegame' },
  { name: 'TS Digital', sector: 'Dijital Pazarlama', slug: 'tsdigital' },
  { name: 'Excellence Talks', sector: 'Uluslararası Medya', slug: 'excellence' },
  { name: 'Kolektif Teknoloji', sector: 'IT · CMMI', slug: 'kolektif' },
];

function ExperiencePlaceholder({ name, sector }: { name: string; sector: string }) {
  return (
    <div className="border border-border bg-elevated px-6 py-5 flex flex-col gap-1 hover:border-accent/40 transition-colors group">
      <span className="font-mono text-sm uppercase tracking-wider text-muted-foreground group-hover:text-foreground/70 transition-colors select-none">
        {name}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-wider text-accent/70">
        {sector}
      </span>
    </div>
  );
}

export function PressLogos() {
  return (
    <section className="border-b border-border py-20">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Ekibimizin Deneyimi</p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight">
            Ekibimizdeki uzmanlar daha önce şu kurumlarda görev aldı
          </h2>
          <p className="mt-2 text-muted-foreground text-sm max-w-2xl">
            Airomeda kadrosundaki profesyoneller Türkiye&apos;nin önde gelen kurumlarından uluslararası firmalara kadar geniş bir yelpazede deneyim biriktirdi. Bu birikim, müşterilerimize sektörlerin işleyişini içeriden bilen çözümler sunar.
          </p>
        </RevealSection>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border overflow-hidden border border-border">
          {EXPERIENCE.map((e) => (
            <ExperiencePlaceholder key={e.slug} name={e.name} sector={e.sector} />
          ))}
        </div>
        <p className="mt-4 font-mono text-xs text-muted-foreground italic">
          * Bu kurumlar Airomeda&apos;nın doğrudan müşterisi değildir. Ekibimizdeki uzmanların geçmiş profesyonel deneyimlerini yansıtır.
        </p>
      </Container>
    </section>
  );
}
