import * as React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import type { BlogPostFrontmatter } from '@/lib/schemas/blog-post';

interface RelatedPostsProps {
  posts: BlogPostFrontmatter[];
}

const COVER_FALLBACKS = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
];

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <RevealSection as="section" className="border-b border-border">
      <Container as="div" className="py-16 md:py-20">
        <p className="font-mono text-eyebrow uppercase text-accent mb-8">{'// ilgili yazılar'}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((post, i) => {
            const coverSrc: string = post.cover?.startsWith('http')
              ? post.cover
              : (COVER_FALLBACKS[i % COVER_FALLBACKS.length] ?? COVER_FALLBACKS[0]!);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-border bg-elevated/20 hover:bg-elevated/60 transition-colors overflow-hidden"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={coverSrc}
                    alt={post.title}
                    fill
                    className="object-cover grayscale-[50%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized={coverSrc.startsWith('https://images.unsplash')}
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                    {post.title}
                  </p>
                  <p className="mt-2 font-mono text-[10px] text-muted-foreground">
                    {post.reading_time} dk · {post.published_at}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </RevealSection>
  );
}
