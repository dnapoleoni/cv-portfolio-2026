import { roles, getRoleBySlug, getOtherRoles } from '@/data/roles'
import { getTestimonialsForRole } from '@/data/testimonials'
import { Timeline } from '@/components/Timeline'
import { SkillTags } from '@/components/SkillTags'
import { TechIconRow } from '@/components/TechIcons'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { RoleCrossNav } from '@/components/RoleCrossNav'
import { ContactSection } from '@/components/ContactSection'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return roles.map(role => ({ slug: role.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const role = getRoleBySlug(params.slug)
  if (!role) return {}
  return {
    title: `${role.title} — Dan Napoleoni`,
    description: role.subtitle,
  }
}

export default function RolePage({ params }: { params: { slug: string } }) {
  const role = getRoleBySlug(params.slug)
  if (!role) notFound()

  const otherRoles = getOtherRoles(params.slug)
  const testimonials = getTestimonialsForRole(params.slug)

  return (
    <article className="role-page">
      <Link href="/" className="back-link">
        <span aria-hidden="true">←</span> Back
      </Link>

      <header className="role-page-header">
        <h1 className="role-page-title">
          {role.title}
          <TechIconRow icons={role.icons} size={22} />
        </h1>
        <p className="role-page-subtitle">{role.subtitle}</p>
      </header>

      {/* Intro */}
      <section className="role-section">
        {role.intro.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </section>

      {/* Experience (above skills) */}
      {role.timeline.length > 0 && (
        <section className="role-section" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Experience</h2>
          <Timeline entries={role.timeline} />
        </section>
      )}

      {/* Skills */}
      <section className="role-section" aria-labelledby="skills-heading">
        <h2 id="skills-heading">Skills & Tools</h2>
        <SkillTags skills={role.skills} />
      </section>

      {/* Case Studies */}
      {role.caseStudies.length > 0 && (
        <section className="role-section" aria-labelledby="cases-heading">
          <h2 id="cases-heading">How I work</h2>
          {role.caseStudies.map((study, i) => (
            <div key={i} className="case-study">
              <h3>{study.title}</h3>
              <p>{study.description}</p>
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
      <ContactSection
        heading="Interested?"
        description={`If you're looking for a ${role.title.toLowerCase()} who brings UX thinking, clear communication, and genuine care to the work — let's chat.`}
        showCV
      />

      {/* Cross-nav to other roles */}
      <RoleCrossNav otherRoles={otherRoles} />
    </article>
  )
}
