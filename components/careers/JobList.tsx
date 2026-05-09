import type { JobFrontmatter } from '@/lib/schemas/job';
import { JobCard } from './JobCard';

export function JobList({ jobs }: { jobs: JobFrontmatter[] }) {
  // Group by department
  const byDept = new Map<string, JobFrontmatter[]>();
  for (const j of jobs) {
    const arr = byDept.get(j.department) ?? [];
    arr.push(j);
    byDept.set(j.department, arr);
  }
  const groups = Array.from(byDept.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="space-y-12">
      {groups.map(([dept, deptJobs]) => (
        <div key={dept}>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {dept}
          </h3>
          <ul className="grid gap-3">
            {deptJobs
              .sort((a, b) => b.posted_at.localeCompare(a.posted_at))
              .map((j) => (
                <li key={j.slug}>
                  <JobCard job={j} />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
