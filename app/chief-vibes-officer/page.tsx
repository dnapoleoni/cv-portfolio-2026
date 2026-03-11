import { RolePageView } from '@/components/RolePageView';
import { getRoleBySlug } from '@/data/roles';

export function generateMetadata() {
  const role = getRoleBySlug('chief-vibes-officer');
  if (!role) return {};
  return {
    title: `${role.title} — Dan Napoleoni`,
    description: role.subtitle,
  };
}

export default function ChiefVibesOfficer() {
  return <RolePageView slug="chief-vibes-officer" />;
}
