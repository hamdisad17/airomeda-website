import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { ContactForm } from '@/components/forms/ContactForm';

export function CinematicContactForm() {
  return (
    <RevealSection as="section" id="brief-form" className="border-b border-border">
      <Container as="div" className="py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-[340px_1fr] items-start">
          {/* Left editorial column */}
          <div>
            <p className="font-mono text-eyebrow uppercase text-accent mb-4">{'// brief'}</p>
            <h2
              className="font-semibold tracking-tight text-foreground"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Projenizi<br />
              anlatın.
            </h2>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs">
              Hangi aşamada olursanız olun — fikir aşamasından aktif projeye kadar. Yanıt süresi: iş günü içinde 24 saat.
            </p>

            <div className="mt-8 border border-border bg-elevated p-4 font-mono text-[10px] space-y-2">
              <p className="text-muted-foreground uppercase tracking-wider">{'> yanıt garantisi'}</p>
              <p className="text-foreground"><span className="text-accent">24h</span> yanıt süresi</p>
              <p className="text-foreground"><span className="text-accent">NDA</span> imzalanabilir</p>
              <p className="text-foreground"><span className="text-accent">TR · EN</span> görüşme dili</p>
            </div>
          </div>

          {/* Right form */}
          <div className="border border-border bg-elevated/20 p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </RevealSection>
  );
}
