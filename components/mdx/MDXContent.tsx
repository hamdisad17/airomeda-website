import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Callout } from './Callout';
import { Quote } from './Quote';

const components = {
  Callout,
  Quote,
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2 className="mt-12 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="mt-8 text-xl font-semibold tracking-tight" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="mt-4 leading-7 text-muted-foreground" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a className="text-accent underline-offset-4 hover:underline" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="mt-4 list-disc pl-6 text-muted-foreground" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="mt-4 list-decimal pl-6 text-muted-foreground" {...props} />
  ),
};

export async function MDXContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });
  return <div className="prose-invert">{content}</div>;
}
