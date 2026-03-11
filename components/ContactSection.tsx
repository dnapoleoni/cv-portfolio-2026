import Link from 'next/link'

interface ContactSectionProps {
  heading?: string
  description?: string
  showCV?: boolean
  slug?: string
}

export function ContactSection({
  heading = "Let's talk",
  description = "I'm currently looking for my next role — whether that's frontend development, digital marketing, UX engineering, or something I haven't thought of yet. Based in Melbourne, open to hybrid and remote.",
  showCV = false,
  slug,
}: ContactSectionProps) {
  // Role page variant — lighter CTA linking to /contact with context
  if (slug) {
    return (
      <section className="contact-section" aria-labelledby="contact-heading">
        <h2 id="contact-heading">{heading}</h2>
        <p>
          If this sounds like the kind of person you need, let's have a conversation.
        </p>
        <div style={{ marginTop: 'var(--space-md)' }}>
          <Link href={`/contact?from=/${slug}`} className="btn-solid-accent">
            Get in touch →
          </Link>
        </div>
      </section>
    )
  }

  // Home page variant — full link group
  return (
    <section className="contact-section" aria-labelledby="contact-heading">
      <h2 id="contact-heading">{heading}</h2>
      <p>{description}</p>
      <div className="link-group">
        <Link className="link-mono" href="/contact">
          Contact
        </Link>
        {showCV && (
          <Link href="/cv" className="link-mono">
            View full CV
          </Link>
        )}
        <a
          href="https://github.com/dnapoleoni/cv-portfolio-2026"
          target="_blank"
          className="link-mono"
          rel="noopener noreferrer"
        >
          Github ↗
        </a>
        <a
          href="https://www.linkedin.com/in/daniel-napoleoni"
          className="link-mono"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
      </div>
    </section>
  )
}
