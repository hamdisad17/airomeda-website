'use client';

import * as React from 'react';
import * as Sentry from '@sentry/nextjs';
import { Container } from '@/components/layout/Container';
import { Link } from '@/i18n/navigation';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <section className="border-b border-border">
      <Container as="div" className="py-32 md:py-40 text-center">
        <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Hata</p>
        <h1 className="mt-6 text-display-2 font-semibold tracking-tight">
          Beklenmedik bir sorun oluştu
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
          Sistemi etkileyen geçici bir sorun var. Kayıt altına aldık ve inceliyoruz.
          Birkaç saniye sonra tekrar denemenizi rica ederiz.
        </p>
        {error.digest && (
          <p className="mt-6 font-mono text-xs text-muted-foreground/60">
            Hata kimliği: {error.digest}
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Tekrar Dene
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Ana sayfaya dön
          </Link>
        </div>
      </Container>
    </section>
  );
}
