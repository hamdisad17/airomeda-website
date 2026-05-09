import { getTranslations, getLocale } from 'next-intl/server';
import type { JobFrontmatter } from '@/lib/schemas/job';

export async function JobMeta({ job }: { job: JobFrontmatter }) {
  const t = await getTranslations('careers');
  const locale = await getLocale();
  const posted = new Date(job.posted_at).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <dl className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
      <div>
        <dt className="text-xs uppercase tracking-wider text-muted-foreground">
          {t('department_label')}
        </dt>
        <dd className="mt-1 font-medium">{job.department}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase tracking-wider text-muted-foreground">
          {t('location_label')}
        </dt>
        <dd className="mt-1 font-medium">{job.location}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase tracking-wider text-muted-foreground">
          {t('type_label')}
        </dt>
        <dd className="mt-1 font-medium">{job.employment_type}</dd>
      </div>
      <div>
        <dt className="text-xs uppercase tracking-wider text-muted-foreground">
          {t('posted_label')}
        </dt>
        <dd className="mt-1 font-medium">{posted}</dd>
      </div>
    </dl>
  );
}
