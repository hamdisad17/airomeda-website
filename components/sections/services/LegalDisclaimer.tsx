import * as React from 'react';
import { Container } from '@/components/layout/Container';

export function LegalDisclaimer() {
  return (
    <section className="border-b border-border bg-elevated/40 py-12">
      <Container as="div">
        <div className="border border-accent/30 bg-accent/5 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 mt-1 text-accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              </svg>
            </span>
            <div className="flex-1">
              <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Önemli Bilgilendirme</p>
              <p className="mt-3 text-sm md:text-base text-foreground leading-relaxed">
                <span className="font-semibold">Airomeda Bilişim Teknolojileri</span> olarak yalnızca{' '}
                <span className="font-semibold text-accent">yazılım hizmeti</span> sunuyoruz. Şirketimizin hiçbir şans oyunu sitesi, finans veya yatırım platformu ile ortaklığı, sahipliği veya operasyonel bağı bulunmamaktadır.
              </p>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                Müşterilerimiz, kendi alanlarında{' '}
                <span className="font-medium text-foreground">lisanslı olarak faaliyet gösteren kurumsal firmalardır</span>. Biz, yalnızca bu firmalar için yazılım geliştiriyoruz.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
