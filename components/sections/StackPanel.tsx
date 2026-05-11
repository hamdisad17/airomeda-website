'use client';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const STACK = [
  { category: 'Languages', items: ['TypeScript', 'Java / Kotlin', 'Go', 'Python', 'Solidity'] },
  { category: 'Data', items: ['PostgreSQL', 'Kafka', 'Redis', 'ClickHouse', 'Elasticsearch'] },
  { category: 'Infra', items: ['Kubernetes', 'AWS', 'GCP', 'Cloudflare', 'Terraform'] },
  { category: 'Front', items: ['React', 'Next.js', 'Vue', 'Svelte', 'Tailwind'] },
];

export function StackPanel() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <Container as="div">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 05 · stack'}</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
            Üretim ortamımız.
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
            2018&apos;den beri 47 production sisteminde test edilmiş. Müşterinin mevcut yığını veya hedeflediği mimari ne olursa olsun, 28 mühendislik ekibi onunla teslim edecek deneyime sahip.
          </p>
        </RevealSection>
        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {STACK.map((g) => (
            <div key={g.category} className="bg-background p-6">
              <p className="font-mono text-eyebrow uppercase text-muted-foreground">
                {g.category}
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {g.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-foreground">
                    <span className="inline-block h-1 w-1 rounded-full bg-accent flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
