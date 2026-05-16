import { CustomerLogo } from '@/components/visuals/CustomerLogo';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const LOGOS = [
  { v: 'fortuneris', industry: 'Sermaye Piyasaları' },
  { v: 'topratebet', industry: 'iGaming' },
  { v: 'airomedaMarkets', industry: 'Pazaryeri SaaS' },
  { v: 'airomedata', industry: 'B2B Pazarlama' },
  { v: 'pazarliman', industry: 'Marketplace' },
  { v: 'entegrasys', industry: 'Entegrasyon' },
  { v: 'markaco', industry: 'Marka & Pazarlama' },
  { v: 'studio', industry: 'Dijital Ajans' },
  { v: 'mavikule', industry: 'Bankacılık' },
  { v: 'finansa', industry: 'Finans Hizmetleri' },
  { v: 'vitrinplus', industry: 'E-Ticaret' },
  { v: 'stokakis', industry: 'Lojistik' },
  { v: 'casinoy', industry: 'iGaming' },
  { v: 'spor7', industry: 'Spor Bahisleri' },
  { v: 'bulutla', industry: 'Bulut Yazılımı' },
  { v: 'klinika', industry: 'Sağlık Tech' },
  { v: 'hizliyol', industry: 'Kargo & Lojistik' },
  { v: 'akademi360', industry: 'EduTech' },
  { v: 'reformmob', industry: 'Mobilya & Üretim' },
  { v: 'driveplus', industry: 'Otomotiv' },
  { v: 'ziraat', industry: 'Bankacılık' },
  { v: 'kumtel', industry: 'Beyaz Eşya' },
  { v: 'aras', industry: 'Kargo' },
  { v: 'hsd', industry: 'Ar-Ge Laboratuvarı' },
  { v: 'kodland', industry: 'EduTech' },
  { v: 'widegame', industry: 'Oyun Stüdyosu' },
  { v: 'tsdigital', industry: 'Dijital Ajans' },
  { v: 'excellence', industry: 'Eğitim & Eğlence' },
] as const;

const doubled = [...LOGOS, ...LOGOS];

export function CustomerLogos() {
  return (
    <section className="border-b border-border py-20">
      <Container as="div">
        <RevealSection>
          <p className="text-center text-eyebrow uppercase tracking-wider text-muted-foreground font-medium">
            {"Bizi tercih eden markalardan bazıları"}
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
