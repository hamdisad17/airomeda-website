import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { buttonVariants } from '@/components/ui/button';

type Props = {
  title: string;
  subtitle: string;
  ctaText: string;
};

export function ServiceHero({ title, subtitle, ctaText }: Props) {
  return (
    <section className="border-b border-border">
      <Container as="div" className="py-20 md:py-28">
        <h1 className="max-w-3xl text-display-2 font-bold tracking-tight">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        <div className="mt-8">
          <Link href="/iletisim" className={buttonVariants({ size: 'lg' })}>
            {ctaText}
          </Link>
        </div>
      </Container>
    </section>
  );
}
