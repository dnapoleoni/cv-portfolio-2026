'use client';

import Link from 'next/link';
import { getRoleBySlug } from '@/data/roles';
import { EmailLink } from '@/components/EmailLink';
import { ContactForm } from '@/components/ContactForm';
import { useFromContext } from '@/hooks/useFromContext';

export function ContactPageContent() {
  const { value: from, backHref } = useFromContext();
  const fromRole = from ? getRoleBySlug(from) : null;

  const heading = fromRole ? `Looking for a ${fromRole.title}?` : '1800-TXT-DAN';

  const subheading = fromRole
    ? 'Or just keen for a chat? Either way - drop me a line below.'
    : 'Say hi, ask questions, leave feedback or send memes via this handy form.';

  const subject = fromRole
    ? `Hi Dan — interested in your ${fromRole.title} background`
    : 'Hi Dan — I came across your portfolio';

  return (
    <article className="role-page">
      <Link href={backHref} className="back-link">
        <span aria-hidden="true">←</span> Back
      </Link>

      <header className="page-header">
        <h1 className="page-heading">{heading}</h1>
        <p className="page-subheading">{subheading}</p>
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
