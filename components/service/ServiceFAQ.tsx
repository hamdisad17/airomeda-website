import { Container } from '@/components/layout/Container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { ServiceFrontmatter } from '@/lib/schemas/service';

export function ServiceFAQ({ items }: { items: ServiceFrontmatter['faq'] }) {
  if (items.length === 0) return null;

  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20">
        <h2 className="text-display-2 font-semibold tracking-tight">Sıkça sorulan sorular</h2>
        <Accordion className="mt-10">
          {items.map((item, i) => (
            <AccordionItem key={item.question} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
