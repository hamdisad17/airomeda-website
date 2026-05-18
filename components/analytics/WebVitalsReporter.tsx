'use client';

import { useReportWebVitals } from 'next/web-vitals';

/**
 * Forwards LCP / INP / CLS / FCP / TTFB measurements to whichever sink
 * is wired. Order of preference:
 *   1. Plausible custom event (window.plausible) — present when O1 is
 *      configured AND analytics consent granted
 *   2. Sentry breadcrumb — present when NEXT_PUBLIC_SENTRY_DSN set
 *   3. No-op
 *
 * Reads no PII. Values are rounded; CLS retains 3 decimals.
 */
type PlausibleFn = (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const value = metric.name === 'CLS' ? Number(metric.value.toFixed(3)) : Math.round(metric.value);

    // 1. Plausible custom event
    if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
      window.plausible('Web Vitals', {
        props: {
          metric: metric.name,
          value,
          rating: metric.rating,
        },
      });
      return;
    }

    // 2. Sentry breadcrumb (only when SDK is initialised at runtime)
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
      import('@sentry/nextjs')
        .then((Sentry) => {
          Sentry.addBreadcrumb({
            category: 'web-vital',
            level: 'info',
            message: metric.name,
            data: { value, rating: metric.rating, id: metric.id },
          });
        })
        .catch(() => {
          // Sentry not actually loaded — silently drop
        });
    }
  });

  return null;
}
