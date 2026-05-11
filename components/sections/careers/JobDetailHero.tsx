import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { MagneticButton } from '@/components/motion/MagneticButton';
import type { JobFrontmatter } from '@/lib/schemas/job';

interface JobDetailHeroProps {
  job: JobFrontmatter;
}

export function JobDetailHero({ job }: JobDetailHeroProps) {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, hsl(189 100% 50% / 0.07), transparent 70%)',
        }}
      />
      <Container as="div" className="relative py-20 md:py-28">
        <RevealSection>
          {/* Eyebrow */}
          <p className="font-mono text-eyebrow uppercase text-accent mb-6">
            {`${job.department} · ${job.location} · ${job.employment_type}`}
          </p>

          {/* Title */}
          <h1
            className="font-semibold tracking-tight text-foreground max-w-3xl"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
          >
            {job.title}
          </h1>

          {/* Meta + CTA row */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <MagneticButton>
              <a
                href="#apply"
                className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:shadow-[0_0_40px_-5px_hsl(189_100%_50%_/_0.6)]"
              >
                Şimdi başvur <span>→</span>
              </a>
            </MagneticButton>

            {/* Mono metadata */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>yayınlanma: <span className="text-foreground">{job.posted_at}</span></span>
              <span>tür: <span className="text-foreground">{job.employment_type}</span></span>
              <span>lokasyon: <span className="text-foreground">{job.location}</span></span>
            </div>
          </div>
        </RevealSection>
      </Container>
    </section>
  );
}
