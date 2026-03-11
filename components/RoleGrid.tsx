import { roles } from '@/data/roles'
import { RoleCard } from './RoleCard'

export function RoleGrid() {
  return (
    <section className="role-nav" aria-labelledby="role-nav-label">
      <h2 id="role-nav-label" className="role-nav-label">
        Currently available for...
      </h2>
      <ul className="role-grid role-grid--prominent" role="list">
        {roles.map(role => (
          <RoleCard key={role.slug} role={role} />
        ))}
      </ul>
    </section>
  )
}
