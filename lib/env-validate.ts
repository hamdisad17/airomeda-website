import 'server-only';

export type EnvCheck = {
  name: string;
  group: 'core' | 'forms' | 'observability';
  required: boolean;
  present: boolean;
};

const CHECKS: ReadonlyArray<Omit<EnvCheck, 'present'>> = [
  // Core — site cannot function without these
  { name: 'NEXT_PUBLIC_SITE_URL', group: 'core', required: true },

  // Forms — submissions silently disabled if missing
  { name: 'SMTP_HOST', group: 'forms', required: true },
  { name: 'SMTP_PORT', group: 'forms', required: true },
  { name: 'SMTP_USER', group: 'forms', required: true },
  { name: 'SMTP_PASS', group: 'forms', required: true },
  { name: 'MAIL_FROM', group: 'forms', required: false },
  { name: 'CONTACT_TO', group: 'forms', required: false },
  { name: 'CAREERS_TO', group: 'forms', required: false },
  { name: 'TURNSTILE_SECRET_KEY', group: 'forms', required: true },
  { name: 'NEXT_PUBLIC_TURNSTILE_SITE_KEY', group: 'forms', required: true },

  // Observability — optional, no-op if absent
  { name: 'SENTRY_DSN', group: 'observability', required: false },
  { name: 'NEXT_PUBLIC_SENTRY_DSN', group: 'observability', required: false },
];

export function inspectEnv(): { checks: EnvCheck[]; missingRequired: string[] } {
  const checks: EnvCheck[] = CHECKS.map((c) => ({
    ...c,
    present: Boolean(process.env[c.name]),
  }));
  const missingRequired = checks.filter((c) => c.required && !c.present).map((c) => c.name);
  return { checks, missingRequired };
}

/**
 * Logs a one-line readiness summary at server boot. Call from
 * instrumentation.ts register() so the deploy log shows config gaps.
 */
export function logEnvReadiness(): void {
  const { checks, missingRequired } = inspectEnv();
  const byGroup = new Map<string, { ok: number; total: number }>();
  for (const c of checks) {
    const g = byGroup.get(c.group) ?? { ok: 0, total: 0 };
    g.total += 1;
    if (c.present) g.ok += 1;
    byGroup.set(c.group, g);
  }
  const summary = [...byGroup.entries()]
    .map(([g, { ok, total }]) => `${g}=${ok}/${total}`)
    .join(' ');
  if (missingRequired.length === 0) {
    console.log(`[env] ready (${summary})`);
  } else {
    console.warn(
      `[env] degraded (${summary}) — missing required: ${missingRequired.join(', ')}`,
    );
  }
}
