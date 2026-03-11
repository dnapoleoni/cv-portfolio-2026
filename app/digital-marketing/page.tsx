import { RolePageView } from '@/components/RolePageView';
import { getRoleBySlug } from '@/data/roles';

export function generateMetadata() {
  const role = getRoleBySlug('digital-marketing');
  if (!role) return {};
  return {
    title: `${role.title} — Dan Napoleoni`,
    description: role.subtitle,
  };
}

export default function DigitalMarketing() {
  return <RolePageView slug="digital-marketing" />;
}
