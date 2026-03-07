import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dan Napoleoni — Developer, Designer-Thinker, Human Communicator',
  description: 'Frontend developer with 15+ years across the full evolution of digital. A developer who thinks like a designer and communicates like a human.',
  openGraph: {
    title: 'Dan Napoleoni — A developer who thinks like a designer and communicates like a human',
    description: 'Frontend developer with 15+ years across the full evolution of digital. React, TypeScript, Vue.js, and a whole lot more.',
    type: 'website',
    locale: 'en_AU',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Outfit (body), JetBrains Mono (code), Cormorant Garamond (serif), Caveat (hand) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div className="page-wrapper">
          <header className="site-header" role="banner">
            <a href="/" className="site-wordmark" aria-label="Dan Napoleoni — Home">
              dan.napoleoni
            </a>
            <nav aria-label="Primary">
              <a href="/cv">CV</a>
              <a href="mailto:hello@danielnapoleoni.dev">Contact</a>
              <a
                href="https://github.com/danielnapoleoni"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </nav>
          </header>

          <main id="main-content">
            {children}
          </main>

          <footer className="site-footer" role="contentinfo">
            <div className="footer-content">
              <p className="footer-text">
                © {new Date().getFullYear()} Dan Napoleoni · Melbourne, Australia
              </p>
              <div className="footer-links">
                <a
                  href="https://www.linkedin.com/in/daniel-napoleoni"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/danielnapoleoni"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a href="mailto:hello@danielnapoleoni.dev">Email</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
