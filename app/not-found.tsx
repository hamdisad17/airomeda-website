import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: '#0B1320',
          color: '#F8FAFC',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <p style={{ color: '#14B8A6', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
          404
        </p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 600, marginTop: '1rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Sayfa bulunamadı
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', maxWidth: '32rem', textAlign: 'center', lineHeight: 1.6 }}>
          Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
        </p>
        <Link
          href="/tr"
          style={{
            background: '#14B8A6',
            color: '#0B1320',
            textDecoration: 'none',
            padding: '0.875rem 1.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          Ana sayfaya dön
        </Link>
      </body>
    </html>
  );
}
