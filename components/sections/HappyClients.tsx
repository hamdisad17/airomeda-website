import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { StaggerGrid } from '@/components/motion/StaggerGrid';

// Decorative, honest imagery — happy teams & customers, NOT presented as
// named individuals. Photo IDs verified against images.unsplash.com (allowed
// in next.config remotePatterns + CSP img-src).
const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`;

const PHOTOS: { id: string; alt: string; cls: string }[] = [
  {
    id: '1758691737535-57edd2a11d73',
    alt: 'Birlikte gülen çeşitli bir ekip',
    cls: 'col-span-2 row-span-2',
  },
  { id: '1758518732055-582461d8e345', alt: 'Selfie çeken mutlu iş insanları', cls: 'col-span-2 row-span-1' },
  { id: '1576267423048-15c0040fec78', alt: 'Dizüstü başında gülümseyen takım', cls: 'col-span-1 row-span-1' },
  { id: '1549923746-c502d488b3ea', alt: 'El sıkışan iki memnun ortak', cls: 'col-span-1 row-span-1' },
  { id: '1556742049-0cfed4f6a45d', alt: 'Gülümseyerek konuşan müşteri ve danışman', cls: 'col-span-2 row-span-1' },
];

const STATS = [
  { v: '200+', l: 'tamamlanan proje' },
  { v: '%98', l: 'müşteri memnuniyeti' },
  { v: '130+', l: 'ülkeye hizmet' },
  { v: '11 yıl', l: 'kesintisiz ortaklık' },
];

export function HappyClients() {
  return (
    <section className="relative overflow-hidden border-b border-border py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(45% 50% at 12% 20%, rgb(20 184 166 / 0.10), transparent 70%), radial-gradient(45% 55% at 90% 80%, rgb(129 140 248 / 0.12), transparent 70%)',
        }}
      />
      <Container as="div">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left — copy + stats */}
          <RevealSection>
            <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">
              Mutlu Müşteriler
            </p>
            <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
              Birlikte büyüyen ekipler, <span className="text-gradient">kalıcı ortaklıklar.</span>
            </h2>
            <p className="mt-5 max-w-md text-body-lg text-muted-foreground">
              Yazılımı teslim edip çekilmiyoruz — markanızla birlikte kalıyoruz. Müşterilerimizin
              çoğu ilk projeden sonra ikinci, üçüncü işlerinde de bizimle yola devam ediyor.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:max-w-sm">
              {STATS.map((s) => (
                <div key={s.l}>
                  <dt className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
                    {s.v}
                  </dt>
                  <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </RevealSection>

          {/* Right — photo collage */}
          <StaggerGrid className="grid grid-cols-4 auto-rows-[110px] gap-3 sm:auto-rows-[130px] md:auto-rows-[150px]">
            {PHOTOS.map((p, i) => (
              <figure
                data-stagger-item
                key={p.id}
                className={`group relative overflow-hidden rounded-2xl border border-border ${p.cls}`}
              >
                <Image
                  src={U(p.id)}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-105"
                  priority={i === 0}
                />
                {/* brand-tinted gradient so photos sit in the dark theme */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent mix-blend-multiply"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'linear-gradient(130deg, rgb(20 184 166 / 0.22), transparent 55%, rgb(129 140 248 / 0.22))',
                  }}
                />
              </figure>
            ))}
          </StaggerGrid>
        </div>
      </Container>
    </section>
  );
}
