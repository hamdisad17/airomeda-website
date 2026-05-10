import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Container } from './Container';
import { Logo } from './Logo';

export async function Footer() {
  const t = await getTranslations('footer');
  const tnav = await getTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-border">
      <Container as="div" className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo href="/" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">{t('tagline')}</p>
            <p className="mt-8 font-mono text-eyebrow uppercase text-muted-foreground">{'// İstanbul / EU+TR'}</p>
          </div>
          <FooterColumn title={t('company')}>
            <FooterLink href="/hakkimizda">{tnav('about')}</FooterLink>
            <FooterLink href="/kariyer">{tnav('careers')}</FooterLink>
            <FooterLink href="/iletisim">{tnav('contact')}</FooterLink>
            <FooterLink href="/blog">{tnav('blog')}</FooterLink>
          </FooterColumn>
          <FooterColumn title={t('services')}>
            <FooterLink href="/hizmetler">{tnav('services')}</FooterLink>
            <FooterLink href="/calismalarimiz">{tnav('work')}</FooterLink>
          </FooterColumn>
          <FooterColumn title={t('legal')}>
            <FooterLink href="/kvkk">{t('kvkk')}</FooterLink>
            <FooterLink href="/cerez-politikasi">{t('cookies')}</FooterLink>
          </FooterColumn>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 font-mono text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {year} airomeda<span className="text-accent">.</span> — {t('rights')}</p>
          <p>{'// system online'}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-eyebrow uppercase text-muted-foreground">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href as never}
        className="text-foreground/80 transition-colors duration-150 hover:text-accent"
      >
        {children}
      </Link>
    </li>
  );
}
