import { getRoleBySlug, getOtherRoles, getTimelineForRole, getPdfForSlug } from '@/data/roles';
import { getTestimonialsForRole } from '@/data/testimonials';
import { Timeline } from '@/components/Timeline';
import { SkillTags } from '@/components/SkillTags';
import { TechIconRow } from '@/components/TechIcons';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { RoleCrossNav } from '@/components/RoleCrossNav';
import { ContactSection } from '@/components/ContactSection';
import { RoleHero } from '@/components/RoleHero';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface RolePageViewProps {
  slug: string;
}

export function RolePageView({ slug }: RolePageViewProps) {
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  const otherRoles = getOtherRoles(slug);
  const testimonials = getTestimonialsForRole(slug);
  const timeline = getTimelineForRole(slug);
  const pdf = getPdfForSlug(role.slug);

  return (
    <article className="role-page">
      <Link href="/" className="back-link">
        <span aria-hidden="true">←</span> Back
      </Link>

      {role.tagline && <RoleHero tagline={role.tagline} />}

      <header className="role-page-header">
        <h2 className="role-page-title">
          {role.title}
          {role.icons && <TechIconRow icons={role.icons} size={22} />}
        </h2>
        <p className="role-page-subtitle">{role.subtitle}</p>
        <div style={{ marginTop: 'var(--space-md)' }}>
          <a href={pdf.href} download className="btn-solid-accent">
            <span>Download CV - {role.title} (PDF)</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </header>

      {/* Intro */}
      <section className="role-section">
        {role.intro.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </section>

      {/* Experience (above skills) */}
      {timeline.length > 0 && (
        <section className="role-section" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Experience</h2>
          <Timeline entries={timeline} />
        </section>
      )}

      {/* Skills */}
      <section className="role-section" aria-labelledby="skills-heading">
        <h2 id="skills-heading">Skills & Tools</h2>
        <SkillTags skills={role.skills} />
      </section>

      {/* Content section — "How I work" / "Also" / case studies / etc */}
      {role.contentSection && role.contentSection.items.length > 0 && (
        <section className="role-section" aria-labelledby="content-section-heading">
          <h2 id="content-section-heading">{role.contentSection.heading}</h2>
          {role.contentSection.items.map((item, i) => (
            <div key={i} className={item.title ? 'case-study' : ''}>
              {item.title && <h3>{item.title}</h3>}
              <p>{item.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Testimonials for this role */}
      {testimonials.length > 0 && (
        <TestimonialCarousel
          testimonials={testimonials}
          heading="What people say about this work"
        />
      )}

      {/* CTA */}
      <ContactSection heading="Interested?" slug={role.slug} />

      {/* Cross-nav to other roles */}
      {role.variant !== 'cv' && <RoleCrossNav otherRoles={otherRoles} />}
    </article>
  );
}
