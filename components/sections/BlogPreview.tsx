import { Container } from '@/components/layout/Container';

export function BlogPreview() {
  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Son yazılar
        </p>
        <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/10 p-12 text-center text-muted-foreground">
          (Blog Plan 2&apos;de eklenecek.)
        </div>
      </Container>
    </section>
  );
}
