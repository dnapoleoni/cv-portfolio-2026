import { roles } from '@/data/roles'
import Link from 'next/link'

// Flatten and deduplicate timeline entries, sorted by date
function getAllTimelineEntries() {
  const seen = new Set<string>()
  const entries: { date: string; role: string; company: string; description: string; tech?: string[] }[] = []

  for (const role of roles) {
    for (const entry of role.timeline) {
      const key = `${entry.date}-${entry.company}`
      if (!seen.has(key) && entry.date !== 'Ongoing' && entry.date !== 'Throughout career') {
        seen.add(key)
        entries.push(entry)
      }
    }
  }

  return entries.sort((a, b) => {
    const yearA = parseInt(a.date.split(' ')[0], 10)
    const yearB = parseInt(b.date.split(' ')[0], 10)
    return yearB - yearA
  })
}

// Collect all unique skills
function getAllSkills() {
  const skills = new Set<string>()
  for (const role of roles) {
    for (const skill of role.skills) {
      skills.add(skill)
    }
  }
  return Array.from(skills)
}

export const metadata = {
  title: 'CV — Dan Napoleoni',
  description: 'Full curriculum vitae and work history for Dan Napoleoni, frontend developer based in Melbourne.',
}

export default function CVPage() {
  const timeline = getAllTimelineEntries()
  const skills = getAllSkills()

  return (
    <article className="cv-page">
      <Link href="/" className="back-link">
        <span aria-hidden="true">←</span> Back
      </Link>

      <header className="role-page-header">
        <h1 className="role-page-title">Curriculum Vitae</h1>
        <p className="role-page-subtitle">
          Dan Napoleoni · Frontend Developer · Melbourne, Australia
        </p>
        <div style={{ marginTop: 'var(--space-md)' }}>
          <a href="/Dan-Napoleoni-CV.pdf" download className="cv-download">
            <span aria-hidden="true">↓</span> Download PDF
          </a>
        </div>
      </header>

      {/* Summary */}
      <section className="role-section">
        <h2>Summary</h2>
        <p>
          Frontend developer with 15+ years of experience across the full evolution of web
          development — from Flash and interactive media through to modern React, TypeScript, and
          Vue.js applications. Strong UX instincts, clear communicator, and genuine collaborator.
          Experienced across agency and product environments with deep expertise in digital
          marketing production (eDMs, dynamic HTML banners, campaign systems) alongside
          modern frontend engineering.
        </p>
        <p>
          A developer who thinks like a designer and communicates like a human.
        </p>
      </section>

      {/* Skills */}
      <section className="role-section" aria-labelledby="cv-skills-heading">
        <h2 id="cv-skills-heading">Skills & Tools</h2>
        <ul className="skill-tags" role="list">
          {skills.map((skill) => (
            <li key={skill} className="skill-tag">{skill}</li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section className="role-section" aria-labelledby="cv-experience-heading">
        <h2 id="cv-experience-heading">Experience</h2>
        <ol className="timeline" role="list">
          {timeline.map((entry, i) => (
            <li key={i} className="timeline-item">
              <time className="timeline-date">{entry.date}</time>
              <h3 className="timeline-role">{entry.role}</h3>
              <p className="timeline-company">{entry.company}</p>
              <p className="timeline-desc">{entry.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Education / Other */}
      <section className="role-section">
        <h2>Also</h2>
        <p>
          Beyond the day job: game design enthusiast, puzzle creator, ARG designer,
          social club organiser, creative writer, and self-appointed Chief Vibes Officer
          at every workplace I've been part of. I believe culture isn't a perk — it's
          infrastructure.
        </p>
      </section>

      {/* Contact */}
      <section className="contact-section" aria-labelledby="cv-contact-heading">
        <h2 id="cv-contact-heading">Get in touch</h2>
        <p>
          Currently looking for my next role. Based in Melbourne, open to hybrid and remote.
        </p>
        <div className="contact-links">
          <a href="mailto:hello@danielnapoleoni.dev" className="contact-link">
            hello@danielnapoleoni.dev
          </a>
          <a
            href="https://www.linkedin.com/in/daniel-napoleoni"
            className="contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
      </section>
    </article>
  )
}
