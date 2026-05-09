import { Container } from '@/components/layout/Container';

const QUOTES = [
  {
    quote: 'Airomeda ekibi 4 ayda ödeme altyapımızı yenileyip canlıya aldı. Hız ve kalite el ele geldi.',
    author: 'Ad Soyad',
    role: 'CTO, Müşteri A',
  },
  {
    quote: 'iGaming entegrasyonlarımızı stabil ve denetlenebilir hâle getirdiler.',
    author: 'Ad Soyad',
    role: 'Director of Engineering, Müşteri B',
  },
];

export function Testimonials() {
  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <ul className="grid gap-6 md:grid-cols-2">
          {QUOTES.map((q) => (
            <li key={q.author + q.role} className="rounded-lg border border-border bg-muted/20 p-6">
              <blockquote className="text-base italic">&ldquo;{q.quote}&rdquo;</blockquote>
              <p className="mt-4 text-sm text-muted-foreground">
                — {q.author}, {q.role}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
