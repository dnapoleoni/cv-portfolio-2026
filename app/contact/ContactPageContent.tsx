'use client';

import { getRoleBySlug } from '@/lib/roles';
import { ContactForm } from '@/components/ContactForm';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { useFromContext } from '@/hooks/useFromContext';
import { getContactTestimonials } from '@/lib/testimonials';
import { emailSubjects } from '@/data/contact';

export function ContactPageContent() {
  const { value: from, backHref } = useFromContext();
  const fromRole = from ? getRoleBySlug(from) : null;

  const heading = fromRole?.contactHeading
    ? fromRole.contactHeading
    : fromRole
      ? `Looking for a ${fromRole.title}?`
      : 'Shall we?';

  const subheading = fromRole
    ? 'Or just keen for a chat? Either way - drop me a line below.'
    : "Drop your details below and I'll reach out for a proper catchup.";

  const subject = fromRole ? emailSubjects.role(fromRole.title) : emailSubjects.default;

  const allTestimonials = getContactTestimonials();
  const realTestimonials = allTestimonials.filter((t) => t.contactable === true);
  const showTestimonials = realTestimonials.length > 0;

  return (
    <article className="content-page">
      <header className="page-header">
        <h1 className="page-heading">{heading}</h1>
        <p className="page-subheading">{subheading}</p>
      </header>

      {showTestimonials ? (
        <>
          <hr className="divider-subtle" />
          <div className="contact-layout">
            <aside className="contact-testimonials">
              <h2 className="section-heading">What people say</h2>
              {realTestimonials.map((t, i) => (
                <blockquote key={i}>
                  <p className="contact-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="contact-testimonial-attribution">
                    — {t.name}, {t.role}, {t.company}
                  </footer>
                </blockquote>
              ))}
            </aside>
            <div className="contact-form-card">
              <ContactForm subject={subject} />
            </div>
          </div>
        </>
      ) : (
        <ContactForm subject={subject} />
      )}

      <ContactCTA
        heading="Other ways to reach me"
        description="Don't want to fill out a form?"
        slug={from}
        hideContactLink
      />
    </article>
  );
}
