import { Container } from '@/components/layout/Container';

export function ServiceTechStrip({ items }: { items: string[] }) {
  return (
    <section className="border-b border-border">
      <Container as="div" className="py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Kullandığımız teknolojiler
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-base font-medium text-foreground/80">
          {items.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
