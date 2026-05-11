type Props = { author?: string; role?: string; children: React.ReactNode };

export function Quote({ author, role, children }: Props) {
  return (
    <figure className="my-10 relative border-l-2 border-accent pl-8 py-4">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-px top-0 bottom-0"
        style={{
          background: 'linear-gradient(to bottom, rgb(20 184 166 / 0.4), rgb(20 184 166 / 0.05))',
        }}
      />
      <blockquote className="text-lg md:text-xl font-semibold tracking-tight text-foreground leading-snug">
        <span className="text-accent">&ldquo;</span>
        {children}
        <span className="text-accent">&rdquo;</span>
      </blockquote>
      {(author || role) && (
        <figcaption className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          — {author}
          {role && <span className="text-muted-foreground/60"> · {role}</span>}
        </figcaption>
      )}
    </figure>
  );
}
