'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { readConsent, writeConsent } from '@/lib/consent';

type View = 'hidden' | 'banner' | 'preferences';

export function CookieConsent() {
  const t = useTranslations('cookie_consent');
  const [view, setView] = React.useState<View>('hidden');
  const [analytics, setAnalytics] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);
  const mounted = React.useRef(false);

  React.useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    // Show banner only when no prior consent decision exists
    if (readConsent() === null) {
      Promise.resolve().then(() => setView('banner'));
    }
  }, []);

  if (view === 'hidden') return null;

  const acceptAll = () => {
    writeConsent({ analytics: true, marketing: true });
    setView('hidden');
  };

  const rejectAll = () => {
    writeConsent({ analytics: false, marketing: false });
    setView('hidden');
  };

  const savePreferences = () => {
    writeConsent({ analytics, marketing });
    setView('hidden');
  };

  return (
    <div
      role="dialog"
      aria-modal={view === 'preferences'}
      aria-label={t('title')}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur"
    >
      <div className="container py-4 md:py-5">
        {view === 'banner' && (
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="text-sm text-muted-foreground md:max-w-2xl">
              <p className="font-medium text-foreground">{t('title')}</p>
              <p className="mt-1">
                {t('body')}{' '}
                <Link
                  href="/cerez-politikasi"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {t('manage_link')}
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:flex-shrink-0">
              <button
                type="button"
                onClick={rejectAll}
                className="border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {t('reject_all')}
              </button>
              <button
                type="button"
                onClick={() => setView('preferences')}
                className="border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {t('manage_preferences')}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                {t('accept_all')}
              </button>
            </div>
          </div>
        )}

        {view === 'preferences' && (
          <div className="space-y-4">
            <div>
              <p className="font-medium text-foreground">{t('preferences_title')}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t('preferences_intro')}
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <CategoryRow
                title={t('necessary_title')}
                description={t('necessary_desc')}
                checked={true}
                disabled
                onToggle={() => {}}
              />
              <CategoryRow
                title={t('analytics_title')}
                description={t('analytics_desc')}
                checked={analytics}
                onToggle={() => setAnalytics((v) => !v)}
              />
              <CategoryRow
                title={t('marketing_title')}
                description={t('marketing_desc')}
                checked={marketing}
                onToggle={() => setMarketing((v) => !v)}
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={rejectAll}
                className="border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {t('reject_all')}
              </button>
              <button
                type="button"
                onClick={savePreferences}
                className="border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {t('save_preferences')}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                {t('accept_all')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  disabled,
  onToggle,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 border border-border bg-elevated/50 p-3 text-sm transition-colors ${
        disabled ? 'cursor-not-allowed opacity-70' : 'hover:border-accent'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onToggle}
        className="mt-0.5 h-4 w-4 cursor-pointer accent-accent disabled:cursor-not-allowed"
      />
      <span>
        <span className="block font-medium text-foreground">{title}</span>
        <span className="mt-1 block text-xs text-muted-foreground">{description}</span>
      </span>
    </label>
  );
}
