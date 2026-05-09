import { Link } from '@/i18n/navigation';
import { BlogMeta } from './BlogMeta';
import type { BlogPostFrontmatter } from '@/lib/schemas/blog-post';

export function BlogCard({ post }: { post: BlogPostFrontmatter }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-lg border border-border bg-muted/20 p-6 transition-colors hover:border-accent hover:bg-muted/40"
    >
      <ul className="mb-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
        {post.categories.slice(0, 3).map((c) => (
          <li key={c} className="rounded-full border border-border px-2 py-0.5">
            {c}
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold leading-tight">{post.title}</h3>
      <p className="mt-3 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
      <div className="mt-5">
        <BlogMeta post={post} />
      </div>
    </Link>
  );
}
