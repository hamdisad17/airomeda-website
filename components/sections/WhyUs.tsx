import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { StaggerGrid } from '@/components/motion/StaggerGrid';

const ICONS = {
  fragile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-muted-foreground">
      <path d="M12 2v6m0 8v6m-10-10h6m8 0h6" />
      <path d="M6 6l4 4M14 14l4 4M6 18l4-4M14 10l4-4" strokeDasharray="2 2" />
    </svg>
  ),
  audit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-muted-foreground">
      <path d="M9 12l2 2 4-4" />
      <path d="M20 6L9 17l-5-5" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-muted-foreground">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="16" r="1" />
    </svg>
  ),
  speed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-muted-foreground">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
};

const PAIRS = [
  {
    icon: ICONS.fragile,
    pain: 'Mevcut sisteminiz kırılgan',
    painDetail: 'Her deploy bir kâbus. Test ortamı yok, regression korkusu var.',
    sol: 'Production-grade discipline',
    solDetail: 'CI/CD, kapsamlı test, observability — her deploy güvenli.',
  },
  {
    icon: ICONS.audit,
    pain: 'Regülatöre cevap veremiyorsunuz',
    painDetail: "BDDK denetiminde \"neden böyle yaptık\" sorusuna açıklayamadığınız kararlar var.",
    sol: 'Audit-ready mimari',
    solDetail: "Her olay log'da, her karar dokümante. Denetimde geri dönülebilir.",
  },
  {
    icon: ICONS.lock,
    pain: 'Tedarikçi bağımlılığı yüksek',
    painDetail: "Tek bir geliştirici sistemin %80'ini biliyor. Ayrıldığında kayıp.",
    sol: 'Devir teslim hazır',
    solDetail: 'Belgelendirme, kod review, ekip eğitimi dahil. Bizden bağımsız çalışır.',
  },
  {
    icon: ICONS.speed,
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
                <div className="mb-3">{p.icon}</div>
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
