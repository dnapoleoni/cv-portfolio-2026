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
      <div className="link-group">
        <Link className="link-mono" href='/contact'>
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
          className='link-mono'
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
