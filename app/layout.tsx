import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';
import { ConsoleGreeting } from '@/components/ui/ConsoleGreeting';

export const metadata: Metadata = {
  title: 'Dan Napoleoni — Developer, Designer-Thinker, Human Communicator',
  description:
    'Frontend developer with 15+ years across the full evolution of digital. A developer who thinks like a designer and communicates like a human.',
  metadataBase: new URL('https://dnapoleoni-cv-portfolio.netlify.app'),
  openGraph: {
    title: 'Dan Napoleoni — A developer who thinks like a designer and communicates like a human',
    description:
      'Frontend developer with 15+ years across the full evolution of digital. React, TypeScript, Vue.js, and a whole lot more.',
    type: 'website',
    locale: 'en_AU',
    url: 'https://danielnapoleoni.dev',
    siteName: 'Dan Napoleoni',
    images: [
      {
        url: '/images/og/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Dan Napoleoni — Frontend Developer portfolio site showing profile photo and role cards',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dan Napoleoni — A developer who thinks like a designer and communicates like a human',
    description:
      'Frontend developer with 15+ years across the full evolution of digital. React, TypeScript, Vue.js, and a whole lot more.',
    images: ['/images/og/og-default.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=Libre+Baskerville:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ConsoleGreeting />
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <div className="page-wrapper">
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
