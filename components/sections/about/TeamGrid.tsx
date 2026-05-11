'use client';
import * as React from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

interface TeamMember {
  name: string;
  role: string;
  seed: string;
  skills: string[];
  bio: string;
}

const TEAM: TeamMember[] = [
  {
    name: 'Mehmet Kara',
    role: 'CEO & Co-founder',
    seed: 'mehmet',
    skills: ['Strategy', 'Fintech', 'Architecture'],
    bio: 'Finans ve iGaming alanında 10+ yıl. Sistemleri kurgular, ekipleri büyütür.',
  },
  {
    name: 'Selin Aydın',
    role: 'CTO & Co-founder',
    seed: 'selin',
    skills: ['Distributed Systems', 'Kotlin', 'Go'],
    bio: 'Core banking ve event-driven mimari uzmanı. CQRS / event sourcing savunucusu.',
  },
  {
    name: 'Emre Demir',
    role: 'Lead Backend Engineer',
    seed: 'emre',
    skills: ['Java', 'Kafka', 'PostgreSQL'],
    bio: 'Ödeme sistemleri ve yüksek erişilebilirlik altyapısı üzerinde çalışıyor.',
  },
  {
    name: 'Zeynep Şahin',
    role: 'Head of Frontend',
    seed: 'zeynep',
    skills: ['React', 'Next.js', 'TypeScript'],
    bio: 'Performans odaklı UI geliştirici. LCP obsesyonu bir yaşam biçimi.',
  },
  {
    name: 'Burak Yılmaz',
    role: 'Senior DevOps',
    seed: 'burak',
    skills: ['k8s', 'Terraform', 'Grafana'],
    bio: 'Multi-region altyapı, sıfır downtime deployment, chaos engineering.',
  },
  {
    name: 'Ayşe Koç',
    role: 'Product Engineer',
    seed: 'ayse',
    skills: ['TypeScript', 'Prisma', 'tRPC'],
    bio: 'Ürün-mühendis köprüsü. Brief&apos;ten production&apos;a en kısa yolu buluyor.',
  },
  {
    name: 'Ozan Çelik',
    role: 'Security Engineer',
    seed: 'ozan',
    skills: ['Vault', 'Zero-trust', 'BDDK'],
    bio: 'Regülasyon uyumu ve güvenlik mimarisi. KYC/AML süreçleri uzmanı.',
  },
  {
    name: 'Murat Karaağaç',
    role: 'iGaming Specialist',
    seed: 'murat',
    skills: ['RNG', 'eCOGRA', 'Compliance'],
    bio: 'Lisanslı iGaming sistemleri, RNG sertifikasyonu ve multi-jurisdiction.',
  },
];

function TeamCard({ member }: { member: TeamMember }) {
  const [hovered, setHovered] = React.useState(false);
  const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${member.seed}&backgroundColor=0a0a0f`;

  return (
    <div
      className="border border-border bg-elevated overflow-hidden group cursor-default relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? 'perspective(800px) rotateY(2deg) rotateX(-1deg)' : 'perspective(800px) rotateY(0) rotateX(0)',
        transition: 'transform 300ms ease-out',
      }}
    >
      {/* Avatar */}
      <div className="relative h-48 bg-background overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 50% 100%, hsl(189 100% 50% / 0.1), transparent 60%)',
          }}
        />
        <Image
          src={avatarUrl}
          alt={member.name}
          fill
          className="object-cover p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
          unoptimized
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="font-semibold tracking-tight text-foreground">{member.name}</p>
        <p className="mt-1 font-mono text-eyebrow uppercase text-muted-foreground">{member.role}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {member.skills.map((s) => (
            <span
              key={s}
              className="border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>
        {/* Bio reveal on hover */}
        <div
          className="overflow-hidden transition-all duration-400"
          style={{ maxHeight: hovered ? '80px' : '0', opacity: hovered ? 1 : 0 }}
        >
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
        </div>
      </div>
    </div>
  );
}

export function TeamGrid() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <Container as="div">
        <RevealSection>
          <p className="font-mono text-eyebrow uppercase text-accent">{'// 02 · ekip'}</p>
          <h2
            className="mt-4 font-semibold tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Kod yazan insanlar.
          </h2>
        </RevealSection>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {TEAM.map((member) => (
            <TeamCard key={member.seed} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}
