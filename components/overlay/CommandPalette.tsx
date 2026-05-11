'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';

interface Item {
  group: string;
  label: string;
  hint?: string;
  href?: string;
  action?: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [activeIdx, setActiveIdx] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const items: Item[] = React.useMemo(() => [
    { group: 'Sayfalar', label: 'Ana sayfa', hint: 'home', href: '/tr', keywords: ['home', 'ana'] },
    { group: 'Sayfalar', label: 'Hizmetler', hint: 'services', href: '/tr/hizmetler' },
    { group: 'Sayfalar', label: 'Çalışmalarımız', hint: 'case studies', href: '/tr/calismalarimiz' },
    { group: 'Sayfalar', label: 'Hakkımızda', hint: 'about', href: '/tr/hakkimizda' },
    { group: 'Sayfalar', label: 'Blog', hint: 'blog', href: '/tr/blog' },
    { group: 'Sayfalar', label: 'Kariyer', hint: 'careers', href: '/tr/kariyer' },
    { group: 'Sayfalar', label: 'İletişim', hint: 'contact', href: '/tr/iletisim' },
    { group: 'Sektörler', label: 'Finans', hint: 'industry', keywords: ['fintech', 'bankacılık'], action: () => scrollToId('industry-switcher') },
    { group: 'Sektörler', label: 'Oyun Platformu', hint: 'industry', keywords: ['gaming', 'oyun'], action: () => scrollToId('industry-switcher') },
    { group: 'Sektörler', label: 'E-Ticaret', hint: 'industry', action: () => scrollToId('industry-switcher') },
    { group: 'Sektörler', label: 'Entegrasyon', hint: 'industry', action: () => scrollToId('industry-switcher') },
    { group: 'Aksiyonlar', label: 'Bizimle konuşun', hint: 'enter →', href: '/tr/iletisim' },
    { group: 'Aksiyonlar', label: 'Karanlık moda geç', hint: 'theme', action: () => document.documentElement.classList.toggle('light') },
    { group: 'Aksiyonlar', label: 'Sistem bağlantısı', hint: 'live', action: () => scrollToId('architecture') },
    { group: 'Aksiyonlar', label: 'Hizmetlerimiz', hint: 'capabilities', action: () => scrollToId('architecture') },
  ], []);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((it) =>
      it.label.toLowerCase().includes(q) ||
      it.hint?.toLowerCase().includes(q) ||
      it.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  }, [items, query]);

  // grouped
  const grouped = React.useMemo(() => {
    const map = new Map<string, Item[]>();
    filtered.forEach((it) => {
      if (!map.has(it.group)) map.set(it.group, []);
      map.get(it.group)!.push(it);
    });
    return map;
  }, [filtered]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => {
          if (!v) {
            setActiveIdx(0);
            setQuery('');
          }
          return !v;
        });
        return;
      }
      if (!open) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        setQuery('');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const it = filtered[activeIdx];
        if (!it) return;
        setOpen(false);
        setQuery('');
        if (it.href) router.push(it.href);
        else if (it.action) it.action();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, activeIdx, router]);

  // Listen for custom open event from Header button
  React.useEffect(() => {
    function onOpen() {
      setOpen(true);
      setActiveIdx(0);
      setQuery('');
    }
    window.addEventListener('command-palette:open', onOpen);
    return () => window.removeEventListener('command-palette:open', onOpen);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 10);
    return () => clearTimeout(timer);
  }, [open]);

  if (!open) return null;

  let flatIdx = -1;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh] px-4" role="dialog" aria-modal aria-label="Komut paleti">
      <button
        type="button"
        aria-label="Kapat"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-background/70 backdrop-blur-md cursor-default"
      />
      <div className="relative w-full max-w-2xl border border-border bg-elevated shadow-[0_20px_80px_-20px_hsl(173_80%_40%_/_0.3)]">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground flex-shrink-0" aria-hidden>
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
            placeholder="Sayfa, sektör veya aksiyon ara..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/50 text-sm font-mono outline-none border-none"
            aria-label="Arama"
          />
          <kbd className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-1.5 py-0.5">esc</kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto" role="listbox">
          {filtered.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-muted-foreground font-mono">
              Sonuç bulunamadı
            </div>
          ) : (
            Array.from(grouped.entries()).map(([group, list]) => (
              <div key={group} className="border-b border-border last:border-b-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground px-5 pt-3 pb-1.5">
                  {group}
                </p>
                <ul>
                  {list.map((it) => {
                    flatIdx++;
                    const isActive = flatIdx === activeIdx;
                    const myIdx = flatIdx;
                    return (
                      <li key={`${group}-${it.label}`}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onMouseEnter={() => setActiveIdx(myIdx)}
                          onClick={() => {
                            setOpen(false);
                            setQuery('');
                            if (it.href) router.push(it.href);
                            else if (it.action) it.action();
                          }}
                          className={`w-full text-left px-5 py-2.5 flex items-center justify-between text-sm transition-colors ${
                            isActive ? 'bg-accent/10 text-foreground' : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            {isActive && <span className="inline-block w-1 h-4 bg-accent" aria-hidden/>}
                            <span className={isActive ? '' : 'pl-4'}>{it.label}</span>
                          </span>
                          {it.hint && (
                            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                              {it.hint}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-border px-5 py-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <kbd className="border border-border px-1.5 py-0.5 text-[9px]">↑↓</kbd>
              gez
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="border border-border px-1.5 py-0.5 text-[9px]">enter</kbd>
              seç
            </span>
          </span>
          <span className="text-accent">airomeda · k</span>
        </div>
      </div>
    </div>
  );
}
