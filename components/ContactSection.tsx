import Link from 'next/link';
import { ContextLink } from './ContextLink';

interface ContactSectionProps {
  heading?: string;
  description?: string;
  showCV?: boolean;
  slug?: string;
}

const ContactLink = () => (
  <ContextLink href="/contact" className="link-mono">
    Get in touch
  </ContextLink>
);

export function ContactSection({
  heading = "Let's talk",
  description = "I'm currently looking for my next role — whether that's frontend development, digital marketing, UX engineering, or something I haven't thought of yet. Based in Melbourne, open to hybrid, remote, and willing to relocate for the right role.",
  showCV = false,
  slug,
}: ContactSectionProps) {
  // Role page variant — lighter CTA linking to /contact with context
  if (slug) {
    return (
      <section className="contact-section" aria-labelledby="contact-heading">
        <h2 id="contact-heading">{heading}</h2>
        <p>If this sounds like the kind of person you need, let's have a conversation.</p>
        <div style={{ marginTop: 'var(--space-md)' }}>
          <ContactLink />
        </div>
      </section>
    );
  }

  // Home page variant — full link group
  return (
    <section className="contact-section" aria-labelledby="contact-heading">
      <h2 id="contact-heading">{heading}</h2>
      <p>{description}</p>
      <div className="link-group">
        <ContactLink />
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
  );
}
