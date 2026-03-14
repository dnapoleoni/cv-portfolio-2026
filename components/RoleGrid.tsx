import { getDisplayRoles } from '@/data/roles';
import { RoleCard } from './RoleCard';

export function RoleGrid() {
  const displayRoles = getDisplayRoles();
  return (
    <section className="role-nav" aria-labelledby="role-nav-label">
      <h2 id="role-nav-label" className="role-nav-label">
        Click below to view a role-specific CV for...
      </h2>
      <ul className="role-grid role-grid--prominent" role="list">
        {displayRoles.map((role) => (
          <RoleCard key={role.slug} role={role} />
        ))}
      </ul>
    </section>
  );
}
