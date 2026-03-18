import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="hero hero--centered">
      <p className="hero-greeting">404</p>
      <h1 className="hero-heading">This page doesn't exist yet.</h1>
      <p className="hero-sub">
        But honestly, in this job market, I know how it feels to look for something and not find it.
        Let's get you back on track.
      </p>
      <div className="link-group">
        <Link href="/" className="btn-outline">
          ← Back to the start
        </Link>
      </div>
    </section>
  );
}
