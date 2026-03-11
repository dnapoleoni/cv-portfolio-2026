'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ContactForm({ subject }: { subject?: string }) {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)

    try {
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      })
      router.push('/contact/success')
    } catch {
      alert('Something went wrong — try emailing me directly.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} name="contact" className="contact-form">
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="subject" value={subject || 'General enquiry'} />
      <p hidden>
        <label>Don't fill this out: <input name="bot-field" /></label>
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
        <button type="submit" className="btn-solid-accent" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send message →'}
        </button>
      </div>
    </form>
  )
}