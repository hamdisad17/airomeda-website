'use client';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

const STACK = [
  { category: 'Web & Mobil', items: ['React', 'Next.js', 'Flutter', 'Vue', 'TypeScript'] },
  { category: 'Veri & AI', items: ['Python', 'PostgreSQL', 'Machine Learning', 'Redis', 'Elasticsearch'] },
  { category: 'ERP & Entegrasyon', items: ['Odoo ERP', 'Logo', 'Netsis', 'REST API', 'Webhook'] },
  { category: 'Oyun & AR/VR', items: ['Unity', 'C#', 'AR/VR', 'Game Engine', 'Blender'] },
];

export function StackPanel() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <Container as="div">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 05 · stack'}</p>
          <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
            Kullandığımız teknolojiler.
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
            2014&apos;ten beri 180+ projede kullandığımız ve kanıtlanmış teknolojiler. Sizin mevcut sisteminiz ne olursa olsun, 36 kişilik uzman ekibimiz onunla çalışabilir.
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
