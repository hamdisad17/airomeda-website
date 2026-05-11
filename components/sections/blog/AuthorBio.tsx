import * as React from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';

interface AuthorBioProps {
  author: string;
}

// Simple seed-based deterministic bio lookup
const AUTHOR_BIOS: Record<string, { seed: string; bio: string; role: string }> = {
  'Airomeda Ekibi': {
    seed: 'airomeda',
    bio: 'Airomeda mühendis ekibinin kolektif notları. Fintech, iGaming ve e-ticaret projelerinden sahne arkası.',
    role: 'Mühendislik Ekibi',
  },
  'Mehmet Kara': {
    seed: 'mehmet',
    bio: 'CEO & Co-founder. Finans ve iGaming alanında 10+ yıl. Sistemleri kurgular, ekipleri büyütür.',
    role: 'CEO & Co-founder',
  },
  'Selin Aydın': {
    seed: 'selin',
    bio: 'Kurucu Ortak. Bankacılık ve yazılım sistemleri alanında 10+ yıl deneyim. İşletmeler için güvenilir yazılım çözümleri tasarlar.',
    role: 'Kurucu Ortak',
  },
};

function getAuthorData(name: string) {
  return (
    AUTHOR_BIOS[name] ?? {
      seed: name.toLowerCase().replace(/\s+/g, '-'),
      bio: 'Airomeda ekibinde mühendis.',
      role: 'Mühendis',
    }
  );
}

export function AuthorBio({ author }: AuthorBioProps) {
  const data = getAuthorData(author);
  const avatarUrl = `https://api.dicebear.com/9.x/notionists/svg?seed=${data.seed}&backgroundColor=0a0a0f`;

  return (
    <section className="border-t border-b border-border bg-elevated/30">
      <Container as="div" className="py-12 max-w-3xl mx-auto">
        <p className="text-eyebrow uppercase tracking-wider text-muted-foreground font-medium mb-6">Yazar Hakkında</p>
        <div className="flex items-start gap-6">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden border border-border bg-background">
            <Image
              src={avatarUrl}
              alt={author}
              fill
              className="object-cover p-1"
              sizes="64px"
              unoptimized
            />
          </div>
          <div>
            <p className="font-semibold text-foreground">{author}</p>
            <p className="text-eyebrow uppercase tracking-wider text-accent font-medium mt-1">{data.role}</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-lg">{data.bio}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
