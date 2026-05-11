import * as React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import type { BlogPostFrontmatter } from '@/lib/schemas/blog-post';

interface FeaturedPostProps {
  post: BlogPostFrontmatter;
}

const COVER_FALLBACK = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80';

export function FeaturedPost({ post }: FeaturedPostProps) {
  const coverSrc = post.cover?.startsWith('http') ? post.cover : COVER_FALLBACK;

  return (
    <RevealSection as="section" className="border-b border-border">
      <Container as="div" className="py-12 md:py-16">
        <p className="font-mono text-eyebrow uppercase text-muted-foreground mb-6">
          {'// öne çıkan yazı'}
        </p>
        <Link href={`/blog/${post.slug}`} className="group block">
          <div className="grid gap-8 md:grid-cols-[1fr_420px] border border-border bg-elevated/30 hover:bg-elevated/60 transition-colors overflow-hidden">
            {/* Text side */}
            <div className="p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((c) => (
                    <span key={c} className="font-mono text-[10px] uppercase tracking-wider text-accent border border-accent/30 px-2 py-0.5">
                      {c}
                    </span>
                  ))}
                </div>
                <h2 className="text-display-3 font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-prose">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4 font-mono text-xs text-muted-foreground">
                <span>{post.author}</span>
                <span className="text-border">·</span>
                <span>{post.published_at}</span>
                <span className="text-border">·</span>
                <span>{post.reading_time} dk okuma</span>
                <span className="ml-auto text-accent group-hover:translate-x-1 transition-transform inline-block">
                  Okumaya devam →
                </span>
              </div>
            </div>

            {/* Image side */}
            <div className="relative min-h-[280px] md:min-h-0 overflow-hidden">
              <Image
                src={coverSrc}
                alt={post.title}
                fill
                className="object-cover grayscale-[30%] contrast-[1.05] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 420px"
                unoptimized={coverSrc.startsWith('https://images.unsplash')}
              />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, hsl(240 8% 6% / 0.4) 0%, transparent 40%)' }}
              />
            </div>
          </div>
        </Link>
      </Container>
    </RevealSection>
  );
}
