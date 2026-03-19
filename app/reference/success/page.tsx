import Link from 'next/link';

export const metadata = {
  title: 'Thanks! — Dan Napoleoni',
  description: 'Reference submitted successfully.',
};

export default function ReferenceSuccess() {
  return (
    <section className="hero hero--centered">
      <p className="hero-greeting">Sent!</p>
      <h1 className="hero-heading">Thanks so much.</h1>
      <p className="hero-sub">
        I really appreciate you taking the time. I'll be in touch if anything needs clarifying.
      </p>
      <div className="link-group">
        <Link href="/" className="btn-outline">
          View the site
        </Link>
      </div>
    </section>
  );
}
