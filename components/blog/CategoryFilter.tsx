import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { listBlogCategories } from '@/lib/mdx';
import { cn } from '@/lib/utils';

export async function CategoryFilter({
  locale,
  active,
}: {
  locale: Locale;
  active?: string;
}) {
  const t = await getTranslations({ locale, namespace: 'blog' });
  const categories = await listBlogCategories(locale);

  return (
    <nav aria-label="Categories" className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={cn(
          'rounded-full border px-3 py-1 text-sm transition-colors',
          !active
            ? 'border-accent bg-accent text-accent-foreground'
            : 'border-border text-muted-foreground hover:text-foreground',
        )}
      >
        {t('all_categories')}
      </Link>
      {categories.map((c) => (
        <Link
          key={c}
          href={`/blog/kategori/${c}`}
          className={cn(
            'rounded-full border px-3 py-1 text-sm transition-colors',
            active === c
              ? 'border-accent bg-accent text-accent-foreground'
              : 'border-border text-muted-foreground hover:text-foreground',
          )}
        >
          {c}
        </Link>
      ))}
    </nav>
  );
}
