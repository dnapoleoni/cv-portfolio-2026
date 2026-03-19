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
  const [isReference, setIsReference] = useState(false);

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

    // Strip contact details if not opting in as a reference
    if (!isReference) {
      formData.set('email', '');
      formData.set('phone', '');
    }

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
          <label htmlFor="ref-code">
            Code
            <input
              id="ref-code"
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
              Don&apos;t fill this out: <input name="bot-field" />
            </label>
          </p>

          {/* Identity fields — always visible */}
          <h2 className="section-heading">Your details</h2>
          <p className="reference-note">
            (The details attributed to the quote - however you want them to appear)
          </p>

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
            <input id="ref-role" type="text" name="role" required defaultValue={data.role} />
          </label>

          <label htmlFor="ref-company">
            Company
            <input
              id="ref-company"
              type="text"
              name="company"
              required
              defaultValue={data.company}
            />
          </label>

          {/* Testimonials — always visible */}
          <hr className="divider-subtle" />
          <h2 className="section-heading">Testimonials</h2>

          <p className="reference-note">
            A sentence or two is perfect. Write in whatever voice feels natural — these will appear
            as quotes on my site alongside your name and role. Leave any blank if you&apos;d prefer
            not to.
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

          {/* Reference opt-in — toggle + conditional contact fields */}
          <hr className="divider-subtle" />
          <h2 className="section-heading">Reference</h2>

          <div className="reference-toggle">
            <button
              type="button"
              role="switch"
              aria-checked={isReference}
              aria-label="Opt in as a reference"
              className={`toggle ${isReference ? 'toggle--on' : ''}`}
              onClick={() => setIsReference(!isReference)}
              id="ref-confirm"
            >
              <span className="toggle-thumb" />
            </button>
            <label htmlFor="ref-confirm">
              {isReference ? 'Yes please' : 'Do not'} list me as a reference
            </label>
          </div>

          <input type="hidden" name="is-reference" value={isReference ? 'yes' : 'no'} />

          {isReference && (
            <>
              <hr className="divider-subtle" />
              <p className="reference-note">
                These are the contact details that will be shared with hiring managers or recruiters
                if they request a reference.
              </p>

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
                Phone (optional)
                <input
                  id="ref-phone"
                  type="tel"
                  name="phone"
                  defaultValue={data.phone ?? ''}
                  autoComplete="tel"
                />
              </label>
            </>
          )}

          {/* Privacy note + submit */}
          <hr className="divider-subtle" />

          <p className="reference-privacy">
            Your information is only used for reference and testimonial purposes. Contact details
            are never displayed publicly — they&apos;re only shared with hiring managers who
            specifically request a reference, and only if you&apos;ve opted in above.
          </p>

          {submitError && (
            <p role="alert" className="form-error">
              {submitError}
            </p>
          )}
          <div>
            <button type="submit" className="btn-solid-accent">
              {submitting ? 'Sending...' : 'Submit'}
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
