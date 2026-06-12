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
        className="inline-flex items-center gap-1 text-sm font-medium text-foreground/75 transition-colors hover:text-accent group-hover:text-accent"
        aria-haspopup="menu"
      >
        {t('services')} <span className="text-xs transition-transform duration-300 group-hover:rotate-180">▾</span>
      </button>
      <div className="invisible absolute left-1/2 z-50 mt-3 w-[640px] -translate-x-1/2 translate-y-1 rounded-2xl border border-border bg-elevated p-3 opacity-0 shadow-2xl shadow-black/60 ring-1 ring-black/20 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <ul className="grid grid-cols-2 gap-1">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/hizmetler/${s.slug}`}
                className="group/item block rounded-xl border border-transparent p-3 transition-colors hover:border-border hover:bg-background"
              >
                <span className="font-semibold text-foreground transition-colors group-hover/item:text-accent">{s.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground line-clamp-2">
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
