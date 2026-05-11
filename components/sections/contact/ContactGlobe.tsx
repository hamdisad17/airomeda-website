import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { DeploymentGlobe } from '@/components/sections/DeploymentGlobe';

export function ContactGlobe() {
  return (
    <RevealSection as="section" className="border-b border-border bg-elevated/10">
      <Container as="div" className="py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-[1fr_320px] items-start">
          {/* Globe */}
          <div className="relative border border-border bg-background overflow-hidden" style={{ minHeight: '360px' }}>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgb(20 184 166 / 0.05), transparent 70%)',
              }}
            />
            <div className="absolute inset-0">
              <DeploymentGlobe />
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {'4 aktif bölge · 47 üretim sistemi · Cloudflare 320+ POP'}
            </div>
          </div>

          {/* Address sidebar */}
          <div className="space-y-6 font-mono text-xs">
            <div className="border border-border bg-elevated p-6">
              <p className="text-muted-foreground uppercase tracking-wider mb-4">{'> ofis'}</p>
              <div className="space-y-1 text-foreground/80">
                <p className="text-foreground font-medium">Airomeda A.Ş.</p>
                <p>Maslak Büyükdere Cad. No: 237</p>
                <p>Kat: 12</p>
                <p>34485 Sarıyer / İstanbul</p>
                <p className="text-muted-foreground">Türkiye</p>
              </div>
            </div>

            <div className="border border-border bg-elevated p-6">
              <p className="text-muted-foreground uppercase tracking-wider mb-4">{'> çalışma saatleri'}</p>
              <div className="space-y-2 text-foreground/80">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pzt–Cum</span>
                  <span className="text-accent">09:00–18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">C.tesi–Pzr</span>
                  <span className="text-muted-foreground">kapalı</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saat dilimi</span>
                  <span>UTC+3</span>
                </div>
              </div>
            </div>

            <div className="border border-border bg-elevated p-6">
              <p className="text-muted-foreground uppercase tracking-wider mb-4">{'> e-posta'}</p>
              <div className="space-y-2">
                <div>
                  <p className="text-muted-foreground text-[10px] mb-1">Yeni proje / brief</p>
                  <a href="mailto:brief@airomeda.com" className="text-accent hover:underline">
                    brief@airomeda.com
                  </a>
                </div>
                <div>
                  <p className="text-muted-foreground text-[10px] mb-1">Kariyer</p>
                  <a href="mailto:careers@airomeda.com" className="text-accent hover:underline">
                    careers@airomeda.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </RevealSection>
  );
}
