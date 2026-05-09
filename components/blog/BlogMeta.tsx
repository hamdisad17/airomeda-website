import { getTranslations, getLocale } from 'next-intl/server';
import type { BlogPostFrontmatter } from '@/lib/schemas/blog-post';

export async function BlogMeta({ post }: { post: BlogPostFrontmatter }) {
  const t = await getTranslations('blog');
  const locale = await getLocale();
  const date = new Date(post.published_at).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <p className="text-xs text-muted-foreground">
      <span>{date}</span>
      <span className="mx-2">·</span>
      <span>{post.author}</span>
      <span className="mx-2">·</span>
      <span>
        {post.reading_time} {t('min_read')}
      </span>
    </p>
  );
}
