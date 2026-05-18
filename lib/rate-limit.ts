import { LRUCache } from 'lru-cache';

// IMPORTANT — cluster-mode behavior
// --------------------------------------------------------------------
// This is an in-process LRU rate limiter. Under PM2 cluster mode
// (ecosystem.config.cjs uses instances: 'max'), each worker maintains
// its own bucket map, so a single IP can multiply its true limit by the
// number of workers.
//
// In production this limiter is INTENTIONALLY a second line of defense.
// The primary, cluster-safe rate limit lives at the nginx edge — see
// deploy/nginx.conf.example for the limit_req_zone definitions
// (airomeda_forms = 5r/m/IP applied to form routes).
//
// If you ever run this app outside an nginx (or equivalent) edge that
// enforces request rates, downgrade ecosystem.config.cjs to
// instances: 1 to make the in-app limiter authoritative.
// --------------------------------------------------------------------

type Bucket = { count: number; resetAt: number };

export type RateLimiter = {
  hit: (key: string) => boolean;
};

export type RateLimiterOptions = {
  /** Max different IPs we track at once */
  capacity: number;
  /** Window in ms */
  windowMs: number;
  /** Max hits per IP per window */
  max: number;
};

export function createRateLimiter(opts: RateLimiterOptions): RateLimiter {
  const cache = new LRUCache<string, Bucket>({
    max: opts.capacity,
    ttl: opts.windowMs,
  });
  return {
    hit(key: string) {
      const now = Date.now();
      const existing = cache.get(key);
      if (!existing || existing.resetAt <= now) {
        cache.set(key, { count: 1, resetAt: now + opts.windowMs });
        return true;
      }
      if (existing.count >= opts.max) {
        return false;
      }
      existing.count += 1;
      cache.set(key, existing);
      return true;
    },
  };
}

// Default singleton: 5 hits / IP / 60 minutes; LRU 5000 distinct IPs
export const formRateLimiter = createRateLimiter({
  capacity: 5_000,
  windowMs: 60 * 60 * 1000,
  max: 5,
});
