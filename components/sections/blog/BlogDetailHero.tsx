import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import type { BlogPostFrontmatter } from '@/lib/schemas/blog-post';

interface BlogDetailHeroProps {
  post: BlogPostFrontmatter;
}

export function BlogDetailHero({ post }: BlogDetailHeroProps) {
  return (
    <section className="relative border-b border-border overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgb(20 184 166 / 0.07), transparent 70%)',
        }}
      />
      <Container as="div" className="relative py-20 md:py-28 max-w-4xl mx-auto">
        <RevealSection>
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories.map((c) => (
              <span key={c} className="font-mono text-[10px] uppercase tracking-wider text-accent border border-accent/40 px-3 py-1">
                {c}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="font-semibold tracking-tight text-foreground"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.04em' }}
          >
            {post.title}
          </h1>

          {/* Subtitle / excerpt */}
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {post.excerpt}
          </p>

          {/* Meta strip */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground border-t border-border pt-6">
            <span className="text-foreground font-medium">{post.author}</span>
            <span>·</span>
            <span>{post.published_at}</span>
            <span>·</span>
            <span>{post.reading_time} dk okuma</span>
          </div>
        </RevealSection>
      </Container>
    </section>
  );
}
