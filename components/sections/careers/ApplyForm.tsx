import { Container } from '@/components/layout/Container';
import { JobApplicationForm } from '@/components/forms/JobApplicationForm';

interface ApplyFormProps {
  jobSlug: string;
  jobTitle: string;
}

export function ApplyForm({ jobSlug, jobTitle }: ApplyFormProps) {
  return (
    <section id="apply" className="border-t border-border bg-elevated/20">
      <Container as="div" className="py-16 md:py-20 max-w-3xl mx-auto">
        <p className="text-eyebrow uppercase tracking-wider text-accent font-medium mb-6">Başvuru Formu</p>
        <h2
          className="font-semibold tracking-tight text-foreground mb-10"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', letterSpacing: '-0.03em' }}
        >
          {jobTitle} pozisyonuna başvur.
        </h2>
        <JobApplicationForm jobSlug={jobSlug} />
      </Container>
    </section>
  );
}
