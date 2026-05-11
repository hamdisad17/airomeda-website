'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { MagneticButton } from '@/components/motion/MagneticButton';

export function NewsletterCTA() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <RevealSection as="section" className="border-b border-border bg-elevated/20">
      <Container as="div" className="py-20 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Bülten</p>
            <h2 className="mt-4 font-semibold tracking-tight text-foreground"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em' }}>
              Aylık 1 mail.<br />
              <span className="text-muted-foreground">Sektörden notlar.</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
              Spam yok. Reklam yok. Sadece üretim ortamından öğrendiklerimiz — her ayın ilk haftasında.
            </p>
          </div>

          <div>
            {submitted ? (
              <div className="border border-accent/40 bg-accent/10 p-6">
                <p className="font-mono text-sm text-accent">✓ kaydedildi — ilk sayıda görüşürüz.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-0 border border-border bg-background">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e-posta adresiniz"
                    required
                    className="flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none font-mono"
                  />
                  <MagneticButton>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-accent text-accent-foreground font-mono text-xs uppercase tracking-wider hover:shadow-[0_0_30px_-5px_hsl(189_100%_50%_/_0.5)] transition-shadow"
                    >
                      Abone ol
                    </button>
                  </MagneticButton>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground">
                  İstediğiniz zaman aboneliğinizi iptal edebilirsiniz.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </RevealSection>
  );
}
