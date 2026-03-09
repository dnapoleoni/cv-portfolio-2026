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
        <Link href="/" className="btn-outline">
          ← Back to the start
        </Link>
      </div>
    </section>
  )
}
