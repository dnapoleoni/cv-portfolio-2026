import Image from 'next/image';
import Link from 'next/link';
import { DownloadButton } from './DownloadButton';

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
          <Link href="/the-full-picture" className="btn-solid-accent">
            View CV
          </Link>
          <DownloadButton
            href="/Dan-Napoleoni-CV.pdf"
            label="Download CV"
            className="btn-solid-accent"
          />
        </div>
      </div>
    </section>
  );
}
