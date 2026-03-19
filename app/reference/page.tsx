'use client';

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

  async function handleCodeLookup(value: string) {
    setLookingUp(true);
    setCodeError('');

    try {
      const res = await fetch(`/api/reference?code=${encodeURIComponent(value.trim().toLowerCase())}`);
      if (!res.ok) {
        setCodeError('That code doesn\'t look right. Double-check and try again.');
        setLookingUp(false);
        return;
      }
      const json = await res.json();
      setData(json);
    } catch {
      setCodeError('Something went wrong. Please try again.');
    }

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

      <form onSubmit={handleFormSubmit} name="reference" className="contact-form">
        <fieldset disabled={submitting}>
          <input type="hidden" name="form-name" value="reference" />
          <input type="hidden" name="code" value={code} />
          <p hidden>
            <label>
              Don't fill this out: <input name="bot-field" />
            </label>
          </p>

          <h2 className="section-heading">Your details</h2>
          <hr className="divider-subtle" />

          <label>
            Name
            <input type="text" name="name" required defaultValue={data.name} autoComplete="name" />
          </label>

          <label>
            Role title
            <input type="text" name="role" required defaultValue={data.role} autoComplete="organization-title" />
          </label>

          <label>
            Company (at the time we worked together)
            <input type="text" name="company" required defaultValue={data.company} autoComplete="organization" />
          </label>

          <label>
            Email
            <input type="email" name="email" required defaultValue={data.email} autoComplete="email" />
          </label>

          <label>
            Phone (optional — only used if a hiring manager wants to verify)
            <input type="tel" name="phone" defaultValue={data.phone ?? ''} autoComplete="tel" />
          </label>

          <h2 className="section-heading">Reference</h2>
          <hr className="divider-subtle" />

          <label className="reference-checkbox">
            <input type="checkbox" name="is-reference" value="yes" />
            <span>I'm happy to be listed as a reference and contacted by potential employers</span>
          </label>

          <h2 className="section-heading">Testimonials</h2>
          <hr className="divider-subtle" />

          <p className="page-subheading">
            A sentence or two is perfect. Write in whatever voice feels natural — these will appear as quotes on my site. Leave any blank if you'd prefer not to.
          </p>

          <label>
            General quote (used on the home page and full CV)
            <textarea name="quote-general" rows={3} />
          </label>

          <label>
            Frontend Development (optional)
            <textarea name="quote-frontend-developer" rows={3} />
          </label>

          <label>
            Digital Marketing (optional)
            <textarea name="quote-digital-marketing" rows={3} />
          </label>

          <label>
            UX Engineering (optional)
            <textarea name="quote-ux-engineer" rows={3} />
          </label>

          <label>
            Culture &amp; Vibes (optional)
            <textarea name="quote-chief-vibes-officer" rows={3} />
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
