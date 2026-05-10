export function WordmarkMarquee() {
  return (
    <section className="border-y border-border overflow-hidden py-12">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="mx-12 inline-flex items-baseline gap-6 font-semibold tracking-tight"
            style={{
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            <span>AIROMEDA</span>
            <span className="text-accent">&#9679;</span>
          </span>
        ))}
      </div>
    </section>
  );
}
