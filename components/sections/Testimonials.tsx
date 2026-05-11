import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { StaggerGrid } from '@/components/motion/StaggerGrid';

const QUOTES = [
  {
    quote: "Ziraat Bankası'nın güvenle çalıştığı bir ekiple çalıştığınızı bilmek başlı başına büyük bir güvence. Projemizi zamanında ve beklentilerimizin üzerinde teslim ettiler.",
    author: 'Mehmet Yılmaz',
    role: 'Genel Müdür',
    company: 'Kolektif Teknoloji Grubu',
    industry: 'Kurumsal IT',
  },
  {
    quote: "ERP sistemimizi sıfırdan kurarken Airomeda\'nın 11 yıllık deneyimi gerçekten fark yarattı. Teknik detaylara hakim bir ekip, sabırla açıklıyorlar ve sürecin her aşamasında yanınızdalar.",
    author: 'Ahmet Çelik',
    role: 'Operasyon Direktörü',
    company: 'Kumtel A.Ş.',
    industry: 'Üretim / ERP',
  },
  {
    quote: "Belçika\'dan bir şirkete uluslararası alanda hizmet verebilmeleri etkileyici. Dil engeli yok, saat farkı yok — 130+ ülkeye hizmet ettiklerini pratikte gördük.",
    author: 'Sophie Vandenberghe',
    role: 'CEO',
    company: 'Excellence Talks',
    industry: 'Uluslararası Medya',
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <Container as="div">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 07 · söz onların'}</p>
          <h2 className="mt-4 max-w-3xl text-display-2 font-semibold tracking-tight">
            Müşterilerimiz ne diyor?
          </h2>
        </RevealSection>
        <StaggerGrid className="mt-12 grid gap-6 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure data-stagger-item key={q.company} className="flex h-full flex-col border border-border bg-elevated p-7">
              <p className="font-mono text-eyebrow uppercase text-accent">{q.industry}</p>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-5">
                <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-border flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(q.author + q.company)}&backgroundType=gradientLinear&backgroundColor=00d4ff,0891b2`}
                    alt=""
                    width="48"
                    height="48"
                  />
                </span>
                <div>
                  <p className="text-sm font-semibold">{q.author}</p>
                  <p className="text-xs text-muted-foreground">{q.role} · {q.company}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
