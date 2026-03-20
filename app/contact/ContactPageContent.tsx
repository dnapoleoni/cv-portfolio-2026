'use client';

import { getRoleBySlug } from '@/lib/roles';
import { ContactForm } from '@/components/ContactForm';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { useFromContext } from '@/hooks/useFromContext';
import { getContactTestimonials } from '@/lib/testimonials';
import { emailSubjects } from '@/data/contact';
import { useState } from 'react';

export function ContactPageContent() {
  const { value: from } = useFromContext();
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

  const allTestimonials = getContactTestimonials(from ?? undefined);
  const realTestimonials = allTestimonials.filter((t) => t.contactable === true);
  const showTestimonials = realTestimonials.length > 0;

  const [selectedRefs, setSelectedRefs] = useState<Set<string>>(new Set());

  function toggleRef(name: string) {
    setSelectedRefs((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function removeRef(name: string) {
    setSelectedRefs((prev) => {
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  }

  function toggleAll() {
    if (selectedRefs.size === realTestimonials.length) {
      setSelectedRefs(new Set());
    } else {
      setSelectedRefs(new Set(realTestimonials.map((t) => t.name)));
    }
  }

  const allSelected = selectedRefs.size === realTestimonials.length;

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
              <div className="contact-refs-header">
                <h2 className="section-heading">References</h2>
                {realTestimonials.length > 1 && (
                  <button
                    type="button"
                    className="link-reference contact-refs-toggle"
                    onClick={toggleAll}
                  >
                    {allSelected ? 'Remove' : 'Request'} all
                  </button>
                )}
              </div>
              {realTestimonials.map((t, i) => {
                const isSelected = selectedRefs.has(t.name);
                return (
                  <div
                    key={i}
                    className={`contact-ref-card${isSelected ? ' contact-ref-card--selected' : ''}`}
                  >
                    <blockquote>
                      <p className="contact-testimonial-name">{t.name}</p>
                      <p className="contact-testimonial-bio">
                        {t.role}, {t.company}
                      </p>
                      <footer className="contact-testimonial-quote">&ldquo;{t.quote}&rdquo;</footer>
                    </blockquote>
                    <div>
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={() => toggleRef(t.name)}
                      >
                        {isSelected ? 'Remove' : 'Add'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </aside>
            <div className="contact-form-card">
              <ContactForm subject={subject} selectedRefs={selectedRefs} onRemoveRef={removeRef} />
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
