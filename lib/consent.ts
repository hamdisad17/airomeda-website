'use client';

import * as React from 'react';

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

export type ConsentState = {
  necessary: true; // always granted — strictly required for site to function
  analytics: boolean;
  marketing: boolean;
  decidedAt: string; // ISO timestamp
  version: number;
};

const STORAGE_KEY = 'airomeda-consent-v1';
const CURRENT_VERSION = 1;

export const DEFAULT_CONSENT: Omit<ConsentState, 'decidedAt'> = {
  necessary: true,
  analytics: false,
  marketing: false,
  version: CURRENT_VERSION,
};

export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CURRENT_VERSION) return null; // re-prompt on version bump
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(partial: { analytics: boolean; marketing: boolean }): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics: partial.analytics,
    marketing: partial.marketing,
    decidedAt: new Date().toISOString(),
    version: CURRENT_VERSION,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent('airomeda-consent-changed', { detail: state }));
  } catch {
    // localStorage unavailable — silently fail
  }
  return state;
}

export function useConsent(): ConsentState | null {
  const [state, setState] = React.useState<ConsentState | null>(() => readConsent());

  React.useEffect(() => {
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState>).detail;
      setState(detail);
    };
    window.addEventListener('airomeda-consent-changed', onChange);
    return () => window.removeEventListener('airomeda-consent-changed', onChange);
  }, []);

  return state;
}
