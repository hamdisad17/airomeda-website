import 'server-only';
import { NextResponse } from 'next/server';
import { listLeads, countLeads } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function unauthorized() {
  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Airomeda Admin"' },
  });
}

function checkAuth(authHeader: string | null): boolean {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;
  if (!user || !pass) return false; // admin disabled if envs unset
  if (!authHeader?.startsWith('Basic ')) return false;
  try {
    const decoded = Buffer.from(authHeader.slice(6), 'base64').toString('utf-8');
    const [u, p] = decoded.split(':');
    return u === user && p === pass;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const auth = request.headers.get('authorization');
  if (!checkAuth(auth)) return unauthorized();

  const url = new URL(request.url);
  const type = url.searchParams.get('type') ?? undefined;
  const limit = Math.min(Math.max(Number(url.searchParams.get('limit')) || 50, 1), 200);
  const offset = Math.max(Number(url.searchParams.get('offset')) || 0, 0);

  const rows = listLeads({ type: type ?? undefined, limit, offset });
  const total = countLeads(type ?? undefined);

  return NextResponse.json(
    {
      total,
      limit,
      offset,
      rows: rows.map((r) => ({
        ...r,
        payload: JSON.parse(r.payload),
      })),
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
