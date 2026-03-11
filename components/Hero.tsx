import Image from 'next/image';
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
        <p className="hero-sub">
          Frontend developer. Digital marketer. UX thinker. Culture builder.
        </p>
        <p className="hero-sub">Based in Melbourne, available now.</p>
      </div>
    </section>
  );
}
