import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { WordReveal } from '@/components/ui/WordReveal';

const ITEMS = [
  {
    title: 'Finans',
    subtitle: 'Bankacılık, ödeme, fintech',
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=85',
    tone: 'marine' as const,
  },
  {
    title: 'iGaming',
    subtitle: 'Lisanslı operatörler, oyun motorları',
    img: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1600&q=85',
    tone: 'ink' as const,
  },
  {
    title: 'E-Ticaret',
    subtitle: 'Headless, marketplace, ERP',
    img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=85',
    tone: 'olive' as const,
  },
];

export function Industries() {
  return (
    <section className="bg-paper py-24 md:py-32">
      <Container as="div" className="mb-16">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-ink/60">
          — Industries · 02
        </p>
        <h2
          className="font-display mt-4 max-w-4xl"
          style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            fontVariationSettings: "'opsz' 96, 'wdth' 100, 'wght' 500",
          }}
        >
          <WordReveal>Üç sektör. Aynı stüdyo.</WordReveal>
        </h2>
      </Container>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {ITEMS.map((it) => (
          <a key={it.title} href="#" className="group relative block aspect-[3/4] overflow-hidden">
            <Image
              src={it.img}
              alt=""
              fill
              className="img-cine object-cover transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div
              className={`absolute inset-0 mix-blend-multiply ${
                it.tone === 'marine'
                  ? 'bg-marine/55'
                  : it.tone === 'ink'
                    ? 'bg-ink/55'
                    : 'bg-olive/55'
              }`}
            />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 text-paper">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-paper/60">
                — {it.subtitle}
              </p>
              <h3
                className="font-display mt-3 transition-transform duration-700 ease-[var(--ease-out-quint)] group-hover:-translate-y-1"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: 0.95,
                  fontVariationSettings: "'opsz' 96, 'wdth' 100, 'wght' 500",
                }}
              >
                {it.title}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
