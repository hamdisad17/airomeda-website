'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { AiroMascot } from '@/components/visuals/AiroMascot';
import { Galaxy } from '@/components/visuals/Galaxy';
import { Link } from '@/i18n/navigation';

type ModuleId = 'seo' | 'social' | 'crm' | 'web' | 'ecom' | 'finance' | 'gaming' | 'integration';

type Module = {
  id: ModuleId;
  label: string;
  desc: string;
  hue: 'cyan' | 'violet' | 'pink' | 'green' | 'amber';
  icon: React.ReactNode;
};

const HUE_COLOR: Record<Module['hue'], string> = {
  cyan: '#00d4ff',
  violet: '#a855f7',
  pink: '#ec4899',
  green: '#22d3a4',
  amber: '#f59e0b',
};

const MODULES: Module[] = [
  {
    id: 'seo',
    label: 'SEO & Reklam',
    desc: 'Organik büyüme + ücretli kampanya yönetimi',
    hue: 'cyan',
    icon: <Icon path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
  },
  {
    id: 'social',
    label: 'Sosyal Medya',
    desc: 'İçerik üretimi + topluluk yönetimi',
    hue: 'violet',
    icon: <Icon path="M17 9V7a5 5 0 00-10 0v2M5 9h14l1 12H4L5 9z" />,
  },
  {
    id: 'crm',
    label: 'CRM',
    desc: 'Müşteri ilişkileri + satış otomasyonu',
    hue: 'pink',
    icon: <Icon path="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8z M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />,
  },
  {
    id: 'web',
    label: 'Kurumsal Web',
    desc: 'Markalı, hızlı, SEO-uyumlu site',
    hue: 'cyan',
    icon: <Icon path="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />,
  },
  {
    id: 'ecom',
    label: 'E-Ticaret',
    desc: 'Mağaza + pazaryeri entegrasyonu',
    hue: 'green',
    icon: <Icon path="M9 21h12a2 2 0 002-2v-7H7v7a2 2 0 002 2zM7 12V5a2 2 0 012-2h6a2 2 0 012 2v7" />,
  },
  {
    id: 'finance',
    label: 'Finans Yazılımı',
    desc: 'Ödeme + bankacılık entegrasyonları',
    hue: 'amber',
    icon: <Icon path="M12 2v20m-7-7l7 7 7-7M5 9l7-7 7 7" />,
  },
  {
    id: 'gaming',
    label: 'iGaming',
    desc: 'Bahis + casino platform altyapısı',
    hue: 'violet',
    icon: <Icon path="M6 12h12M12 6v12M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />,
  },
  {
    id: 'integration',
    label: 'Entegrasyon',
    desc: 'Sistemler arası otomatik bağlantı',
    hue: 'pink',
    icon: <Icon path="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />,
  },
];

