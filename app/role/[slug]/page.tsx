import { roles, getRoleBySlug } from '@/data/roles'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return roles.map((role) => ({ slug: role.slug }))
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

  if (!role) {
    notFound()
  }

  return (
    <article className="role-page">
      <Link href="/" className="back-link">
        <span aria-hidden="true">←</span> Back
      </Link>

      <header className="role-page-header">
        <h1 className="role-page-title">{role.title}</h1>
        <p className="role-page-subtitle">{role.subtitle}</p>
      </header>

      {/* Intro */}
      <section className="role-section">
        {role.intro.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </section>

      {/* Skills */}
      <section className="role-section" aria-labelledby="skills-heading">
        <h2 id="skills-heading">Skills & Tools</h2>
        <ul className="skill-tags" role="list">
          {role.skills.map((skill) => (
            <li key={skill} className="skill-tag">{skill}</li>
          ))}
        </ul>
      </section>

      {/* Timeline */}
      <section className="role-section" aria-labelledby="experience-heading">
        <h2 id="experience-heading">Experience</h2>
        <ol className="timeline" role="list">
          {role.timeline.map((entry, i) => (
            <li key={i} className="timeline-item">
              <time className="timeline-date">{entry.date}</time>
              <h3 className="timeline-role">{entry.role}</h3>
              <p className="timeline-company">{entry.company}</p>
              <p className="timeline-desc">{entry.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Case Studies */}
      {role.caseStudies && role.caseStudies.length > 0 && (
        <section className="role-section" aria-labelledby="cases-heading">
          <h2 id="cases-heading">How I work</h2>
          {role.caseStudies.map((study, i) => (
            <div key={i} style={{ marginBottom: 'var(--space-lg)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-sm)', fontWeight: 500 }}>
                {study.title}
              </h3>
              <p>{study.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* CTA */}
      <section className="contact-section" aria-labelledby="role-contact-heading">
        <h2 id="role-contact-heading">Interested?</h2>
        <p>
          If you're looking for a {role.title.toLowerCase()} who brings UX thinking,
          clear communication, and genuine care to the work — let's chat.
        </p>
        <div className="contact-links">
          <a href="mailto:hello@danielnapoleoni.dev" className="contact-link">
            hello@danielnapoleoni.dev
          </a>
          <Link href="/cv" className="contact-link">
            View full CV →
          </Link>
        </div>
      </section>
    </article>
  )
}
