import Link from 'next/link';
import { getRoleBySlug } from '@/data/roles';
import { EmailLink } from '@/components/EmailLink';
import { ContactForm } from '@/components/ContactForm';

export default function ContactPage({ searchParams }: { searchParams: { from?: string } }) {
  const from = searchParams.from || '';
  const fromRole = from && from !== 'home' && from !== 'cv' ? getRoleBySlug(from) : null;

  const heading = fromRole
    ? `Interested in a ${fromRole.title.toLowerCase()}?`
    : 'Keen to know more?';

  const subheading = fromRole
    ? "Drop a message below and I'll be in touch to organise a proper catchup."
    : "Fill out the form below and I'll be in touch.";

  const subject = fromRole
    ? `Hi Dan — interested in your ${fromRole.title} background`
    : 'Hi Dan — I came across your portfolio';

  function getBackHref(from: string): string {
    if (!from || from === 'home') return '/';
    return `/${from}`;
  }

  return (
    <article className="role-page">
      <Link href={getBackHref(from)} className="back-link">
        <span aria-hidden="true">←</span> Back
      </Link>

      <header style={{ marginBottom: 'var(--space-xl)' }}>
        <h1
          style={{
            fontSize: 'var(--text-3xl)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          {heading}
        </h1>

        <h2
          style={{
            fontSize: 'var(--text-1xl)',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          {subheading}
        </h2>
      </header>

      <ContactForm subject={subject} />

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
  );
}
