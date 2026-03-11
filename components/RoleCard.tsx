import Link from 'next/link';
import type { RoleData } from '@/data/roles';
import { TechIconRow } from './TechIcons';

interface RoleCardProps {
  role: RoleData;
}

export function RoleCard({ role }: RoleCardProps) {
  return (
    <li>
      <Link
        href={`/${role.slug}`}
        className={`role-card${role.variant === 'vibes' ? ' role-card--vibes' : ''}`}
      >
        <div className="role-card-header">
          <h3 className="role-card-title">{role.title}</h3>
          <TechIconRow icons={role.icons} size={24} />
        </div>
        <p className="role-card-desc">{role.shortDesc}</p>
        <span className="role-card-cta" aria-hidden="true">
          View role →
        </span>
      </Link>
    </li>
  );
}
