'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ContextLink } from './ContextLink';
import { useState, useEffect } from 'react';

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [mobileOpen]);

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

      <button
        className="nav-mobile-only nav-hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          </svg>
        )}
      </button>

      <nav className={`nav-row${mobileOpen ? ' nav-row-mobile' : ''}`} aria-label="Site navigation">
        <Link href="/cv" className={`nav-link${pathname === '/cv' ? ' nav-link--active' : ''}`}>
          View CV
        </Link>
        <a href="/Dan-Napoleoni-CV.pdf" download className="nav-link" title="Download PDF">
          <span>Download PDF</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/daniel-napoleoni"
          className="nav-link nav-mobile-only"
          target="_blank"
          rel="noopener noreferrer"
        >
          View LinkedIn Profile ↗
        </a>
        <a
          href="https://github.com/dnapoleoni/cv-portfolio-2026"
          className="nav-link nav-mobile-only"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Github Repo ↗
        </a>
        <ContextLink
          href="/contact"
          className={`btn-solid-accent${pathname === '/contact' ? ' btn-solid-accent--active' : ''}`}
        >
          Contact Dan
        </ContextLink>
      </nav>
    </header>
  );
}
