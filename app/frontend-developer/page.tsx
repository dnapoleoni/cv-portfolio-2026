import { RolePageView } from '@/components/RolePageView'
import { getRoleBySlug } from '@/data/roles'

export function generateMetadata() {
  const role = getRoleBySlug('frontend-developer')
  if (!role) return {}
  return {
    title: `${role.title} — Dan Napoleoni`,
    description: role.subtitle,
  }
}

export default function FrontendDeveloper() {
  return <RolePageView slug="frontend-developer" />
}
