import { LRUCache } from 'lru-cache';

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
