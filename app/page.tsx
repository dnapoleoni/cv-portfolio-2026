import { roles } from '@/data/roles'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-heading">
        <p className="hero-greeting">Hi, I'm Dan.</p>
        <h1 id="hero-heading" className="hero-tagline">
          <span className="tagline-developer">A developer</span>{' '}
          <span className="tagline-designer">who thinks like a designer</span>{' '}
          <span className="tagline-human">and communicates like a human.</span>
        </h1>
        <p className="hero-sub">
          15+ years building for the web across Australia's best agencies and product teams.
          React, TypeScript, Vue.js — and a whole lot more.
        </p>
      </section>

      {/* Role Navigation */}
      <section className="role-nav" aria-labelledby="role-nav-label">
        <h2 id="role-nav-label" className="role-nav-label">
          What brings you here?
        </h2>
        <ul className="role-grid" role="list">
          {roles.map((role) => (
            <li key={role.slug}>
              <Link
                href={`/role/${role.slug}`}
                className={`role-card${role.variant === 'vibes' ? ' role-card--vibes' : ''}`}
              >
                <h3 className="role-card-title">
                  {role.title}
                  <span className="role-card-arrow" aria-hidden="true">→</span>
                </h3>
                <p className="role-card-desc">{role.shortDesc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Quiet links */}
      <nav className="quiet-links" aria-label="Quick links">
        <Link href="/cv" className="quiet-link">
          <span aria-hidden="true">↓</span> Just show me the CV
        </Link>
        <a href="mailto:hello@danielnapoleoni.dev" className="quiet-link">
          <span aria-hidden="true">✉</span> Get in touch
        </a>
        <a
          href="https://www.linkedin.com/in/daniel-napoleoni"
          className="quiet-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span aria-hidden="true">↗</span> LinkedIn
        </a>
      </nav>

      {/* Contact */}
      <section className="contact-section" aria-labelledby="contact-heading">
        <h2 id="contact-heading">Let's talk</h2>
        <p>
          I'm currently looking for my next role — whether that's frontend development,
          digital marketing, UX engineering, or something I haven't thought of yet.
          Based in Melbourne, open to hybrid and remote.
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
    </>
  )
}
