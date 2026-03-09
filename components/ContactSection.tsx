import Link from 'next/link'

interface ContactSectionProps {
  heading?: string
  description?: string
  showCV?: boolean
}

export function ContactSection({
  heading = "Let's talk",
  description = "I'm currently looking for my next role — whether that's frontend development, digital marketing, UX engineering, or something I haven't thought of yet. Based in Melbourne, open to hybrid and remote.",
  showCV = false,
}: ContactSectionProps) {
  return (
    <section className="contact-section" aria-labelledby="contact-heading">
      <h2 id="contact-heading">{heading}</h2>
      <p>{description}</p>
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
        {showCV && (
          <Link href="/cv" className="contact-link">
            View full CV →
          </Link>
        )}
      </div>
    </section>
  )
}
