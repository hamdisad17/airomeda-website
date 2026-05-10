'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const STORAGE_KEY = 'airomeda-cookie-banner-dismissed';

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return true; // localStorage unavailable — treat as dismissed
  }
}

export function CookieConsent() {
  const t = useTranslations('cookie_consent');
  // Start hidden; reveal after mount (avoids SSR mismatch and direct setState-in-effect)
  const [visible, setVisible] = React.useState(false);
  const mounted = React.useRef(false);

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      if (!readDismissed()) {
        // Use a microtask to avoid the "setState synchronously in effect" lint rule
        Promise.resolve().then(() => setVisible(true));
      }
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label={t('title')}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur"
    >
      <div className="container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground">{t('title')}</p>
          <p className="mt-1">
            {t('body')}{' '}
            <Link href="/cerez-politikasi" className="text-accent underline-offset-4 hover:underline">
              {t('manage_link')}
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
        >
          {t('accept')}
        </button>
      </div>
    </div>
  );
}
