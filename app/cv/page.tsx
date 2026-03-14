import { RolePageView } from '@/components/RolePageView';

export const metadata = {
  title: 'CV — Dan Napoleoni',
  description: 'Full curriculum vitae for Dan Napoleoni, frontend developer in Melbourne.',
};

export default function CVPage() {
  return <RolePageView slug="cv" />;
}
