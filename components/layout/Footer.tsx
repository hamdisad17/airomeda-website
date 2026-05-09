import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from './Container';
import { Logo } from './Logo';

export async function Footer() {
  const t = await getTranslations('footer');
  const tnav = await getTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-background">
      <Container as="div" className="py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo href="/" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{t('tagline')}</p>
          </div>
          <FooterColumn title={t('company')}>
            <FooterLink href="/hakkimizda">{tnav('about')}</FooterLink>
            <FooterLink href="/kariyer">{tnav('careers')}</FooterLink>
            <FooterLink href="/iletisim">{tnav('contact')}</FooterLink>
            <FooterLink href="/blog">{tnav('blog')}</FooterLink>
          </FooterColumn>
          <FooterColumn title={t('services')}>
            <FooterLink href="/hizmetler">{tnav('services')}</FooterLink>
          </FooterColumn>
          <FooterColumn title={t('legal')}>
            <FooterLink href="/kvkk">{t('kvkk')}</FooterLink>
            <FooterLink href="/cerez-politikasi">{t('cookies')}</FooterLink>
          </FooterColumn>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {year} Airomeda. {t('rights')}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href as never}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}
