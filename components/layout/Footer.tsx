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
            <p className="mt-8 font-mono text-eyebrow uppercase text-muted-foreground">{'// İstanbul · TR/EN'}</p>
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
        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {year} Airomeda — {t('rights')}</p>
          <p>hello@airomeda.com</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-eyebrow uppercase text-muted-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href as never} className="text-foreground/80 transition-colors hover:text-accent">
        {children}
      </Link>
    </li>
  );
}
