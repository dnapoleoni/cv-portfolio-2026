import Link from 'next/link'
import { getRoleBySlug } from '@/data/roles'
import { EmailLink } from '@/components/EmailLink'

export const metadata = {
  title: 'Contact — Dan Napoleoni',
  description: 'Get in touch with Dan Napoleoni.',
}

export default function ContactPage({
  searchParams,
}: {
  searchParams: { from?: string }
}) {
  const fromPath = searchParams.from || ''
  const slug = fromPath.replace(/^\//, '')
  const fromRole = slug ? getRoleBySlug(slug) : null

  const heading = fromRole
    ? `Interested in me as a ${fromRole.title.toLowerCase()}?`
    : "Let's talk"

  const subject = fromRole
    ? `Hi Dan — interested in your ${fromRole.title} background`
    : 'Hi Dan — I came across your portfolio'

  const backHref = fromPath || '/'

  return (
    <article className="role-page">
      <Link href={backHref} className="back-link">
        <span aria-hidden="true">←</span> Back
      </Link>

      <header style={{ marginBottom: 'var(--space-xl)' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          {heading}
        </h1>
      </header>

      <form
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        className="contact-form"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Don't fill this out: <input name="bot-field" />
          </label>
        </p>

        <label>
          Name
          <input type="text" name="name" required autoComplete="name" />
        </label>

        <label>
          Email
          <input type="email" name="email" required autoComplete="email" />
        </label>

        <label>
          Message
          <textarea name="message" required rows={6} />
        </label>

        <div>
          <button type="submit" className="btn-solid-accent">
            Send message →
          </button>
        </div>
      </form>

      <aside className="contact-aside">
        <div className="link-group">
          <EmailLink subject={subject} />
          <a
            href="https://www.linkedin.com/in/daniel-napoleoni"
            className="link-mono"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
        <p>I typically reply within a day.</p>
      </aside>
    </article>
  )
}
