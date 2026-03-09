'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className="site-header" role="banner">
      {isHome ? (
        <span className="site-wordmark" aria-label="danielnapoleoni.dev">
          danielnapoleoni.dev
        </span>
      ) : (
        <Link href="/" className="site-wordmark" aria-label="danielnapoleoni.dev — Home">
          danielnapoleoni.dev
        </Link>
      )}

      <nav className="nav-row" aria-label="CV links for online view and PDF download">
        <Link href="/cv" className={`nav-link${pathname === '/cv' ? ' nav-link--active' : ''}`}>
          View CV
        </Link>
        <a
          href="/Dan-Napoleoni-CV.pdf"
          download
          className="nav-link"
          title="Download PDF"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Download PDF</span>
        </a>
        <Link href="/contact" className={`btn-accent${pathname === '/contact' ? ' btn-accent--active' : ''}`}>Get in touch!</Link>
      </nav>
    </header>
  )
}
