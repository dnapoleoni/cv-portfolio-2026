import Link from 'next/link';

export const metadata = {
  title: 'Message sent — Dan Napoleoni',
  description: 'Thanks for getting in touch.',
};

export default function ContactSuccess() {
  return (
    <section className="hero hero--centered">
      <p className="hero-greeting">Message sent.</p>
      <h1 className="hero-heading">Thanks for reaching out.</h1>
      <p className="hero-sub">
        I typically reply within a day. In the meantime, feel free to keep looking around.
      </p>
      <div className="link-group">
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
