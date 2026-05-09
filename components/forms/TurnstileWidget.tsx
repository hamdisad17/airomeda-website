'use client';

import { Turnstile } from '@marsidev/react-turnstile';

type Props = {
  onVerify: (token: string) => void;
  onExpire?: () => void;
};

export function TurnstileWidget({ onVerify, onExpire }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) {
    // Dev/staging fallback — render a placeholder note
    return (
      <p className="text-xs text-muted-foreground">
        (Turnstile bot doğrulaması yayında değil — token boş gönderilecek.)
      </p>
    );
  }
  return (
    <Turnstile
      siteKey={siteKey}
      onSuccess={onVerify}
      onExpire={onExpire}
      options={{ theme: 'dark' }}
    />
  );
}
