import 'server-only';
import { NextResponse } from 'next/server';
import { inspectEnv } from '@/lib/env-validate';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Tracks process start time once per worker.
const BOOTED_AT = Date.now();

export async function GET() {
  const { checks, missingRequired } = inspectEnv();

  // Roll-up status: 'ok' when no required envs are missing,
  // 'degraded' when something the site needs to function is missing.
  const status: 'ok' | 'degraded' = missingRequired.length === 0 ? 'ok' : 'degraded';

  // SQLite reachability — non-fatal, just reported.
  let dbReady = false;
  try {
    const { getDb } = await import('@/lib/db');
    const row = getDb().prepare('SELECT 1 AS ok').get() as { ok: number } | undefined;
    dbReady = row?.ok === 1;
  } catch {
    dbReady = false;
  }

  const body = {
    status,
    timestamp: new Date().toISOString(),
    uptime_seconds: Math.round((Date.now() - BOOTED_AT) / 1000),
    sha: process.env.RELEASE_SHA ?? process.env.GITHUB_SHA ?? null,
    runtime: {
      node: process.versions.node,
      env: process.env.NODE_ENV,
    },
    config: {
      missing_required: missingRequired,
      checks: checks.map((c) => ({
        name: c.name,
        group: c.group,
        required: c.required,
        present: c.present,
      })),
      db_ready: dbReady,
    },
  };

  return NextResponse.json(body, {
    status: status === 'ok' ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
      'X-Robots-Tag': 'noindex',
    },
  });
}
