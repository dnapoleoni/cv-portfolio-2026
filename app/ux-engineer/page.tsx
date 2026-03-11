import { RolePageView } from '@/components/RolePageView';
import { getRoleBySlug } from '@/data/roles';

export function generateMetadata() {
  const role = getRoleBySlug('ux-engineer');
  if (!role) return {};
  return {
    title: `${role.title} — Dan Napoleoni`,
    description: role.subtitle,
  };
}

export default function UXEngineer() {
  return <RolePageView slug="ux-engineer" />;
}
