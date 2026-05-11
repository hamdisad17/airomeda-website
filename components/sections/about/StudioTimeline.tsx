'use client';
import * as React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  { year: '2014', label: 'Kuruluş', detail: 'İstanbul\'da 3 kişilik küçük bir ekip olarak yola çıktık. İlk müşteri projemizi başarıyla teslim ettik.' },
  { year: '2016', label: 'İlk kurumsal proje', detail: 'Lojistik ve insan kaynakları alanında ilk kurumsal projemizi teslim ettik. Sektörel çözümlere adım attık.' },
  { year: '2018', label: 'AR/VR ve oyun geliştirme', detail: 'Oyun geliştirme alanında deneyimli uzmanlar ekibimize katıldı. C# ve Unity ile ilk oyun projeleri hayata geçirildi.' },
  { year: '2020', label: 'Frontend ve e-ticaret', detail: 'React ve Next.js tabanlı büyük ölçekli e-ticaret projeleri. Frontend hizmetleri hızla büyüdü.' },
  { year: '2022', label: 'Eğitim teknolojisi', detail: 'Eğitim teknolojisi alanında deneyimli kadro ekibimize katıldı. EdTech projelerine genişledik.' },
  { year: '2023', label: 'Uluslararası büyüme', detail: 'Avrupa\'dan gelen müşteri talepleriyle uluslararası projelere açıldık. 130+ ülkeye hizmet vermeye başladık.' },
  { year: '2024', label: 'Bankacılık ve fintech uzmanları', detail: 'Bankacılık sektöründe yıllar süren deneyime sahip uzmanlar ekibimize katıldı. Fintech çözümlerimiz güçlendi.' },
  { year: '2025', label: 'AI ürünleri · 36 kişi', detail: 'AI destekli sağlık ve analitik ürün geliştirme hızlandı. 36 kişilik uzman ekibe ulaştık, 85+ aktif müşteri.' },
];

export function StudioTimeline() {
  const ref = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const dots = ref.current.querySelectorAll('.timeline-dot');
    const lines = ref.current.querySelectorAll('.timeline-line');
    const items = ref.current.querySelectorAll('.timeline-item');

    items.forEach((item, i) => {
      gsap.fromTo(
        [dots[i], lines[i]],
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
      gsap.fromTo(
        item.querySelector('.timeline-content'),
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );
    });
  }, { scope: ref });

  return (
    <section className="border-b border-border py-20 md:py-28 relative">
      <Container as="div">
        <RevealSection>
          <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">Kilometre Taşları</p>
          <h2
            className="mt-4 font-semibold tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Nereden nereye.
          </h2>
        </RevealSection>

        <div ref={ref} className="mt-16 max-w-2xl space-y-0">
          {MILESTONES.map((m, i) => (
            <div key={m.year} className="timeline-item relative flex gap-6">
              {/* Dot + line column */}
              <div className="flex flex-col items-center w-10 shrink-0">
                <div
                  className="timeline-dot h-3 w-3 border-2 border-accent bg-background shrink-0 mt-1"
                  style={{ transformOrigin: 'center' }}
                />
                {i < MILESTONES.length - 1 && (
                  <div
                    className="timeline-line flex-1 w-px bg-border mt-1"
                    style={{ minHeight: '64px', transformOrigin: 'top' }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="timeline-content pb-10 flex-1">
                <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">{m.year}</p>
                <h3 className="mt-1 font-semibold tracking-tight text-foreground">{m.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
