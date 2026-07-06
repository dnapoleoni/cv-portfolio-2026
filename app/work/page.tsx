import Link from 'next/link';
import { getContentItems } from '@/lib/content';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { RoleCrossNav } from '@/components/sections/RoleCrossNav';
import { getDisplayRoles } from '@/lib/roles';
import { contact } from '@/data/contact';

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
    <article className="content-page">
      <header className="page-header">
        <h1 className="page-heading">About that...</h1>
        <p className="page-subheading">
          Fifteen years of agency and enterprise work means most of what I&apos;ve built was
          temporary by nature: marketing campaigns, client portals behind logins, sites that have
          since been redesigned or quietly disappeared. I&apos;m not going to fake portfolio pieces,
          so here&apos;s what I can share instead — the problems I solved, the systems I built, and
          the decisions I made.
        </p>
      </header>

      <hr className="divider-subtle" />
      <h2 className="section-heading">Portfolio Pieces</h2>

      <section className="role-section">
        <h3 className="section-heading">2026 CV & Portfolio website (yes, this one!)</h3>
        <p>
          The site you&apos;re on right now started as a simple portfolio build and became a case
          study in its own right. The brief I gave myself: build something that works as an online
          CV, a code sample, a list of references and a personality test, covering four different
          roles, without it feeling like four completely different sites.
        </p>
        <p>
          The core UX decision was making role pages the primary entry point rather than the home
          page. A recruiter clicking a link from a job application lands directly on the relevant
          role, with tailored experience descriptions, skills, and a role-specific PDF. They never
          need to see the home page. If they want the full picture, it&apos;s one click away.
        </p>
        <p>
          Under the hood, all four roles (and the overall one) pull from a single shared data layer
          with role-aware variant resolution. One set of experiences, one set of content blocks.
          Change a job description once and it updates everywhere. The whole thing runs on Next.js
          with server components by default, vanilla CSS with fluid typography and spacing, no
          Tailwind and no component libraries, 12 colour themes with AAA contrast, and build-time
          PDF generation via React-PDF.
        </p>
        <p>
          Large parts of it were built with Claude. Not by copy-pasting output — I used it as a
          design partner, architecture sounding board, copy editor and pair programmer, and the
          prompts are saved in the repo if you want to see how. The code is the deliverable. The
          process is where it gets interesting.
        </p>
        <div className="link-group mt-md">
          <a
            href={contact.gitHub}
            className="link-mono"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the code (opens in new tab)"
          >
            View the code ↗
          </a>
        </div>
      </section>
      <hr className="divider-subtle" />
      <h2 className="section-heading">Case Studies</h2>
      {caseStudyGroups.map((group) => {
        const items = getContentItems(group.ids);
        if (items.length === 0) return null;
        return (
          <section key={group.label} className="role-section">
            <h3 className="section-heading">
              <Link href={`/${group.link}`}>{group.label}</Link>
            </h3>
            {items.map((item) => (
              <div key={item.id} className="case-study">
                {item.title && <h4>{item.title}</h4>}
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
