import './globals.css';
import { Geist } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const viewport: Viewport = {
  themeColor: '#0a1628',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Airomeda', template: '%s · Airomeda' },
  description: 'Airomeda — Bilişim teknolojileri çözümleri.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={cn("font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
