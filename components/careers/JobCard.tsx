import { Link } from '@/i18n/navigation';
import type { JobFrontmatter } from '@/lib/schemas/job';

export function JobCard({ job }: { job: JobFrontmatter }) {
  return (
    <Link
      href={`/kariyer/${job.slug}`}
      className="group flex items-start justify-between gap-6 rounded-lg border border-border bg-muted/20 p-6 transition-colors hover:border-accent hover:bg-muted/40"
    >
      <div>
        <h3 className="text-lg font-semibold leading-tight">{job.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {job.department} · {job.location} · {job.employment_type}
        </p>
      </div>
      <span className="shrink-0 self-center text-sm font-medium text-accent">→</span>
    </Link>
  );
}
