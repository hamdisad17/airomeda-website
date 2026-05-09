type Props = { author?: string; role?: string; children: React.ReactNode };

export function Quote({ author, role, children }: Props) {
  return (
    <figure className="my-8 rounded-lg border border-border bg-muted/30 p-6">
      <blockquote className="text-lg italic text-foreground">{children}</blockquote>
      {(author || role) && (
        <figcaption className="mt-4 text-sm text-muted-foreground">
          — {author}
          {role && <span>, {role}</span>}
        </figcaption>
      )}
    </figure>
  );
}
