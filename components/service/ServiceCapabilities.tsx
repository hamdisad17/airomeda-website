import { Container } from '@/components/layout/Container';
import type { ServiceFrontmatter } from '@/lib/schemas/service';

export function ServiceCapabilities({ items }: { items: ServiceFrontmatter['capabilities'] }) {
  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <h2 className="text-display-2 font-semibold tracking-tight">Yetkinliklerimiz</h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <li key={item.title} className="rounded-lg border border-border bg-muted/20 p-6">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
