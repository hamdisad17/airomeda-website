import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from './Container';

export async function Footer() {
  const t = await getTranslations('footer');
  const tnav = await getTranslations('nav');
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-paper">
      <Container as="div" className="py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span
              className="font-display text-3xl text-paper"
              style={{ fontVariationSettings: "'opsz' 36, 'wdth' 100, 'wght' 500" }}
            >
              airomeda<span className="text-coral">.</span>
            </span>
            <p className="mt-6 max-w-md text-paper/60">{t('tagline')}</p>
            <p className="mt-12 font-display text-xs uppercase tracking-[0.2em] text-paper/50">
              İstanbul · TR/EN · 2018→{year}
            </p>
          </div>
          <FooterCol title={t('company')}>
            <FooterLink href="/hakkimizda">{tnav('about')}</FooterLink>
            <FooterLink href="/kariyer">{tnav('careers')}</FooterLink>
            <FooterLink href="/iletisim">{tnav('contact')}</FooterLink>
            <FooterLink href="/blog">{tnav('blog')}</FooterLink>
          </FooterCol>
          <FooterCol title={t('services')}>
            <FooterLink href="/hizmetler">{tnav('services')}</FooterLink>
            <FooterLink href="/calismalarimiz">{tnav('work')}</FooterLink>
          </FooterCol>
          <FooterCol title={t('legal')}>
            <FooterLink href="/kvkk">{t('kvkk')}</FooterLink>
            <FooterLink href="/cerez-politikasi">{t('cookies')}</FooterLink>
          </FooterCol>
        </div>
        <div className="mt-20 flex flex-col gap-3 border-t border-paper/10 pt-8 font-display text-xs uppercase tracking-[0.2em] text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} airomeda — {t('rights')}
          </p>
          <p>hello@airomeda.com</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="md:col-span-2">
      <p className="font-display text-xs uppercase tracking-[0.2em] text-paper/50">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href as never}
        className="text-paper/80 transition-colors duration-150 hover:text-coral"
      >
        {children}
      </Link>
    </li>
  );
}
