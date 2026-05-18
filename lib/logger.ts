import 'server-only';
import pino, { type Logger } from 'pino';

// PII masker — pino's "redact" feature uses JSON paths. We add the
// usual suspects so contact form payloads / job application bodies
// never spill plaintext PII into the log files.
const REDACT_PATHS = [
  '*.email',
  '*.phone',
  '*.name',
  '*.cover_letter',
  '*.message',
  '*.payload.email',
  '*.payload.phone',
  '*.payload.name',
  '*.payload.cover_letter',
  '*.payload.message',
  'email',
  'phone',
  'name',
  'cover_letter',
  'message',
];

const LEVEL = process.env.LOG_LEVEL ?? (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

export const logger: Logger = pino({
  level: LEVEL,
  redact: {
    paths: REDACT_PATHS,
    censor: '[REDACTED]',
  },
  // Pretty in dev, JSON in prod (logrotate-friendly + machine-parseable)
  ...(process.env.NODE_ENV !== 'production'
    ? {
        transport: {
          target: 'pino/file',
          options: { destination: 1 }, // stdout
        },
      }
    : {}),
});

/**
 * Convenience namespace logger — call once at module top with a name
 * and reuse the returned child logger:
 *
 *   const log = childLogger('form-action');
 *   log.info({ ip }, 'received submission');
 */
export function childLogger(name: string): Logger {
  return logger.child({ logger: name });
}
