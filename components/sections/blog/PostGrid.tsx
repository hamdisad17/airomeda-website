import * as React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { TiltCard } from '@/components/motion/TiltCard';
import { RevealSection } from '@/components/motion/RevealSection';
import type { BlogPostFrontmatter } from '@/lib/schemas/blog-post';

interface PostGridProps {
  posts: BlogPostFrontmatter[];
  title?: string;
}

const COVER_FALLBACKS = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80',
  'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=600&q=80',
  'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=600&q=80',
];

function getCoverSrc(post: BlogPostFrontmatter, index: number): string {
  if (post.cover?.startsWith('http')) return post.cover;
  return COVER_FALLBACKS[index % COVER_FALLBACKS.length] ?? COVER_FALLBACKS[0]!;
}

export function PostGrid({ posts, title }: PostGridProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-b border-border">
      <Container as="div" className="py-16 md:py-20">
        {title && (
          <RevealSection>
            <p className="text-eyebrow uppercase tracking-wider text-accent font-medium mb-10">{title}</p>
          </RevealSection>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => {
            const coverSrc = getCoverSrc(post, i);
            return (
              <RevealSection key={post.slug} delay={i * 0.08}>
                <TiltCard className="h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col h-full border border-border bg-elevated/30 hover:bg-elevated/60 transition-colors overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={coverSrc}
                        alt={post.title}
                        fill
                        className="object-cover grayscale-[50%] contrast-[1.05] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={coverSrc.startsWith('https://images.unsplash')}
                      />
                      <div className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(180deg, transparent 60%, hsl(240 8% 6% / 0.7))' }}
                      />
                      {/* Category badge */}
                      <div className="absolute bottom-3 left-3 flex gap-1">
                        {post.categories.slice(0, 2).map((c) => (
                          <span key={c} className="font-mono text-[9px] uppercase tracking-wider text-foreground bg-elevated/70 backdrop-blur-sm border border-border px-2 py-0.5">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-5">
                      <h3 className="text-base font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
                        <span>{post.author}</span>
                        <span className="text-border">·</span>
                        <span>{post.published_at}</span>
                        <span className="text-border">·</span>
                        <span>{post.reading_time} dk</span>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </RevealSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
