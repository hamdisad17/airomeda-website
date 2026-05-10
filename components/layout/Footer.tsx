import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from './Container';
import { Logo } from './Logo';

export async function Footer() {
  const t = await getTranslations('footer');
  const tnav = await getTranslations('nav');
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-muted/30">
      <Container as="div" className="py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo href="/" />
            <p className="mt-5 max-w-xs text-sm text-muted-foreground">{t('tagline')}</p>
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
        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {year} Airomeda — {t('rights')}</p>
          <p>İstanbul · TR/EN · hello@airomeda.com</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href as never} className="text-muted-foreground transition-colors hover:text-accent">
        {children}
      </Link>
    </li>
  );
}
