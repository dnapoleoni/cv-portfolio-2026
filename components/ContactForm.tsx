'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ContactFormProps {
  subject?: string;
  selectedRefs?: Set<string>;
  onRemoveRef?: (name: string) => void;
}

export function ContactForm({ subject, selectedRefs, onRemoveRef }: ContactFormProps) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });
      router.push('/contact/success');
    } catch {
      setError('Something went wrong — try emailing me directly using the "Email Me" link below.');
      setSubmitting(false);
    }
  }

  const refsArray = selectedRefs ? Array.from(selectedRefs) : [];

  return (
    <form onSubmit={handleSubmit} name="contact" className="contact-form">
      <fieldset disabled={submitting}>
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="subject" value={subject || 'General enquiry'} />
        <input type="hidden" name="requested-references" value={refsArray.join(', ')} />
        <p hidden>
          <label>
            Don&apos;t fill this out: <input name="bot-field" />
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

        {refsArray.length > 0 && (
          <div className="selected-refs">
            <p className="selected-refs-label">Also requesting references from:</p>
            <ul className="selected-refs-list">
              {refsArray.map((name) => (
                <li key={name} className="selected-refs-item">
                  <span>{name}</span>
                  <button
                    type="button"
                    className="selected-refs-remove"
                    onClick={() => onRemoveRef?.(name)}
                    aria-label={`Remove ${name} from selected references`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && (
          <p role="alert" className="form-error">
            {error}
          </p>
        )}

        <div>
          <button type="submit" className="btn-solid-accent">
            {submitting ? 'Sending...' : 'Message Dan'}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
