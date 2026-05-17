'use client';
import * as React from 'react';
import Image from 'next/image';

interface VideoPlayerMockupProps {
  title: string;       // e.g., "Fortuneris · Investment Platform"
  duration?: string;   // "3:42"
  poster?: string;     // optional Unsplash url for fake "frame"
}

export function VideoPlayerMockup({ title, duration = '3:42', poster }: VideoPlayerMockupProps) {
  const [progress, setProgress] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);

  React.useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setProgress((p) => (p + 0.4) % 100);
    }, 100);
    return () => clearInterval(t);
  }, [playing]);

  const totalSeconds = 3 * 60 + 42;
  const currentSeconds = Math.floor((progress / 100) * totalSeconds);
  const mm = Math.floor(currentSeconds / 60);
  const ss = currentSeconds % 60;

  return (
    <div className="relative bg-elevated border border-border overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
      {/* "Video" frame area */}
      <div className="relative aspect-video bg-background overflow-hidden">
        {poster && (
          <Image src={poster} alt="" fill className="object-cover grayscale-[40%] contrast-[1.1]" sizes="100vw" unoptimized={poster.startsWith('https://')} />
        )}
        <div aria-hidden className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgb(20 184 166 / 0.15), transparent 70%)' }}/>
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button type="button" onClick={() => setPlaying(!playing)}
            className="group relative h-16 w-16 border border-accent/40 bg-elevated/50 backdrop-blur-md hover:bg-accent/10 transition-colors flex items-center justify-center">
            {playing ? (
              <span className="flex gap-1">
                <span className="block w-1 h-5 bg-accent"/>
                <span className="block w-1 h-5 bg-accent"/>
              </span>
            ) : (
              <span className="ml-0.5" style={{ borderLeft: '12px solid #14B8A6', borderTop: '8px solid transparent', borderBottom: '8px solid transparent' }}/>
            )}
          </button>
        </div>
        {/* Top label */}
        <div className="absolute top-3 left-3 text-[10px] uppercase tracking-wider text-foreground bg-elevated/60 backdrop-blur-md border border-border px-2 py-1">
          ● Airomeda
        </div>
        <div className="absolute top-3 right-3 text-[10px] text-muted-foreground bg-elevated/60 backdrop-blur-md border border-border px-2 py-1">
          {title.split(' · ')[0]}
        </div>
      </div>
      {/* Controls */}
      <div className="border-t border-border p-3 bg-background">
        {/* Scrub bar */}
        <div className="relative h-1 bg-border mb-3 cursor-pointer">
          <div className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${progress}%` }}/>
          <div className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-accent border border-background" style={{ left: `calc(${progress}% - 6px)` }}/>
        </div>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span className="text-foreground">{title}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground tabular-nums">
            <span>{String(mm).padStart(2, '0')}:{String(ss).padStart(2, '0')}</span>
            <span>/</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
