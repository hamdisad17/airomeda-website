import type { BlogPostFrontmatter } from '@/lib/schemas/blog-post';
import { BlogCard } from './BlogCard';

export function BlogList({ posts }: { posts: BlogPostFrontmatter[] }) {
  if (posts.length === 0) return null;
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <li key={p.slug}>
          <BlogCard post={p} />
        </li>
      ))}
    </ul>
  );
}