function Icon({ path }: { path: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

const RECOMMENDATIONS: { ids: ModuleId[]; label: string; subtitle: string }[] = [
  {
    ids: ['seo', 'social', 'web'],
    label: 'Dijital Başlangıç',
    subtitle: 'Markanızın online görünürlüğünü kuran temel paket',
  },
  {
    ids: ['seo', 'social', 'crm', 'web'],
    label: 'Büyüme Motoru',
    subtitle: 'Pazarlama + satış zincirini uçtan uca yöneten paket',
  },
  {
    ids: ['ecom', 'crm', 'integration', 'social'],
    label: 'E-Ticaret Plus',
    subtitle: 'Çok kanallı satışı tek panele indiren paket',
  },
  {
    ids: ['finance', 'integration', 'crm'],
    label: 'Finans Suite',
    subtitle: 'Bankacılık + müşteri yönetimini birleştiren kurumsal paket',
  },
  {
    ids: ['gaming', 'finance', 'integration'],
    label: 'iGaming Platform',
    subtitle: 'Bahis/casino + ödeme + risk yönetimi tam altyapı',
  },
];

function getRecommendation(selected: ModuleId[]) {
  if (selected.length < 2) return null;
  // Score each recommendation by overlap with selection
  let best = null as null | { rec: (typeof RECOMMENDATIONS)[0]; score: number };
  for (const rec of RECOMMENDATIONS) {
    const overlap = rec.ids.filter((id) => selected.includes(id)).length;
    if (!best || overlap > best.score) best = { rec, score: overlap };
  }
  if (best && best.score >= 2) return best.rec;
  return RECOMMENDATIONS[1]; // default Büyüme Motoru
}

export function SolutionBuilder() {
  const [selected, setSelected] = React.useState<ModuleId[]>([]);
  const [draggingId, setDraggingId] = React.useState<ModuleId | null>(null);
  const [isOver, setIsOver] = React.useState(false);

  const recommendation = getRecommendation(selected);

  const addModule = (id: ModuleId) => {
    if (!selected.includes(id)) {
      setSelected((s) => [...s, id]);
    }
  };
  const removeModule = (id: ModuleId) => {
    setSelected((s) => s.filter((x) => x !== id));
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <Galaxy density="normal" />

      <Container as="div" className="relative">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-eyebrow uppercase tracking-wider neon-text-cyan font-semibold">
            Sıra sizde
          </p>
          <h2
            className="mt-5 font-semibold tracking-tight text-foreground"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            Kendi çözümünüzü{' '}
            <span className="text-neon">sürükleyip kurun.</span>
          </h2>
          <p className="mt-6 text-base md:text-body-lg text-muted-foreground leading-relaxed">
            Modülleri aşağıya sürükleyin, Airo size en uygun paketi anında öneriyor.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          {/* Module pool */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
              Modüller — sürükleyin
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {MODULES.filter((m) => !selected.includes(m.id)).map((m) => (
                <DraggableCard
                  key={m.id}
                  module={m}
                  onDragStart={() => setDraggingId(m.id)}
                  onDragEnd={() => setDraggingId(null)}
                  onClick={() => addModule(m.id)}
                />
              ))}
              {MODULES.filter((m) => !selected.includes(m.id)).length === 0 && (
                <p className="col-span-2 text-center text-muted-foreground py-8">
                  Tüm modüller eklendi 🎉
                </p>
              )}
            </div>
          </div>

          {/* Drop zone + recommendation */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
              Çözümünüz
            </p>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsOver(true);
              }}
              onDragLeave={() => setIsOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsOver(false);
                if (draggingId) addModule(draggingId);
                setDraggingId(null);
              }}
              className={`relative rounded-2xl min-h-[280px] p-6 transition-all duration-300 ${
                isOver ? 'glow-cyan-md scale-[1.02]' : ''
              }`}
              style={{
                background:
                  'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(168,85,247,0.08) 100%)',
                border: isOver
                  ? '2px dashed rgb(0 212 255 / 0.8)'
                  : '2px dashed rgb(168 85 247 / 0.35)',
                backdropFilter: 'blur(14px)',
              }}
            >
              {selected.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="text-5xl mb-4 opacity-60">✨</div>
                  <p className="text-muted-foreground">
                    Modülleri buraya bırakın
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-2">
                    veya kartlara tıklayın
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selected.map((id) => {
                    const m = MODULES.find((x) => x.id === id)!;
                    return (
                      <div
                        key={id}
                        className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium"
                        style={{
                          background: `linear-gradient(135deg, ${HUE_COLOR[m.hue]}22, ${HUE_COLOR[m.hue]}10)`,
                          border: `1px solid ${HUE_COLOR[m.hue]}50`,
                          color: HUE_COLOR[m.hue],
                          boxShadow: `0 0 18px -4px ${HUE_COLOR[m.hue]}40`,
                        }}
                      >
                        <span>{m.label}</span>
                        <button
                          type="button"
                          onClick={() => removeModule(id)}
                          aria-label={`${m.label} kaldır`}
                          className="text-current opacity-60 hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Recommendation */}
            {recommendation && (
              <div
                className="mt-6 glass-panel rounded-2xl p-5 flex items-start gap-4"
                style={{ animation: 'fade-in 400ms ease-out both' }}
              >
                <div className="flex-shrink-0">
                  <AiroMascot className="w-20 h-20" staticMode />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider text-neon font-semibold">
                    Airo önerisi
                  </p>
                  <p className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                    {recommendation.label}
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {recommendation.subtitle}
                  </p>
                  <Link
                    href="/iletisim"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium neon-text-cyan hover:underline underline-offset-4"
                  >
                    Bu paket için teklif al →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function DraggableCard({
  module: m,
  onDragStart,
  onDragEnd,
  onClick,
}: {
  module: Module;
  onDragStart: () => void;
  onDragEnd: () => void;
  onClick: () => void;
}) {
  const color = HUE_COLOR[m.hue];
  return (
    <button
      type="button"
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className="group glass-panel rounded-xl p-4 text-left cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform duration-300"
      style={{
        borderColor: `${color}30`,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${color}22, ${color}08)`,
            border: `1px solid ${color}40`,
            color,
            boxShadow: `0 0 24px -4px ${color}50, inset 0 0 16px ${color}10`,
          }}
        >
          {m.icon}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-sm">{m.label}</p>
          <p className="mt-0.5 text-xs text-muted-foreground leading-snug">{m.desc}</p>
        </div>
      </div>
    </button>
  );
}
