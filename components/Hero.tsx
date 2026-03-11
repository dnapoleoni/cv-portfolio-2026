export function Hero() {
  return (
    <section className="hero hero--compact" aria-labelledby="hero-heading">
      <p className="hero-greeting">Hi, I'm Dan.</p>
      <h1 id="hero-heading" className="hero-tagline">
        <span className="tagline-developer">15 years of web.</span>{' '}
        <span className="tagline-designer">One person, many hats.</span>{' '}
        <span className="tagline-human">Pick the one you need.</span>
      </h1>
      <p className="hero-sub">
        Frontend developer. Digital marketer. UX thinker. Culture builder.
        Based in Melbourne, available now.
      </p>
    </section>
  )
}
