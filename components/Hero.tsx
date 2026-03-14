import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="hero hero--compact" aria-labelledby="hero-heading">
      <Image
        src="/images/profile-pic.jpg"
        alt="Dan Napoleoni smiling, black and white headshot"
        width={280}
        height={280}
        priority
        className="hero-image"
      />
      <div className="hero-text">
        <h1 id="hero-heading" className="hero-heading">
          Hi, I'm Dan.
        </h1>
        <div>
          <p className="hero-sub">
            Frontend developer. Digital marketer. UX thinker. Culture builder.
          </p>
          <p className="hero-sub">Based in Melbourne, available now.</p>
        </div>
        <div className="link-group mobile-center">
          <Link href="/cv" className="btn-solid-accent">
            View CV
          </Link>
          <a href="/Dan-Napoleoni-CV.pdf" download className="btn-solid-accent">
            <span>Download PDF</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                d="M8 2v8m0 0l-3-3m3 3l3-3M3 12h10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
