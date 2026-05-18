import 'server-only';
import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';

// SQLite path: shared writable dir on the VPS.
// In dev / CI / unset env, fall back to a project-local file (gitignored).
const DEFAULT_PATH = path.join(process.cwd(), '.local-db', 'airomeda.db');
const DB_PATH = process.env.AIROMEDA_DB_PATH ?? DEFAULT_PATH;

let cached: Database.Database | null = null;

function ensureDir(file: string) {
  const dir = path.dirname(file);
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch {
    // ignore — failure surfaces on first write
  }
}

export function getDb(): Database.Database {
  if (cached) return cached;
  ensureDir(DB_PATH);
  const db = new Database(DB_PATH);
  // WAL is cluster-safe for multi-process readers + single-writer-at-a-time;
  // PM2 cluster workers will queue briefly on writes (sub-millisecond at our scale).
  db.pragma('journal_mode = WAL');
  db.pragma('synchronous = NORMAL');
  db.pragma('busy_timeout = 2000');
  applyMigrations(db);
  cached = db;
  return db;
}

function applyMigrations(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,            -- 'contact' | 'demo' | 'career'
      name TEXT,
      email TEXT,
      payload TEXT NOT NULL,         -- JSON-encoded form fields
      ip TEXT,
      user_agent TEXT,
      service_slug TEXT,             -- only for 'demo' (which service page)
      job_slug TEXT,                 -- only for 'career'
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_leads_type_created ON leads (type, created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
  `);
}

export type LeadInput = {
  type: 'contact' | 'demo' | 'career';
  name?: string;
  email?: string;
  payload: unknown;
  ip?: string;
  userAgent?: string;
  serviceSlug?: string;
  jobSlug?: string;
};

export function insertLead(input: LeadInput): number {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO leads (type, name, email, payload, ip, user_agent, service_slug, job_slug)
     VALUES (@type, @name, @email, @payload, @ip, @user_agent, @service_slug, @job_slug)`,
  );
  const result = stmt.run({
    type: input.type,
    name: input.name ?? null,
    email: input.email ?? null,
    payload: JSON.stringify(input.payload),
    ip: input.ip ?? null,
    user_agent: input.userAgent ?? null,
    service_slug: input.serviceSlug ?? null,
    job_slug: input.jobSlug ?? null,
  });
  return Number(result.lastInsertRowid);
}

export type LeadRow = {
  id: number;
  type: 'contact' | 'demo' | 'career';
  name: string | null;
  email: string | null;
  payload: string;
  ip: string | null;
  user_agent: string | null;
  service_slug: string | null;
  job_slug: string | null;
  created_at: string;
};

export function listLeads(opts: { limit?: number; offset?: number; type?: string } = {}): LeadRow[] {
  const db = getDb();
  const limit = Math.min(Math.max(opts.limit ?? 50, 1), 200);
  const offset = Math.max(opts.offset ?? 0, 0);
  if (opts.type) {
    return db
      .prepare(
        `SELECT * FROM leads WHERE type = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      )
      .all(opts.type, limit, offset) as LeadRow[];
  }
  return db
    .prepare(`SELECT * FROM leads ORDER BY created_at DESC LIMIT ? OFFSET ?`)
    .all(limit, offset) as LeadRow[];
}

export function countLeads(type?: string): number {
  const db = getDb();
  if (type) {
    const row = db.prepare(`SELECT COUNT(*) AS c FROM leads WHERE type = ?`).get(type) as
      | { c: number }
      | undefined;
    return row?.c ?? 0;
  }
  const row = db.prepare(`SELECT COUNT(*) AS c FROM leads`).get() as { c: number } | undefined;
  return row?.c ?? 0;
}
