'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ContextLink } from '@/components/ui/ContextLink';
import { getPdfForSlug, getDisplayRoles } from '@/lib/roles';
import { DownloadButton } from '@/components/ui/DownloadButton';
import { Icon } from '@/components/ui/Icon';
import { useMobileMenu } from '@/hooks/useMobileMenu';

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const slug = isHome ? undefined : pathname.slice(1);
  const pdf = getPdfForSlug(slug);
  const { isOpen, toggle } = useMobileMenu();
  const displayRoles = getDisplayRoles();

  return (
    <header className="site-header" role="banner">
      <div className="site-header-wrapper">
        <div className="site-header-contents">
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
            {isOpen ? <Icon name="close" size={24} /> : <Icon name="menu" size={24} />}
          </button>

          <nav className={`nav-row${isOpen ? ' nav-row-mobile' : ''}`} aria-label="Site navigation">
            {displayRoles.map((role) => (
              <Link
                key={role.slug}
                href={`/${role.slug}`}
                className={`nav-link nav-mobile-only${pathname === `/${role.slug}` ? ' nav-link--active' : ''}`}
              >
                {role.title}
              </Link>
            ))}
            <hr className="divider-subtle divider-stretch nav-mobile-only" />
            <Link
              href="/work"
              className={`nav-link nav-mobile-only${pathname === `/work` ? ' nav-link--active' : ''}`}
            >
              View Portfolio
            </Link>
            <DownloadButton href={pdf.href} label="Download CV" className="nav-link" />
            <ContextLink
              href="/contact"
              className={`btn-solid-accent${pathname === '/contact' ? ' btn-solid-accent--active' : ''}`}
            >
              Contact Dan
            </ContextLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
