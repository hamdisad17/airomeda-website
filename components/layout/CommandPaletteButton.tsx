'use client';
import * as React from 'react';

export function CommandPaletteButton({ mobile = false }: { mobile?: boolean }) {
  if (mobile) {
    // Compact icon-only version for mobile
    return (
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event('command-palette:open'))}
        className="flex h-9 w-9 items-center justify-center border border-border bg-elevated/50 text-muted-foreground hover:border-accent hover:text-foreground transition-colors"
        aria-label="Komut paletini aç"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('command-palette:open'))}
      className="hidden md:inline-flex items-center gap-2 border border-border bg-elevated/50 px-3 py-1.5 text-xs text-muted-foreground hover:border-accent hover:text-foreground transition-colors"
      aria-label="Komut paletini aç (Ctrl+K)"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
      <span>Hızlı git...</span>
      <kbd className="font-mono text-[10px] border border-border px-1 py-0.5 ml-2">⌘K</kbd>
    </button>
  );
}
