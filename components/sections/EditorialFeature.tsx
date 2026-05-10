import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

export async function EditorialFeature() {
  return (
    <section className="relative py-24 md:py-44">
      <Container as="div">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <p className="font-mono text-eyebrow uppercase text-muted-foreground">A Note on Method</p>
            <h2
              className="font-display mt-8"
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                fontVariationSettings: "'opsz' 72, 'SOFT' 30, 'wght' 400",
              }}
            >
              <span>Yazılım — </span>
              <span
                className="font-display-italic"
                style={{ fontVariationSettings: "'opsz' 72, 'SOFT' 100, 'wght' 400" }}
              >
                bir el zanaatı.
              </span>
            </h2>
            <p className="mt-8 text-body-lg text-muted-foreground">
              Üretim ortamında çalışan sistemler kuruyoruz. Production&apos;da çalışan kod, demoda
              çalışan koddan başkadır. Ekibimiz, mimari kararı ilk satırından son insidan
              müdahalesine kadar takip eder.
            </p>
            <p className="mt-6 font-mono text-eyebrow uppercase text-accent">
              — Airomeda · 2018→{new Date().getFullYear()}
            </p>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={160}>
              <figure className="img-warm relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&w=1600&q=85"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </figure>
              <figcaption className="mt-4 font-mono text-xs text-muted-foreground">
                01 / Architectural intent precedes implementation.
              </figcaption>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
