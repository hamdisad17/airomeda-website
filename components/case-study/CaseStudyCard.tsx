import * as React from 'react';
import { Link } from '@/i18n/navigation';
import type { CaseStudyFrontmatter } from '@/lib/schemas/case-study';

export function CaseStudyCard({ data }: { data: CaseStudyFrontmatter }) {
  return (
    <Link
      href={`/calismalarimiz/${data.slug}`}
      className="group block border border-border bg-elevated p-6 relative overflow-hidden transition-colors hover:border-accent/40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-20 w-20 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            'radial-gradient(circle at 100% 0%, rgb(20 184 166 / 0.1), transparent 70%)',
        }}
      />
      <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">{data.client}</p>
      <h3 className="mt-3 text-xl font-semibold leading-tight tracking-tight text-foreground group-hover:text-accent transition-colors">
        {data.title}
      </h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{data.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {data.services.map((s) => (
          <span
            key={s}
            className="border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>
    </Link>
  );
}
