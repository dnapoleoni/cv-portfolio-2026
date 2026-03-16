import { getRoleBySlug, getOtherRoles, getPdfForSlug } from '@/lib/roles';
import { getTimelineForRole } from '@/lib/experiences';
import { getTestimonialsForRole } from '@/lib/testimonials';
import { getContentItems } from '@/lib/content';
import { Timeline } from '@/components/sections/Timeline';
import { SkillTags } from '@/components/ui/SkillTags';
import { TechIconRow } from '@/components/TechIcons';
import { TestimonialCarousel } from '@/components/sections/TestimonialCarousel';
import { RoleCrossNav } from '@/components/sections/RoleCrossNav';
import { ContactSection } from '@/components/sections/ContactSection';
import { RoleHero } from '@/components/sections/RoleHero';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DownloadButton } from '@/components/ui/DownloadButton';

interface RolePageViewProps {
  slug: string;
}

export function RolePageView({ slug }: RolePageViewProps) {
  const role = getRoleBySlug(slug);
  if (!role) notFound();

  const otherRoles = getOtherRoles(slug);
  const testimonials = getTestimonialsForRole(slug);
  const timeline = getTimelineForRole(role.experienceIds, slug);
  const pdf = getPdfForSlug(role.slug);
  const resolvedContentItems = role.contentSection
    ? getContentItems(role.contentSection.itemIds)
    : [];

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
        <div className="mt-md">
          <DownloadButton href={pdf.href} label={pdf.label} className="btn-solid-accent" />
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
      {role.contentSection && resolvedContentItems.length > 0 && (
        <section className="role-section" aria-labelledby="content-section-heading">
          <h2 id="content-section-heading">{role.contentSection.heading}</h2>
          {resolvedContentItems.map((item) => (
            <div key={item.id} className={item.title ? 'case-study' : ''}>
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
      {otherRoles.length > 0 && <RoleCrossNav otherRoles={otherRoles} />}
    </article>
  );
}
