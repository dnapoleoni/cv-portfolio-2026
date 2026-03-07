import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="hero" style={{ textAlign: 'center' }}>
      <p className="hero-greeting">404</p>
      <h1 className="hero-tagline" style={{ fontSize: 'var(--text-3xl)' }}>
        This page doesn't exist yet.
      </h1>
      <p className="hero-sub" style={{ marginInline: 'auto' }}>
        But honestly, in this job market, I know how it feels to look for something
        and not find it. Let's get you back on track.
      </p>
      <div style={{ marginTop: 'var(--space-lg)' }}>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: 'var(--space-sm) var(--space-lg)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            textDecoration: 'none',
            color: 'var(--color-text)',
            fontSize: 'var(--text-base)',
          }}
        >
          ← Back to the start
        </Link>
      </div>
    </section>
  )
}
