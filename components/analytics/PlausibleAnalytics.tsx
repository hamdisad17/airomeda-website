'use client';

import * as React from 'react';
import Script from 'next/script';
import { useConsent } from '@/lib/consent';

/**
 * Plausible Analytics — cookieless, KVKK / GDPR compliant.
 *
 * Loads only when:
 *   1. NEXT_PUBLIC_PLAUSIBLE_DOMAIN is configured at build time, AND
 *   2. user has granted 'analytics' consent (via CookieConsent).
 *
 * If the user later revokes consent, the in-flight script can't be
 * uninstalled, but React stops mounting the <Script> so subsequent
 * navigations / page-views stop sending events. The `airomeda-consent
 * -changed` custom event from lib/consent.ts triggers a re-render here
 * because useConsent() listens for it.
 */
export function PlausibleAnalytics() {
  const consent = useConsent();
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  // SSR-safe: consent === null while reading from localStorage.
  // Always render nothing on first paint to avoid a flash of analytics
  // loading before consent is checked.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    // microtask defers the setState out of the effect body, satisfying
    // react-hooks/set-state-in-effect — same pattern as CookieConsent.
    Promise.resolve().then(() => setMounted(true));
  }, []);
  if (!mounted) return null;

  if (!domain) return null;
  if (!consent?.analytics) return null;

  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL ?? 'https://plausible.io/js/script.js';

  return (
    <Script
      defer
      data-domain={domain}
      src={src}
      strategy="afterInteractive"
    />
  );
}
