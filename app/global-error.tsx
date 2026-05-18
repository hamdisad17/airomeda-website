'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: '#0B1320',
          color: '#F8FAFC',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Beklenmedik bir hata oluştu
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', maxWidth: '32rem', textAlign: 'center', lineHeight: 1.6 }}>
          Sistemi etkileyen geçici bir sorun var. Sorunu kayıt altına aldık ve inceliyoruz.
          Birkaç saniye sonra tekrar denemenizi rica ederiz.
        </p>
        {error.digest && (
          <p style={{ color: '#64748B', fontSize: '0.75rem', marginBottom: '2rem', fontFamily: 'monospace' }}>
            Hata kimliği: {error.digest}
          </p>
        )}
        <button
          type="button"
          onClick={reset}
          style={{
            background: '#14B8A6',
            color: '#0B1320',
            border: 'none',
            padding: '0.875rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'opacity 200ms',
          }}
        >
          Tekrar Dene
        </button>
      </body>
    </html>
  );
}
