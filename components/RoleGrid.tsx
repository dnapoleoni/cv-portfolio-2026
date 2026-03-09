import { roles } from '@/data/roles'
import { RoleCard } from './RoleCard'

export function RoleGrid() {
  return (
    <section className="role-nav" aria-labelledby="role-nav-label">
      <h2 id="role-nav-label" className="role-nav-label">
        Which Dan are you looking for?
      </h2>
      <ul className="role-grid" role="list">
        {roles.map(role => (
          <RoleCard key={role.slug} role={role} />
        ))}
      </ul>
    </section>
  )
}
