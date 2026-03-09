'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import { themes } from '@/data/themes'

export function Header() {
  const pathname = usePathname()
  const { theme, mode, toggleMode, setThemeId } = useTheme()
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

      <nav className="header-nav" aria-label="Primary">
        <Link href="/cv" className={`header-link${pathname === '/cv' ? ' header-link--active' : ''}`}>
          CV
        </Link>
        <a
          href="https://github.com/dnapoleoni/cv-portfolio-2026"
          className="header-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="/Dan-Napoleoni-CV.pdf"
          download
          className="header-download"
          aria-label="Download CV as PDF"
          title="Download CV (PDF)"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>PDF</span>
        </a>

        {/* Theme & Mode controls */}
        <div className="header-controls">
          <button
            onClick={toggleMode}
            className="header-control-btn"
            aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
            title={`${mode === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {mode === 'dark' ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
              </svg>
            )}
          </button>
          <select
            value={theme.id}
            onChange={(e) => setThemeId(e.target.value)}
            className="header-theme-select"
            aria-label="Choose color theme"
          >
            {themes.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </nav>
    </header>
  )
}
