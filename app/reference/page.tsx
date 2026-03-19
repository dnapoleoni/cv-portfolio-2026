'use client';

import { lookupReference } from './actions';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface ReferenceData {
  name: string;
  role: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
}

function ReferencePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [code, setCode] = useState('');
  const [data, setData] = useState<ReferenceData | null>(null);
  const [codeError, setCodeError] = useState('');
  const [lookingUp, setLookingUp] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // In handleCodeLookup, replace the fetch with:
  async function handleCodeLookup(value: string) {
    setLookingUp(true);
    setCodeError('');

    const result = await lookupReference(value);

    if (result.error) {
      setCodeError("That code doesn't look right. Double-check and try again.");
      setLookingUp(false);
      return;
    }

    setData(result.data);
    setLookingUp(false);
  }

  useEffect(() => {
    const urlCode = searchParams.get('code');
    if (urlCode) {
      setCode(urlCode);
      handleCodeLookup(urlCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function handleCodeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!code.trim()) return;
    await handleCodeLookup(code);
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    const formData = new FormData(e.currentTarget);

    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });
      router.push('/reference/success');
    } catch {
      setSubmitError('Something went wrong — please try again or email me directly.');
      setSubmitting(false);
    }
  }

  const firstName = data?.name?.split(' ')[0] ?? '';

  if (!data) {
    return (
      <article className="role-page">
        <header className="page-header">
          <h1 className="page-heading">Reference Request</h1>
          <p className="page-subheading">Enter the code from the link I sent you.</p>
        </header>

        <form onSubmit={handleCodeSubmit} className="contact-form">
          <label>
            Code
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoComplete="off"
              autoCapitalize="none"
              required
            />
          </label>

          {codeError && (
            <p role="alert" className="form-error">
              {codeError}
            </p>
          )}

          <div>
            <button type="submit" className="btn-solid-accent" disabled={lookingUp}>
              {lookingUp ? 'Looking up...' : 'Continue'}
            </button>
          </div>
        </form>
      </article>
    );
  }

  return (
    <article className="role-page">
      <header className="page-header">
        <h1 className="page-heading">Hi {firstName}!</h1>
        <p className="page-subheading">{data.message}</p>
      </header>

      <form onSubmit={handleFormSubmit} name="reference" className="contact-form reference">
        <fieldset disabled={submitting}>
          <legend className="sr-only">Reference and testimonial form</legend>
          <input type="hidden" name="form-name" value="reference" />
          <input type="hidden" name="code" value={code} />
          <p hidden>
            <label>
              Don't fill this out: <input name="bot-field" />
            </label>
          </p>

          <h2 className="section-heading">Your details</h2>
          <label htmlFor="ref-name">
            Name
            <input
              id="ref-name"
              type="text"
              name="name"
              required
              defaultValue={data.name}
              autoComplete="name"
            />
          </label>

          <label htmlFor="ref-role">
            Role title
            <input
              id="ref-role"
              type="text"
              name="role"
              required
              defaultValue={data.role}
              autoComplete="organization-title"
            />
          </label>

          <label htmlFor="ref-company">
            Company (at the time we worked together)
            <input
              id="ref-company"
              type="text"
              name="company"
              required
              defaultValue={data.company}
              autoComplete="organization"
            />
          </label>

          <label htmlFor="ref-email">
            Email
            <input
              id="ref-email"
              type="email"
              name="email"
              required
              defaultValue={data.email}
              autoComplete="email"
            />
          </label>

          <label htmlFor="ref-phone">
            Phone (optional{data.phone ? '- delete to remove' : ''})
            <input
              id="ref-phone"
              type="tel"
              name="phone"
              defaultValue={data.phone ?? ''}
              autoComplete="tel"
            />
          </label>

          <hr className="divider-subtle" />
          <h2 className="section-heading">Reference</h2>

          <label htmlFor="ref-optin" className="reference-checkbox">
            <input id="ref-optin" type="checkbox" name="is-reference" value="yes" />
            <span>I'm happy to be listed as a reference and contacted by potential employers</span>
          </label>

          <hr className="divider-subtle" />
          <h2 className="section-heading">Testimonials</h2>

          <p className="page-subheading">
            A sentence or two is perfect. Write in whatever voice feels natural — these will appear
            as quotes on my site. Leave any blank if you'd prefer not to.
          </p>

          <label htmlFor="ref-general">
            General quote (used on the home page and full CV)
            <textarea id="ref-general" name="quote-general" rows={3} />
          </label>

          <label htmlFor="ref-frontend">
            Frontend Development
            <textarea id="ref-frontend" name="quote-frontend-developer" rows={3} />
          </label>

          <label htmlFor="ref-marketing">
            Digital Marketing
            <textarea id="ref-marketing" name="quote-digital-marketing" rows={3} />
          </label>

          <label htmlFor="ref-ux">
            UX Engineering
            <textarea id="ref-ux" name="quote-ux-engineer" rows={3} />
          </label>

          <label htmlFor="ref-vibes">
            Culture &amp; Vibes
            <textarea id="ref-vibes" name="quote-chief-vibes-officer" rows={3} />
          </label>

          {submitError && (
            <p role="alert" className="form-error">
              {submitError}
            </p>
          )}

          <div>
            <button type="submit" className="btn-solid-accent">
              {submitting ? 'Sending...' : 'Submit reference'}
            </button>
          </div>
        </fieldset>
      </form>
    </article>
  );
}

export default function ReferencePage() {
  return (
    <Suspense>
      <ReferencePageContent />
    </Suspense>
  );
}
