'use client';
import * as React from 'react';

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = React.useCallback(() => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      aria-label="Copy code"
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          copied
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          copy
        </>
      )}
    </button>
  );
}

import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

interface DocLine {
  t: string;
  style?: 'heading' | 'accent' | 'muted' | 'check' | 'normal';
}

function docLinesToPlainText(lines: DocLine[]): string {
  return lines.map((l) => l.t).join('\n');
}

const TABS: { id: string; label: string; file: string; lines: DocLine[] }[] = [
  {
    id: 'teklif',
    label: 'Teklif',
    file: 'proje-teklifi.txt',
    lines: [
      { t: 'PROJE: Online Mağaza', style: 'heading' },
      { t: '=====================', style: 'muted' },
      { t: '' },
      { t: 'Süre:       8 hafta', style: 'accent' },
      { t: 'Ekip:       4 uzman', style: 'accent' },
      { t: 'Yatırım:    ₺145.000', style: 'accent' },
      { t: '' },
      { t: 'Teslim Edilenler:', style: 'heading' },
      { t: '✓ Modern web sitesi', style: 'check' },
      { t: '✓ Mobil uygulama (iOS + Android)', style: 'check' },
      { t: '✓ Yönetim paneli', style: 'check' },
      { t: '✓ Müşteri sadakat sistemi', style: 'check' },
      { t: '✓ Stok takibi', style: 'check' },
      { t: '✓ Raporlama panosu', style: 'check' },
      { t: '✓ 6 ay ücretsiz destek', style: 'check' },
      { t: '' },
      { t: 'Hedef: Online satışları 3 ayda %150 büyütmek', style: 'accent' },
    ],
  },
  {
    id: 'gorev',
    label: 'Görev Listesi',
    file: 'haftalik-plan.txt',
    lines: [
      { t: 'ÇALIŞMA TAKVİMİ', style: 'heading' },
      { t: '================', style: 'muted' },
      { t: '' },
      { t: 'Hafta 1–2', style: 'accent' },
      { t: '  Sizinle görüşme ve ihtiyaç analizi', style: 'check' },
      { t: '  Detaylı proje planı hazırlama', style: 'check' },
      { t: '' },
      { t: 'Hafta 3–4', style: 'accent' },
      { t: '  Tasarım taslakları hazırlanır', style: 'check' },
      { t: '  Onayınız alınır · revizyon yapılır', style: 'check' },
      { t: '' },
      { t: 'Hafta 5–7', style: 'accent' },
      { t: '  Geliştirme · her hafta canlı önizleme', style: 'check' },
      { t: '  Geri bildirimleriniz anında uygulanır', style: 'check' },
      { t: '' },
      { t: 'Hafta 8', style: 'accent' },
      { t: '  Sıkı testler · ekibinize eğitim', style: 'check' },
      { t: '  Yayın · sistem canlıya alınır', style: 'check' },
      { t: '' },
      { t: 'Sonrası: 7/24 destek + ücretsiz bakım', style: 'normal' },
    ],
  },
  {
    id: 'sozlesme',
    label: 'Sözleşme',
    file: 'sozlesme-ozeti.txt',
    lines: [
      { t: 'PROJE SÖZLEŞMESİ — ÖZET', style: 'heading' },
      { t: '========================', style: 'muted' },
      { t: '' },
      { t: '1. PROJE KAPSAMI', style: 'accent' },
      { t: '   Web ve mobil platform geliştirme.', style: 'normal' },
      { t: '' },
      { t: '2. SÜRE', style: 'accent' },
      { t: '   Toplam 8 hafta · haftalık rapor.', style: 'normal' },
      { t: '' },
      { t: '3. ÖDEMELER', style: 'accent' },
      { t: '   %30 başlangıçta', style: 'normal' },
      { t: '   %40 tasarım onayında', style: 'normal' },
      { t: '   %30 teslim öncesinde', style: 'normal' },
      { t: '' },
      { t: '4. GARANTİ', style: 'accent' },
      { t: '   6 ay ücretsiz hata düzeltme + destek.', style: 'normal' },
      { t: '' },
      { t: '5. SAHİPLİK', style: 'accent' },
      { t: '   Sistemin tüm hakları ve kodu sizin.', style: 'normal' },
      { t: '' },
      { t: 'İmza: _______________', style: 'muted' },
      { t: 'Tarih: ______________', style: 'muted' },
    ],
  },
];

function getLineClass(style?: DocLine['style']): string {
  switch (style) {
    case 'heading': return 'text-foreground font-semibold';
    case 'accent': return 'text-accent';
    case 'muted': return 'text-muted-foreground/50';
    case 'check': return 'text-success';
    case 'normal':
    default: return 'text-foreground/80';
  }
}

export function CodeSample() {
  const [active, setActive] = React.useState(TABS[0]!.id);
  const current = TABS.find((t) => t.id === active) ?? TABS[0]!;

  return (
    <section className="border-b border-border bg-muted/30 py-24 md:py-32">
      <Container as="div">
        <div className="grid items-start gap-10 lg:gap-16 lg:grid-cols-2">
          <RevealSection>
            <div>
              <p className="font-mono text-eyebrow uppercase text-accent">
                Şeffaf Teklif
              </p>
              <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
                Size sunduğumuz net bir teklif.
              </h2>
              <p className="mt-6 text-body-lg text-muted-foreground">
                Fiyat sürprizi yok. Gizli maliyet yok. Teklif, görev listesi ve sözleşme — hepsi yazılı, hepsi şeffaf.
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="text-accent">→</span>
                  Proje başlamadan önce her şeyi yazılı sunuyoruz
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">→</span>
                  Fiyat, süre ve kapsam baştan netleştirilir
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">→</span>
                  Sistemin tüm hakları size aittir
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">→</span>
                  6 ay ücretsiz destek ve garanti dahildir
                </li>
              </ul>
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="border border-border bg-elevated">
              {/* Tabs + copy */}
              <div className="flex items-center border-b border-border bg-muted/40">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActive(t.id)}
                    className={`relative px-4 py-3 font-mono text-xs transition-colors ${
                      active === t.id
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t.label}
                    {active === t.id && (
                      <span className="absolute inset-x-2 bottom-0 h-px bg-accent" />
                    )}
                  </button>
                ))}
                <span className="ml-auto font-mono text-xs text-muted-foreground hidden sm:inline">
                  {current.file}
                </span>
                <span className="px-4">
                  <CopyButton code={docLinesToPlainText(current.lines)} />
                </span>
              </div>
              {/* Document body with line numbers */}
              <div className="flex overflow-x-auto">
                <div
                  aria-hidden
                  className="select-none border-r border-border bg-muted/30 px-3 py-5 font-mono text-xs text-muted-foreground/50 leading-relaxed flex-shrink-0"
                >
                  {current.lines.map((_, i) => (
                    <div key={i} className="leading-relaxed">{i + 1}</div>
                  ))}
                </div>
                <pre className="flex-1 overflow-x-auto p-5 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                  <code>
                    {current.lines.map((line, i) => (
                      <div key={i} className={`leading-relaxed ${getLineClass(line.style)}`}>
                        {line.t || ' '}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </RevealSection>
        </div>
      </Container>
    </section>
  );
}
