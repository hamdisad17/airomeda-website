import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import type { JobFrontmatter } from '@/lib/schemas/job';

interface OpenRolesProps {
  jobs: JobFrontmatter[];
}

const DEPT_ICONS: Record<string, string> = {
  Engineering: '⬡',
  Design: '◈',
  Product: '◉',
  DevOps: '⬡',
  Security: '◈',
  Default: '·',
};

export function OpenRoles({ jobs }: OpenRolesProps) {
  if (jobs.length === 0) {
    return (
      <section id="acik-pozisyonlar" className="border-b border-border">
        <Container as="div" className="py-20">
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium mb-8">Açık Pozisyonlar</p>
          <p className="text-muted-foreground">Şu an açık pozisyon bulunmuyor. Genel başvuru yapmak için bizimle iletişime geçin.</p>
        </Container>
      </section>
    );
  }

  return (
    <section id="acik-pozisyonlar" className="border-b border-border">
      <Container as="div" className="py-20">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium mb-8">Açık Pozisyonlar</p>
          <h2
            className="font-semibold tracking-tight text-foreground mb-10"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em' }}
          >
            {jobs.length} açık rol.
          </h2>
        </RevealSection>
        <div className="space-y-2">
          {jobs.map((job, i) => {
            const icon = DEPT_ICONS[job.department] ?? DEPT_ICONS.Default;
            return (
              <RevealSection key={job.slug} delay={i * 0.06}>
                <Link
                  href={`/kariyer/${job.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6 border border-border bg-elevated/20 hover:bg-elevated/60 hover:border-accent/50 transition-colors p-5 md:p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-accent mt-0.5 text-lg shrink-0">{icon}</span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                        {job.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        <span>{job.department}</span>
                        <span className="text-border">·</span>
                        <span>{job.location}</span>
                        <span className="text-border">·</span>
                        <span>{job.employment_type}</span>
                      </div>
                    </div>
                  </div>
                  <span className="sm:shrink-0 sm:self-center font-mono text-xs text-accent group-hover:translate-x-1 transition-transform self-start">
                    Başvur →
                  </span>
                </Link>
              </RevealSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
