import Link from 'next/link';
import type { RoleData } from '@/data/roles';
import { TechIconRow } from '@/components/TechIcons';

interface RoleCrossNavProps {
  otherRoles: RoleData[];
}

export function RoleCrossNav({ otherRoles }: RoleCrossNavProps) {
  return (
    <nav className="cross-nav" aria-labelledby="cross-nav-heading">
      <h2 id="cross-nav-heading" className="section-heading">
        Also looking for a…
      </h2>
      <div className="cross-nav-grid">
        {otherRoles.map((role) => (
          <Link
            key={role.slug}
            href={`/${role.slug}`}
            className={`card cross-nav-card${role.variant === 'vibes' ? ' card--vibes' : ''}`}
          >
            <span className="cross-nav-title">{role.title}</span>
            <TechIconRow icons={role.icons ?? []} size={14} />
          </Link>
        ))}
      </div>
    </nav>
  );
}
