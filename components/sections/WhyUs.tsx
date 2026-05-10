import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { StaggerGrid } from '@/components/motion/StaggerGrid';

const PAIRS = [
  {
    pain: 'Mevcut sisteminiz kırılgan',
    painDetail: 'Her deploy bir kâbus. Test ortamı yok, regression korkusu var.',
    sol: 'Production-grade discipline',
    solDetail: 'CI/CD, kapsamlı test, observability — her deploy güvenli.',
  },
  {
    pain: 'Regülatöre cevap veremiyorsunuz',
    painDetail: "BDDK denetiminde \"neden böyle yaptık\" sorusuna açıklayamadığınız kararlar var.",
    sol: 'Audit-ready mimari',
    solDetail: "Her olay log'da, her karar dokümante. Denetimde geri dönülebilir.",
  },
  {
    pain: 'Tedarikçi bağımlılığı yüksek',
    painDetail: "Tek bir geliştirici sistemin %80'ini biliyor. Ayrıldığında kayıp.",
    sol: 'Devir teslim hazır',
    solDetail: 'Belgelendirme, kod review, ekip eğitimi dahil. Bizden bağımsız çalışır.',
  },
  {
    pain: 'Hız mı kalite mi seçimi',
    painDetail: 'Sürekli "önce shipi, sonra refactor" yapıyorsunuz, teknik borç birikiyor.',
    sol: 'İkisi birden',
    solDetail: '8-16 haftada üretime, ama temiz mimari ile. Sonradan refactor borcu yok.',
  },
];

export function WhyUs() {
  return (
    <section className="border-b border-border bg-muted/40 py-24 md:py-32">
      <Container as="div">
        <div className="max-w-3xl">
          <RevealSection>
            <p className="font-mono text-eyebrow uppercase text-accent">{'// 02 · neden biz'}</p>
            <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
              Tanıdık problemler. Bizden çözümler.
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Müşterilerimizin bize geldiğindeki tipik sorunlar — ve biz bunlara nasıl yaklaştığımız.
            </p>
          </RevealSection>
        </div>

        <StaggerGrid className="mt-16 grid gap-6 md:grid-cols-2">
          {PAIRS.map((p) => (
            <div data-stagger-item key={p.pain} className="grid gap-0 border border-border bg-background md:grid-cols-2">
              <div className="border-r border-border p-6">
                <p className="font-mono text-eyebrow uppercase text-muted-foreground">× pain</p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.pain}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.painDetail}</p>
              </div>
              <div className="bg-elevated p-6">
                <p className="font-mono text-eyebrow uppercase text-accent">→ how we solve</p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.sol}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.solDetail}</p>
              </div>
            </div>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
