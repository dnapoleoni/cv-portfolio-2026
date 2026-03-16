'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ContextLink } from '@/components/ui/ContextLink';
import { getPdfForSlug } from '@/data/roles';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Icon } from '@/components/ui/Icon';
import { useMobileMenu } from '@/hooks/useMobileMenu';

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const slug = isHome ? undefined : pathname.slice(1);
  const pdf = getPdfForSlug(slug);
  const { isOpen, toggle } = useMobileMenu();

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
        onClick={toggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <Icon name="close" size={24} />
        ) : (
          <Icon name="menu" size={24} />
        )}
      </button>

      <nav className={`nav-row${isOpen ? ' nav-row-mobile' : ''}`} aria-label="Site navigation">
        <DownloadButton href={pdf.href} label="Download CV" className="nav-link" />
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
