import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { StaggerGrid } from '@/components/motion/StaggerGrid';

const PAIRS = [
  {
    pain: 'Mevcut sisteminiz kırılgan.',
    detail: 'Her deploy bir kâbus; test ortamı yok, regression korkusu mevcut.',
    solution: 'Production-grade discipline ile teslim.',
    solutionDetail: 'CI/CD, kapsamlı test, observability, gözlenebilir deploys.',
  },
  {
    pain: 'Regülatöre cevap veremiyorsunuz.',
    detail: 'Denetimde "neden bu kararı verdik" sorusuna karşılığınız yok.',
    solution: 'Audit-ready mimari.',
    solutionDetail: "Her olay log'da, her karar dokümante. Geri dönülebilir.",
  },
  {
    pain: 'Tedarikçi bağımlılığı yüksek.',
    detail: "Bir kişi sistemin %80'ini biliyor. Ayrıldığında kayıp.",
    solution: 'Devir teslim hazır.',
    solutionDetail: 'Belgelendirme, kod review, ekip eğitimi dahil.',
  },
  {
    pain: 'Hız mı kalite mi seçimi.',
    detail: 'Sürekli "önce shipi, sonra refactor" — teknik borç birikiyor.',
    solution: 'İkisi birden.',
    solutionDetail: '8-16 haftada üretime, temiz mimari ile. Refactor borcu yok.',
  },
];

export function WhyUs() {
  return (
    <section className="border-b border-border py-28 md:py-40">
      <Container as="div">
        <div className="max-w-3xl">
          <RevealSection>
            <p className="text-eyebrow uppercase text-muted-foreground">01 — Yaklaşım</p>
            <h2 className="mt-4 text-display-2 font-medium tracking-tight">
              Karşılaştığımız problemler —{' '}
              <span className="font-serif-italic text-accent">ve cevaplarımız</span>.
            </h2>
          </RevealSection>
        </div>

        <StaggerGrid className="mt-20 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
          {PAIRS.map((p) => (
            <div data-stagger-item key={p.pain} className="bg-background p-8 md:p-10">
              <div>
                <p className="text-eyebrow uppercase text-muted-foreground">Sorun</p>
                <h3 className="mt-3 text-lg font-medium tracking-tight">{p.pain}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.detail}</p>
              </div>
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-eyebrow uppercase text-accent">Cevap</p>
                <h3 className="mt-3 text-lg font-medium tracking-tight">{p.solution}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.solutionDetail}</p>
              </div>
            </div>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
