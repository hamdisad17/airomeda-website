import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { listServices } from '@/lib/mdx';
import type { Locale } from '@/i18n/routing';

export async function MegaMenu({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'nav' });
  const services = await listServices(locale);

  return (
    <div className="group relative">
      <button
        type="button"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        aria-haspopup="menu"
      >
        {t('services')} ▾
      </button>
      <div className="invisible absolute left-1/2 z-50 mt-3 w-[640px] -translate-x-1/2 rounded-lg border border-border bg-background p-4 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="grid grid-cols-2 gap-1">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={{ pathname: '/hizmetler/[slug]', params: { slug: s.slug } }}
                className="block rounded p-3 hover:bg-muted"
              >
                <span className="font-medium">{s.title}</span>
                <span className="mt-1 block text-xs text-muted-foreground line-clamp-2">
                  {s.excerpt}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
