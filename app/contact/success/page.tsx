import Link from 'next/link';

export const metadata = {
  title: 'Message sent — Dan Napoleoni',
  description: 'Thanks for getting in touch.',
};

export default function ContactSuccess() {
  return (
    <section className="hero hero--compact" style={{ textAlign: 'center' }}>
      <p className="hero-greeting">Message sent.</p>
      <h1
        style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          marginBottom: 'var(--space-md)',
        }}
      >
        Thanks for reaching out.
      </h1>
      <p className="hero-sub" style={{ marginInline: 'auto' }}>
        I typically reply within a day. In the meantime, feel free to keep looking around.
      </p>
      <div
        style={{
          marginTop: 'var(--space-lg)',
          display: 'flex',
          gap: 'var(--space-md)',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Link href="/" className="btn-outline">
          ← Back to home
        </Link>
        <Link href="/the-full-picture" className="btn-outline">
          View CV
        </Link>
      </div>
    </section>
  );
}
