import Link from 'next/link';
import { getContentItems } from '@/lib/content';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { RoleCrossNav } from '@/components/sections/RoleCrossNav';
import { getDisplayRoles } from '@/lib/roles';

export const metadata = {
  title: 'Work & Case Studies — Dan Napoleoni',
  description:
    'Selected projects and case studies from 15+ years of frontend development, digital marketing, and UX engineering.',
};

const caseStudyGroups = [
  {
    label: 'Frontend Development',
    link: 'frontend-developer',
    ids: ['fe-flow-modal', 'fe-honest-fox-cms'],
  },
  {
    label: 'Digital Marketing',
    link: 'digital-marketer',
    ids: ['dm-auspost-overhaul', 'dm-aussuper-banners', 'dm-myer-edm'],
  },
  {
    label: 'UX Engineering',
    link: 'ux-engineer',
    ids: ['ux-splose-dashboard', 'ux-smith-family'],
  },
  {
    label: 'Culture & Vibes',
    link: 'chief-vibes-officer',
    ids: ['cvo-easter-bunny', 'cvo-panem-travel', 'cvo-five-clubs'],
  },
];

export default function WorkPage() {
  const allRoles = getDisplayRoles();
  return (
    <article className="role-page">
      <header className="page-header">
        <h1 className="page-heading">About that...</h1>
        <p className="page-subheading">
          Fifteen years of agency and enterprise work means most of what I&apos;ve built was
          temporary by nature — marketing campaigns, client portals behind logins, sites that have
          since been redesigned or no longer exist. Rather than fake portfolio pieces, here&apos;s
          what I can share — the problems I solved, the systems I built, and the decisions I made.
        </p>
      </header>

      {caseStudyGroups.map((group) => {
        const items = getContentItems(group.ids);
        if (items.length === 0) return null;
        return (
          <section key={group.label} className="role-section">
            <h2 className="section-heading">
              <Link href={`/${group.link}`}>{group.label}</Link>
            </h2>
            {items.map((item) => (
              <div key={item.id} className="case-study">
                {item.title && <h3>{item.title}</h3>}
                <p>{item.description}</p>
              </div>
            ))}
          </section>
        );
      })}

      <ContactCTA />
      <RoleCrossNav roles={allRoles} />
    </article>
  );
}
