import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BrandingProvider } from '@/components/BrandingProvider';

export const metadata: Metadata = {
  title: 'Campaign 365',
  description: 'Political Campaign Management Platform',
};

// CRITICAL: without this, mobile browsers default to ~980px viewport
// and the entire responsive layout breaks
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-full">
        <BrandingProvider>{children}</BrandingProvider>
      </body>
    </html>
  );
}
