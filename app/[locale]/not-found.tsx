import { Container } from '@/components/layout/Container';
import { Link } from '@/i18n/navigation';

export default function LocaleNotFound() {
  return (
    <section className="border-b border-border">
      <Container as="div" className="py-32 md:py-40 text-center">
        <p className="text-eyebrow uppercase tracking-wider text-accent font-medium">404</p>
        <h1 className="mt-6 text-display-2 font-semibold tracking-tight">
          Sayfa bulunamadı
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
          Aradığınız sayfa taşınmış, ismi değişmiş ya da hiç var olmamış olabilir. Aşağıdaki
          bağlantılardan devam edebilirsiniz.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Ana sayfaya dön
          </Link>
          <Link
            href="/calismalarimiz"
            className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Çalışmalarımız
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            İletişim
          </Link>
        </div>
      </Container>
    </section>
  );
}
