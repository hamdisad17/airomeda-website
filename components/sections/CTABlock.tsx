import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { WordReveal } from '@/components/ui/WordReveal';

export async function CTABlock() {
  const tc = await getTranslations('common');
  return (
    <section className="bg-ink py-32 md:py-44 text-paper">
      <Container as="div">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-paper/60">
          — Start · 09
        </p>
        <h2
          className="font-display mt-12 max-w-6xl"
          style={{
            fontSize: 'clamp(3rem, 11vw, 11rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.045em',
            fontVariationSettings: "'opsz' 96, 'wdth' 100, 'wght' 500",
          }}
        >
          <WordReveal>Karmaşık problem mi?</WordReveal>
          <span className="block text-coral">
            <WordReveal baseDelay={400}>Konuşalım.</WordReveal>
          </span>
        </h2>
        <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4">
          <Link
            href="/iletisim"
            className="group inline-flex items-center gap-3 bg-coral px-7 py-4 text-sm font-medium text-paper transition-all duration-300 ease-[var(--ease-out-quint)] hover:bg-paper hover:text-ink"
          >
            {tc('primary_cta')}
            <span className="transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-1">
              →
            </span>
          </Link>
          <a
            href="mailto:hello@airomeda.com"
            className="font-display text-base text-paper/80 hover:text-coral"
          >
            hello@airomeda.com
          </a>
        </div>
      </Container>
    </section>
  );
}
