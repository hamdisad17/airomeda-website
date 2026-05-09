import { Link } from '@/i18n/navigation';
import type { CaseStudyFrontmatter } from '@/lib/schemas/case-study';

export function CaseStudyCard({ data }: { data: CaseStudyFrontmatter }) {
  return (
    <Link
      href={`/calismalarimiz/${data.slug}`}
      className="group block rounded-lg border border-border bg-muted/20 p-6 transition-colors hover:border-accent hover:bg-muted/40"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">{data.client}</p>
      <h3 className="mt-3 text-xl font-semibold leading-tight">{data.title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{data.excerpt}</p>
      <ul className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
        {data.services.map((s) => (
          <li key={s} className="rounded-full border border-border px-2 py-0.5">
            {s}
          </li>
        ))}
      </ul>
    </Link>
  );
}
