import type { Instrumentation } from 'next';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Log env readiness once per worker boot (visible in PM2 out logs)
    const { logEnvReadiness } = await import('./lib/env-validate');
    logEnvReadiness();
  }

  if (!process.env.SENTRY_DSN && !process.env.NEXT_PUBLIC_SENTRY_DSN) return;

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export const onRequestError: Instrumentation.onRequestError = async (...args) => {
  if (!process.env.SENTRY_DSN && !process.env.NEXT_PUBLIC_SENTRY_DSN) return;
  const Sentry = await import('@sentry/nextjs');
  Sentry.captureRequestError(...args);
};
