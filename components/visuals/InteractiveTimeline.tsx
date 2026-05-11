'use client';
import * as React from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  body: string;
  metric?: string;
}

export function InteractiveTimeline({ events }: { events: TimelineEvent[] }) {
  const [active, setActive] = React.useState(0);
  const current = events[active];

  return (
    <div className="border border-border bg-elevated/40">
      {/* Year strip */}
      <div className="border-b border-border overflow-x-auto">
        <div className="flex">
          {events.map((e, i) => {
            const isActive = i === active;
            return (
              <button
                key={e.year}
                type="button"
                onClick={() => setActive(i)}
                className={`flex-shrink-0 px-6 py-4 relative transition-colors font-mono text-sm tabular-nums ${
                  isActive ? 'text-accent bg-background' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {e.year}
                {isActive && <span className="absolute bottom-0 left-0 right-0 h-px bg-accent"/>}
              </button>
            );
          })}
        </div>
      </div>
      {/* Content */}
      <div key={active} className="p-8 md:p-12 min-h-[280px]"
        style={{ animation: 'fadeSlideIn 0.35s ease-out both' }}>
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
          <div>
            <p className="font-mono text-eyebrow uppercase text-accent">{current?.year}</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{current?.title}</h3>
            <p className="mt-4 text-body-lg text-muted-foreground max-w-prose">{current?.body}</p>
          </div>
          {current?.metric && (
            <div className="lg:border-l border-border lg:pl-8">
              <p className="font-mono text-eyebrow uppercase text-muted-foreground">o yıl</p>
              <p className="mt-3 text-4xl font-semibold tabular-nums text-accent">{current.metric}</p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
