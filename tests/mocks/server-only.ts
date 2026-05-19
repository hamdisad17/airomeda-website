// In Vitest jsdom env we don't enforce server-only — let any module
// importing 'server-only' be testable as if it were running on the
// server. The production runtime check still works at Next.js build time.
export {};
