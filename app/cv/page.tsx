import { roles } from '@/data/roles'
import { Timeline } from '@/components/Timeline'
import { SkillTags } from '@/components/SkillTags'
import { ContactSection } from '@/components/ContactSection'
import Link from 'next/link'

function getAllTimelineEntries() {
  const seen = new Set<string>()
  const entries: typeof roles[0]['timeline'] = []

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
    const yearA = parseInt(a.date.split(' ')[0], 10) || 0
    const yearB = parseInt(b.date.split(' ')[0], 10) || 0
    return yearB - yearA
  })
}

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
  description: 'Full curriculum vitae for Dan Napoleoni, frontend developer in Melbourne.',
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
          marketing production alongside modern frontend engineering.
        </p>
        <p>A developer who thinks like a designer and communicates like a human.</p>
      </section>

      {/* Experience first */}
      <section className="role-section" aria-labelledby="cv-experience-heading">
        <h2 id="cv-experience-heading">Experience</h2>
        <Timeline entries={timeline} />
      </section>

      {/* Skills */}
      <section className="role-section" aria-labelledby="cv-skills-heading">
        <h2 id="cv-skills-heading">Skills & Tools</h2>
        <SkillTags skills={skills} />
      </section>

      {/* Also */}
      <section className="role-section">
        <h2>Also</h2>
        <p>
          Beyond the day job: game design enthusiast, puzzle creator, ARG designer,
          social club organiser, creative writer, and self-appointed Chief Vibes Officer
          at every workplace I've been part of. I believe culture isn't a perk — it's
          infrastructure.
        </p>
      </section>

      <ContactSection />
    </article>
  )
}
